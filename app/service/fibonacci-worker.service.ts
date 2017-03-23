import { Injectable } from '@angular/core';
import { Result } from './../utility/result';
import { WebWorkerService } from './worker/web-worker';

@Injectable()
export class FibonacciWorker extends WebWorkerService {
    public calculate( n: number ): { results: Result, promise: any } {
        let promise = this.run(this.fib, n);
        let result = new Result(n, 0, true);

        promise.then( (response) => {
            result.result = response;
            result.loading = false;
        });

        return { results: result, promise: promise };
    }
    private fib( n: number ) {
        let fib = (n: number): number => {
            if (n < 2) return 1;
            return fib(n - 1) + fib(n - 2);
        };

        return fib(n);
    }
}
