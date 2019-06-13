import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from './keys.pipe';
import { NgOtpInputComponent } from './ng-otp-input.component';

@NgModule({
    declarations: [KeysPipe, NgOtpInputComponent],
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
    exports: [NgOtpInputComponent, KeysPipe],
    providers: [KeysPipe]
})
export class NgOtpInputModule {}
