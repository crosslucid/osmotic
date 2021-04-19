import React, { createContext, useCallback, useContext, useReducer } from 'react';

export interface IAppContextValue extends IAppState {
  sendError: (error: AppErrors) => void;
  advanceStep: () => void;
};

const appSteps = [
  'CameraPermission',
  'SplashScreen',
  'Intro',
  'Instructions',
  'MainExperience',
  'Error',
] as const;

export type AppStep = typeof appSteps[number];

export type AppErrors = 'CameraPermissionRejected';

export interface IAppState {
  step: AppStep;
  error?: AppErrors | undefined;
};
export type AppAction = { type: string, payload?: any  };

const initialState = {
  step: "CameraPermission"
};

const getNextStep = (currentStep: AppStep):AppStep =>
  appSteps[appSteps.indexOf(currentStep) + 1];

const appReducer = (state:IAppState, action:AppAction) => {
  switch (action.type) {
    case 'error': 
      return { step: state.step, error: action.payload };
    case 'nextStep':
      return { step: getNextStep(state.step) };
    case 'stepTo':
      return { step: action.payload };
    default:
      throw new Error();
  }
}
const AppContext = createContext({});

const AppProvider:React.FC = ({ children }) => {
  const [{ step, error }, dispatch] = useReducer(appReducer, initialState);
  const sendError = useCallback(
    (error:AppErrors) => dispatch({ type: 'error', payload: error}),
    [])
  const advanceStep = useCallback(() => dispatch({ type: 'nextStep' }), []);
  const value:IAppContextValue = { step, error, sendError, advanceStep };
  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  )
};

export const useApp = ():IAppContextValue => useContext(AppContext) as IAppContextValue;

export default AppProvider;