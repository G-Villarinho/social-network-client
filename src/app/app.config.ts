import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { CredentialsInterceptor } from '@core/interceptors/credencials.interceptor';
import { ProvideLucideIcons } from '@core/config/lucide-icons-providers.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([CredentialsInterceptor])),
    ProvideLucideIcons,
  ],
};
