import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader} from "localize-router";
import {RouterModule, Routes} from "@angular/router";
import * as fs from "fs";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {Location} from '@angular/common';
import {Observable} from "rxjs/Observable";
import {HomeComponent} from "./home/home.component";
import {defaultLangFunction} from "./common/translate-loader";
require('../polyfills.server');

export class LocalizeUniversalLoader extends LocalizeParser {
    /**
     * Gets config from the server
     * @param routes
     */
    public load(routes: Routes): Promise<any> {
        return new Promise((resolve: any) => {
            /*let data: any = JSON.parse(fs.readFileSync( + '/browser/assets/locales.json', 'utf8'));*/
            let data: any = JSON.parse(fs.readFileSync( ( 'assets/locales.json'), 'utf8'));
            this.locales = data.locales;
            this.prefix = data.prefix;
            this.init(routes).then(resolve);
        });
    }
}

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
    return new LocalizeUniversalLoader(translate, location, settings);
}


export class TranslateUniversalLoader implements TranslateLoader {
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    public getTranslation(lang: string): Observable<any> {
        return Observable.create(observer => {
            observer.next(JSON.parse(fs.readFileSync(( 'assets/locales/' + lang + '.json'), 'utf8')));
            observer.complete();
        });
    }
}
export function translateLoaderFactory() {
    return new TranslateUniversalLoader();
}

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
    {path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
];

@NgModule({
    imports: [
        // The AppServerModule should import your AppModule followed
        // by the ServerModule from @angular/platform-server.
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateLoaderFactory
            }
        }),
        RouterModule.forRoot(routes),
        LocalizeRouterModule.forRoot(routes, {
            parser: {
                provide: LocalizeParser,
                useFactory: (translate, location, settings) =>
                    new ManualParserLoader(translate, location, settings, ['ua','en'], 'ROUTES'),
                deps: [TranslateService, Location, LocalizeRouterSettings]
            },
            alwaysSetPrefix:false,
            useCachedLang: false,
            defaultLangFunction: defaultLangFunction
        }),
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
    ],
    // Since the bootstrapped component is not inherited from your
    // imported AppModule, it needs to be repeated here.
    bootstrap: [AppComponent],
})
export class AppServerModule {
}