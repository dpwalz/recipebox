import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './assets/environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

console.log(environment.apiUrl);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
