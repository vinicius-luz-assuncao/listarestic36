import {
  ApplicationConfig,
  provideZoneChangeDetection,
  ValueProvider,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import { provideAuth0 } from '@auth0/auth0-angular';


const SNACK_BAR_CONFIG: ValueProvider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  } as MatSnackBarConfig,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAuth0({

      domain: 'dev-e4a4hfzm3ojdyb37.us.auth0.com',
     
      clientId: 'A6oPj7VhrjZo3ct5qcugUd4eckWn4aDR',
     
      authorizationParams: {
     
         audience: 'https://dev-e4a4hfzm3ojdyb37.us.auth0.com/api/v2/',

         scope: 'openid profile email offline_access',

      redirect_uri: window.location.origin,
     
      },
      useRefreshTokens: true,

      cacheLocation: 'localstorage',
    }),

      
     
    SNACK_BAR_CONFIG
  ],
};
