import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
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
import { QuestionTypePipe } from './../../products/hire/modules/settings/questionnaires/pipes/question-type.pipe';

import { GetFirstLetterPipe } from '../../core/pipes/get-first-letter.pipe';
import { HireEditorModule } from '../../libs/editor/editor.module';
import { DisableControlDirective } from './../../core/directives/disable-control.directive';
import { DragEnterDirective } from './../../core/directives/drag-enter.directive';
import { ToggleDetailsDirective } from './../../core/directives/toggle-details.directive';
import { httpInterceptorProviders } from './../../core/interceptors';
import { AccountTypePipe } from './../../core/pipes/account-type.pipe';
import { InitialsPipe } from './../../core/pipes/initials.pipe';
import { SortByDatePipe } from './../../core/pipes/sort-by-date.pipe';
import { SortByOrderPipe } from './../../core/pipes/sort-by-order.pipe';
import { UploadFileNamePipe } from './../../core/pipes/upload-file-name.pipe';
import { AuthService } from './../auth/auth.service';
import { CandidateFitCircleComponent } from './candidate-fit-circle/candidate-fit-circle.component';
import { FileTypeComponent } from './file-type/file-type.component';
import { InputPhoneComponent } from './input-phone/input-phone.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { LoaderComponent } from './loader/loader.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { ResumeFileTypeComponent } from './resume-file-type/resume-file-type.component';
import { StageColumnHeightDirective } from './stage-column-height.directive';

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
        QuestionTypePipe,
        SortByDatePipe,
        SortByOrderPipe,
        UploadFileNamePipe,
        DisableControlDirective,
        DragEnterDirective,
        ToggleDetailsDirective,
        ListFilterComponent,
        InputPhoneComponent,
        StageColumnHeightDirective
    ],
    providers: [AuthService, httpInterceptorProviders, CookieService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CreditCardDirectivesModule,
        NgDragDropModule.forRoot(),
        DragDropModule,
        AutoSizeInputModule,
        GooglePlaceModule,
        InfiniteScrollModule,
        CheckboxModule,
        DialogModule,
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
        CalendarModule,
        ChartModule
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
        QuestionTypePipe,
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
        DragDropModule,
        AutoSizeInputModule,
        GooglePlaceModule,
        InfiniteScrollModule,
        CheckboxModule,
        DialogModule,
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
        CalendarModule,
        ChartModule,
        StageColumnHeightDirective
    ]
})
export class SharedModule {}
