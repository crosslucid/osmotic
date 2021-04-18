import React, { useRef, useState, Suspense, useEffect } from 'react';
import mean from 'lodash/fp/mean';

export const useRunningAverage = (value, score, limit=10) => {
  const [ result, setResult ] = useState();
  const [ queue, setQueue ] = useState([value]);
  useEffect(() => {
    const newQueue = [...queue, value];
    if (queue.length > limit) {
      newQueue.shift();
    }
    setQueue(newQueue);
    setResult(mean(newQueue))
  }, [value])
  
  return result;
};