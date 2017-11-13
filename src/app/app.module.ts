import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { Location } from '@angular/common';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TranslateService} from "@ngx-translate/core";
import {LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings} from 'localize-router';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClient} from "@angular/common/http";
import {LocalizeRouterHttpLoader} from "localize-router-http-loader";
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        LocalizeRouterModule.forRoot([
            {path: '', component: HomeComponent, pathMatch: 'full'},
            {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
            {path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
        ], {
            parser: {
                provide: LocalizeParser,
                useFactory: HttpLoaderFactory,
                deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}


export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
    return new LocalizeRouterHttpLoader(translate, location, settings, http, 'assets/locales.json');
}

