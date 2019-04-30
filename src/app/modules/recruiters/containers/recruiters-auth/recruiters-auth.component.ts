import { Component, OnInit } from '@angular/core';

import { SiteService } from './../../../../services/site.service';

@Component({
    selector: 'app-recruiters-auth',
    templateUrl: './recruiters-auth.component.html',
    styleUrls: ['./recruiters-auth.component.scss']
})
export class RecruitersAuthComponent implements OnInit {
    logoUrl = '';
    constructor(private siteService: SiteService) {
        this.siteService.loadTheme();
        this.siteService.getTheme().subscribe((theme: { color: string; logo_url: string }) => {
            this.logoUrl = theme.logo_url;
        });
    }

    ngOnInit() {}
}
