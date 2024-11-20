// ColorPicker.test.tsx
import { h } from 'preact';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/preact';
import React from 'react';

import { AppProvider } from '../../contexts/app';
import ColorPicker from '.';

describe('ColorPicker', () => {
  it('renders the color input', () => {
    const { container } = render(
      <AppProvider>
        <ColorPicker />
      </AppProvider>,
    );
    const colorInput = container.querySelector('input[type="color"]');
    expect(colorInput).toBeInTheDocument();
  });

  it('displays the default color value', () => {
    const { container } = render(
      <AppProvider>
        <ColorPicker />
      </AppProvider>,
    );
    const colorInput = container.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    expect(colorInput.value).toBe('#ffffff');
  });

  it('calls setColor with the new color value', () => {
    const { container } = render(
      <AppProvider>
        <ColorPicker />
      </AppProvider>,
    );
    const colorInput = container.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;

    fireEvent.input(colorInput, { target: { value: '#ff0000' } });
    expect(colorInput.value).toBe('#ff0000');
  });
});
