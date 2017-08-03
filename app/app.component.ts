import { Component } from '@angular/core';
import { FibonacciWorker } from './service/fibonacci-worker.service';
import { Result } from './utility/result';

@Component({
  selector:     'app-root',
  templateUrl:  './app.component.html',
  styleUrls:    ['./app.component.css'],
  providers:    [ FibonacciWorker ]
})
export class AppComponent{
    private webWorkerStart;
    private webWorkerEnd;
    private webWorkerResults: Array<Result>;
    private promises: Promise<any>[];
    private worker: FibonacciWorker;

    // ************************************************* Initialization
    constructor() {
        this.webWorkerStart = 35;
        this.webWorkerEnd = 42;
        this.worker = new FibonacciWorker();
    }

    // ************************************************* controllers
    private startWebWorkerCalculation() {
        this.initialize();
        let pointer: number = Math.floor( this.webWorkerStart );
        let end: number = Math.floor( this.webWorkerEnd ) + 1;

        this.stopWebWorkerCalculation();
        if( pointer < 0 ) {
            pointer = 0;
        }
        if( pointer == 0 ) {
            this.webWorkerResults.push( new Result( -1, 0, false ) );
            pointer++;
        }
        while( pointer < end ) {
            let resp: { results: Result, promise: any } = this.worker.calculate( pointer - 1 );
            this.webWorkerResults.push( resp.results );
            this.promises.push( resp.promise );
            pointer++;
        }
    }
    private stopWebWorkerCalculation() {
        for( let i: number = this.promises.length - 1; i > -1; i-- ) {
            this.worker.terminate( this.promises[ i ] );
            if( this.webWorkerResults[i] !== undefined && this.webWorkerResults[i].loading )
                this.webWorkerResults.splice( i, 1 );
        }
    }

    private reset() {
        this.webWorkerStart = 35;
        this.webWorkerEnd = 42;
        this.stopWebWorkerCalculation();
        this.initialize();
    }

    // *************************************************** Internal Services
    private initialize() {
        this.webWorkerResults = [];
        this.promises = [];
    }
}
