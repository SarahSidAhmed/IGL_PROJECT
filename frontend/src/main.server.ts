import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { SigninComponent } from './app/signin/signin.component';

/*const bootstrap = () => bootstrapApplication(AppComponent, config);*/
const bootstrap = () => bootstrapApplication(SigninComponent, config);


export default bootstrap;
