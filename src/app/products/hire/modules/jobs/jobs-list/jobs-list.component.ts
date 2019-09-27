import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromUserSelectors from '@app/store/selectors';
import { select, Store } from '@ngrx/store';
import * as closest from 'closest';

import * as fromStore from '../store';
import * as fromStoreActions from '../store/actions/jobs.action';
import * as fromStoreSelectors from '../store/selectors/jobs.selector';
import { Job, User } from './../../../../../core/models';
import { JobService, UserService, UtilitiesService } from './../../../../../core/services';

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
    selectedAll = false;
    selectedItems = 0;
    user: User;
    users: User[] = [];
    uploadJobSpecMode = false;
    droppedFiles: File[] = [];
    countries: any[] = [];
    baseUrl: string;

    ownerFilters = [
        {
            label: 'My Jobs',
            value: 'mine',
            capitalize: true
        },
        {
            label: 'All Jobs',
            value: 'all',
            capitalize: true
        }
    ];
    ownerFilter = 'all';

    constructor(
        private router: Router,
        private jobService: JobService,
        private userService: UserService,
        private utilities: UtilitiesService,
        private store: Store<fromStore.JobsState>
    ) {
        this.baseUrl = this.utilities.getHireBaseUrl();
        this.utilities.getCountries().subscribe((countries: Array<{ name: string; code: string }>) => {
            this.countries = countries;
        });
        this.store.pipe(select(fromStoreSelectors.getAllJobs)).subscribe((jobs: Job[]) => {
            this.list = jobs.map((item) => ({ ...item }));
            this.filteredList = this.list.slice(0);
            this.calculateSelectedItems();
            this.contentLoading = false;
        });
        this.store.pipe(select(fromStoreSelectors.getJobsLoaded)).subscribe((loaded: boolean) => {
            if (loaded) {
                this.contentLoading = true;
                this.store.dispatch(new fromStoreActions.LoadJobs());
            }
        });

        this.store.pipe(select(fromUserSelectors.getUserEntity)).subscribe((user: User) => {
            this.user = user;
            if (this.isAdmin) this.ownerFilter = 'mine';

            this.store.pipe(select(fromUserSelectors.getUsersEntities)).subscribe((users: User[]) => {
                this.users = users || [];
                const filterRoles = ['admin', 'account_owner', 'hiring_manager', 'recruiter'];
                const filterIDs = [this.user.id, this.ownerFilters.map(({ value }) => value)];
                this.ownerFilters.push(
                    ...users
                        .filter(
                            ({ id, role, activated }) =>
                                activated && filterRoles.includes(role) && user.id !== id && !filterIDs.includes(id)
                        )
                        .map(({ id, first_name, last_name, email }) => ({
                            label: first_name ? `${first_name} ${last_name}` : email,
                            value: id,
                            capitalize: !!first_name
                        }))
                );
                console.log(this.ownerFilters);
            });
        });
    }

    ngOnInit() {}

    get isAdmin() {
        return (
            this.user &&
            (this.user.role === 'account_owner' || this.user.role === 'admin' || this.user.type === 'superadmin')
        );
    }

    get ownerFilterLabel(): string {
        if (!this.isAdmin) return 'My Jobs';
        const match = this.ownerFilters.find(({ value }) => value === this.ownerFilter);
        if (match) return match.label;
        return 'All Jobs';
    }

    get owners(): any {
        if (this.isAdmin) return this.ownerFilters;
        return null;
    }

    onItemClick(event, item) {
        event.preventDefault();
        const escapeDD = closest(event.target, '[data-escape-click]');
        if (escapeDD) {
            // console.log('DO NOTHING');
        } else {
            // console.log('REDIRECT');
            this.router.navigate([`${this.baseUrl}/jobs/${item.id}`]);
        }
    }

    onJobStatusChange(event, item) {
        const status = event ? 'LIVE' : 'BUILD';
        this.jobService.updateJob(item.id, { status }).subscribe(() => {
            console.log(`Job <${item.id}> status updated`);
            item.status = status;
        });
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.filterByOwner.forEach((item) => (item.selected = true));
        } else {
            this.filterByOwner.forEach((item) => (item.selected = false));
        }
    }

    onItemSeletectedChange() {
        this.calculateSelectedItems();
    }

    calculateSelectedItems() {
        this.selectedAll = this.filterByOwner.length && this.filterByOwner.every((item) => item.selected);
    }

    getHm(id: string) {
        return this.users.find((user: User) => user.id === id) || null;
    }

    onItemsBulkRemove() {
        this.contentLoading = true;
        const itemsToRemove = this.filterByOwner.filter((item) => item.selected).map((item) => item.id);
        this.store.dispatch(new fromStoreActions.BulkDeleteJobs(itemsToRemove));
        this.store.dispatch(new fromStoreActions.LoadJobs());
    }

    onFinishedJobUpload(event) {
        this.contentLoading = true;
        this.store.dispatch(new fromStoreActions.LoadJobs());
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
        this.calculateSelectedItems();
    }

    onOwnerFilterChange(value: string) {
        this.ownerFilter = value;
        this.calculateSelectedItems();
    }

    get filterByOwner(): any[] {
        if (this.ownerFilter === 'all') return this.filteredList;
        if (this.ownerFilter === 'mine') return this.filteredList.filter(({ owner }) => owner === this.user.id);
        return this.filteredList.filter(
            ({ owner, recuriters, hiring_managers }) =>
                owner === this.ownerFilter ||
                (recuriters || []).includes(this.ownerFilter) ||
                hiring_managers.includes(this.ownerFilter)
        );
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
