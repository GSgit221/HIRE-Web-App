import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    user: any;
    initials: string;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.user = this.route.snapshot.data.user;
        this.initials = this.user.first_name.charAt(0).toUpperCase();
        if (this.user.last_name) {
            this.initials += this.user.last_name.charAt(0).toUpperCase();
        }
    }

}
