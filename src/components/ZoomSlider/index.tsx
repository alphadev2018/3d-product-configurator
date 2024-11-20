import { FunctionComponent, h } from 'preact';

import { useApp } from '../../contexts/app';

const ZoomSlider: FunctionComponent = () => {
  const { zoom, setZoom } = useApp();

  const handleZoomChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setZoom(Number(target.value));
  };

  return (
    <input
      type="range"
      min="1"
      max="3"
      step="0.1"
      value={zoom.value}
      onChange={handleZoomChange}
    />
  );
};

export default ZoomSlider;
