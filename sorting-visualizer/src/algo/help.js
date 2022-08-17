export const beginTrace = (array) => {
    return [
      {
        array: [...array],
        groupA: [],
        groupB: [],
        groupC: [],
        groupD: [],
        sortedIndices: []
      }
    ];
  };
  
  export const additionToTrace = (
    trace,
    array,
    sortedIndices = [],
    groupA = [],
    groupB = [],
    groupC = [],
    groupD = []
  ) => {
    trace.push({
      array: [...array],
      groupA: [...groupA],
      groupB: [...groupB],
      groupC: [...groupC],
      groupD: [...groupD],
      sortedIndices: [...sortedIndices]
    });
  };
  
  export const lastElementSorted = (trace) => {
    return trace[trace.length - 1].sortedIndices;
  };
  
  export const swapping = (array, i, j) => {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  };
  
  export const rangeFunc = (start, end) => {
    return [...Array(end - start).keys()].map((elem) => elem + start);
  };
  
  export const keyFunc = (groupA, groupB, groupC, groupD) => {
    return { groupA, groupB, groupC, groupD };
  };
  