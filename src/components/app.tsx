import { h } from 'preact';

import Configurator from '../components/Configurator';
import { AppProvider } from '../contexts/app';

const App = () => (
  <div id="app">
    <AppProvider>
      <Configurator />
    </AppProvider>
  </div>
);

export default App;
