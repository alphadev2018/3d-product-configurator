// ZoomSlider.test.tsx
import { h } from 'preact';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/preact';
import React from 'react';

import { AppProvider } from '../../contexts/app';
import ZoomSlider from '.';

describe('ZoomSlider', () => {
  it('renders the zoom slider input', () => {
    const { container } = render(
      <AppProvider>
        <ZoomSlider />
      </AppProvider>,
    );
    const zoomInput = container.querySelector('input[type="range"]');
    expect(zoomInput).toBeInTheDocument();
  });

  it('displays the default zoom value', () => {
    const { container } = render(
      <AppProvider>
        <ZoomSlider />
      </AppProvider>,
    );
    const zoomInput = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    expect(zoomInput.value).toBe('2');
  });

  it('calls setZoom with the new zoom value', () => {
    const { container } = render(
      <AppProvider>
        <ZoomSlider />
      </AppProvider>,
    );
    const zoomInput = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;

    fireEvent.input(zoomInput, { target: { value: '1' } });
    expect(zoomInput.value).toBe('1');
  });
});
