import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-tenats-signin',
    templateUrl: './tenats-signin.component.html',
    styleUrls: ['./tenats-signin.component.scss']
})
export class TenatsSigninComponent implements OnInit, AfterViewInit {
    signinForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.signinForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        console.log(this.signinForm);
    }

    onSignIn(event: Event) {

    }

}
