import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UtilitiesService } from './../../../services/utilities.service';

import { JobService } from '../../../services/job.service';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, AfterViewInit {
    candidates;
    filteredCandidates = [];
    contentLoading = true;
    chunkRequestInProgress = false;
    lastCandidate = {
        first_name: '',
        last_name: ''
    };
    candidatesCompleted = false;
    selectedAll = false;
    amountCandidates;
    selectedItems = 0;
    filter = [];
    countries: any[] = [];
    educationOptions = [
        { label: 'High School or Equivalent', value: 'school', weight: 1 },
        { label: 'Certification', value: 'certification', weight: 2 },
        { label: 'Vocational', value: 'vocational', weight: 3 },
        { label: 'Associate Degree', value: 'associate', weight: 4 },
        { label: 'Bachelors Degree', value: 'bachelors', weight: 5 },
        { label: 'Masters Degree', value: 'masters', weight: 6 },
        { label: 'Professional', value: 'professional', weight: 7 }
    ];

    constructor(private jobService: JobService, private utilities: UtilitiesService) {
        this.utilities.getCountries().subscribe((countries: Array<{ name: string; code: string }>) => {
            this.countries = countries;
        });

        this.chunkRequestInProgress = true;
        this.jobService.getCandidatesChunk('first', 100).subscribe(
            (candidates) => {
                this.candidates = candidates || [];
                this.filteredCandidates = this.candidates.slice(0);
                this.contentLoading = false;
                this.lastCandidate = {
                    first_name: this.candidates[this.candidates.length - 1].first_name,
                    last_name: this.candidates[this.candidates.length - 1].last_name
                };
                this.jobService.getCandidatesAmount().subscribe((amount: number) => {
                    this.amountCandidates = amount;
                });
                this.chunkRequestInProgress = false;
            },
            (errorResponse) => {
                console.error(errorResponse);
                this.chunkRequestInProgress = false;
            }
        );
    }

    ngOnInit() {}

    getCandidatesChunk() {
        console.log('getCandidateChunk', this.chunkRequestInProgress);
        if (this.lastCandidate.first_name && this.lastCandidate.first_name.length && !this.chunkRequestInProgress) {
            this.chunkRequestInProgress = true;
            this.jobService.getCandidatesChunk(this.lastCandidate.first_name, 100).subscribe(
                (candidates: any) => {
                    if (candidates.length === 0) {
                        this.candidatesCompleted = true;
                    }
                    candidates.forEach((item) => {
                        if (this.selectedAll) {
                            item.checked = true;
                        }
                        this.candidates.push(item);
                    });
                    this.lastCandidate = {
                        first_name: this.candidates[this.candidates.length - 1].first_name,
                        last_name: this.candidates[this.candidates.length - 1].last_name
                    };
                    this.filterCandidates();
                    this.chunkRequestInProgress = false;
                },
                (errorResponse) => {
                    console.error(errorResponse);
                    this.chunkRequestInProgress = false;
                }
            );
        }
    }

    onScroll() {
        console.log('onScroll => getCandidatesChunk');
        setTimeout(() => {
            this.getCandidatesChunk();
        }, 1000);
    }

    ngAfterViewInit() {}

    onItemsBulkRemove() {}

    onItemClick(event, item) {}

    onItemSeletectedChange($event: Event, index: number) {
        this.candidates[index].checked = this.candidates[index].checked ? true : false;
    }

    onSelectAllChange() {
        if (this.selectedAll) {
            this.candidates.forEach((item) => {
                item.checked = true;
            });
        } else {
            this.candidates.forEach((item) => {
                item.checked = false;
            });
        }
    }

    onFilterChanges(value) {
        console.log('onFilterChanges', value);
        this.filter = value;
        this.filterCandidates();
    }

    filterCandidates() {
        if (this.filter.length) {
            console.log('=> Filtering results');
            // Filter candidates
            this.filteredCandidates = this.candidates.slice(0).filter((c) => {
                const filterValues = [];
                this.filter.forEach((f) => {
                    // City filter
                    if (f.type === 'city') {
                        const filterCities = f.value.map((item) => item.toLowerCase());
                        const candidateCity = c.location_city ? c.location_city.toLowerCase() : 'unspecified';
                        if (filterCities.indexOf(candidateCity) === -1) {
                            // console.log('filtered', c.id, candidateCity);
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

                        let candidateCountry = 'unspecified';
                        if (c.location_country) {
                            const listCountry = this.countries.find(
                                (countryItem) =>
                                    countryItem.name.toLowerCase() === c.location_country.trim().toLowerCase() ||
                                    countryItem.code.toLowerCase() === c.location_country.trim().toLowerCase()
                            );
                            if (listCountry) {
                                candidateCountry = listCountry.name.toLowerCase();
                            }
                        }

                        if (filterCountries.indexOf(candidateCountry) === -1) {
                            filterValues.push(false);
                        } else {
                            filterValues.push(true);
                        }
                    }

                    // Education filter
                    if (f.type === 'education') {
                        const filterVal = f.value;
                        const candidateEducation = c.education_history
                            ? c.education_history.map((ed) => ({
                                  major: ed.area_of_study || 'unspecified',
                                  school: ed.school || 'unspecified',
                                  degree: ed.degree || 'unspecified'
                              }))
                            : null;

                        const foundFilterValues = candidateEducation.filter((ce) => {
                            let valid = true;
                            if (filterVal.degree && ce.degree.indexOf(filterVal.degree) === -1) {
                                valid = false;
                            }
                            if (
                                filterVal.major &&
                                ce.major.toLowerCase().indexOf(filterVal.major.toLowerCase()) === -1
                            ) {
                                valid = false;
                            }
                            if (
                                filterVal.school &&
                                ce.school.toLowerCase().indexOf(filterVal.school.toLowerCase()) === -1
                            ) {
                                valid = false;
                            }
                        });
                        if (!foundFilterValues.length) {
                            filterValues.push(false);
                        } else {
                            filterValues.push(true);
                        }
                    }

                    // Employers
                    if (f.type === 'employers') {
                        const filterVal = f.value.map((v) => v.toLowerCase());

                        if (c.employment_history) {
                            const employers = c.employment_history.map(
                                (emp) => `${emp.title.toLowerCase()}, ${emp.company.toLowerCase()}`
                            );
                            const foundFilterValues = filterVal.some((fv) => {
                                return employers.find((emp) => emp.indexOf(fv) !== -1);
                            });
                            filterValues.push(foundFilterValues);
                        } else {
                            filterValues.push(false);
                        }
                    }

                    // experience
                    if (f.type === 'experience') {
                        const filterVal = f.value;
                        if (c.years_of_experience) {
                            if (filterVal.min && filterVal.max) {
                                if (c.years_of_experience >= filterVal.min && c.years_of_experience <= filterVal.max) {
                                    filterValues.push(true);
                                } else {
                                    filterValues.push(false);
                                }
                            } else if (!filterVal.min && filterVal.max) {
                                if (c.years_of_experience <= filterVal.max) {
                                    filterValues.push(true);
                                } else {
                                    filterValues.push(false);
                                }
                            } else if (filterVal.min && !filterVal.max) {
                                if (c.years_of_experience >= filterVal.min) {
                                    filterValues.push(true);
                                } else {
                                    filterValues.push(false);
                                }
                            }
                        } else {
                            filterValues.push(false);
                        }
                    }

                    // skills
                    if (f.type === 'skills') {
                        const filterVal = f.value.name.toLowerCase().trim();
                        if (c.skills && c.skills.length) {
                            if (c.skills.map((s) => s.toLowerCase()).indexOf(filterVal) !== -1) {
                                filterValues.push(true);
                            } else {
                                filterValues.push(false);
                            }
                        } else {
                            filterValues.push(false);
                        }
                    }
                });

                // console.log('FILTER VALUES:', filterValues);
                return filterValues.every((fv) => fv);
            });

            console.log('🦹🏻‍♂️ Filtered results:', this.filteredCandidates.length);
            if (
                this.filteredCandidates.length &&
                this.filteredCandidates.length < 10 &&
                !this.candidatesCompleted &&
                this.utilities.isBottomOfPage()
            ) {
                console.log('... Get new chunk', this.filteredCandidates.length);
                setTimeout(() => this.getCandidatesChunk(), 2000);
            }
        } else {
            console.log('=> Show full list');
            // Show full list
            this.filteredCandidates = this.candidates.slice(0);
        }
    }
}
