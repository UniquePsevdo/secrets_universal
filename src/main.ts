import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';
import './globals';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    try {
        enableProdMode();
    } catch (err) {
        console.log(err);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
});
