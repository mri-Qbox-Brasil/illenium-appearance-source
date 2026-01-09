import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import mock from './mock';
import './index.css';
import Nui, { EventListener } from './Nui';

if (!import.meta.env.PROD) {
  window.Nui = Nui;

  mock('get_theme_configuration', () => ({
    currentTheme: 'default',
    themes: [
      {
        id: 'default',
        borderRadius: '4px',
        fontColor: '255, 255, 255',
        fontColorHover: '255, 255, 255',
        fontColorSelected: '0, 0, 0',
        fontFamily: 'Inter',
        primaryBackground: '0, 0, 0',
        primaryBackgroundSelected: '255, 255, 255',
        secondaryBackground: '0, 0, 0',
        scaleOnHover: false,
        sectionFontWeight: 'normal',
        smoothBackgroundTransition: false,
      },
    ],
  }));
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
    <EventListener />
  </React.StrictMode>,
);
