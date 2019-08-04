import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import * as closest from 'closest';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-list-filter',
    templateUrl: './list-filter.component.html',
    styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {
    view = 'list';
    filterVisible = false;
    @Input() allItemsText: string;
    @Input() allItems: any;
    @Input() availableFilters: string[] = [];
    filteredFilters: string[] = [];

    @Input() filter: any;
    @Output() filterChange = new EventEmitter<any>();
    @Output() ownerFilterChange = new EventEmitter<string>();
    search: string;

    defaultState: any = {
        city: [],
        country: [],
        employers: [],
        education: { level: null, major: null, school: null },
        experience: { min: null, max: null },
        skills: {
            name: null,
            mix_exp: null,
            max_exp: null,
            recently_used: false
        }
    };

    filtersObj: any = { ...this.defaultState };

    educationOptions = [
        { label: 'High School or Equivalent', value: 'school' },
        { label: 'Certification', value: 'certification' },
        { label: 'Vocational', value: 'vocational' },
        { label: 'Associate Degree', value: 'associate' },
        { label: 'Bachelors Degree', value: 'bachelors' },
        { label: 'Masters Degree', value: 'masters' },
        { label: 'Professional', value: 'professional' }
    ];

    yearsOptions = [
        { label: '1 year', value: 1 },
        { label: '2 years', value: 2 },
        { label: '3 years', value: 3 },
        { label: '4 years', value: 4 },
        { label: '5 years', value: 5 },
        { label: '6 years', value: 6 },
        { label: '7 years', value: 7 },
        { label: '8 years', value: 8 },
        { label: '9 years', value: 9 },
        { label: '10 year', value: 10 }
    ];

    @HostListener('document:click', ['$event'])
    clickout(event) {
        const isListChildClick = event.path.filter((el) => el.className === 'list-filter').length;
        if (!isListChildClick) {
            this.filterVisible = false;
        }
        // if (!this.elRef.nativeElement.children[0].contains(event.target)) {
        //     // this.filterVisible = false;
        // }
    }

    constructor(private elRef: ElementRef) {}

    ngOnInit() {
        this.filteredFilters = this.availableFilters;
    }

    onSearchKeyup(event) {
        this.filteredFilters =
            this.search && this.search.length
                ? this.availableFilters.filter((af) => af.indexOf(this.search.toLowerCase()) !== -1)
                : this.availableFilters;
    }

    onFilterItemSelect(event) {
        console.log('onFilterItemSelect', event);
        this.view = event;
    }

    onClearFilters() {
        this.view = 'category';
        this.search = '';
        this.filterVisible = !this.filterVisible;
        // this.filter = [];
        // this.filterVisible = false;
        // this.filtersObj = { ...this.defaultState };
        // this.filterChange.emit([]);
    }

    onFilterToggle(view = 'list') {
        console.log('onFilterToggle');
        this.view = view;
        this.search = '';
        this.filterVisible = !this.filterVisible;
    }

    onFilterEditDone() {
        console.log(this.filtersObj);
        this.transformFilters();
        this.view = 'list';
    }

    transformFilters() {
        // console.log(this.availableFilters);
        // console.log('TRANSFORM FILTERS:');
        this.filter = [];
        for (const key in this.filtersObj) {
            if (this.filtersObj.hasOwnProperty(key) && this.availableFilters.indexOf(key) !== -1) {
                const filterObj = this.filtersObj[key];
                switch (key) {
                    case 'city':
                    case 'country':
                    case 'employers':
                        if (filterObj.length) {
                            this.filter.push({
                                type: key,
                                presentedValue: filterObj.join(', '),
                                value: filterObj
                            });
                        }
                        break;
                    case 'education':
                        if (filterObj.level || filterObj.education || filterObj.school) {
                            this.filter.push({
                                type: key,
                                presentedValue: Object.values(filterObj)
                                    .filter((v) => v)
                                    .join(', '),
                                value: filterObj
                            });
                        }
                        break;
                    case 'experience':
                        if (filterObj.min || filterObj.max) {
                            let presentedValue;
                            if (filterObj.min && filterObj.max) {
                                presentedValue = `${filterObj.min} - ${filterObj.max} years`;
                            } else if (filterObj.min && !filterObj.max) {
                                presentedValue = `from ${filterObj.min} years`;
                            } else if (!filterObj.min && filterObj.max) {
                                presentedValue = `up to ${filterObj.min} years`;
                            }
                            this.filter.push({ type: key, presentedValue, value: filterObj });
                        }
                        break;

                    case 'skills':
                        if (filterObj.name) {
                            let presentedValue = filterObj.name;
                            if (filterObj.min_exp && filterObj.max_exp) {
                                presentedValue += `, ${filterObj.min_exp} - ${filterObj.max_exp} years of exp.`;
                            } else if (filterObj.min_exp && !filterObj.max_exp) {
                                presentedValue += `, from ${filterObj.min_exp} years of exp.`;
                            } else if (!filterObj.min_exp && filterObj.max_exp) {
                                presentedValue += `, up to ${filterObj.min_exp} years of exp.`;
                            }
                            if (filterObj.recently_used) {
                                presentedValue += ', recently used';
                            }
                            this.filter.push({
                                type: key,
                                presentedValue,
                                value: filterObj
                            });
                        }
                        break;
                }
            }
        }

        console.log('FILTER:');
        console.log(this.filter);
        this.filterChange.emit(this.filter);
    }

    onRemoveFromSelected(type) {
        console.log('onRemoveFromSelected', type);
        this.filter = this.filter.filter((f) => f.type !== type);
        if (this.filtersObj[type]) {
            this.filterChange.emit(this.filter);
            this.filtersObj[type] = this.defaultState[type];
        }
    }

    onOwnerFilterChange(value) {
        this.ownerFilterChange.emit(value);
        this.filterVisible = false;
    }
}
