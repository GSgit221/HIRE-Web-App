import { SelectItem } from 'primeng/api';
import * as closest from 'closest';
import { Job } from './../../models/job';
import { Component, OnInit } from '@angular/core';

import { Router } from '../../../../node_modules/@angular/router';
import { JobService } from './../../services/job.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
    contentLoading = true;
    list = [];
    statusOptions: SelectItem[];
    selectedAll = false;
    selectedItems = 0;
    users: User[] = [];

    constructor(private router: Router, private jobService: JobService) {
        this.jobService.getAll()
            .subscribe((jobs: Job[]) => {
                this.list = jobs;
                this.contentLoading = false;
            });

        this.jobService.getUsers().subscribe((users: User[]) => {
            this.users = users || [];
            console.log(this.users);
        });


        this.statusOptions = [
            { label: 'LIVE', value: 'LIVE' },
            { label: 'BUILD', value: 'BUILD' }
        ];
    }

    ngOnInit() {

    }

    onItemClick(event, item) {
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            console.log('DO NOTHING');
        } else {
            console.log('REDIRECT');
            this.router.navigate([`/dashboard/jobs/${item.id}`]);
        }
    }

    onJobStatusChange(item) {
        this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }


    onSelectAllChange() {
        if (this.selectedAll) {
            this.list.forEach(item => item.selected = true);
        } else {
            this.list.forEach(item => item.selected = false);
        }
        this.calculateSelectedItems();
    }

    onItemSeletectedChange() {
        this.calculateSelectedItems();
    }

    private calculateSelectedItems() {
        this.selectedItems = this.list.filter(item => item.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    getHm(id: string) {
        return this.users.find((user: User) => user.user_id === id) || null;
    }

    onItemsBulkRemove() {
        this.contentLoading = true;
        const itemsToRemove = this.list.filter(item => item.selected).map(item => item.id);
        console.log(itemsToRemove);
        this.jobService.bulkDeleteJobs(itemsToRemove)
            .subscribe(() => {
                this.jobService.getAll()
                    .subscribe((jobs: Job[]) => {
                        this.list = jobs;
                        this.contentLoading = false;
                        this.calculateSelectedItems();
                    });
            });
    }
}
