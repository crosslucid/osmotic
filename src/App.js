import React from 'react';
import { TFProvider } from './TFContext';
import { CameraProvider } from './CameraContext';
import IntroSwitch from './IntroSwitch';
import './App.css';

const App = () =>
  <div className="App">
    <video id="video" width="600" height="300"></video>
    <TFProvider>
      <CameraProvider>
        <IntroSwitch />
      </CameraProvider>
    </TFProvider>
  </div>;

export default App;
