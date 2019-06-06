import { Component, OnInit } from '@angular/core';
import * as closest from 'closest';
import { SelectItem } from 'primeng/api';
import { UtilitiesService } from './../../../../../core/services/utilities.service';

import { Router } from '@angular/router';
import { User } from '../../../../../core/models/user';
import { Job } from './../../../../../core/models/job';
import { JobService } from './../../../../../core/services/job.service';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
    contentLoading = true;
    list = [];
    filteredList = [];
    filter = [];
    statusOptions: SelectItem[];
    selectedAll = false;
    selectedItems = 0;
    users: User[] = [];
    uploadJobSpecMode = false;
    droppedFiles: File[] = [];
    countries: any[] = [];
    baseUrl: string;

    constructor(private router: Router, private jobService: JobService, private utilities: UtilitiesService) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.utilities.getCountries().subscribe((countries: Array<{ name: string; code: string }>) => {
            this.countries = countries;
        });
        this.jobService.getAll().subscribe((jobs: Job[]) => {
            this.list = jobs.map((job) => {
                if (job.location && job.location.length) {
                    job.location_city = job.location.split(',')[0].trim();
                    job.location_country = job.location
                        .split(',')
                        .pop()
                        .trim();
                }
                return job;
            });
            this.filteredList = this.list.slice(0);
            this.contentLoading = false;
        });

        this.jobService.getUsers().subscribe((users: User[]) => {
            this.users = users || [];
        });

        this.statusOptions = [{ label: 'LIVE', value: 'LIVE' }, { label: 'BUILD', value: 'BUILD' }];
    }

    ngOnInit() {}

    onItemClick(event, item) {
        event.preventDefault();
        const target = event.target;
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            // console.log('DO NOTHING');
        } else {
            // console.log('REDIRECT');
            this.router.navigate([`${this.baseUrl}/jobs/${item.id}`]);
        }
    }

    onJobStatusChange(item) {
        this.jobService.updateJob(item.id, { status: item.status }).subscribe(() => console.log('updated'));
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.filteredList.forEach((item) => (item.selected = true));
        } else {
            this.filteredList.forEach((item) => (item.selected = false));
        }
        this.calculateSelectedItems();
    }

    onItemSeletectedChange() {
        this.calculateSelectedItems();
    }

    private calculateSelectedItems() {
        this.selectedItems = this.filteredList.filter((item) => item.selected).length;
        if (!this.selectedItems) {
            this.selectedAll = false;
        }
    }

    getHm(id: string) {
        return this.users.find((user: User) => user.id === id) || null;
    }

    onItemsBulkRemove() {
        this.contentLoading = true;
        const itemsToRemove = this.filteredList.filter((item) => item.selected).map((item) => item.id);
        this.jobService.bulkDeleteJobs(itemsToRemove).subscribe(() => {
            this.jobService.getAll().subscribe((jobs: Job[]) => {
                this.list = jobs;
                this.filteredList = this.list.slice(0);
                this.contentLoading = false;
                this.calculateSelectedItems();
            });
        });
    }

    onFinishedJobUpload(event) {
        this.contentLoading = true;
        this.jobService.getAll().subscribe((jobs: Job[]) => {
            this.list = jobs;
            this.filteredList = this.list.slice(0);
            this.contentLoading = false;
        });
        this.uploadJobSpecMode = false;
    }

    onDropFile(event) {
        const files = event.target.files || event.dataTransfer.files;
        console.log('📥 onDropFiles', files);
        this.droppedFiles = files;
        this.uploadJobSpecMode = true;
    }

    onFilterChanges(value) {
        console.log('onFilterChanges', value);
        this.filter = value;
        this.filterItems();
    }

    filterItems() {
        if (this.filter.length) {
            console.log('=> Filtering results');
            // Filter jobs
            this.filteredList = this.list.slice(0).filter((job) => {
                const filterValues = [];
                this.filter.forEach((f) => {
                    // City filter
                    if (f.type === 'city') {
                        const filterCities = f.value.map((item) => item.toLowerCase());
                        const jobCity = job.location_city ? job.location_city.toLowerCase() : 'unspecified';
                        if (filterCities.indexOf(jobCity) === -1) {
                            filterValues.push(false);
                        } else {
                            filterValues.push(true);
                        }
                    }
                    // Country filter
                    if (f.type === 'country') {
                        const filterCountries = f.value
                            .map((item) => {
                                const country = this.countries.find(
                                    (countryItem) =>
                                        countryItem.name.toLowerCase() === item.trim().toLowerCase() ||
                                        countryItem.code.toLowerCase() === item.trim().toLowerCase()
                                );

                                return country ? country.name.toLowerCase() : null;
                            })
                            .filter((val) => val);

                        let jobCountry = 'unspecified';
                        if (job.location_country) {
                            let jC = job.location_country.trim().toLowerCase();
                            if (jC === 'USA') {
                                jC = 'US';
                            }
                            const listCountry = this.countries.find(
                                (countryItem) =>
                                    countryItem.name.toLowerCase() === jC || countryItem.code.toLowerCase() === jC
                            );
                            if (listCountry) {
                                jobCountry = listCountry.name.toLowerCase();
                            }
                        }

                        if (filterCountries.indexOf(jobCountry) === -1) {
                            filterValues.push(false);
                        } else {
                            filterValues.push(true);
                        }
                    }
                });

                // console.log('FILTER VALUES:', filterValues);
                return filterValues.every((fv) => fv);
            });

            console.log('🦹🏻‍♂️ Filtered results:', this.filteredList.length);
        } else {
            console.log('=> Show full list');
            // Show full list
            this.filteredList = this.list.slice(0);
        }
    }
}
