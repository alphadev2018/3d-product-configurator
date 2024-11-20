import { h } from 'preact';

import { AppProvider } from '../contexts/app';

const App = () => (
  <div id="app">
    <AppProvider>Content</AppProvider>
  </div>
);

export default App;
