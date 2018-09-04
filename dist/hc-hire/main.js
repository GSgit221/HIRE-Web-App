(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/reset-password/reset-password.component */ "./src/app/auth/reset-password/reset-password.component.ts");
/* harmony import */ var _auth_set_password_set_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/set-password/set-password.component */ "./src/app/auth/set-password/set-password.component.ts");
/* harmony import */ var _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/signin/signin.component */ "./src/app/auth/signin/signin.component.ts");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./guards/auth.guard */ "./src/app/guards/auth.guard.ts");
/* harmony import */ var _jobs_job_item_job_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./jobs/job-item/job-item.component */ "./src/app/jobs/job-item/job-item.component.ts");
/* harmony import */ var _jobs_jobs_list_jobs_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jobs/jobs-list/jobs-list.component */ "./src/app/jobs/jobs-list/jobs-list.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _people_people_list_people_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./people/people-list/people-list.component */ "./src/app/people/people-list/people-list.component.ts");
/* harmony import */ var _settings_email_templates_email_templates_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./settings/email-templates/email-templates.component */ "./src/app/settings/email-templates/email-templates.component.ts");
/* harmony import */ var _settings_integrations_integrations_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./settings/integrations/integrations.component */ "./src/app/settings/integrations/integrations.component.ts");
/* harmony import */ var _settings_questions_questions_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./settings/questions/questions.component */ "./src/app/settings/questions/questions.component.ts");
/* harmony import */ var _settings_scorecards_scorecards_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./settings/scorecards/scorecards.component */ "./src/app/settings/scorecards/scorecards.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var appRoutes = [
    { path: 'signin', component: _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_4__["SigninComponent"] },
    { path: 'signup', component: _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_5__["SignupComponent"] },
    { path: 'reset-password', component: _auth_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_2__["ResetPasswordComponent"] },
    { path: 'set-password', component: _auth_set_password_set_password_component__WEBPACK_IMPORTED_MODULE_3__["SetPasswordComponent"] },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"],
        canActivateChild: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_7__["AuthGuard"]],
        children: [{
                path: '',
                pathMatch: 'full',
                redirectTo: 'jobs'
            }, {
                path: 'jobs',
                component: _jobs_jobs_list_jobs_list_component__WEBPACK_IMPORTED_MODULE_9__["JobsListComponent"]
            }, {
                path: 'jobs/:id',
                component: _jobs_job_item_job_item_component__WEBPACK_IMPORTED_MODULE_8__["JobItemComponent"]
            }, {
                path: 'people',
                component: _people_people_list_people_list_component__WEBPACK_IMPORTED_MODULE_11__["PeopleListComponent"]
            }, {
                path: 'questions',
                component: _settings_questions_questions_component__WEBPACK_IMPORTED_MODULE_14__["QuestionsComponent"]
            },
            {
                path: 'scorecards',
                component: _settings_scorecards_scorecards_component__WEBPACK_IMPORTED_MODULE_15__["ScorecardsComponent"]
            },
            {
                path: 'email-templates',
                component: _settings_email_templates_email_templates_component__WEBPACK_IMPORTED_MODULE_12__["EmailTemplatesComponent"]
            },
            {
                path: 'integrations',
                component: _settings_integrations_integrations_component__WEBPACK_IMPORTED_MODULE_13__["IntegrationsComponent"]
            }]
    },
    { path: 'not-found', component: _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__["PageNotFoundComponent"] },
    { path: '**', redirectTo: 'not-found' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRoutes, { enableTracing: true })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: provideConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provideConfig", function() { return provideConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _shared_loader_loader_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/loader/loader.component */ "./src/app/shared/loader/loader.component.ts");
/* harmony import */ var _resolvers_user_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers/user.resolver */ "./src/app/resolvers/user.resolver.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @kolkov/angular-editor */ "./node_modules/@kolkov/angular-editor/fesm5/kolkov-angular-editor.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/checkbox */ "./node_modules/primeng/checkbox.js");
/* harmony import */ var primeng_checkbox__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_checkbox__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dropdown */ "./node_modules/primeng/dropdown.js");
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_dropdown__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_message__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/message */ "./node_modules/primeng/message.js");
/* harmony import */ var primeng_message__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_message__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/messages */ "./node_modules/primeng/messages.js");
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(primeng_messages__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var primeng_selectbutton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/selectbutton */ "./node_modules/primeng/selectbutton.js");
/* harmony import */ var primeng_selectbutton__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(primeng_selectbutton__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var primeng_editor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/editor */ "./node_modules/primeng/editor.js");
/* harmony import */ var primeng_editor__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(primeng_editor__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var primeng_panelmenu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/panelmenu */ "./node_modules/primeng/panelmenu.js");
/* harmony import */ var primeng_panelmenu__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(primeng_panelmenu__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/panel */ "./node_modules/primeng/panel.js");
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(primeng_panel__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _auth_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./auth/reset-password/reset-password.component */ "./src/app/auth/reset-password/reset-password.component.ts");
/* harmony import */ var _auth_set_password_set_password_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./auth/set-password/set-password.component */ "./src/app/auth/set-password/set-password.component.ts");
/* harmony import */ var _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./auth/signin/signin.component */ "./src/app/auth/signin/signin.component.ts");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _dashboard_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./dashboard/sidebar/sidebar.component */ "./src/app/dashboard/sidebar/sidebar.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./guards/auth.guard */ "./src/app/guards/auth.guard.ts");
/* harmony import */ var _http_interceptors__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./http-interceptors */ "./src/app/http-interceptors/index.ts");
/* harmony import */ var _jobs_job_item_job_item_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./jobs/job-item/job-item.component */ "./src/app/jobs/job-item/job-item.component.ts");
/* harmony import */ var _jobs_jobs_list_jobs_list_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./jobs/jobs-list/jobs-list.component */ "./src/app/jobs/jobs-list/jobs-list.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _people_people_list_people_list_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./people/people-list/people-list.component */ "./src/app/people/people-list/people-list.component.ts");
/* harmony import */ var _settings_questions_questions_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./settings/questions/questions.component */ "./src/app/settings/questions/questions.component.ts");
/* harmony import */ var _settings_scorecards_scorecards_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./settings/scorecards/scorecards.component */ "./src/app/settings/scorecards/scorecards.component.ts");
/* harmony import */ var _settings_email_templates_email_templates_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./settings/email-templates/email-templates.component */ "./src/app/settings/email-templates/email-templates.component.ts");
/* harmony import */ var _settings_integrations_integrations_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./settings/integrations/integrations.component */ "./src/app/settings/integrations/integrations.component.ts");
/* harmony import */ var _directives_disable_control_directive__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./directives/disable-control.directive */ "./src/app/directives/disable-control.directive.ts");
/* harmony import */ var _jobs_job_item_unpublished_job_item_unpublished_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./jobs/job-item-unpublished/job-item-unpublished.component */ "./src/app/jobs/job-item-unpublished/job-item-unpublished.component.ts");
/* harmony import */ var _jobs_job_item_published_job_item_published_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./jobs/job-item-published/job-item-published.component */ "./src/app/jobs/job-item-published/job-item-published.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









































function provideConfig() {
    return new angularx_social_login__WEBPACK_IMPORTED_MODULE_9__["AuthServiceConfig"]([
        {
            id: angularx_social_login__WEBPACK_IMPORTED_MODULE_9__["GoogleLoginProvider"].PROVIDER_ID,
            provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_9__["GoogleLoginProvider"](_environments_environment__WEBPACK_IMPORTED_MODULE_18__["environment"].googleClientId)
        }
    ]);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"],
                _auth_signin_signin_component__WEBPACK_IMPORTED_MODULE_24__["SigninComponent"],
                _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_25__["SignupComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_26__["DashboardComponent"],
                _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_32__["PageNotFoundComponent"],
                _jobs_jobs_list_jobs_list_component__WEBPACK_IMPORTED_MODULE_31__["JobsListComponent"],
                _people_people_list_people_list_component__WEBPACK_IMPORTED_MODULE_33__["PeopleListComponent"],
                _dashboard_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_27__["SidebarComponent"],
                _jobs_job_item_job_item_component__WEBPACK_IMPORTED_MODULE_30__["JobItemComponent"],
                _auth_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_22__["ResetPasswordComponent"],
                _auth_set_password_set_password_component__WEBPACK_IMPORTED_MODULE_23__["SetPasswordComponent"],
                _settings_questions_questions_component__WEBPACK_IMPORTED_MODULE_34__["QuestionsComponent"],
                _settings_scorecards_scorecards_component__WEBPACK_IMPORTED_MODULE_35__["ScorecardsComponent"],
                _settings_email_templates_email_templates_component__WEBPACK_IMPORTED_MODULE_36__["EmailTemplatesComponent"],
                _settings_integrations_integrations_component__WEBPACK_IMPORTED_MODULE_37__["IntegrationsComponent"],
                _shared_loader_loader_component__WEBPACK_IMPORTED_MODULE_0__["LoaderComponent"],
                _directives_disable_control_directive__WEBPACK_IMPORTED_MODULE_38__["DisableControlDirective"],
                _jobs_job_item_unpublished_job_item_unpublished_component__WEBPACK_IMPORTED_MODULE_39__["JobItemUnpublishedComponent"],
                _jobs_job_item_published_job_item_published_component__WEBPACK_IMPORTED_MODULE_40__["JobItemPublishedComponent"]
            ],
            imports: [
                _app_routing_module__WEBPACK_IMPORTED_MODULE_19__["AppRoutingModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__["NgSelectModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                primeng_checkbox__WEBPACK_IMPORTED_MODULE_10__["CheckboxModule"],
                primeng_dropdown__WEBPACK_IMPORTED_MODULE_11__["DropdownModule"],
                primeng_messages__WEBPACK_IMPORTED_MODULE_13__["MessagesModule"],
                primeng_message__WEBPACK_IMPORTED_MODULE_12__["MessageModule"],
                primeng_editor__WEBPACK_IMPORTED_MODULE_15__["EditorModule"],
                primeng_panel__WEBPACK_IMPORTED_MODULE_17__["PanelModule"],
                primeng_panelmenu__WEBPACK_IMPORTED_MODULE_16__["PanelMenuModule"],
                primeng_selectbutton__WEBPACK_IMPORTED_MODULE_14__["SelectButtonModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_7__["AngularEditorModule"],
                angularx_social_login__WEBPACK_IMPORTED_MODULE_9__["SocialLoginModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]
            ],
            providers: [
                {
                    provide: angularx_social_login__WEBPACK_IMPORTED_MODULE_9__["AuthServiceConfig"],
                    useFactory: provideConfig
                },
                _auth_auth_service__WEBPACK_IMPORTED_MODULE_21__["AuthService"],
                _http_interceptors__WEBPACK_IMPORTED_MODULE_29__["httpInterceptorProviders"],
                _guards_auth_guard__WEBPACK_IMPORTED_MODULE_28__["AuthGuard"],
                _resolvers_user_resolver__WEBPACK_IMPORTED_MODULE_1__["UserResolver"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.signInWithGoogle = function (token, user_data) {
        if (user_data === void 0) { user_data = {}; }
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/auth/oauth/google", { token: token, user_data: user_data });
    };
    AuthService.prototype.signin = function (email, password, remember) {
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/auth/signin", { email: email, password: password, remember: remember });
    };
    AuthService.prototype.signup = function (name, email, password, agreed, user_data) {
        if (user_data === void 0) { user_data = {}; }
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/auth/signup", { name: name, email: email, password: password, agreed: agreed, user_data: user_data });
    };
    AuthService.prototype.resetPassword = function (email) {
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/auth/reset-password", { email: email });
    };
    AuthService.prototype.setPassword = function (password, password_reset_token) {
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/auth/set-password", { password: password, password_reset_token: password_reset_token });
    };
    AuthService.prototype.setSession = function (authResult) {
        localStorage.setItem('access_token', authResult.access_token);
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('access_token');
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('access_token') ? true : false;
    };
    AuthService.prototype.getAuthorizationToken = function () {
        return localStorage.getItem('access_token');
    };
    AuthService.prototype.getUserData = function () {
        return this.http.get("https://geoip.nekudo.com/api");
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/auth/reset-password/reset-password.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/auth/reset-password/reset-password.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth-page\">\n    <div class=\"auth-wrapper\">\n        <div class=\"logo-holder\">\n            <div class=\"logo\" routerLink=\"/dashboard\">\n                <img src=\"/assets/images/hc-logo.svg\" alt=\"HelloCrowd\" width=\"30\" height=\"30\" class=\"hc-logo\">\n                <span class=\"logo-separator\">/</span>\n                <span class=\"text-logo\">HIRE</span>\n            </div>\n        </div>\n        <div class=\"auth-login animated fadeInUp\">\n            <div class=\"auth-container\">\n                <div class=\"auth-container-frame\">\n                    <div class=\"left-block\">\n                        <h2>Forgot Password</h2>\n                        <div class=\"signup-link\">\n                            <p>Already have an account?</p>\n                            <a routerLink='/signin'>Sign in</a>\n                        </div>\n                    </div>\n                    <div class=\"main-block\">\n                        <form [formGroup]=\"resetForm\" *ngIf=\"!resetSuccess\">\n                            <p-messages [(value)]=\"msgs\"></p-messages>\n                            <p>Enter your e-mail address below to reset your password.</p>\n                            <div class=\"section-content\">\n                                <div class=\"hc-form-row\">\n                                    <input name=\"email\" formControlName=\"email\" class=\"form-input\" type=\"email\" placeholder=\"Email address\">\n                                </div>\n                                <div class=\"flex-row flex-aic form-bottom\">\n                                    <button class=\"btn btn-primary mla\" (click)=\"onReset($event)\" type=\"submit\">Reset</button>\n                                </div>\n                            </div>\n                        </form>\n                        <div *ngIf=\"resetSuccess\">\n                            <p>Please check your email for password reset instructions.</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/auth/reset-password/reset-password.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/auth/reset-password/reset-password.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/reset-password/reset-password.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/auth/reset-password/reset-password.component.ts ***!
  \*****************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(authService, fb, router) {
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.msgs = [];
        this.resetSuccess = false;
        this.resetForm = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent.prototype.onReset = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.resetForm.valid) {
            this.markFormGroupTouched(this.resetForm);
            return;
        }
        this.authService.resetPassword(this.resetForm.value.email)
            .subscribe(function (response) {
            _this.msgs = [];
            _this.resetSuccess = true;
            setTimeout(function () { return _this.router.navigateByUrl('/signin'); }, 5000);
        }, function (response) {
            _this.msgs = [];
            _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
        });
    };
    ResetPasswordComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/auth/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.scss */ "./src/app/auth/reset-password/reset-password.component.scss")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/auth/set-password/set-password.component.html":
/*!***************************************************************!*\
  !*** ./src/app/auth/set-password/set-password.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth-page\">\n    <div class=\"auth-wrapper\">\n        <div class=\"logo-holder\">\n            <div class=\"logo\" routerLink=\"/dashboard\">\n                <img src=\"/assets/images/hc-logo.svg\" alt=\"HelloCrowd\" width=\"30\" height=\"30\" class=\"hc-logo\">\n                <span class=\"logo-separator\">/</span>\n                <span class=\"text-logo\">HIRE</span>\n            </div>\n        </div>\n        <div class=\"auth-login animated fadeInUp\">\n            <div class=\"auth-container\">\n                <div class=\"auth-container-frame\">\n                    <div class=\"left-block\">\n                        <h2>Create Password</h2>\n                        <div class=\"signup-link\">\n                            <p>Already have an account?</p>\n                            <a routerLink='/signin'>Sign in</a>\n                        </div>\n                    </div>\n                    <div class=\"main-block\">\n                        <form [formGroup]=\"setPasswordForm\" *ngIf=\"!resetSuccess\">\n                            <p-messages [(value)]=\"msgs\"></p-messages>\n                            <div class=\"section-content\">\n                                <div class=\"hc-form-row\">\n                                    <input name=\"password\" formControlName=\"password\" class=\"form-input\" type=\"password\" placeholder=\"Password\">\n                                </div>\n                                <div class=\"hc-form-row\">\n                                    <input name=\"confirm_password\" formControlName=\"confirm_password\" class=\"form-input\" type=\"password\" placeholder=\"Confirm Password\">\n                                    <div class=\"error-message\" *ngIf=\"setPasswordForm.controls.confirm_password.errors?.MatchPassword && setPasswordForm.controls.confirm_password.touched\">Password does not match</div>\n                                </div>\n                                <div>\n                                    <div class=\"checkbox-holder\">\n                                        <p-checkbox name=\"agreed\" formControlName=\"agreed\" value=\"false\" inputId=\"agreed\"></p-checkbox>\n                                        <label for=\"agreed\">I agree to HelloCrowd’s\n                                            <a href=\"https://hellocrowd.net/#terms-of-service\">Terms of Services</a> and\n                                            <a href=\"https://hellocrowd.net/#privacy-policy\">Privacy Policy</a>\n                                        </label>\n                                    </div>\n                                    <div class=\"error-message\" *ngIf=\"!setPasswordForm.get('agreed').valid && setPasswordForm.get('agreed').touched\">You need to agree to HelloCrowd's Terms of Services and Privacy Policy</div>\n                                </div>\n                                <div class=\"flex-row form-bottom\">\n                                    <button class=\"btn btn-primary mla\" (click)=\"onSubmit($event)\" type=\"submit\">Continue</button>\n                                </div>\n                            </div>\n                        </form>\n                        <div *ngIf=\"resetSuccess\">\n                            <p>Please check your email for password reset instructions.</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/auth/set-password/set-password.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/auth/set-password/set-password.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/set-password/set-password.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/auth/set-password/set-password.component.ts ***!
  \*************************************************************/
/*! exports provided: SetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetPasswordComponent", function() { return SetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _validators_password_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../validators/password.validator */ "./src/app/validators/password.validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SetPasswordComponent = /** @class */ (function () {
    function SetPasswordComponent(socialAuthService, authService, fb, router, route) {
        this.socialAuthService = socialAuthService;
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.msgs = [];
        this.setPasswordForm = this.fb.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            confirm_password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            agreed: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        }, {
            validator: _validators_password_validator__WEBPACK_IMPORTED_MODULE_5__["PasswordValidation"].MatchPassword
        });
    }
    SetPasswordComponent.prototype.ngOnInit = function () {
        this.token = this.route.snapshot.queryParamMap.get('token');
    };
    SetPasswordComponent.prototype.onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.setPasswordForm.valid) {
            this.markFormGroupTouched(this.setPasswordForm);
            return;
        }
        var val = this.setPasswordForm.value;
        this.authService.setPassword(val.password, this.token)
            .subscribe(function (response) {
            _this.msgs = [];
            _this.authService.setSession(response);
            _this.router.navigateByUrl('/');
        }, function (response) {
            _this.msgs = [];
            _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
        });
    };
    SetPasswordComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    SetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-set-password',
            template: __webpack_require__(/*! ./set-password.component.html */ "./src/app/auth/set-password/set-password.component.html"),
            styles: [__webpack_require__(/*! ./set-password.component.scss */ "./src/app/auth/set-password/set-password.component.scss")]
        }),
        __metadata("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SetPasswordComponent);
    return SetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/auth/signin/signin.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signin/signin.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth-page\">\n    <div class=\"auth-wrapper\">\n        <div class=\"logo-holder\">\n            <div class=\"logo\" routerLink=\"/dashboard\">\n                <img src=\"/assets/images/hc-logo.svg\" alt=\"HelloCrowd\" width=\"30\" height=\"30\" class=\"hc-logo\">\n                <span class=\"logo-separator\">/</span>\n                <span class=\"text-logo\">HIRE</span>\n            </div>\n        </div>\n        <div class=\"auth-login animated fadeInUp\">\n            <div class=\"auth-container\">\n                <div class=\"auth-container-frame\">\n                    <div class=\"left-block\">\n                        <h2>Sign in</h2>\n                        <p>Login with Google or enter your email address and password.</p>\n                        <div class=\"signup-link\">\n                            <p>Don’t have an account?</p>\n                            <!-- LINK TO SIGN UP -->\n                            <a  routerLink='/signup'>Sign up</a>\n                        </div>\n                    </div>\n                    <div class=\"main-block\">\n                        <form [formGroup]=\"signinForm\">\n                            <p-messages [(value)]=\"msgs\"></p-messages>\n                            <button class=\"signin-btn\" (click)=\"onSignInWithGoogle()\">\n                                <div class=\"abcRioButtonIcon\" style=\"padding:6px\">\n                                    <div style=\"width:18px;height:18px;\" class=\"abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18\">\n                                        <img src=\"/assets/images/google.svg\" alt=\"Google icon\" width=\"18\" height=\"18\">\n                                    </div>\n                                </div>\n                                <span class=\"text\">Sign in with Google</span>\n                            </button>\n                            <div class=\"separator\">\n                                <span class=\"separator-text\">OR</span>\n                            </div>\n                            <div class=\"section-content\">\n                                <div class=\"hc-form-row\">\n                                    <input name=\"email\" formControlName=\"email\" class=\"form-input\" type=\"email\" placeholder=\"Email address\">\n                                </div>\n                                <div class=\"hc-form-row password-row\">\n                                    <input name=\"password\" formControlName=\"password\" type=\"password\" class=\"form-input\" placeholder=\"Password\">\n                                     <span class=\"forgot\"  routerLink='/reset-password'>Forgot</span>\n                                </div>\n                                <div class=\"flex-row flex-aic form-bottom\">\n                                    <p-checkbox name=\"remember\" formControlName=\"remember\" value=\"false\" label=\"Keep me signed in\" inputId=\"remember\"></p-checkbox>\n                                    <button class=\"btn btn-primary mla\" (click)=\"onSignIn($event)\" type=\"submit\">Sign In</button>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <app-loader *ngIf=\"contentLoading\"></app-loader>\n</div>"

/***/ }),

/***/ "./src/app/auth/signin/signin.component.scss":
/*!***************************************************!*\
  !*** ./src/app/auth/signin/signin.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/signin/signin.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signin/signin.component.ts ***!
  \*************************************************/
/*! exports provided: SigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigninComponent", function() { return SigninComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SigninComponent = /** @class */ (function () {
    function SigninComponent(socialAuthService, authService, fb, router) {
        this.socialAuthService = socialAuthService;
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.msgs = [];
        this.contentLoading = false;
        this.signinForm = this.fb.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            remember: ['']
        });
    }
    SigninComponent.prototype.ngOnInit = function () {
    };
    SigninComponent.prototype.onSignInWithGoogle = function () {
        var _this = this;
        this.contentLoading = true;
        this.socialAuthService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"].PROVIDER_ID)
            .then(function (userData) {
            _this.authService.getUserData()
                .subscribe(function (user_data) {
                _this.authService.signInWithGoogle(userData.idToken, user_data)
                    .subscribe(function (response) {
                    _this.msgs = [];
                    _this.authService.setSession(response);
                    _this.router.navigateByUrl('/');
                }, function (response) {
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                });
            }, function (error) {
                _this.authService.signInWithGoogle(userData.idToken)
                    .subscribe(function (response) {
                    _this.msgs = [];
                    _this.authService.setSession(response);
                    _this.router.navigateByUrl('/');
                }, function (response) {
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                });
            });
        })
            .catch(function (error) { return console.error(error); });
    };
    SigninComponent.prototype.onSignIn = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.signinForm.valid) {
            this.markFormGroupTouched(this.signinForm);
            return;
        }
        this.contentLoading = true;
        var val = this.signinForm.value;
        var remember = (val.remember && val.remember.length) ? true : false;
        this.authService.signin(val.email, val.password, remember)
            .subscribe(function (response) {
            _this.contentLoading = false;
            _this.msgs = [];
            _this.authService.setSession(response);
            _this.router.navigateByUrl('/');
        }, function (response) {
            _this.contentLoading = false;
            _this.msgs = [];
            _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
        });
    };
    SigninComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    SigninComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signin',
            template: __webpack_require__(/*! ./signin.component.html */ "./src/app/auth/signin/signin.component.html"),
            styles: [__webpack_require__(/*! ./signin.component.scss */ "./src/app/auth/signin/signin.component.scss")]
        }),
        __metadata("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SigninComponent);
    return SigninComponent;
}());



/***/ }),

/***/ "./src/app/auth/signup/signup.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth-page\">\n    <div class=\"auth-wrapper\">\n        <div class=\"logo-holder\">\n            <div class=\"logo\" routerLink=\"/dashboard\">\n                <img src=\"/assets/images/hc-logo.svg\" alt=\"HelloCrowd\" width=\"30\" height=\"30\" class=\"hc-logo\">\n                <span class=\"logo-separator\">/</span>\n                <span class=\"text-logo\">HIRE</span>\n            </div>\n        </div>\n        <div class=\"auth-login animated fadeInUp\">\n            <div class=\"auth-container\">\n                <div class=\"auth-container-frame\">\n                    <div class=\"left-block\">\n                        <h2>Sign up</h2>\n                        <p>Sign up with Google or enter your name email address and password.</p>\n                        <div class=\"signup-link\">\n                            <p>Already have an account?</p>\n                            <a routerLink='/signin'>Sign in</a>\n                        </div>\n                    </div>\n                    <div class=\"main-block\">\n                        <button class=\"signin-btn\" (click)=\"onSignUpWithGoogle()\">\n                            <div class=\"abcRioButtonIcon\" style=\"padding:6px\">\n                                <div style=\"width:18px;height:18px;\" class=\"abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18\">\n                                    <img src=\"/assets/images/google.svg\" alt=\"Google icon\" width=\"18\" height=\"18\">\n                                </div>\n                            </div>\n                            <span class=\"text\">Sign up with Google</span>\n                        </button>\n                        <form [formGroup]=\"signupForm\">\n                            <p-messages [(value)]=\"msgs\"></p-messages>\n                            <div class=\"separator\">\n                                <span class=\"separator-text\">OR</span>\n                            </div>\n                            <div class=\"section-content\">\n                                <div class=\"hc-form-row\">\n                                    <input name=\"name\" formControlName=\"name\" class=\"form-input\" type=\"text\" placeholder=\"Full Name\">\n                                    <!-- <div class=\"error-message\" *ngIf=\"!signupForm.get('name').valid && signupForm.get('name').touched\">Name is required</div> -->\n                                </div>\n                                <div class=\"hc-form-row\">\n                                    <input name=\"email\" formControlName=\"email\" class=\"form-input\" type=\"email\" placeholder=\"Email address\">\n                                    <!-- <div class=\"error-message\" *ngIf=\"!signupForm.get('email').valid && signupForm.get('email').touched\">Error</div> -->\n                                </div>\n                                <div class=\"hc-form-row password-row\">\n                                    <input name=\"password\" formControlName=\"password\" type=\"password\" class=\"form-input\" placeholder=\"Password\">\n                                    <!-- <div class=\"error-message\" *ngIf=\"!signupForm.get('password').valid && signupForm.get('password').touched\">Password is required</div> -->\n                                </div>\n                                <div>\n                                    <div class=\"checkbox-holder\">\n                                        <p-checkbox name=\"agreed\" formControlName=\"agreed\" value=\"false\" inputId=\"agreed\"></p-checkbox>\n                                        <label for=\"agreed\">I agree to HelloCrowd’s <a href=\"https://hellocrowd.net/#terms-of-service\">Terms of Services</a> and <a href=\"https://hellocrowd.net/#privacy-policy\">Privacy Policy</a></label>\n                                    </div>\n                                    <div class=\"error-message\" *ngIf=\"!signupForm.get('agreed').valid && signupForm.get('agreed').touched\">You need to agree to HelloCrowd's Terms of Services and Privacy Policy</div>\n                                </div>\n                                <div class=\"flex-row form-bottom\">\n                                    <button class=\"btn btn-primary mla\" (click)=\"onSignUp($event)\" type=\"submit\">Sign Up</button>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.scss":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/signup/signup.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupComponent = /** @class */ (function () {
    function SignupComponent(socialAuthService, authService, fb, router) {
        this.socialAuthService = socialAuthService;
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.msgs = [];
        this.signupForm = this.fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            agreed: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.onSignUpWithGoogle = function () {
        var _this = this;
        this.socialAuthService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"].PROVIDER_ID)
            .then(function (userData) {
            _this.authService.getUserData()
                .subscribe(function (user_data) {
                _this.authService.signInWithGoogle(userData.idToken, user_data)
                    .subscribe(function (response) {
                    _this.msgs = [];
                    _this.authService.setSession(response);
                    _this.router.navigateByUrl('/');
                }, function (response) {
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                });
            }, function (error) {
                _this.authService.signInWithGoogle(userData.idToken)
                    .subscribe(function (response) {
                    _this.msgs = [];
                    _this.authService.setSession(response);
                    _this.router.navigateByUrl('/');
                }, function (response) {
                    _this.msgs = [];
                    _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
                });
            });
        })
            .catch(function (error) { return console.error(error); });
    };
    SignupComponent.prototype.onSignUp = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.signupForm.valid) {
            this.markFormGroupTouched(this.signupForm);
            return;
        }
        var val = this.signupForm.value;
        var agreed = (val.agreed && val.agreed.length) ? true : false;
        this.authService.getUserData()
            .subscribe(function (user_data) {
            _this.authService.signup(val.name, val.email, val.password, agreed, user_data)
                .subscribe(function (response) {
                _this.msgs = [];
                _this.authService.setSession(response);
                _this.router.navigateByUrl('/');
            }, function (response) {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            });
        }, function (error) {
            _this.authService.signup(val.name, val.email, val.password, agreed)
                .subscribe(function (response) {
                _this.msgs = [];
                _this.authService.setSession(response);
                _this.router.navigateByUrl('/');
            }, function (response) {
                _this.msgs = [];
                _this.msgs.push({ severity: 'error', detail: response.error.error || 'Error' });
            });
        });
    };
    SignupComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/auth/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.scss */ "./src/app/auth/signup/signup.component.scss")]
        }),
        __metadata("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-frame\">\n    <app-sidebar></app-sidebar>\n    <div id=\"content\">\n        <router-outlet></router-outlet>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.scss":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-frame {\n  width: 100%;\n  padding-left: 230px;\n  position: relative; }\n  .main-frame #content {\n    padding: 30px; }\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/sidebar/sidebar.component.html":
/*!**********************************************************!*\
  !*** ./src/app/dashboard/sidebar/sidebar.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-header\">\n    <div class=\"logo\" routerLink=\"/dashboard\">\n        <img src=\"/assets/images/hc-logo.svg\" alt=\"HelloCrowd\" width=\"30\" height=\"30\" class=\"hc-logo\">\n        <span class=\"separator\">/</span>\n        <span class=\"text-logo\">HIRE</span>\n    </div>\n    <div class=\"user-pic\"  *ngIf=\"user$ | async as user\">{{ user?.initials }}</div>\n</div>\n<form class=\"search-form\">\n    <input type=\"text\" name=\"search\" class=\"input-text\" placeholder=\"Search anything\">\n    <span class=\"icon\">\n        <img src=\"/assets/images/search.svg\" alt=\"Search icon\" width=\"13\" height=\"13\">\n    </span>\n</form>\n<div class=\"sidebar-nav\">\n    <div class=\"sidebar-nav-link\">\n        <a href=\"#\" routerLink=\"/dashboard/jobs\" routerLinkActive=\"active\">\n            <span class=\"icon\"><img src=\"/assets/images/jobs.svg\" alt=\"Jobs icon\" width=\"14\" height=\"13\"></span>\n            <span class=\"text\">Jobs</span>\n        </a>\n    </div>\n    <div class=\"sidebar-nav-link\">\n        <a href=\"#\" routerLink=\"/dashboard/people\" routerLinkActive=\"active\">\n            <span class=\"icon\">\n                <img src=\"/assets/images/people.svg\" alt=\"People icon\" width=\"13\" height=\"13\">\n            </span>\n            <span class=\"text\">People</span>\n        </a>\n    </div>\n</div>\n<div class=\"menu-separator\"></div>\n<div class=\"sidebar-nav-oc\">\n    <div class=\"sidebar-nav-oc-item\" [attr.aria-expanded]=\"settingsOpened\"  routerLinkActive=\"active\">\n        <div class=\"sidebar-nav-oc-item-header\" (click)=\"onToggleOcItem($event)\">\n            <span class=\"icon\">\n                <img src=\"/assets/images/sidebar-settings.svg\" alt=\"Settings\" width=\"14\" height=\"14\">\n            </span>\n            <span class=\"text\">Settings</span>\n            <span class=\"ui-button-icon-left ui-clickable pi pi-chevron-down\"></span>\n            <span class=\"ui-button-icon-left ui-clickable pi pi-chevron-up\"></span>\n        </div>\n        <div class=\"sidebar-nav-oc-item-content\">\n            <div class=\"sidebar-nav\">\n                <div class=\"sidebar-nav-link\">\n                    <a href=\"#\" routerLink=\"/dashboard/questions\" routerLinkActive=\"active\">\n                        <span class=\"icon\"><img src=\"/assets/images/sidebar-questions.svg\" alt=\"Jobs icon\" width=\"14\" height=\"13\"></span>\n                        <span class=\"text\">Questions</span>\n                    </a>\n                </div>\n                <div class=\"sidebar-nav-link\">\n                    <a href=\"#\" routerLink=\"/dashboard/scorecards\" routerLinkActive=\"active\">\n                        <span class=\"icon\">\n                            <img src=\"/assets/images/sidebar-scorecards.svg\" alt=\"People icon\" width=\"14\" height=\"12\">\n                        </span>\n                        <span class=\"text\">Scorecards</span>\n                    </a>\n                </div>\n                <div class=\"sidebar-nav-link\">\n                    <a href=\"#\" routerLink=\"/dashboard/email-templates\" routerLinkActive=\"active\">\n                        <span class=\"icon\">\n                            <img src=\"/assets/images/sidebar-email-templates.svg\" alt=\"People icon\" width=\"14\" height=\"11\">\n                        </span>\n                        <span class=\"text\">Email Templates</span>\n                    </a>\n                </div>\n                <div class=\"sidebar-nav-link\">\n                    <a href=\"#\" routerLink=\"/dashboard/integrations\" routerLinkActive=\"active\">\n                        <span class=\"icon\">\n                            <img src=\"/assets/images/sidebar-integrations.svg\" alt=\"People icon\" width=\"13\" height=\"13\">\n                        </span>\n                        <span class=\"text\">Integrations</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/sidebar/sidebar.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/dashboard/sidebar/sidebar.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 230px;\n  height: 100%;\n  background: #1A2848;\n  color: #fff;\n  padding: 15px;\n  z-index: 2; }\n\na {\n  color: #fff;\n  text-decoration: none; }\n\na:hover {\n    text-decoration: none; }\n\n.sidebar-header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 0 0 20px; }\n\n.logo {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  outline: 0 !important; }\n\n.logo:hover {\n    cursor: pointer; }\n\n.logo .hc-logo {\n    display: block;\n    width: 30px;\n    height: 30px;\n    margin: 0; }\n\n.logo .separator {\n    display: block;\n    font-size: 20px;\n    line-height: 30px;\n    font-weight: 500;\n    color: #FF2D55;\n    margin: 0 5px; }\n\n.logo .text-logo {\n    display: block;\n    font-size: 20px;\n    line-height: 30px;\n    font-weight: 500;\n    margin: 0; }\n\n.user-pic {\n  display: block;\n  margin-left: auto;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #FF2D55;\n  line-height: 32px;\n  text-align: center;\n  font-size: 14px;\n  font-weight: bold; }\n\n.search-form {\n  width: 100%;\n  position: relative;\n  margin: 0 0 20px; }\n\n.search-form .icon {\n    position: absolute;\n    left: 13px;\n    top: 13px;\n    width: 13px;\n    height: 13px;\n    pointer-events: none; }\n\n.search-form .input-text {\n    width: 100%;\n    padding: 10px 2px 10px 40px;\n    font-size: 13px;\n    line-height: 20px;\n    font-weight: normal;\n    background: rgba(255, 255, 255, 0.3);\n    color: #fff;\n    border: 0;\n    outline: 0 !important;\n    box-shadow: none;\n    border-radius: 5px; }\n\n.search-form .input-text::-webkit-input-placeholder {\n      color: #fff;\n      opacity: 1; }\n\n.search-form .input-text:-ms-input-placeholder {\n      color: #fff;\n      opacity: 1; }\n\n.search-form .input-text::-ms-input-placeholder {\n      color: #fff;\n      opacity: 1; }\n\n.search-form .input-text::placeholder {\n      color: #fff;\n      opacity: 1; }\n\n.search-form .input-text:-ms-input-placeholder {\n      color: #fff;\n      opacity: 1; }\n\n.search-form .input-text::-ms-input-placeholder {\n      color: #fff;\n      opacity: 1; }\n\n.sidebar-nav .sidebar-nav-link {\n  padding: 10px 0;\n  font-size: 14px; }\n\n.sidebar-nav .sidebar-nav-link a {\n    display: inline-block;\n    opacity: 0.5;\n    transition: all 0.2s ease; }\n\n.sidebar-nav .sidebar-nav-link a .icon {\n      display: inline-block;\n      width: 14px;\n      height: 14px;\n      margin: 0 12px 0 10px; }\n\n.sidebar-nav .sidebar-nav-link a:hover, .sidebar-nav .sidebar-nav-link a.active {\n      opacity: 1;\n      cursor: pointer; }\n\n.menu-separator {\n  width: 100%;\n  height: 1px;\n  background: #F9FAFB;\n  margin: 20px 0; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item .pi-chevron-down,\n.sidebar-nav-oc .sidebar-nav-oc-item .pi-chevron-up {\n  display: none; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item[aria-expanded=\"true\"] .pi-chevron-down {\n  display: block; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item[aria-expanded=\"false\"] .pi-chevron-up {\n  display: block; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item[aria-expanded=\"false\"] .sidebar-nav-oc-item-content {\n  max-height: 0;\n  opacity: 0; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item.active .sidebar-nav-oc-item-header {\n  opacity: 1; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item-header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 0 0 10px;\n  opacity: 0.5;\n  transition: all 0.2s ease; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item-header .text {\n    flex: 1; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item-header .icon {\n    display: inline-block;\n    width: 14px;\n    height: 14px;\n    margin: 0 12px 0 10px; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item-header:hover {\n    cursor: pointer; }\n\n.sidebar-nav-oc .sidebar-nav-oc-item-content {\n  overflow-y: hidden;\n  max-height: 165px;\n  opacity: 1;\n  transition: all 0.4s ease;\n  padding: 0 0 0 20px; }\n"

/***/ }),

/***/ "./src/app/dashboard/sidebar/sidebar.component.ts":
/*!********************************************************!*\
  !*** ./src/app/dashboard/sidebar/sidebar.component.ts ***!
  \********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
        this.settingsOpened = true;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.user$ = this.userService.me().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (user) {
            user.initials = user.first_name.charAt(0).toUpperCase();
            if (user.last_name) {
                user.initials += user.last_name.charAt(0).toUpperCase();
            }
            return user;
        }));
    };
    SidebarComponent.prototype.onToggleOcItem = function (event) {
        event.preventDefault();
        console.log('clicked');
        this.settingsOpened = !this.settingsOpened;
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/dashboard/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/dashboard/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/directives/disable-control.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/directives/disable-control.directive.ts ***!
  \*********************************************************/
/*! exports provided: DisableControlDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisableControlDirective", function() { return DisableControlDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DisableControlDirective = /** @class */ (function () {
    function DisableControlDirective(ngControl) {
        this.ngControl = ngControl;
    }
    Object.defineProperty(DisableControlDirective.prototype, "appDisableControl", {
        set: function (condition) {
            var action = condition ? 'disable' : 'enable';
            this.ngControl.control[action]();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DisableControlDirective.prototype, "appDisableControl", null);
    DisableControlDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appDisableControl]'
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"]])
    ], DisableControlDirective);
    return DisableControlDirective;
}());



/***/ }),

/***/ "./src/app/guards/auth.guard.ts":
/*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _auth_auth_service__WEBPACK_IMPORTED_MODULE_0__["AuthService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/http-interceptors/auth-interceptor.ts":
/*!*******************************************************!*\
  !*** ./src/app/http-interceptors/auth-interceptor.ts ***!
  \*******************************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
    }
    AuthInterceptor.prototype.handleError = function (err) {
        if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
            if (err.status === 401) {
                this.authService.logout();
                if (this.router.url !== '/signin') {
                    this.router.navigateByUrl('/signin');
                }
            }
        }
    };
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var authToken = this.authService.getAuthorizationToken();
        var whiteList = ['accounts.google.com', 'nekudo'];
        if (whiteList.some(function (item) { return req.url.indexOf(item) !== -1; })) {
            return next.handle(req);
        }
        var authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
        return next.handle(authReq).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (event) { }, function (err) { return _this.handleError(err); }));
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/http-interceptors/index.ts":
/*!********************************************!*\
  !*** ./src/app/http-interceptors/index.ts ***!
  \********************************************/
/*! exports provided: httpInterceptorProviders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "httpInterceptorProviders", function() { return httpInterceptorProviders; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-interceptor */ "./src/app/http-interceptors/auth-interceptor.ts");


var httpInterceptorProviders = [
    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"], useClass: _auth_interceptor__WEBPACK_IMPORTED_MODULE_1__["AuthInterceptor"], multi: true }
];


/***/ }),

/***/ "./src/app/jobs/job-item-published/job-item-published.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/jobs/job-item-published/job-item-published.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  job-item-published works!\n</p>\n"

/***/ }),

/***/ "./src/app/jobs/job-item-published/job-item-published.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/jobs/job-item-published/job-item-published.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/jobs/job-item-published/job-item-published.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/jobs/job-item-published/job-item-published.component.ts ***!
  \*************************************************************************/
/*! exports provided: JobItemPublishedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobItemPublishedComponent", function() { return JobItemPublishedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JobItemPublishedComponent = /** @class */ (function () {
    function JobItemPublishedComponent() {
    }
    JobItemPublishedComponent.prototype.ngOnInit = function () {
    };
    JobItemPublishedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-job-item-published',
            template: __webpack_require__(/*! ./job-item-published.component.html */ "./src/app/jobs/job-item-published/job-item-published.component.html"),
            styles: [__webpack_require__(/*! ./job-item-published.component.scss */ "./src/app/jobs/job-item-published/job-item-published.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], JobItemPublishedComponent);
    return JobItemPublishedComponent;
}());



/***/ }),

/***/ "./src/app/jobs/job-item-unpublished/job-item-unpublished.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/jobs/job-item-unpublished/job-item-unpublished.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  job-item-unpublished works!\n</p>\n"

/***/ }),

/***/ "./src/app/jobs/job-item-unpublished/job-item-unpublished.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/jobs/job-item-unpublished/job-item-unpublished.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/jobs/job-item-unpublished/job-item-unpublished.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/jobs/job-item-unpublished/job-item-unpublished.component.ts ***!
  \*****************************************************************************/
/*! exports provided: JobItemUnpublishedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobItemUnpublishedComponent", function() { return JobItemUnpublishedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JobItemUnpublishedComponent = /** @class */ (function () {
    function JobItemUnpublishedComponent() {
    }
    JobItemUnpublishedComponent.prototype.ngOnInit = function () {
    };
    JobItemUnpublishedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-job-item-unpublished',
            template: __webpack_require__(/*! ./job-item-unpublished.component.html */ "./src/app/jobs/job-item-unpublished/job-item-unpublished.component.html"),
            styles: [__webpack_require__(/*! ./job-item-unpublished.component.scss */ "./src/app/jobs/job-item-unpublished/job-item-unpublished.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], JobItemUnpublishedComponent);
    return JobItemUnpublishedComponent;
}());



/***/ }),

/***/ "./src/app/jobs/job-item/job-item.component.html":
/*!*******************************************************!*\
  !*** ./src/app/jobs/job-item/job-item.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container fixed-width-container\">\n    <div class=\"title-block\">\n        <h1 class=\"page-title\">New Job</h1>\n        <div class=\"sections-nav\">\n            <div class=\"section-nav-link\" (click)=\"onChangeSection('job-details')\" [ngClass]=\"{'active': activeSection === 'job-details'}\">Job\n                Details</div>\n            <div class=\"section-nav-link\" (click)=\"onChangeSection('applications')\" [ngClass]=\"{'active': activeSection === 'applications', 'disabled': !job || !job.step_completed || job.step_completed < 1}\">Applications</div>\n            <div class=\"section-nav-link\" (click)=\"onChangeSection('hiring-team')\" [ngClass]=\"{'active': activeSection === 'hiring-team', 'disabled': !job || !job.step_completed || job.step_completed < 2}\">Hiring\n                Team</div>\n        </div>\n        <div class=\"buttons-holder\">\n            <button class=\"btn btn-icon\" (click)=\"onSaveDraft($event)\">\n                <span class=\"icon\">\n                    <svg width=\"15px\" height=\"15px\" viewBox=\"0 0 15 15\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <g id=\"Recruit-Setup\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                            <g id=\"Add-Job---Details\" transform=\"translate(-956.000000, -92.000000)\" fill=\"#FF2D55\" fill-rule=\"nonzero\">\n                                <g id=\"icons8-save_close\" transform=\"translate(956.000000, 92.000000)\">\n                                    <path d=\"M1.59375,0 C0.714844,0 0,0.714844 0,1.59375 L0,11.40625 C0,12.285156 0.714844,13 1.59375,13 L6.761719,13 C7.570313,14.203125 8.945313,15 10.5,15 C12.980469,15 15,12.980469 15,10.5 C15,8.945313 14.203125,7.570313 13,6.761719 L13,2.476563 L10.527344,0 L1.59375,0 Z M1.59375,1 L2,1 L2,3.125 C2,4.113281 2.703125,5 3.667969,5 L8.332031,5 C9.296875,5 10,4.113281 10,3.125 L10,1 L10.109375,1 L12,2.890625 L12,6.273438 C11.527344,6.105469 11.027344,6 10.5,6 C8.945313,6 7.570313,6.796875 6.761719,8 L4.5,8 C3.671875,8 3,8.671875 3,9.5 L3,12 L1.59375,12 C1.265625,12 1,11.734375 1,11.40625 L1,1.59375 C1,1.265625 1.265625,1 1.59375,1 Z M3,1 L6,1 L6,3 L8,3 L8,1 L9,1 L9,3.125 C9,3.65625 8.660156,4 8.332031,4 L3.667969,4 C3.339844,4 3,3.65625 3,3.125 L3,1 Z M10.5,7 C12.4375,7 14,8.5625 14,10.5 C14,12.4375 12.4375,14 10.5,14 C8.5625,14 7,12.4375 7,10.5 C7,8.5625 8.5625,7 10.5,7 Z M12,8.859375 L10.160156,10.703125 L9.015625,9.558594 L8.304688,10.265625 L10.160156,12.117188 L12.707031,9.566406 L12,8.859375 Z M4.5,9 L6.273438,9 C6.105469,9.472656 6,9.972656 6,10.5 C6,11.027344 6.105469,11.527344 6.273438,12 L4,12 L4,9.5 C4,9.222656 4.226563,9 4.5,9 Z\"\n                                        id=\"Shape\"></path>\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </span>\n                <span class=\"text\">Save Draft</span>\n            </button>\n            <button class=\"btn btn-primary ml20 w140\" (click)=\"onSave($event)\">{{ (activeSection === 'hiring-team') ? 'Save and Publish' : 'Save and Next'}}</button>\n        </div>\n    </div>\n    <div class=\"section-separator mb20\"></div>\n    <div class=\"content-section\" id=\"job-details\" *ngIf=\"activeSection === 'job-details'\">\n        <form [formGroup]=\"jobDetailsForm\">\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Job Details</strong>\n                    <p>Your job details as you would like them to appear for candidates.</p>\n                    <p>The point is keep the titles shorter and more generic and not to mix the type of position with the specific\n                        company \"slot\" for that position.</p>\n                    <p>Find out more about <a href=\"#\">Job Titles here</a></p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Job Title</label>\n                                <div class=\"input-holder\">\n                                    <input type=\"text\" class=\"form-input\" formControlName=\"title\" maxlength=\"{{titleMaxLength}}\">\n                                     <div class=\"input-chars-counter\">\n                                         <span class=\"chars\">{{jobDetailsForm.get('title').value.length}}/{{titleMaxLength}}</span>\n                                     </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Company</label>\n                                <input type=\"text\" class=\"form-input\" formControlName=\"company\">\n                            </div>\n                        </div>\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Primary Job Location</label>\n                                <div class=\"input-block right-option-block\">\n                                    <input type=\"text\" class=\"form-input\" placeholder=\"Enter a city\" formControlName=\"location\" [appDisableControl]=\"jobDetailsForm.get('is_remote').value\">\n                                    <div class=\"right-option\">\n                                        <p-checkbox label=\"Remote\" formControlName=\"is_remote\" binary=\"true\" inputId=\"is_remote\"></p-checkbox>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-block\">\n                            <div class=\"form-block-columns\">\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">Job Type</label>\n                                        <p-dropdown [options]=\"jobTypeOptions\" formControlName=\"job_type\"  [style]=\"{'width':'100%'}\"></p-dropdown>\n                                    </div>\n                                </div>\n                                <div class=\"form-block-col-separator\"></div>\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">Number of Positions Available</label>\n                                        <p-dropdown [options]=\"hiresOptions\" formControlName=\"number_of_hires\" [style]=\"{'width':'100%'}\"></p-dropdown>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-block\">\n                            <div class=\"form-block-columns\">\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">Education</label>\n                                        <p-dropdown [options]=\"educationOptions\" formControlName=\"education\" [style]=\"{'width':'100%'}\"></p-dropdown>\n                                    </div>\n                                </div>\n                                <div class=\"form-block-col-separator\"></div>\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">Experience</label>\n                                        <p-dropdown [options]=\"experienceOptions\" formControlName=\"experience\" [style]=\"{'width':'100%'}\"></p-dropdown>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"section-separator mb20 mt20\"></div>\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Salary</strong>\n                    <p>Entering a salary is compulsary for automatic matching but you may opt to hide it from the job posting.</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"form-block-columns\">\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">From</label>\n                                        <div class=\"input-block\">\n                                            <input type=\"text\" class=\"form-input pl30\"  formControlName=\"salary_from\">\n                                            <div class=\"currency-symbol\">R</div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-block-col-separator\"></div>\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">To</label>\n                                        <div class=\"input-block\">\n                                            <input type=\"text\" class=\"form-input pl30\"  formControlName=\"salary_to\">\n                                            <div class=\"currency-symbol\">R</div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"form-block-col-separator\"></div>\n                                <div class=\"form-block-col\">\n                                    <div class=\"input-block\">\n                                        <label for=\"\" class=\"form-block-label\">&nbsp;</label>\n                                        <p-dropdown [options]=\"salaryOptions\"  formControlName=\"salary_period\" [style]=\"{'width':'100%'}\"></p-dropdown>\n                                    </div>\n                                </div>\n                            </div>\n                            <p class=\"form-tip danger\">Use Single Salary</p>\n                        </div>\n                        <div class=\"form-content-box-bottom\">\n                            <div class=\"form-content-box-bottom-holder\">\n                                <p-checkbox name=\"hide_salary\"  binary=\"true\" label=\"Hide this salary from thejob posting\"  formControlName=\"hide_salary\"\n                                    inputId=\"hide_salary\"></p-checkbox>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"section-separator mb20 mt20\"></div>\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Job Description</strong>\n                    <p>Select from our list of job templates or enter your manually.</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">    \n                            <p-editor formControlName=\"description\" [style]=\"{'height':'400px'}\"></p-editor>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n\n    <div class=\"content-section\" id=\"applications\" *ngIf=\"activeSection === 'applications'\">\n        <form [formGroup]=\"applicationsForm\">\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Candidate Application</strong>\n                    <p>Control how candidates can apply to your position and what information is required</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Job Listing</label>\n                                <p-dropdown [options]=\"joblistingOptions\" formControlName=\"job_listing\" [style]=\"{'width':'100%'}\"></p-dropdown>\n                            </div>\n                        </div>\n                        <div class=\"form-content-box-bottom\">\n                            <div class=\"form-content-box-bottom-holder\">\n                                <div class=\"text-with-icon flex-row flex-aic\">\n                                    <img src=\"/assets/images/pin.svg\" class=\"icon\" alt=\"\" width=\"13\" height=\"13\">\n                                    <p>Accept applications on your public Career Portal and enable 3rd party job boards</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"section-separator mb20 mt20\"></div>\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Application Form</strong>\n                    <p>Choose the information collected for candidates applying through your Career or Employee Portals.</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box mb20\">\n                        <strong class=\"form-content-box-title\">Resume Upload</strong>\n                        <div class=\"form-block\">\n                            <p-checkbox name=\"resume_upload_required\" binary=\"true\" label=\"The candidate is required to upload a Resume\" formControlName=\"resume_upload_required\" \n                                inputId=\"resume_upload_required\"></p-checkbox>\n                        </div>\n                        <div class=\"form-content-box-bottom\" *ngIf=\"applicationsForm.get('resume_upload_required').value\">\n                            <div class=\"form-content-box-bottom-holder\">\n                                <div class=\"form-block\">\n                                    <p-checkbox name=\"email_missing_info\" binary=\"true\" label=\"Email the candidate should there be missing information\" formControlName=\"email_missing_info\"\n                                        inputId=\"email_missing_info\"></p-checkbox>\n                                </div>\n                                <div class=\"form-block mb0\">\n                                    <p-checkbox name=\"email_suggestions\" binary=\"true\" label=\"Email the candidate with suggestions on how they can improve their resume\"\n                                        formControlName=\"email_suggestions\" inputId=\"email_suggestions\"></p-checkbox>\n                                </div>\n                            </div>\n                        </div>\n                        \n                    </div>\n                    <div class=\"form-content-box\">\n                        <strong class=\"form-content-box-title\">Application Fields</strong>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Name</span>\n                            <div class=\"predefined-option mla\">Required</div>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Email</span>\n                            <div class=\"predefined-option mla\">Required</div>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Phone Number</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_phone\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Current Location</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_current_location\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Employment Equity Status</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_employment_equity_status\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic\">\n                            <span class=\"text\">Gender</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_gender\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"section-separator mb10 mt10\"></div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Experiance Summary</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_experience_summary\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Work History</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_work_history\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"options-row flex-row flex-aic mb20\">\n                            <span class=\"text\">Education</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_education\" class=\"mla\"></p-selectButton>\n                        </div>\n                        <div class=\"section-separator mb10 mt10\"></div>\n                        <div class=\"options-row flex-row flex-aic\">\n                            <span class=\"text\">Cover Letter</span>\n                            <p-selectButton [options]=\"applicationFieldsOptions\" formControlName=\"application_field_cover_letter\" class=\"mla\"></p-selectButton>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"section-separator mb20 mt20\"></div>\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Questionnaire</strong>\n                    <p>You can extent your application form with custom questions.</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Questionnaire</label>\n                                <div class=\"flex-row\">\n                                    <p-dropdown [options]=\"questionnaireOptions\" formControlName=\"questionnaire\" [style]=\"{'width':'100%'}\" class=\"flex-1\" placeholder=\"You have not created any questionnaires, click Add\"></p-dropdown>\n                                    <button class=\"btn btn-primary w60 ml20\">Add</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n    <div class=\"content-section\" id=\"hiring-team\" *ngIf=\"activeSection === 'hiring-team'\">\n        <form [formGroup]=\"hiringForm\">\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Hiring Managers</strong>\n                    <p>Hiring managers are able to add, manage and communicate with candidates for this position.</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Hiring Managers</label>\n                                <p-dropdown [options]=\"hiringManagersOptions\" formControlName=\"hiring_managers\" [style]=\"{'width':'100%'}\" placeholder=\"Add to this position\"></p-dropdown>\n                            </div>\n                        </div>\n                        <div class=\"form-content-box-bottom\">\n                            <div class=\"form-content-box-bottom-holder\">\n                                \n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"section-separator mb20 mt20\"></div>\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Team Members</strong>\n                    <p>Members are able to review & provide feedback on candidates, including participating in interviews & submitting scorecards.</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Team Members</label>\n                                <div class=\"flex-row flex-aic\">\n                                    <input type=\"text\" class=\"form-input\" placeholder=\"Full Name\">\n                                    <input type=\"text\" class=\"form-input ml20\" placeholder=\"Email Address\">\n                                    <button class=\"btn btn-primary w60 ml20\">Add</button>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-content-box-bottom\">\n                            <div class=\"form-content-box-bottom-holder\">\n            \n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"section-separator mb20 mt20\"></div>\n            <div class=\"form-content-section\">\n                <div class=\"description\">\n                    <strong class=\"title\">Default Email</strong>\n                    <p>Who should automated emails triggered by the system for this job be sent from?</p>\n                </div>\n                <div class=\"form-content-holder\">\n                    <div class=\"form-content-box\">\n                        <div class=\"form-block\">\n                            <div class=\"input-block\">\n                                <label for=\"\" class=\"form-block-label\">Default Email Name</label>\n                                <p-dropdown [options]=\"joblistingOptions\" formControlName=\"default_email_name\" [style]=\"{'width':'100%'}\" placeholder=\"Add to this position\"></p-dropdown>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n<app-loader *ngIf=\"contentLoading\"></app-loader>"

/***/ }),

/***/ "./src/app/jobs/job-item/job-item.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/jobs/job-item/job-item.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/jobs/job-item/job-item.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/jobs/job-item/job-item.component.ts ***!
  \*****************************************************/
/*! exports provided: JobItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobItemComponent", function() { return JobItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_job_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../services/job.service */ "./src/app/services/job.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JobItemComponent = /** @class */ (function () {
    function JobItemComponent(route, jobService, fb, router) {
        var _this = this;
        this.route = route;
        this.jobService = jobService;
        this.fb = fb;
        this.router = router;
        this.activeSection = 'job-details';
        this.sections = ['job-details', 'applications', 'hiring-team'];
        this.contentLoading = true;
        this.titleMaxLength = 250;
        this.initForms();
        // Job
        var jobId = this.route.snapshot.paramMap.get('id');
        this.jobService.getJob(jobId)
            .subscribe(function (job) {
            _this.job = job;
            _this.populateForms();
            console.log('FROM ROUTE-------------------- JOB:', jobId, _this.job);
            _this.contentLoading = false;
        });
        this.route.paramMap.subscribe(function (params) {
            if (params.get('id') !== jobId) {
                _this.contentLoading = true;
                jobId = params.get('id');
                _this.jobService.getJob(jobId)
                    .subscribe(function (job) {
                    _this.job = job;
                    _this.populateForms();
                    console.log('FROM CHANGE-------------------- JOB:', jobId, _this.job);
                    var section = _this.route.snapshot.queryParamMap.get('section');
                    console.log(section);
                    if (section) {
                        _this.activeSection = section;
                    }
                    _this.contentLoading = false;
                });
            }
        });
        // Options
        this.jobTypeOptions = [
            { label: 'Part-time', value: 'part-time' },
            { label: 'Full-time', value: 'full-time' },
            { label: 'Temporary', value: 'temporary' },
            { label: 'Contract', value: 'contract' }
        ];
        this.hiresOptions = [
            { label: '1 hire', value: 1 },
            { label: '2 hires', value: 2 },
            { label: '3 hires', value: 3 },
            { label: '4 hires', value: 4 },
            { label: '5 hires', value: 5 },
            { label: '6 hires', value: 6 },
            { label: '7 hires', value: 7 },
            { label: '8 hires', value: 8 },
            { label: '9 hires', value: 9 },
            { label: '10 hires', value: 10 },
            { label: 'Ongoing', value: 'ongoing' }
        ];
        this.educationOptions = [
            { label: 'Unspecified', value: 'unspecified' },
            { label: 'High School or Equivalent', value: 'school' },
            { label: 'Certification', value: 'certification' },
            { label: 'Vocational', value: 'vocational' },
            { label: 'Associate Degree', value: 'associate' },
            { label: 'Bachelors Degree', value: 'bachelors' },
            { label: 'Masters Degree', value: 'masters' },
            { label: 'Professional', value: 'professional' }
        ];
        this.experienceOptions = [
            { label: 'Internship', value: 'internship' },
            { label: 'Graduate', value: 'graduate' },
            { label: 'Entry Level', value: 'entry' },
            { label: 'Associate', value: 'associate' },
            { label: 'Mid Level', value: 'mid' },
            { label: 'Senior', value: 'senior' },
            { label: 'Executive', value: 'executive' }
        ];
        this.salaryOptions = [
            { label: 'per year', value: 'yearly' },
            { label: 'per month', value: 'monthly' }
        ];
        this.joblistingOptions = [
            { label: 'Default', value: 'default' }
        ];
        this.questionnaireOptions = [];
        this.applicationFieldsOptions = [
            { label: 'Required', value: 'required' },
            { label: 'Optional', value: 'optional' },
            { label: 'Disabled', value: 'disabled' }
        ];
        this.hiringManagersOptions = [];
    }
    JobItemComponent.prototype.ngOnInit = function () {
    };
    JobItemComponent.prototype.initForms = function () {
        this.jobDetailsForm = this.fb.group({
            title: [''],
            company: [''],
            location: [''],
            is_remote: [''],
            job_type: [''],
            number_of_hires: [''],
            education: [''],
            experience: [''],
            salary_from: [''],
            salary_to: [''],
            salary_period: [''],
            hide_salary: [''],
            description: ['']
        });
        this.applicationsForm = this.fb.group({
            job_listing: ['default'],
            resume_upload_required: [''],
            email_missing_info: [''],
            email_suggestions: [''],
            application_field_phone: [''],
            application_field_current_location: [''],
            application_field_employment_equity_status: [''],
            application_field_gender: [''],
            application_field_experience_summary: [''],
            application_field_work_history: [''],
            application_field_education: [''],
            application_field_cover_letter: [''],
            questionnaire: ['']
        });
        this.hiringForm = this.fb.group({
            hiring_managers: [''],
            team_members: [''],
            default_email_name: ['']
        });
    };
    JobItemComponent.prototype.populateForms = function () {
        // Forms
        this.jobDetailsForm = this.fb.group({
            title: [this.job.title, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            company: [this.job.company, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            location: [{ value: this.job.location, disabled: false }],
            is_remote: [this.job.is_remote || false],
            job_type: [this.job.job_type, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            number_of_hires: [this.job.number_of_hires, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            education: [this.job.education, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            experience: [this.job.experience, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            salary_from: [this.job.salary_from],
            salary_to: [this.job.salary_to],
            salary_period: [this.job.salary_period],
            hide_salary: [this.job.hide_salary || false],
            description: [this.job.description]
        });
        this.applicationsForm = this.fb.group({
            job_listing: ['default'],
            resume_upload_required: [this.job.resume_upload_required],
            email_missing_info: [this.job.email_missing_info],
            email_suggestions: [this.job.email_suggestions],
            application_field_phone: [this.job.application_field_phone],
            application_field_current_location: [this.job.application_field_current_location],
            application_field_employment_equity_status: [this.job.application_field_employment_equity_status],
            application_field_gender: [this.job.application_field_gender],
            application_field_experience_summary: [this.job.application_field_experience_summary],
            application_field_work_history: [this.job.application_field_work_history],
            application_field_education: [this.job.application_field_education],
            application_field_cover_letter: [this.job.application_field_cover_letter],
            questionnaire: [{ value: this.job.questionnaire, disabled: true }]
        });
        this.hiringForm = this.fb.group({
            hiring_managers: [this.job.hiring_managers],
            team_members: [this.job.team_members],
            default_email_name: [this.job.default_email_name]
        });
    };
    JobItemComponent.prototype.onChangeSection = function (section) {
        this.activeSection = section;
    };
    JobItemComponent.prototype.onSaveDraft = function (event) {
        var _this = this;
        event.preventDefault();
        var form = this.getActiveForm();
        if (!form.valid) {
            this.markFormGroupTouched(form);
            console.log('FORM IS INVALID');
            console.log(form);
            return;
        }
        console.log('FORM IS VALID');
        console.log(Object.assign(this.job, form.value));
        this.jobService.saveJob(Object.assign(this.job, form.value), this.activeSection, false)
            .subscribe(function (job) {
            console.log('RESPONSE FROM SAVE CALL:');
            console.log(job);
            _this.contentLoading = false;
            if (job.created && job.id) {
                _this.router.navigateByUrl("dashboard/jobs/" + job.id);
            }
        });
    };
    JobItemComponent.prototype.onSave = function (event) {
        var _this = this;
        event.preventDefault();
        var form = this.getActiveForm();
        if (!form.valid) {
            this.markFormGroupTouched(form);
            console.log('FORM IS INVALID');
            console.log(form);
            return;
        }
        // VALID
        console.log('FORM IS VALID');
        console.log(Object.assign(this.job, form.value));
        this.jobService.saveJob(Object.assign(this.job, form.value), this.activeSection, true)
            .subscribe(function (job) {
            console.log('RESPONSE FROM SAVE CALL:');
            console.log(job);
            _this.contentLoading = false;
            if (job.created && job.id) {
                _this.router.navigate(["dashboard/jobs/" + job.id + "&section=applications", { queryParams: { section: 'applications' } }]);
            }
            else {
                _this.activeSection = _this.nextSection();
            }
        });
    };
    JobItemComponent.prototype.getActiveForm = function () {
        var form;
        switch (this.activeSection) {
            case 'job-details':
                form = this.jobDetailsForm;
                break;
            case 'applications':
                form = this.applicationsForm;
                break;
            case 'hiring-team':
                form = this.hiringForm;
                break;
        }
        return form;
    };
    JobItemComponent.prototype.markFormGroupTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(function (c) { return _this.markFormGroupTouched(c); });
            }
        });
    };
    JobItemComponent.prototype.nextSection = function () {
        var index = this.sections.indexOf(this.activeSection);
        var nextIndex = (index + 1 < this.sections.length) ? index + 1 : 0;
        return this.sections[nextIndex];
    };
    JobItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-job-item',
            template: __webpack_require__(/*! ./job-item.component.html */ "./src/app/jobs/job-item/job-item.component.html"),
            styles: [__webpack_require__(/*! ./job-item.component.scss */ "./src/app/jobs/job-item/job-item.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _services_job_service__WEBPACK_IMPORTED_MODULE_3__["JobService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], JobItemComponent);
    return JobItemComponent;
}());



/***/ }),

/***/ "./src/app/jobs/jobs-list/jobs-list.component.html":
/*!*********************************************************!*\
  !*** ./src/app/jobs/jobs-list/jobs-list.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container fixed-width-container mh500\">\n    <div class=\"title-block\">\n        <h1 class=\"page-title\">Jobs</h1>\n        <div class=\"controls-block\">\n            <div class=\"control-link\">\n                <span class=\"icon\">\n                    <svg width=\"14px\" height=\"13px\" viewBox=\"0 0 14 13\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <g id=\"Recruit-Setup\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                            <g id=\"Job-View\" transform=\"translate(-274.000000, -113.000000)\" fill=\"#637381\" fill-rule=\"nonzero\">\n                                <g id=\"icons8-export\" transform=\"translate(274.000000, 113.000000)\">\n                                    <path d=\"M1.5,0 C0.6774686,0 0,0.6774686 0,1.5 L0,11.5 C0,12.322531 0.6774686,13 1.5,13 L11.5,13 C12.322531,13 13,12.322531 13,11.5 L13,10 L12,10 L12,11.5 C12,11.781469 11.781469,12 11.5,12 L1.5,12 C1.2185314,12 1,11.781469 1,11.5 L1,1.5 C1,1.2185314 1.2185314,1 1.5,1 L11.5,1 C11.781469,1 12,1.2185314 12,1.5 L12,3 L13,3 L13,1.5 C13,0.6774686 12.322531,0 11.5,0 L1.5,0 Z M9.728516,3.0214844 L9.021484,3.7285156 L11.292969,6 L4,6 L4,7 L11.292969,7 L9.021484,9.271484 L9.728516,9.978516 L13.207031,6.5 L9.728516,3.0214844 Z\"\n                                        id=\"Shape\"></path>\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </span>\n                <span class=\"text\">Export</span>\n            </div>\n            <div class=\"control-link\">\n                <span class=\"icon\">\n                    <svg width=\"13px\" height=\"13px\" viewBox=\"0 0 13 13\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <g id=\"Recruit-Setup\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                            <g id=\"Job-View\" transform=\"translate(-365.000000, -113.000000)\" fill=\"#637381\" fill-rule=\"nonzero\">\n                                <g id=\"icons8-import\" transform=\"translate(365.000000, 113.000000)\">\n                                    <path d=\"M1.5,0 C0.675781,0 0,0.675781 0,1.5 L0,11.5 C0,12.324219 0.675781,13 1.5,13 L11.5,13 C12.324219,13 13,12.324219 13,11.5 L13,9 L12,9 L12,11.5 C12,11.78125 11.78125,12 11.5,12 L1.5,12 C1.21875,12 1,11.78125 1,11.5 L1,1.5 C1,1.21875 1.21875,1 1.5,1 L11.5,1 C11.78125,1 12,1.21875 12,1.5 L12,4 L13,4 L13,1.5 C13,0.675781 12.324219,0 11.5,0 L1.5,0 Z M7.273438,3.023438 L3.792969,6.5 L7.273438,9.980469 L7.976563,9.269531 L5.707031,7 L13,7 L13,6 L5.707031,6 L7.976563,3.726563 L7.273438,3.023438 Z\"\n                                        id=\"Shape\"></path>\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </span>\n                <span class=\"text\">Import</span>\n            </div>\n            <div class=\"controls-separator\"></div>\n            <div class=\"control-link\">\n                <span class=\"icon\">\n                    <svg width=\"14px\" height=\"14px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <g id=\"Recruit-Setup\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                            <g id=\"Job-View\" transform=\"translate(-458.000000, -113.000000)\" fill=\"#637381\" fill-rule=\"nonzero\">\n                                <g id=\"icons8-settings\" transform=\"translate(458.000000, 113.000000)\">\n                                    <path d=\"M5.570313,0 L5.328125,1.289063 C4.398438,1.5625 3.570313,2.046875 2.890625,2.695313 L1.652344,2.261719 L0.222656,4.738281 L1.210938,5.585938 C1.097656,6.042969 1,6.507813 1,7 C1,7.492188 1.097656,7.957031 1.210938,8.414063 L0.222656,9.261719 L1.652344,11.738281 L2.886719,11.300781 C3.570313,11.957031 4.398438,12.4375 5.328125,12.714844 L5.570313,14 L8.429688,14 L8.671875,12.714844 C9.601563,12.4375 10.429688,11.953125 11.109375,11.300781 L12.34375,11.738281 L13.777344,9.261719 L12.785156,8.414063 C12.898438,7.957031 13,7.492188 13,7 C13,6.507813 12.902344,6.042969 12.789063,5.585938 L13.777344,4.738281 L12.347656,2.261719 L11.113281,2.695313 C10.429688,2.042969 9.601563,1.5625 8.671875,1.289063 L8.429688,0 L5.570313,0 Z M6.398438,1 L7.601563,1 L7.796875,2.054688 L8.117188,2.132813 C9.109375,2.359375 9.984375,2.878906 10.65625,3.597656 L10.878906,3.835938 L11.894531,3.480469 L12.496094,4.519531 L11.683594,5.21875 L11.78125,5.53125 C11.921875,5.992188 12,6.488281 12,7 C12,7.511719 11.921875,8.003906 11.78125,8.46875 L11.683594,8.78125 L12.496094,9.480469 L11.894531,10.519531 L10.878906,10.160156 L10.65625,10.402344 C9.984375,11.121094 9.109375,11.640625 8.117188,11.871094 L7.796875,11.941406 L7.601563,13 L6.398438,13 L6.203125,11.941406 L5.882813,11.871094 C4.890625,11.640625 4.015625,11.121094 3.34375,10.402344 L3.117188,10.160156 L2.101563,10.519531 L1.503906,9.480469 L2.316406,8.78125 L2.21875,8.46875 C2.078125,8.007813 2,7.511719 2,7 C2,6.488281 2.078125,5.992188 2.21875,5.53125 L2.316406,5.21875 L1.503906,4.519531 L2.101563,3.480469 L3.121094,3.835938 L3.34375,3.597656 C4.015625,2.878906 4.890625,2.359375 5.882813,2.132813 L6.203125,2.054688 L6.398438,1 Z M7,4 C5.347656,4 4,5.347656 4,7 C4,8.652344 5.347656,10 7,10 C8.652344,10 10,8.652344 10,7 C10,5.347656 8.652344,4 7,4 Z M7,5 C8.109375,5 9,5.890625 9,7 C9,8.109375 8.109375,9 7,9 C5.890625,9 5,8.109375 5,7 C5,5.890625 5.890625,5 7,5 Z\"\n                                        id=\"Shape\"></path>\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </span>\n                <span class=\"text\">Settings</span>\n            </div>\n            <button class=\"btn btn-primary w140 mla\" routerLink=\"/dashboard/jobs/new\">Add Job</button>\n        </div>\n    </div>\n    <div *ngIf=\"!list || !list.length && !contentLoading\">\n        <div class=\"section-separator\"></div>\n        <div class=\"placeholder-block\">\n            <div class=\"text-block\">\n                <h2 class=\"block-title\">Let’s add your first job spec</h2>\n                <div class=\"placeholder-content\">\n                    <p>Add a job automatically by dropping the job spec here or manually by clicking the Add Job button below.</p>\n                </div>\n                <div class=\"buttons-holder\">\n                    <button class=\"btn btn-primary w140\" routerLink=\"/dashboard/jobs/new\">Add Job</button>\n                    <button class=\"btn btn-primary btn-primary-inversed w140 ml20\">Import Job</button>\n                </div>\n            </div>\n            <div class=\"upload-block\">\n                <div class=\"upload-block-holder\">\n                    <div class=\"icon-holder\">\n                        <img src=\"/assets/images/upload.svg\" alt=\"Upload icon\" width=\"60\" height=\"49\" class=\"upload-icon\">\n                    </div>\n                    <span class=\"title-text\">Drop Job Spec to Upload</span>\n                    <span class=\"subtitle-text\">Upload Job Spec</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"section-separator\"></div>\n        <div class=\"info-block\">\n            <div class=\"info-icon\">?</div>\n            <span>Learn more about\n                <a href=\"#\">adding or importing jobs</a>\n            </span>\n        </div>\n    </div>\n    <div *ngIf=\"list && list.length\">\n        <div class=\"hc-list\">\n            <div class=\"hc-list-header\">\n                <div class=\"col col1 flex-5 hc-checkbox-col\">\n                    <div class=\"hc-checkbox\">\n                        <input type=\"checkbox\" [name]=\"selectall\" [id]=\"selectall\">\n                        <label [for]=\"selectall\"></label>\n                    </div>\n                </div>\n                <div class=\"col col2 flex-5 status-col\">\n                    <span class=\"status\"></span>\n                </div>\n                <div class=\"col col3 flex-20\">Job Title\n                    <span class=\"sort-icon\">\n                        <img src=\"/assets/images/sort_asc.svg\" alt=\"\" width=\"14\" height=\"13\">\n                    </span>\n                </div>\n                <div class=\"col col4 flex-20\">Location</div>\n                <div class=\"col col5 flex-10\">Type</div>\n                <div class=\"col col6 flex-10\">\n                    <img src=\"/assets/images/applications.svg\" alt=\"\" width=\"16\" height=\"10\">\n                </div>\n                <div class=\"col col7 flex-10\">\n                    <img src=\"/assets/images/time.svg\" alt=\"\" width=\"13\" height=\"13\">\n                </div>\n                <div class=\"col col8 flex-10\">\n                    <img src=\"/assets/images/recent.svg\" alt=\"\" width=\"14\" height=\"12\">\n                </div>\n                <div class=\"col col9 flex-10\">\n                    Hiring Team\n                </div>\n            </div>\n            <div class=\"nr-list-content\">\n                <div class=\"hc-blocker\"></div>\n                <div class=\"hc-list-row\" *ngFor=\"let item of list; let i = index\" (click)=\"onItemClick($event, item)\">\n                    <div class=\"hc-list-row-content\">\n                        <div class=\"col col1  flex-5  hc-checkbox-col\">\n                            <div class=\"hc-checkbox\">\n                                <input type=\"checkbox\" [name]=\"'listitem'+i\" [id]=\"'listitem'+i\">\n                                <label [for]=\"'listitem'+i\"></label>\n                            </div>\n                        </div>\n                        <div class=\"col col2  flex-5 status-col\">\n                            <span class=\"status\" [ngClass]=\"item.status ? item.status.toLowerCase() : ''\"></span>\n                        </div>\n                        <div class=\"col col3  flex-20\">\n                             {{item.title}}\n                        </div>\n                        <div class=\"col col4  flex-20\">{{item.location}}</div>\n                        <div class=\"col col5 flex-10\">\n                            <img *ngIf=\"item.type === 'permanent'\" src=\"/assets/images/bag.svg\" alt=\"\" width=\"14\" height=\"13\">\n                            <img *ngIf=\"item.type === 'temporary'\" src=\"/assets/images/refresh.svg\" alt=\"\" width=\"13\" height=\"13\">\n                        </div>\n                        <div class=\"col col6 flex-10\">{{item.applications}}\n                        </div>\n                        <div class=\"col col7 flex-10\">{{item.created}}\n                        </div>\n                        <div class=\"col col8 flex-10\">{{item.updated}}\n                        </div>\n                        <div class=\"col col9 flex-10 flex-row\">\n                            <div class=\"ava\"><img src=\"/assets/images/hiring-team-placeholder.png\" alt=\"\" width=\"20\" height=\"20\"></div>\n                            <button class=\"add-btn\"></button>\n                            <span class=\"mla\">...</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <app-loader *ngIf=\"contentLoading\"></app-loader>\n</div>"

/***/ }),

/***/ "./src/app/jobs/jobs-list/jobs-list.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/jobs/jobs-list/jobs-list.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/jobs/jobs-list/jobs-list.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/jobs/jobs-list/jobs-list.component.ts ***!
  \*******************************************************/
/*! exports provided: JobsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobsListComponent", function() { return JobsListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_job_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../services/job.service */ "./src/app/services/job.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var JobsListComponent = /** @class */ (function () {
    function JobsListComponent(router, jobService) {
        var _this = this;
        this.router = router;
        this.jobService = jobService;
        this.contentLoading = true;
        this.list = [];
        this.jobService.getAll()
            .subscribe(function (jobs) {
            _this.list = jobs;
            _this.contentLoading = false;
        });
    }
    JobsListComponent.prototype.ngOnInit = function () {
    };
    JobsListComponent.prototype.onItemClick = function (event, item) {
        event.preventDefault();
        this.router.navigate(["/dashboard/jobs/" + item.id]);
    };
    JobsListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jobs-list',
            template: __webpack_require__(/*! ./jobs-list.component.html */ "./src/app/jobs/jobs-list/jobs-list.component.html"),
            styles: [__webpack_require__(/*! ./jobs-list.component.scss */ "./src/app/jobs/jobs-list/jobs-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_job_service__WEBPACK_IMPORTED_MODULE_2__["JobService"]])
    ], JobsListComponent);
    return JobsListComponent;
}());



/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.html":
/*!**************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"error-page\">\n    <div>\n        <h1 data-h1=\"404\">404</h1>\n        <p data-p=\"NOT FOUND\">NOT FOUND</p>\n    </div>\n</div>\n<div id=\"particles-js\"></div>\n<script>\n    particlesJS(\"particles-js\", {\n            \"particles\": {\n                \"number\": {\n                    \"value\": 5,\n                    \"density\": {\n                        \"enable\": true,\n                        \"value_area\": 800\n                    }\n                },\n                \"color\": {\n                    \"value\": \"#fcfcfc\"\n                },\n                \"shape\": {\n                    \"type\": \"circle\",\n                },\n                \"opacity\": {\n                    \"value\": 0.5,\n                    \"random\": true,\n                    \"anim\": {\n                        \"enable\": false,\n                        \"speed\": 1,\n                        \"opacity_min\": 0.2,\n                        \"sync\": false\n                    }\n                },\n                \"size\": {\n                    \"value\": 140,\n                    \"random\": false,\n                    \"anim\": {\n                        \"enable\": true,\n                        \"speed\": 10,\n                        \"size_min\": 40,\n                        \"sync\": false\n                    }\n                },\n                \"line_linked\": {\n                    \"enable\": false,\n                },\n                \"move\": {\n                    \"enable\": true,\n                    \"speed\": 8,\n                    \"direction\": \"none\",\n                    \"random\": false,\n                    \"straight\": false,\n                    \"out_mode\": \"out\",\n                    \"bounce\": false,\n                    \"attract\": {\n                        \"enable\": false,\n                        \"rotateX\": 600,\n                        \"rotateY\": 1200\n                    }\n                }\n            },\n            \"interactivity\": {\n                \"detect_on\": \"canvas\",\n                \"events\": {\n                    \"onhover\": {\n                        \"enable\": false\n                    },\n                    \"onclick\": {\n                        \"enable\": false\n                    },\n                    \"resize\": true\n                }\n            },\n            \"retina_detect\": true\n        });\n</script>"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".error-page {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  height: 100%;\n  font-family: Arial, \"Helvetica Neue\", Helvetica, sans-serif; }\n\n.error-page h1 {\n  font-size: 30vh;\n  font-weight: bold;\n  position: relative;\n  margin: -8vh 0 0;\n  padding: 0; }\n\n.error-page h1:after {\n  content: attr(data-h1);\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  color: transparent;\n  /* webkit only for graceful degradation to IE */\n  background: -webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-size: 400%;\n  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.25);\n  -webkit-animation: animateTextBackground 10s ease-in-out infinite;\n          animation: animateTextBackground 10s ease-in-out infinite; }\n\n.error-page h1 + p {\n  color: #d6d6d6;\n  font-size: 8vh;\n  font-weight: bold;\n  line-height: 10vh;\n  max-width: 600px;\n  position: relative; }\n\n.error-page h1 + p:after {\n  content: attr(data-p);\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  color: transparent;\n  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);\n  -webkit-background-clip: text;\n  background-clip: text; }\n\n#particles-js {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n@-webkit-keyframes animateTextBackground {\n  0% {\n    background-position: 0 0; }\n  25% {\n    background-position: 100% 0; }\n  50% {\n    background-position: 100% 100%; }\n  75% {\n    background-position: 0 100%; }\n  100% {\n    background-position: 0 0; } }\n\n@keyframes animateTextBackground {\n  0% {\n    background-position: 0 0; }\n  25% {\n    background-position: 100% 0; }\n  50% {\n    background-position: 100% 100%; }\n  75% {\n    background-position: 0 100%; }\n  100% {\n    background-position: 0 0; } }\n\n@media (max-width: 767px) {\n  .error-page h1 {\n    font-size: 32vw; }\n  .error-page h1 + p {\n    font-size: 8vw;\n    line-height: 10vw;\n    max-width: 70vw; } }\n"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.ts":
/*!************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.ts ***!
  \************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__(/*! ./page-not-found.component.html */ "./src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__(/*! ./page-not-found.component.scss */ "./src/app/page-not-found/page-not-found.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/people/people-list/people-list.component.html":
/*!***************************************************************!*\
  !*** ./src/app/people/people-list/people-list.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>People</h1>"

/***/ }),

/***/ "./src/app/people/people-list/people-list.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/people/people-list/people-list.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/people/people-list/people-list.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/people/people-list/people-list.component.ts ***!
  \*************************************************************/
/*! exports provided: PeopleListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleListComponent", function() { return PeopleListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PeopleListComponent = /** @class */ (function () {
    function PeopleListComponent() {
    }
    PeopleListComponent.prototype.ngOnInit = function () {
    };
    PeopleListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-people-list',
            template: __webpack_require__(/*! ./people-list.component.html */ "./src/app/people/people-list/people-list.component.html"),
            styles: [__webpack_require__(/*! ./people-list.component.scss */ "./src/app/people/people-list/people-list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PeopleListComponent);
    return PeopleListComponent;
}());



/***/ }),

/***/ "./src/app/resolvers/user.resolver.ts":
/*!********************************************!*\
  !*** ./src/app/resolvers/user.resolver.ts ***!
  \********************************************/
/*! exports provided: UserResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserResolver", function() { return UserResolver; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserResolver = /** @class */ (function () {
    function UserResolver(http) {
        this.http = http;
    }
    UserResolver.prototype.resolve = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/me");
    };
    UserResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], UserResolver);
    return UserResolver;
}());



/***/ }),

/***/ "./src/app/services/job.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/job.service.ts ***!
  \*****************************************/
/*! exports provided: JobService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobService", function() { return JobService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JobService = /** @class */ (function () {
    function JobService(http) {
        this.http = http;
    }
    JobService.prototype.getAll = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_url + "/tenants/" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].tenant + "/jobs");
    };
    JobService.prototype.getJob = function (id) {
        if (id === 'new') {
            var newJob = {
                title: '',
                company: '',
                location: '',
                is_remote: false,
                job_type: 'full-time',
                number_of_hires: 1,
                education: 'bachelors',
                experience: 'mid',
                salary_from: null,
                salary_to: null,
                salary_period: 'yearly',
                hide_salary: false,
                description: "<div><p>Description</p><p></p><p></p><p></p><p>Requirements</p></div>",
                job_listing: 'default',
                resume_upload_required: true,
                email_missing_info: true,
                email_suggestions: true,
                application_field_name: 'required',
                application_field_email: 'required',
                application_field_phone: 'optional',
                application_field_current_location: 'optional',
                application_field_employment_equity_status: 'optional',
                application_field_gender: 'optional',
                application_field_experience_summary: 'required',
                application_field_work_history: 'required',
                application_field_education: 'required',
                application_field_cover_letter: 'optional',
                questionnaire: '',
                hiring_managers: [],
                team_members: [],
                default_email_name: '',
                status: 'BUILD',
                step_completed: 0
            };
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(newJob);
        }
        else {
            return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_url + "/tenants/" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].tenant + "/jobs/" + id);
        }
    };
    JobService.prototype.saveJob = function (job, activeSection, next) {
        if (job.id) {
            // Update
            return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_url + "/tenants/" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].tenant + "/jobs/" + job.id, {
                section: activeSection,
                data: job,
                next: next
            });
        }
        else {
            // Create
            return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_url + "/tenants/" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].tenant + "/jobs", {
                section: activeSection,
                data: job
            });
        }
    };
    JobService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], JobService);
    return JobService;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.me = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].api_url + "/me");
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/settings/email-templates/email-templates.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/settings/email-templates/email-templates.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Email Templates</h1>"

/***/ }),

/***/ "./src/app/settings/email-templates/email-templates.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/settings/email-templates/email-templates.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/settings/email-templates/email-templates.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/settings/email-templates/email-templates.component.ts ***!
  \***********************************************************************/
/*! exports provided: EmailTemplatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailTemplatesComponent", function() { return EmailTemplatesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmailTemplatesComponent = /** @class */ (function () {
    function EmailTemplatesComponent() {
    }
    EmailTemplatesComponent.prototype.ngOnInit = function () {
    };
    EmailTemplatesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-email-templates',
            template: __webpack_require__(/*! ./email-templates.component.html */ "./src/app/settings/email-templates/email-templates.component.html"),
            styles: [__webpack_require__(/*! ./email-templates.component.scss */ "./src/app/settings/email-templates/email-templates.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], EmailTemplatesComponent);
    return EmailTemplatesComponent;
}());



/***/ }),

/***/ "./src/app/settings/integrations/integrations.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/settings/integrations/integrations.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Integrations</h1>"

/***/ }),

/***/ "./src/app/settings/integrations/integrations.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/settings/integrations/integrations.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/settings/integrations/integrations.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/settings/integrations/integrations.component.ts ***!
  \*****************************************************************/
/*! exports provided: IntegrationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntegrationsComponent", function() { return IntegrationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IntegrationsComponent = /** @class */ (function () {
    function IntegrationsComponent() {
    }
    IntegrationsComponent.prototype.ngOnInit = function () {
    };
    IntegrationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-integrations',
            template: __webpack_require__(/*! ./integrations.component.html */ "./src/app/settings/integrations/integrations.component.html"),
            styles: [__webpack_require__(/*! ./integrations.component.scss */ "./src/app/settings/integrations/integrations.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], IntegrationsComponent);
    return IntegrationsComponent;
}());



/***/ }),

/***/ "./src/app/settings/questions/questions.component.html":
/*!*************************************************************!*\
  !*** ./src/app/settings/questions/questions.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Questionnaires</h1>\n"

/***/ }),

/***/ "./src/app/settings/questions/questions.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/settings/questions/questions.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/settings/questions/questions.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/settings/questions/questions.component.ts ***!
  \***********************************************************/
/*! exports provided: QuestionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionsComponent", function() { return QuestionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent() {
    }
    QuestionsComponent.prototype.ngOnInit = function () {
    };
    QuestionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-questions',
            template: __webpack_require__(/*! ./questions.component.html */ "./src/app/settings/questions/questions.component.html"),
            styles: [__webpack_require__(/*! ./questions.component.scss */ "./src/app/settings/questions/questions.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], QuestionsComponent);
    return QuestionsComponent;
}());



/***/ }),

/***/ "./src/app/settings/scorecards/scorecards.component.html":
/*!***************************************************************!*\
  !*** ./src/app/settings/scorecards/scorecards.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Scorecards</h1>"

/***/ }),

/***/ "./src/app/settings/scorecards/scorecards.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/settings/scorecards/scorecards.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/settings/scorecards/scorecards.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/settings/scorecards/scorecards.component.ts ***!
  \*************************************************************/
/*! exports provided: ScorecardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScorecardsComponent", function() { return ScorecardsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScorecardsComponent = /** @class */ (function () {
    function ScorecardsComponent() {
    }
    ScorecardsComponent.prototype.ngOnInit = function () {
    };
    ScorecardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-scorecards',
            template: __webpack_require__(/*! ./scorecards.component.html */ "./src/app/settings/scorecards/scorecards.component.html"),
            styles: [__webpack_require__(/*! ./scorecards.component.scss */ "./src/app/settings/scorecards/scorecards.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ScorecardsComponent);
    return ScorecardsComponent;
}());



/***/ }),

/***/ "./src/app/shared/loader/loader.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/loader/loader.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loader\">\n    <svg class=\"static\">\n        <path class=\"hc_logo\" d=\"M24.2 19.9c0 1.1 0.9 2 2 2c1.1 0 2-0.9 2-2c0-1.1-0.9-2-2-2C25.1 17.9 24.2 18.8 24.2 19.9z M25 16.4 c3.7 0 6.9 2.4 8.1 5.7l1.2 0c0 0 0.1 0 0.1 0c-1.3-4-5-6.8-9.4-6.8c-1.6 0-3 0.4-4.4 1l1.2 0.8C22.8 16.6 23.9 16.4 25 16.4z M34.7 24.5l-1 0.4c0 0 0 0.1 0 0.1c0 2-0.7 3.9-1.9 5.4l0.5 1.3c1.6-1.8 2.6-4.1 2.6-6.7c0-0.2 0-0.4 0-0.6 C34.8 24.5 34.8 24.5 34.7 24.5z M34.3 22.7l-12.9 0l-0.2-2c-0.1-0.9-1.2-0.8-1.4 0l-0.5 2c-0.3 1.1 0.5 1.8 1.1 2l2.6 1l-2.1 4.9 c-0.2 0.5 0.3 1.3 1.2 0.6l3.9-2.9l4.9 4.4c0.6 0.5 1.2 0 0.9-0.7l-2.3-6.4l5.1-1.8C35.4 23.6 35.3 22.7 34.3 22.7z M25 33.7 c-4.8 0-8.6-3.9-8.6-8.6c0-1.7 0.5-3.4 1.4-4.7l-0.9 0l0 0c-0.1 0-0.2 0-0.4-0.1c-0.8 1.4-1.2 3-1.2 4.8c0 5.4 4.4 9.8 9.8 9.8 c2 0 3.8-0.6 5.4-1.6l-0.9-0.8C28.2 33.2 26.7 33.7 25 33.7z M16.9 19.7l6.4 0c0.5 0 0.6-0.6 0.2-0.8L17.7 15 C15.8 14.5 14.7 19.5 16.9 19.7z M16 17.1c0.2-1.2 0.9-2 1.5-1.9c0.6 0.1 1 1.2 0.8 2.3c-0.2 1.2-0.9 2-1.5 1.9 C16.2 19.4 15.8 18.3 16 17.1z\"></path>\n    </svg>\n    <svg class=\"circular\">\n        <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"1.2\" stroke-miterlimit=\"10\"></circle>\n    </svg>\n</div>"

/***/ }),

/***/ "./src/app/shared/loader/loader.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/shared/loader/loader.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(249, 249, 251, 0.8);\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  display: flex;\n  z-index: 1100; }\n  :host .loader {\n    position: relative;\n    margin: 0 auto;\n    width: 100px;\n    height: 100px;\n    zoom: 1.8; }\n  :host .hc_logo {\n    fill: #212B35; }\n  :host .circular {\n    -webkit-animation: rotate 2s linear infinite;\n            animation: rotate 2s linear infinite;\n    height: 100px;\n    width: 100px; }\n  :host .static {\n    top: 25px;\n    left: 25px;\n    position: absolute;\n    height: 50px;\n    width: 50px; }\n  :host .path {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;\n            animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;\n    stroke-linecap: round; }\n  @-webkit-keyframes rotate {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n  @keyframes rotate {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n  @-webkit-keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35; }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124; } }\n  @keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35; }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124; } }\n  @-webkit-keyframes color {\n  100%, 0% {\n    stroke: #212B35; } }\n  @keyframes color {\n  100%, 0% {\n    stroke: #212B35; } }\n"

/***/ }),

/***/ "./src/app/shared/loader/loader.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/loader/loader.component.ts ***!
  \***************************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoaderComponent = /** @class */ (function () {
    function LoaderComponent() {
    }
    LoaderComponent.prototype.ngOnInit = function () {
    };
    LoaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loader',
            template: __webpack_require__(/*! ./loader.component.html */ "./src/app/shared/loader/loader.component.html"),
            styles: [__webpack_require__(/*! ./loader.component.scss */ "./src/app/shared/loader/loader.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LoaderComponent);
    return LoaderComponent;
}());



/***/ }),

/***/ "./src/app/validators/password.validator.ts":
/*!**************************************************!*\
  !*** ./src/app/validators/password.validator.ts ***!
  \**************************************************/
/*! exports provided: PasswordValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordValidation", function() { return PasswordValidation; });
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value;
        var confirmPassword = AC.get('confirm_password').value;
        if (password !== confirmPassword) {
            AC.get('confirm_password').setErrors({ MatchPassword: true });
        }
        else {
            return null;
        }
    };
    return PasswordValidation;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    googleClientId: '126341721679-s4d52tllits312rd649gv2n4gbniak1q.apps.googleusercontent.com',
    api_url: 'http://localhost:5000/hire-by-hellocrowd/us-central1/api',
    tenant: 'dimensiondata'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/macbook/Sites/HelloCrowd/HIRE-Web-App/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map