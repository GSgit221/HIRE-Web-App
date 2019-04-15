import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateItemComponent } from './email-template-item.component';

describe('EmailTemplateItemComponent', () => {
    let component: EmailTemplateItemComponent;
    let fixture: ComponentFixture<EmailTemplateItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmailTemplateItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailTemplateItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
