import {Component, OnInit, AfterViewInit } from '@angular/core';
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
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
    }

    onSignIn(event: Event) {
        console.log(this.signinForm.valid);
        console.log(this.signinForm.value);
    }

}
