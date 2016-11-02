import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

/*
 * Initializes the platform that the application runs.
 * Then, bootstraps the 'AppModule'
 */

 const platform = platformBrowserDynamic();
 platform.bootstrapModule(AppModule);
