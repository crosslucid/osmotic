import React, { createContext, useContext, useEffect, useState } from 'react';

import '@tensorflow/tfjs-backend-webgl';
import * as posenet from '@tensorflow-models/posenet';

const TFContext = createContext();
TFContext.displayName = 'TFContext';


const TFProvider = ({ children }) => {
  const [ net, setNet ] = useState();

  useEffect(() => {
    const loadNet = async  () => {    
      const net = await posenet.load({
        inputResolution: 300
      });
      setNet(net);
    };
    loadNet();
  })

  return <TFContext.Provider value={{ net }}>{children}</TFContext.Provider>
}

const useTF = () => useContext(TFContext);

export { TFProvider, useTF };
