import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemNewComponent } from './job-item-new.component';

describe('JobItemNewComponent', () => {
    let component: JobItemNewComponent;
    let fixture: ComponentFixture<JobItemNewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobItemNewComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobItemNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
