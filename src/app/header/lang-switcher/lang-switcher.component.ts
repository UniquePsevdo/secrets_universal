import {Component, OnInit} from '@angular/core';
import {LocalizeRouterService} from "localize-router";
import {NavigationExtras} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-lang-switcher',
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
    private selected : string = this.translate.currentLang;

    constructor(private localize: LocalizeRouterService, private translate: TranslateService){
        /*switch(this.translate.currentLang){
            case 'ua':
                this.selected==='ua';
                break;
            case 'en':
                this.selected==='en';
        }*/
    }



    onLangChange(lang){
        console.log(lang);

        /*interface NavigationExtras {
            relativeTo?: ActivatedRoute|null
            queryParams?: Params|null
            fragment?: string
            preserveQueryParams?: boolean
            queryParamsHandling?: QueryParamsHandling|null
            preserveFragment?: boolean
            skipLocationChange?: boolean
            replaceUrl?: boolean
        }*/

       // this.localize.changeLanguage(lang, {skipLocationChange:true, replaceUrl:true}, true);


    }

    ngOnInit() {
    }

}
