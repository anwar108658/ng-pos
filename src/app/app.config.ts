  import { ApplicationConfig, EnvironmentInjector, inject, provideBrowserGlobalErrorListeners, runInInjectionContext } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { provideHttpClient } from '@angular/common/http';
  import { routes } from './app.routes';
  import { providePrimeNG } from 'primeng/config';
  import Aura from '@primeuix/themes/aura';
  import { definePreset } from '@primeuix/themes';

  const MyAura = definePreset(Aura, {
    semantic: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6', 
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      }
    }
  });

export const appConfig: ApplicationConfig = {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes),
      provideHttpClient(),
      providePrimeNG({
        theme: {
          preset: MyAura,
          options: {
           darkModeSelector: '.my-app-dark',
            cssLayer: {
              name: 'primeng',
              order: 'theme, base, primeng',
            },
          },
        },
      }),
    ],
  };
