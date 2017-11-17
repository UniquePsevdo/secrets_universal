import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
    constructor(private translate: TranslateService){
        //this.translate.use('ua');
        console.log(0, this.translate.currentLang);
    }

}
