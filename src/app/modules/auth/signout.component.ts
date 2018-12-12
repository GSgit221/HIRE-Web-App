import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-signout',
    template: '',
    styles: []
})
export class SignoutComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.logout();
        this.router.navigateByUrl('/auth/signin');
    }
}
