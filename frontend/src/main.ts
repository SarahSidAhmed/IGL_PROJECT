import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SigninComponent } from './app/signin/signin.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(SigninComponent, appConfig)
//   .catch((err) => console.error(err));