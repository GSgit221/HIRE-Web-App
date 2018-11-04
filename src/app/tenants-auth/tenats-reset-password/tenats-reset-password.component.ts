import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-tenats-reset-password',
    templateUrl: './tenats-reset-password.component.html',
    styleUrls: ['./tenats-reset-password.component.scss']
})
export class TenatsResetPasswordComponent implements OnInit {
    resetForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.resetForm = this.fb.group({
            email: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    onReset(event: Event) {

    }

}
