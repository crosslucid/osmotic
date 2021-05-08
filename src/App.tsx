import './App.css';
import AppProvider, { useApp } from './contexts/AppContext';
import CameraFeed from './components/CameraFeed';
import { TFProvider } from './contexts/TFContext';
import IntroExperience from './pages/IntroExperience';
import Instructions from './pages/Instructions';
import MainExperience from './pages/MainExperience';
import CameraPermissions from './pages/CameraPermissions';

const TFSteps = [
  'Instructions',
  'MainExperience',
];

const CameraSteps = [
  'CameraPermission',
  'Instructions',
  'MainExperience'
]

const StepComponents = {
  CameraPermission: CameraPermissions,
  Instructions: Instructions,
  Intro: IntroExperience,
  MainExperience: MainExperience,
  Error: () => <div>error</div>,
}


const AppTemplate = () =>  {
  const { step } = useApp();
  const StepComponent = StepComponents[step];
  return (
    <div className="App" id="App">
      {
        CameraSteps.includes(step) && <CameraFeed />
      }
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
