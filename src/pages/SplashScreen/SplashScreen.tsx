import { useApp } from "../../contexts/AppContext";

const SplashScreen = () => {
  const { advanceStep } = useApp();
  return (
    <div className="Page SplashScreen" onClick={advanceStep}>
      lalal
    </div>
  )
};

export default SplashScreen;