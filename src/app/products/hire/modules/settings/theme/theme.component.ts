import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { FormHelperService } from './../../../../../core/services/form-helper.service';
import { ThemeService } from './../../../../../core/services/theme.service';
import { UtilitiesService } from './../../../../../core/services/utilities.service';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
    themeForm: FormGroup;
    contentLoading = true;
    msgs: Message[] = [];
    colors: string[] = [
        '#44DB5E',
        '#5AC8FA',
        '#FFCC00',
        '#FF9500',
        '#FF2D55',
        '#4CD964',
        '#FF3B30',
        '#BD10E0',
        '#43a547',
        '#c7d732',
        '#e3b505',
        '#ff8d02',
        '#6e4b3f',
        '#949394',
        '#557280'
    ];
    uploadQueue: any[] = [];
    uploadError: string;
    supportedFileTypes: string[] = ['image/jpeg', 'image/png', 'image/gif']; // 'image/svg+xml'
    uploadItem: any;

    constructor(
        private fb: FormBuilder,
        private formHelper: FormHelperService,
        private themeService: ThemeService,
        private utilities: UtilitiesService
    ) {
        this.themeForm = this.fb.group({ color: ['#44DB5E', Validators.required], logo_url: [''] });
        this.themeService.getTheme().subscribe(
            (response) => {
                console.log(response);
                this.initForm(response);
                this.contentLoading = false;
            },
            (errorResponse) => {
                console.error(errorResponse);
                this.contentLoading = false;
            }
        );
    }

    ngOnInit() {}

    initForm(data) {
        this.themeForm = this.fb.group({
            color: [data.color || '#44DB5E', Validators.required],
            logo_url: [data.logo_url || '']
        });
    }

    get color() {
        return this.themeForm.get('color').value;
    }

    set color(value: string) {
        this.themeForm.get('color').setValue(value);
    }

    get logoUrl() {
        return this.themeForm.get('logo_url').value;
    }

    set logoUrl(value: string) {
        this.themeForm.get('logo_url').setValue(value);
    }

    onSave() {
        const form = this.themeForm;
        if (!form.valid) {
            this.formHelper.markFormGroupTouched(form);
            console.log('FORM IS INVALID:', form);
            return;
        }
        // VALID
        console.log('FORM IS VALID:', form.value);
        this.contentLoading = true;
        const formValue = form.value;
        this.themeService.saveTheme(formValue).subscribe(
            (response) => {
                console.log(response);
                this.contentLoading = false;
            },
            (errorResponse) => {
                console.error(errorResponse);
                this.contentLoading = false;
            }
        );
    }

    private validateFileType(file: File, types: string[]) {
        return types.indexOf(file.type) !== -1;
    }

    onDropFile(files) {
        if (files && files.length) {
            const file = files[0];
            console.log('📥 onDropFile', file);
            if (this.validateFileType(file, this.supportedFileTypes)) {
                console.log('Need to upload');
                this.uploadItem = { file, uploadStarted: false, uploadFinished: false, progress: 0, success: false };
                this.uploadFile(this.uploadItem);
            } else {
                this.uploadError = 'Only supported formats are: png, jpg, gif';
                setTimeout(() => (this.uploadError = null), 10000);
            }
        }
    }

    uploadFile(item) {
        this.uploadError = null;
        this.utilities
            .readAndResizeImage(item.file, 800, 800)
            .then((fileValue: any) => {
                item.uploadStarted = true;
                const uploadProgressInterval = setInterval(() => {
                    item.progress = item.progress + 1 < 100 ? item.progress + 1 : 90;
                }, 400);
                this.themeService.uploadLogo({ logo: fileValue }).subscribe(
                    (response: HttpResponse<any>) => {
                        console.log('📬 Uploaded:', response);
                        item.progress = 100;
                        item.uploadFinished = true;
                        item.success = true;
                        clearInterval(uploadProgressInterval);
                        setTimeout(() => {
                            item.fadeout = true;
                        }, 2000);

                        // Remove from upload queue
                        setTimeout(() => {
                            this.uploadItem = null;
                            this.logoUrl = fileValue.data;
                        }, 1000);
                    },
                    (error) => {
                        console.error(error);
                        this.uploadError =
                            error && error.error && error.error.message ? error.error.error.message : 'Error';
                        setTimeout(() => (this.uploadError = null), 10000);
                        item.progress = 100;
                        item.uploadFinished = true;
                        this.uploadItem = null;
                        clearInterval(uploadProgressInterval);
                    }
                );
            })
            .catch((error) => {
                console.error(error);
                console.error('Error reading uploaded file');
            });
    }
}
