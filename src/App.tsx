import './App.css';
import AppProvider, { useApp } from './contexts/AppContext';
import CameraFeed from './components/CameraFeed';
import { TFProvider } from './contexts/TFContext';
import IntroExperience from './pages/IntroExperience';
import MainExperience from './pages/MainExperience';

const TFSteps = [
  'Intro',
  'Instructions',
  'MainExperience',
];

const StepComponents = {
  CameraPermission: () => <div>accept permissions</div>,
  Intro: IntroExperience,
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
