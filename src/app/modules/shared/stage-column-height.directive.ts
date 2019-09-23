import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appStageColumnHeight]'
})
export class StageColumnHeightDirective implements AfterViewInit, OnDestroy {
    w: any = window;
    constructor(private el: ElementRef, @Inject(DOCUMENT) document) {
        this.setHeight = this.setHeight.bind(this);
    }

    setHeight() {
        const windowHeight = this.w.innerHeight;
        const padding = 30;
        const headerHeight = document.querySelector('.container .header-block').clientHeight;
        const separatorHeight = 21;
        const stageHeaderHeight = document.querySelector('.container .stage-header').clientHeight + 12;
        const heightAvailable = windowHeight - padding - headerHeight - separatorHeight - stageHeaderHeight - 48;
        const stageContenBlocks = Array.from(document.querySelectorAll('.container .stage-content'));
        stageContenBlocks.forEach((block: HTMLElement) => {
            block.style.maxHeight = heightAvailable + 'px';
        });
    }

    ngAfterViewInit() {
        this.setHeight();
        this.w.addEventListener('resize', this.setHeight, false);
    }

    ngOnDestroy(): void {
        this.w.removeEventListener('resize', this.setHeight, false);
    }
}
