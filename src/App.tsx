import './App.css';
import AppProvider, { useApp } from './contexts/AppContext';
import CameraFeed from './components/CameraFeed';
import { TFProvider } from './contexts/TFContext';
import IntroExperience from './pages/IntroExperience';
import MainExperience from './pages/MainExperience';
import SplashScreen from './pages/SplashScreen';
import { Canvas } from 'react-three-fiber'

const TFSteps = [
  'Intro',
  'Instructions',
  'Main',
];

const StepComponents = {
  CameraPermission: () => <div>accept permissions</div>,
  SplashScreen: SplashScreen,
  Intro: IntroExperience,
  Instructions: IntroExperience,
  MainExperience: MainExperience,
  Error: () => <div>error</div>,
}

const AppTemplate = () =>  {
  const { step } = useApp();
  const StepComponent = StepComponents[step];
  return (
    <div className="App">
      <CameraFeed />
      { 
        TFSteps.includes(step) ?
          <TFProvider>
            <StepComponent />
          </TFProvider>:
          <StepComponent />
      }
    </div>
  );
};

const App = () => 
  <AppProvider>
    <AppTemplate />
  </AppProvider>;

export default App;
