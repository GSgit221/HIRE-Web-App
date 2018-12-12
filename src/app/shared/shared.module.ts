import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { NgDragDropModule } from 'ng-drag-drop';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { CookieService } from 'ngx-cookie-service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';

import { DisableControlDirective } from './../directives/disable-control.directive';
import { DragEnterDirective } from './../directives/drag-enter.directive';
import { ToggleDetailsDirective } from './../directives/toggle-details.directive';
import { AuthGuard } from './../guards/auth.guard';
import { httpInterceptorProviders } from './../http-interceptors';
import { AuthService } from './../modules/auth/auth.service';
import { GetFitstLetterPipe } from './../pipes/get-fitst-letter.pipe';
import { InitialsPipe } from './../pipes/initials.pipe';
import { SortByDatePipe } from './../pipes/sort-by-date.pipe';
import { SortByOrderPipe } from './../pipes/sort-by-order.pipe';
import { UploadFileNamePipe } from './../pipes/upload-file-name.pipe';
import { CandidateFitCircleComponent } from './candidate-fit-circle/candidate-fit-circle.component';
import { FileTypeComponent } from './file-type/file-type.component';
import { LoaderComponent } from './loader/loader.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { ResumeFileTypeComponent } from './resume-file-type/resume-file-type.component';

@NgModule({
    declarations: [
        LoaderComponent,
        CandidateFitCircleComponent,
        FileTypeComponent,
        MultiSelectComponent,
        ProgressCircleComponent,
        ResumeFileTypeComponent,
        GetFitstLetterPipe,
        InitialsPipe,
        SortByDatePipe,
        SortByOrderPipe,
        UploadFileNamePipe,
        DisableControlDirective,
        DragEnterDirective,
        ToggleDetailsDirective
    ],
    providers: [AuthService, httpInterceptorProviders, AuthGuard, CookieService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        AngularEditorModule,
        NgSelectModule,
        CreditCardDirectivesModule,
        NgDragDropModule.forRoot(),
        AutoSizeInputModule,
        GooglePlaceModule,
        InfiniteScrollModule,
        CheckboxModule,
        DropdownModule,
        EditorModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        PanelModule,
        PanelMenuModule,
        SelectButtonModule,
        SliderModule,
        TooltipModule
    ],
    exports: [
        LoaderComponent,
        CandidateFitCircleComponent,
        FileTypeComponent,
        MultiSelectComponent,
        ProgressCircleComponent,
        ResumeFileTypeComponent,
        GetFitstLetterPipe,
        InitialsPipe,
        SortByDatePipe,
        SortByOrderPipe,
        UploadFileNamePipe,
        DisableControlDirective,
        DragEnterDirective,
        ToggleDetailsDirective,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        AngularEditorModule,
        NgSelectModule,
        CreditCardDirectivesModule,
        NgDragDropModule,
        AutoSizeInputModule,
        GooglePlaceModule,
        InfiniteScrollModule,
        CheckboxModule,
        DropdownModule,
        EditorModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        PanelModule,
        PanelMenuModule,
        SelectButtonModule,
        SliderModule,
        TooltipModule
    ]
})
export class SharedModule {}
