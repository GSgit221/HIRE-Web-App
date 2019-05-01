import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgDragDropModule } from 'ng-drag-drop';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { CookieService } from 'ngx-cookie-service';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';

import { HireEditorModule } from '../../libs/editor/editor.module';
import { GetFirstLetterPipe } from '../../pipes/get-first-letter.pipe';
import { DisableControlDirective } from './../../directives/disable-control.directive';
import { DragEnterDirective } from './../../directives/drag-enter.directive';
import { ToggleDetailsDirective } from './../../directives/toggle-details.directive';
import { AuthGuard } from './../../guards/auth.guard';
import { UnauthGuard } from './../../guards/unauth.guard';
import { httpInterceptorProviders } from './../../http-interceptors';
import { AccountTypePipe } from './../../pipes/account-type.pipe';
import { InitialsPipe } from './../../pipes/initials.pipe';
import { SortByDatePipe } from './../../pipes/sort-by-date.pipe';
import { SortByOrderPipe } from './../../pipes/sort-by-order.pipe';
import { UploadFileNamePipe } from './../../pipes/upload-file-name.pipe';
import { AuthService } from './../auth/auth.service';
import { RecruiterRoleGuard } from './../recruiters/guards/recruiter-role.guard';
import { CandidateFitCircleComponent } from './candidate-fit-circle/candidate-fit-circle.component';
import { FileTypeComponent } from './file-type/file-type.component';
import { InputPhoneComponent } from './input-phone/input-phone.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
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
        GetFirstLetterPipe,
        InitialsPipe,
        AccountTypePipe,
        SortByDatePipe,
        SortByOrderPipe,
        UploadFileNamePipe,
        DisableControlDirective,
        DragEnterDirective,
        ToggleDetailsDirective,
        ListFilterComponent,
        InputPhoneComponent
    ],
    providers: [AuthService, httpInterceptorProviders, AuthGuard, UnauthGuard, RecruiterRoleGuard, CookieService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CreditCardDirectivesModule,
        NgDragDropModule.forRoot(),
        AutoSizeInputModule,
        GooglePlaceModule,
        InfiniteScrollModule,
        CheckboxModule,
        DropdownModule,
        EditorModule,
        HireEditorModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        PanelModule,
        PanelMenuModule,
        SelectButtonModule,
        SliderModule,
        TooltipModule,
        ChipsModule,
        AngularSvgIconModule,
        Ng2TelInputModule,
        AutoCompleteModule,
        RadioButtonModule,
        CalendarModule
    ],
    exports: [
        LoaderComponent,
        CandidateFitCircleComponent,
        FileTypeComponent,
        MultiSelectComponent,
        ProgressCircleComponent,
        ResumeFileTypeComponent,
        ListFilterComponent,
        InputPhoneComponent,
        GetFirstLetterPipe,
        InitialsPipe,
        AccountTypePipe,
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
        CreditCardDirectivesModule,
        NgDragDropModule,
        AutoSizeInputModule,
        GooglePlaceModule,
        InfiniteScrollModule,
        CheckboxModule,
        DropdownModule,
        EditorModule,
        HireEditorModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        PanelModule,
        PanelMenuModule,
        SelectButtonModule,
        SliderModule,
        TooltipModule,
        ChipsModule,
        AngularSvgIconModule,
        Ng2TelInputModule,
        AutoCompleteModule,
        RadioButtonModule,
        CalendarModule
    ]
})
export class SharedModule {}
