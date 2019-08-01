import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface IBrowser {
    name: string;
    img: string;
    disabled?: boolean;
}

@Component({
    selector: 'app-unsupported-browser',
    templateUrl: './unsupported-browser.component.html',
    styleUrls: ['./unsupported-browser.component.scss']
})
export class UnsupportedBrowserComponent implements OnInit {
    @ViewChild('copyURL') copyURL: ElementRef;
    browsers: IBrowser[];
    copied: boolean = false;
    siteURL: string = '';
    constructor() {
        this.browsers = [
            {
                name: 'Safari',
                img: '/assets/images/browsers/icons-8-adventures.svg'
            },
            {
                name: 'Chrome',
                img: '/assets/images/browsers/icons-8-chrome.svg'
            },
            {
                name: 'Edge',
                img: '/assets/images/browsers/icons-8-ms-edge.svg'
            },
            {
                name: 'Firefox',
                img: '/assets/images/browsers/icons-8-firefox.svg'
            },
            {
                name: 'IE',
                img: '/assets/images/browsers/icons-8-internet-explorer.svg',
                disabled: true
            }
        ];
    }

    ngOnInit() {
        this.siteURL = window.location.origin;
    }

    onCopy() {
        this.copyURL.nativeElement.select();
        const copy = document.execCommand('copy');
        if (copy) {
            this.copied = true;
            setTimeout(() => {
                this.copied = false;
            }, 5000);
        } else {
            console.error('Copy failed!');
        }
    }
}
