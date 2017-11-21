import {Component, OnInit} from '@angular/core';
import {LocalizeRouterService} from "localize-router";
import {NavigationExtras, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Location} from '@angular/common';

@Component({
    selector: 'app-lang-switcher',
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
    selected: string = this.translate.currentLang;

    constructor(private localize: LocalizeRouterService, private translate: TranslateService, private router: Router,
                private location: Location) {
        /*switch(this.translate.currentLang){
            case 'ua':
                this.selected==='ua';
                break;
            case 'en':
                this.selected==='en';
        }*/
    }


    onLangChange(lang) {
        /*let path = this.location.path(false);
        if (path.charAt(0) !== '/') {
            path = '/' + path;
        }

        let pathArr = path.split('/');
        pathArr = pathArr.filter((item, index)=>{
            if(index===1){
                console.log(item, this.translate.currentLang, this.translate.defaultLang);
                console.log(item!==this.translate.defaultLang, item===this.translate.currentLang);
            }
            if(index===1 && item!==this.translate.defaultLang && item===this.translate.currentLang){
                return false;
            }else{
                return true;
            }
        });

        path = pathArr.join('/');

        if(lang!==this.translate.defaultLang && lang!==this.translate.currentLang){
            console.log(0, '/' + lang + path);
            this.location.replaceState('/' + lang + path);

        }else if(lang===this.translate.defaultLang && lang!==this.translate.currentLang){
            console.log(1, path);
            this.location.replaceState(path);
        }*/

        this.localize.changeLanguage(lang);
    }

    ngOnInit() {
    }

}
