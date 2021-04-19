import './App.css';
import AppProvider, { useApp } from './contexts/AppContext';
import CameraFeed from './components/CameraFeed';
import { TFProvider } from './contexts/TFContext';
import IntroExperience from './pages/IntroExperience';

const AppTemplate = () =>  {
  const { step } = useApp();
  return (
    <div className="App">
      <CameraFeed />
      <TFProvider>
        <IntroExperience />
      </TFProvider>
    </div>
  );
};

const App = () => 
  <AppProvider>
    <AppTemplate />
  </AppProvider>;

export default App;
