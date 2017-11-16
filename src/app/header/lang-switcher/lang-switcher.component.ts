import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-lang-switcher',
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
    selected = 'option2';

    constructor() {
    }

    ngOnInit() {
    }

}
