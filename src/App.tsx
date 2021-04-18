import React, { useState } from 'react';
import './App.css';
import { CameraProvider } from './contexts/CameraContext';

const App = () =>  {
  const [ phase, setPhase ] = useState(1)
  return (
    <div className="App">
      <CameraProvider>
        {phase}
      </CameraProvider>
    </div>
  );
}

export default App;
