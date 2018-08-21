import { User } from './../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    user$: Observable<Object>;
    settingsOpened = true;


    constructor(private userService: UserService) { }

    ngOnInit() {
        this.user$ = this.userService.me().pipe(map((user: User) => {
            user.initials = user.first_name.charAt(0).toUpperCase();
            if (user.last_name) {
                user.initials += user.last_name.charAt(0).toUpperCase();
            }
            return user;
        }));
    }

    onToggleOcItem(event) {
        event.preventDefault();
        console.log('clicked');
        this.settingsOpened = !this.settingsOpened;
    }

}
