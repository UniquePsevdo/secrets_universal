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
    private selected: string = this.translate.currentLang;

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

    removeLastHash(url){
        let urlArr = url.split('');
        if(urlArr[urlArr.length-1]==='/'){
            console.log(urlArr, urlArr.slice(0,urlArr.length-1));
            return urlArr.slice(0,urlArr.length-1).join('');
        }
        return url;
    }


    onLangChange(lang) {
        let path = this.location.path(false);       //can be changed
        if (path.charAt(0) !== '/') {
            path = '/' + path;
        }
        let pathArr = path.split('/');
        pathArr = pathArr.filter((item, index)=>{
            if(index===1 && item!==this.translate.defaultLang && item===this.translate.currentLang){
                return false;
            }else{
                return true;
            }
        });
        path = pathArr.join('/');

        if(lang!==this.translate.defaultLang && lang!==this.translate.currentLang){
            //this.location.replaceState('/' + lang + path);
            this.router.navigateByUrl(this.removeLastHash('/' + lang + path), {replaceUrl: true, skipLocationChange: false}).
            then((bool)=>{
                this.localize.changeLanguage(lang, {}, true);
            }, ((reason)=>{
                console.log('reason: ' + reason);
            }));

        }else if(lang===this.translate.defaultLang && lang!==this.translate.currentLang){
            //this.location.replaceState(path);
            this.router.navigateByUrl(this.removeLastHash(path), {replaceUrl: true, skipLocationChange: false}).
            then((bool)=>{
                this.localize.changeLanguage(lang, {}, true);
            }, ((reason)=>{
                console.log('reason: ' + reason);
            }));
        }
    }

    ngOnInit() {
    }

}
