import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appToggleDetails]'
})
export class ToggleDetailsDirective {
    @HostBinding('class.active') active = false;
    constructor() {}

    @HostListener('click', ['$event'])
    click(eventData: Event) {
        (eventData.target as HTMLInputElement).closest('.wrap-block').classList.toggle('hide');
        this.active = !this.active;
        console.log(this.active);
    }
}
