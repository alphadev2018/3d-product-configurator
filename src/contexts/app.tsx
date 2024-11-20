import { h, createContext, FunctionComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { useSignal } from '@preact/signals';

interface AppContextType {
  color: ReturnType<typeof useSignal<string>>;
  zoom: ReturnType<typeof useSignal<number>>;
  rotationX: ReturnType<typeof useSignal<number>>;
  rotationY: ReturnType<typeof useSignal<number>>;
  setColor: (val: string) => void;
  setZoom: (val: number) => void;
  setRotationX: (val: number) => void;
  setRotationY: (val: number) => void;
}

const AppContext = createContext<AppContextType>(undefined);

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider: FunctionComponent = ({ children }) => {
  const color = useSignal('#ffffff');
  const zoom = useSignal(2);
  const rotationX = useSignal(0);
  const rotationY = useSignal(0);

  const setColor = (val: string) => {
    color.value = val;
  };

  const setZoom = (val: number) => {
    zoom.value = val;
  };

  const setRotationX = (val: number) => {
    rotationX.value = val;
  };

  const setRotationY = (val: number) => {
    rotationY.value = val;
  };

  return (
    <AppContext.Provider
      value={{
        color,
        zoom,
        rotationX,
        rotationY,
        setColor,
        setZoom,
        setRotationX,
        setRotationY,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
