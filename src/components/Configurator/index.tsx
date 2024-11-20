import { Fragment, FunctionComponent, h } from 'preact';

import ModelViewer from '../ModelViewer';
import ColorPicker from '../ColorPicker';
import ZoomSlider from '../ZoomSlider';

const Configurator: FunctionComponent = () => {
  return (
    <Fragment>
      <h1 className="text-center">3D Product Configurator</h1>
      <ModelViewer />

      <div className="controller">
        <ZoomSlider />
        <ColorPicker />
      </div>
    </Fragment>
  );
};

export default Configurator;