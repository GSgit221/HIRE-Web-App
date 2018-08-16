import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    msgs: Message[] = [];
    resetSuccess = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.resetForm = this.fb.group({
            email: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    onReset(event) {
        event.preventDefault();
        if (!this.resetForm.valid) {
            this.markFormGroupTouched(this.resetForm);
            return;
        }
        this.authService.resetPassword(this.resetForm.value.email)
            .subscribe(
                response => {
                    this.msgs = [];
                    this.resetSuccess = true;
                    setTimeout(() => this.router.navigateByUrl('/signin'), 5000);
                },
                response => {
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                }
            );
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }


}
