import { PayloadAction } from '@reduxjs/toolkit'

const appSteps = [
  'CameraPermission',
  'SplashScreen',
  'Intro',
  'Instructions',
  'MainExperience'
];

type AppStep = typeof appSteps[number];

enum appErrors {
  CameraPermissionRejected,
};

type AppState = {
  step: AppStep;
  error?: appErrors;
};

const getNextStep = (currentStep: AppStep) =>
  appSteps[appSteps.indexOf(currentStep + 1)];

const appReducer = (state: AppState, action: PayloadAction<string>) => {
  switch (action.type) {
    case 'error': 
      throw new Error(action.payload);
    case 'goToNextStep':
      return { step: getNextStep(state.step)};
    default:
      throw new Error();
  }
}

export default appReducer;