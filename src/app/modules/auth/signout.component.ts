import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-signout',
    template: '<iframe *ngIf="link" style="width: 100%; height: 100%;" [src]="link">{{ link }}</iframe>',
    styles: []
})
export class SignoutComponent implements OnInit {
    link;
    constructor(private authService: AuthService, private router: Router, private dom: DomSanitizer) {}

    ngOnInit() {
        this.authService.logout();
        this.router.navigateByUrl('/auth/signin');
    }
}
