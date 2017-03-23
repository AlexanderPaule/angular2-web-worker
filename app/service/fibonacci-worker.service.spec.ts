/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FibonacciWorker } from './fibonacci-worker.service';

describe('FibonacciWorker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FibonacciWorker]
    });
  });

  it('should ...', inject([FibonacciWorker], (service: FibonacciWorker) => {
    expect(service).toBeTruthy();
  }));
});
