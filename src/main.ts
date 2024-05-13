import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import "../node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
