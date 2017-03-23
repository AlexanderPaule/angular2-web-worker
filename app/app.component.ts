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
        let pointer = Math.floor( this.webWorkerStart );

        this.stopWebWorkerCalculation();
        while( pointer <= this.webWorkerEnd ) {
            let resp: { results: Result, promise: any } = this.worker.calculate( pointer );
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
