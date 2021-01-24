import React from 'react';
import { TFProvider } from './TFContext';
import { CameraProvider } from './CameraContext';
import ExperienceSwitch from './ExperienceSwitch';

import './App.css';

const App = () =>
  <div className="App">
    <CameraProvider>
      <TFProvider>
        <ExperienceSwitch />
      </TFProvider>
    </CameraProvider>

  </div>;

export default App;
