import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TranslateService} from "@ngx-translate/core";
import {LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings} from 'localize-router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CustomTranslateLoader, HttpLoaderFactory} from "./common/translate-loader";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LangSwitcherComponent } from './header/lang-switcher/lang-switcher.component';
import {MaterialModule} from './common/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//ng generate component componentName --module=app.module

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
    {path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LangSwitcherComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
        MaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomTranslateLoader
            }
        }),
        RouterModule.forRoot(routes),
        LocalizeRouterModule.forRoot(routes, {
            parser: {
                provide: LocalizeParser,
                useFactory: HttpLoaderFactory,
                deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
            },
            alwaysSetPrefix:false
        })
    ],
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule {
}


