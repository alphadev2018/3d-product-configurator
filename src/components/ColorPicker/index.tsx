import { FunctionComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';

import { useApp } from '../../contexts/app';

const ColorPicker: FunctionComponent = () => {
  const { color, setColor } = useApp();

  const handleColorChange = useCallback((event: Event) => {
    const target = event.target as HTMLInputElement;

    setColor(target.value);
  }, []);

  return (
    <input type="color" value={color.value} onChange={handleColorChange} />
  );
};

export default ColorPicker;
