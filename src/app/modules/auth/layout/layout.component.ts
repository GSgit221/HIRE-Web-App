import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    currentRoute: any = '';
    loading: boolean = false;
    constructor(private router: Router, private authService: AuthService) {
        this.router.events.subscribe(() => {
            this.currentRoute = this.router.url;
        });
    }

    ngOnInit() {
        this.authService.$loading.subscribe((loading) => (this.loading = loading));
    }
}
