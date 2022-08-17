import React from 'react';
import {
  swapping,
  beginTrace,
  additionToTrace,
  lastElementSorted,
  rangeFunc,
  keyFunc
} from './help';

const HeapSort = (nums) => {
  const trace = beginTrace(nums);

  // Helper functions to quickly access nodes
  const l = (i) => 2 * i + 1;
  const r = (i) => 2 * i + 2;
  const parent = (i) => Math.floor((i - 1) / 2);

  
  //Heapify Method

  const maxxHeapy = (array, i, heapsize) => {
    const lChild = l(i);
    const rChild = r(i);

    // Visualize: Compare parent and lChild
    additionToTrace(trace, array, lastElementSorted(trace), [i, lChild]);

    let largest =
      lChild < heapsize && array[lChild] > array[i]
        ? lChild
        : i;

    // Visualize: Compare largest and rChild
    additionToTrace(trace, array, lastElementSorted(trace), [largest, rChild]);

    if (rChild < heapsize && array[rChild] > array[largest])
      largest = rChild;

    if (largest !== i) {
      // Visualize: Select largest child and parent
      additionToTrace(trace, array, lastElementSorted(trace), [], [i, largest]);

      swapping(array, i, largest);

      // Visualize: swapping largest child and parent
      additionToTrace(trace, array, lastElementSorted(trace), [], [i, largest]);

      maxxHeapy(array, largest, heapsize);
    }
  };

  const BuildMaxHeap = (array) => {
    const start = Math.floor(array.length / 2);
    const heapsize = array.length;
    for (let i = start; i >= 0; i--) {
      maxxHeapy(array, i, heapsize);
    }

    // Visualize: Mark heap as built
    additionToTrace(
      trace,
      array,
      lastElementSorted(trace),
      [],
      [],
      [],
      rangeFunc(0, array.length)
    );
  };

  const heapSort = (array) => {
    BuildMaxHeap(array);
    let heapsize = array.length;
    for (let i = array.length - 1; i > 0; i--) {
      // Visualize: Select Maximum
      additionToTrace(trace, array, lastElementSorted(trace), [], [0, i]);

      swapping(array, 0, i);
      heapsize -= 1;

      // Visualize: swapping with last element in heap
      additionToTrace(trace, array, [...lastElementSorted(trace), i], [], [0, i]);

      maxxHeapy(array, 0, heapsize);

      // Visualize: Heap created
      additionToTrace(
        trace,
        array,
        lastElementSorted(trace),
        [],
        [],
        [],
        rangeFunc(0, heapsize)
      );
    }
    additionToTrace(trace, array, [...lastElementSorted(trace), 0]);
  };

  // Execute Heapsort
  heapSort(nums);
  return trace;
};

export const HeapSortKey = keyFunc(
  'Comparing',
  'Swapping',
  null,
  'Heap Built'
);

export const HeapSortDesc = {
  title: 'Heap Sort',
  description: (
    <div>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Heapsort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Heap Sort
        </a>{' '}
        is an enhanced selection sort that locates the maximum or minimum element using the heap data structure as 
        opposed to a linear-time search. It is an unstable in-place sorting algorithm that, 
        in actual use, runs a little more slowly than Quicksort.
      </p>
      <p>
        The heapsort algorithm can be divided into two parts. In the
        first step, a heap is built out of the data. The heap is often
        placed in an array with the layout of a complete binary tree. In
        the second step, a sorted array is created by repeatedly
        removing the largest element from the heap (the root of the
        heap), and inserting it into the array. The heap is updated
        after each removal to maintain the heap property. Once all
        objects have been removed from the heap, the result is a sorted
        array.
      </p>
      <ol>
        <li>
          Call the buildMaxHeap() function on the list. Also referred to
          as heapify(), this builds a heap from a list in O(n)
          operations.
        </li>
        <li>
          Swap the first element of the list with the final element.
          Decrease the considered range of the list by one.
        </li>
        <li>
          Call the <em>siftDown()</em>, also called{' '}
          <em>maxxHeapy()</em> function on the list to sift the new
          first element to its appropriate index in the heap.
        </li>
        <li>
          Go to step (2) unless the considered range of the list is one
          element.
        </li>
      </ol>
    </div>
  ),
  worstCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  avgCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  bestCase: (
    <span>
      O(<em>n</em> log <em>n</em>)
    </span>
  ),
  space: <span>O(1)</span>
};

export default HeapSort;
