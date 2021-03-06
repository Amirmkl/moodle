webpackJsonp([52],{

/***/ 2098:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/core/login/providers/helper.ts
var helper = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// CONCATENATED MODULE: ./src/core/login/pages/reconnect/reconnect.ts
// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Page to enter the user password to reconnect to a site.
 */
var reconnect_CoreLoginReconnectPage = /** @class */ (function () {
    function CoreLoginReconnectPage(navCtrl, navParams, fb, appProvider, sitesProvider, loginHelper, domUtils) {
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.sitesProvider = sitesProvider;
        this.loginHelper = loginHelper;
        this.domUtils = domUtils;
        this.showForgottenPassword = true;
        this.showSiteAvatar = false;
        var currentSite = this.sitesProvider.getCurrentSite();
        this.infoSiteUrl = navParams.get('infoSiteUrl');
        this.pageName = navParams.get('pageName');
        this.pageParams = navParams.get('pageParams');
        this.siteConfig = navParams.get('siteConfig');
        this.siteUrl = navParams.get('siteUrl');
        this.siteId = navParams.get('siteId');
        this.isLoggedOut = currentSite && currentSite.isLoggedOut();
        this.credForm = fb.group({
            password: ['', esm5_forms["u" /* Validators */].required]
        });
    }
    /**
     * View loaded.
     */
    CoreLoginReconnectPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.siteConfig) {
            this.identityProviders = this.loginHelper.getValidIdentityProviders(this.siteConfig);
            this.showForgottenPassword = !this.loginHelper.isForgottenPasswordDisabled(this.siteConfig);
        }
        this.sitesProvider.getSite(this.siteId).then(function (site) {
            _this.site = {
                id: site.id,
                fullname: site.infos.fullname,
                avatar: site.infos.userpictureurl
            };
            _this.username = site.infos.username;
            _this.siteUrl = site.infos.siteurl;
            _this.siteName = site.getSiteName();
            // Show logo instead of avatar if it's a fixed site.
            _this.showSiteAvatar = _this.site.avatar && !_this.loginHelper.getFixedSites();
            return site.getPublicConfig().then(function (config) {
                return _this.sitesProvider.checkRequiredMinimumVersion(config).then(function () {
                    // Check logoURL if user avatar is not set.
                    if (_this.site.avatar.startsWith(site.infos.siteurl + '/theme/image.php')) {
                        _this.showSiteAvatar = false;
                        _this.logoUrl = config.logourl || config.compactlogourl;
                    }
                    _this.showForgottenPassword = !_this.loginHelper.isForgottenPasswordDisabled(config);
                }).catch(function () {
                    _this.cancel();
                });
            }).catch(function () {
                // Ignore errors.
            });
        }).catch(function () {
            // Shouldn't happen. Just leave the view.
            _this.cancel();
        });
    };
    /**
     * Cancel reconnect.
     *
     * @param e Event.
     */
    CoreLoginReconnectPage.prototype.cancel = function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.sitesProvider.logout();
    };
    /**
     * Tries to authenticate the user.
     *
     * @param e Event.
     */
    CoreLoginReconnectPage.prototype.login = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        this.appProvider.closeKeyboard();
        // Get input data.
        var siteUrl = this.siteUrl, username = this.username, password = this.credForm.value.password;
        if (!password) {
            this.domUtils.showErrorModal('core.login.passwordrequired', true);
            return;
        }
        if (!this.appProvider.isOnline()) {
            this.domUtils.showErrorModal('core.networkerrormsg', true);
            return;
        }
        var modal = this.domUtils.showModalLoading();
        // Start the authentication process.
        this.sitesProvider.getUserToken(siteUrl, username, password).then(function (data) {
            return _this.sitesProvider.updateSiteToken(_this.infoSiteUrl, username, data.token, data.privateToken).then(function () {
                // Update site info too because functions might have changed (e.g. unisntall local_mobile).
                return _this.sitesProvider.updateSiteInfoByUrl(_this.infoSiteUrl, username).then(function () {
                    // Reset fields so the data is not in the view anymore.
                    _this.credForm.controls['password'].reset();
                    // Go to the site initial page.
                    return _this.loginHelper.goToSiteInitialPage(_this.navCtrl, _this.pageName, _this.pageParams);
                }).catch(function (error) {
                    if (error.loggedout) {
                        _this.loginHelper.treatUserTokenError(siteUrl, error, username, password);
                    }
                    else {
                        _this.domUtils.showErrorModalDefault(error, 'core.login.errorupdatesite', true);
                    }
                    // Error, go back to login page.
                    _this.cancel();
                });
            });
        }).catch(function (error) {
            _this.loginHelper.treatUserTokenError(siteUrl, error, username, password);
            if (error.loggedout) {
                _this.cancel();
            }
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Forgotten password button clicked.
     */
    CoreLoginReconnectPage.prototype.forgottenPassword = function () {
        this.loginHelper.forgottenPasswordClicked(this.navCtrl, this.siteUrl, this.credForm.value.username, this.siteConfig);
    };
    /**
     * An OAuth button was clicked.
     *
     * @param provider The provider that was clicked.
     */
    CoreLoginReconnectPage.prototype.oauthClicked = function (provider) {
        if (!this.loginHelper.openBrowserForOAuthLogin(this.siteUrl, provider, this.siteConfig.launchurl)) {
            this.domUtils.showErrorModal('Invalid data.');
        }
    };
    CoreLoginReconnectPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-login-reconnect',
            templateUrl: 'reconnect.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["s" /* NavController */],
            ionic_angular["t" /* NavParams */],
            esm5_forms["d" /* FormBuilder */],
            app["a" /* CoreAppProvider */],
            sites["a" /* CoreSitesProvider */],
            helper["a" /* CoreLoginHelperProvider */],
            dom["a" /* CoreDomUtilsProvider */]])
    ], CoreLoginReconnectPage);
    return CoreLoginReconnectPage;
}());

//# sourceMappingURL=reconnect.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// CONCATENATED MODULE: ./src/core/login/pages/reconnect/reconnect.module.ts
// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var reconnect_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var reconnect_module_CoreLoginReconnectPageModule = /** @class */ (function () {
    function CoreLoginReconnectPageModule() {
    }
    CoreLoginReconnectPageModule = reconnect_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                reconnect_CoreLoginReconnectPage
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(reconnect_CoreLoginReconnectPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ]
        })
    ], CoreLoginReconnectPageModule);
    return CoreLoginReconnectPageModule;
}());

//# sourceMappingURL=reconnect.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1524);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1525);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1526);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1527);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1528);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1529);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1530);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1531);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1532);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1533);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1534);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1535);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1536);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(162);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(231);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(48);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var filter = __webpack_require__(42);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var filter_providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list-header.js
var list_header = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(35);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./src/components/show-password/show-password.ngfactory.js
var show_password_ngfactory = __webpack_require__(741);

// EXTERNAL MODULE: ./src/components/show-password/show-password.ts
var show_password = __webpack_require__(382);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(92);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(166);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(121);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/core/login/pages/reconnect/reconnect.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




























































var styles_CoreLoginReconnectPage = [];
var RenderType_CoreLoginReconnectPage = core["_29" /* ??crt */]({ encapsulation: 2, styles: styles_CoreLoginReconnectPage, data: {} });

function View_CoreLoginReconnectPage_2(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 11, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](2, 0, null, null, 8, "ion-avatar", [], null, null, null, null, null)), core["_30" /* ??did */](3, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ??eld */](6, 0, null, null, 3, "img", [["class", "avatar"], ["core-external-content", ""], ["onError", "this.src='assets/img/user-avatar.png'"], ["role", "presentation"]], [[8, "alt", 0]], null, null, null, null)), core["_30" /* ??did */](7, 4734976, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils["a" /* CoreUtilsProvider */]], { siteId: [0, "siteId"], src: [1, "src"] }, null), core["_48" /* ??pod */](8, { $a: 0 }), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.site.id; var currVal_2 = _co.site.avatar; _ck(_v, 7, 0, currVal_1, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 6, 0, core["_44" /* ??nov */](_v, 9).transform("core.pictureof", _ck(_v, 8, 0, _co.site.fullname))), ""); _ck(_v, 6, 0, currVal_0); }); }
function View_CoreLoginReconnectPage_4(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "img", [["core-external-content", ""], ["role", "presentation"]], null, null, null, null, null)), core["_30" /* ??did */](1, 4734976, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils["a" /* CoreUtilsProvider */]], { siteId: [0, "siteId"], src: [1, "src"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.site.id; var currVal_1 = _co.logoUrl; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_CoreLoginReconnectPage_5(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 0, "img", [["class", "login-logo"], ["role", "presentation"], ["src", "assets/img/login_logo.png"]], null, null, null, null, null))], null, null); }
function View_CoreLoginReconnectPage_3(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 8, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_4)), core["_30" /* ??did */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_5)), core["_30" /* ??did */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.logoUrl; _ck(_v, 4, 0, currVal_0); var currVal_1 = !_co.logoUrl; _ck(_v, 7, 0, currVal_1); }, null); }
function View_CoreLoginReconnectPage_6(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "p", [["class", "item-heading core-siteurl"]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.siteUrl; _ck(_v, 1, 0, currVal_0); }); }
function View_CoreLoginReconnectPage_7(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, "p", [["class", "item-heading core-sitename"]], null, null, null, null, null)), (_l()(), core["_31" /* ??eld */](1, 16777216, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ??did */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], filter: [1, "filter"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.siteName; var currVal_1 = false; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_CoreLoginReconnectPage_8(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "p", [["class", "core-siteurl"]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.siteUrl; _ck(_v, 1, 0, currVal_0); }); }
function View_CoreLoginReconnectPage_9(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 5, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](2, 0, null, null, 1, "ion-icon", [["name", "alert"], ["padding", ""], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ??did */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ??ted */](4, null, [" ", "\n            "])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "alert"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ??nov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); var currVal_2 = core["_56" /* ??unv */](_v, 4, 0, core["_44" /* ??nov */](_v, 5).transform("core.login.reconnectdescription")); _ck(_v, 4, 0, currVal_2); }); }
function View_CoreLoginReconnectPage_1(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 23, "div", [["margin-bottom", ""], ["text-center", ""], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ??did */](1, 278528, null, 0, common["i" /* NgClass */], [core["E" /* IterableDiffers */], core["F" /* KeyValueDiffers */], core["t" /* ElementRef */], core["W" /* Renderer2 */]], { ngClass: [0, "ngClass"] }, null), core["_48" /* ??pod */](2, { "item-avatar-center": 0 }), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_2)), core["_30" /* ??did */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_3)), core["_30" /* ??did */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_6)), core["_30" /* ??did */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_7)), core["_30" /* ??did */](16, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_8)), core["_30" /* ??did */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_9)), core["_30" /* ??did */](22, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, _co.showSiteAvatar); _ck(_v, 1, 0, currVal_0); var currVal_1 = _co.showSiteAvatar; _ck(_v, 5, 0, currVal_1); var currVal_2 = !_co.showSiteAvatar; _ck(_v, 8, 0, currVal_2); var currVal_3 = !_co.siteName; _ck(_v, 12, 0, currVal_3); var currVal_4 = _co.siteName; _ck(_v, 16, 0, currVal_4); var currVal_5 = _co.siteName; _ck(_v, 19, 0, currVal_5); var currVal_6 = !_co.isLoggedOut; _ck(_v, 22, 0, currVal_6); }, null); }
function View_CoreLoginReconnectPage_10(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 6, "div", [["class", "core-login-forgotten-password"], ["padding-top", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ??eld */](2, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.forgottenPassword() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](3, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ??ted */](4, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 3, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ??unv */](_v, 4, 0, core["_44" /* ??nov */](_v, 5).transform("core.login.forgotten")); _ck(_v, 4, 0, currVal_2); }); }
function View_CoreLoginReconnectPage_12(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 8, "button", [["class", "core-oauth-icon item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.oauthClicked(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 11, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 12, { _icons: 1 }), core["_30" /* ??did */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](7, 0, null, 0, 0, "img", [["alt", ""], ["height", "32"], ["item-start", ""], ["width", "32"]], [[8, "src", 4]], null, null, null, null)), (_l()(), core["_55" /* ??ted */](8, 2, ["\n                ", "\n            "]))], null, function (_ck, _v) { var currVal_0 = core["_34" /* ??inlineInterpolate */](1, "", _v.context.$implicit.name, ""); _ck(_v, 0, 0, currVal_0); var currVal_1 = _v.context.$implicit.iconurl; _ck(_v, 7, 0, currVal_1); var currVal_2 = _v.context.$implicit.name; _ck(_v, 8, 0, currVal_2); }); }
function View_CoreLoginReconnectPage_11(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 14, "ion-list", [["class", "core-login-identity-providers"], ["padding-top", ""]], null, null, null, null, null)), core["_30" /* ??did */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ??eld */](3, 0, null, null, 7, "ion-list-header", [["class", "item"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 8, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 9, { _icons: 1 }), core["_30" /* ??did */](8, 16384, null, 0, list_header["a" /* ListHeader */], [config["a" /* Config */], core["V" /* Renderer */], core["t" /* ElementRef */], [8, null]], null, null), (_l()(), core["_55" /* ??ted */](9, 2, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_12)), core["_30" /* ??did */](13, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.identityProviders; _ck(_v, 13, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ??unv */](_v, 9, 0, core["_44" /* ??nov */](_v, 10).transform("core.login.potentialidps")); _ck(_v, 9, 0, currVal_0); }); }
function View_CoreLoginReconnectPage_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ??did */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ??eld */](3, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ??did */](4, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ??did */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ??eld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ??did */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ??ted */](9, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_31" /* ??eld */](14, 0, null, null, 79, "ion-content", [["class", "core-center-view"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ??did */](15, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](17, 0, null, 1, 75, "div", [["class", "box"]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_1)), core["_30" /* ??did */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ??eld */](22, 0, null, null, 61, "form", [["class", "core-login-form"], ["ion-list", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ??nov */](_v, 24).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ??nov */](_v, 24).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.login($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), core["_30" /* ??did */](23, 16384, null, 0, esm5_forms["w" /* ??bf */], [], null, null), core["_30" /* ??did */](24, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), core["_50" /* ??prd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ??did */](26, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ??eld */](28, 0, null, null, 9, "ion-item", [["class", "core-username item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](29, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 2, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 3, { _icons: 1 }), core["_30" /* ??did */](33, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](35, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](36, null, ["", ""])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ??eld */](39, 0, null, null, 17, "ion-item", [["class", "item item-block"], ["margin-bottom", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](40, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 5, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 6, { _icons: 1 }), core["_30" /* ??did */](44, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](46, 0, null, 3, 9, "core-show-password", [["item-content", ""]], null, null, null, show_password_ngfactory["b" /* View_CoreShowPasswordComponent_0 */], show_password_ngfactory["a" /* RenderType_CoreShowPasswordComponent */])), core["_30" /* ??did */](47, 4308992, null, 0, show_password["a" /* CoreShowPasswordComponent */], [core["t" /* ElementRef */], utils["a" /* CoreUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], platform["a" /* Platform */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ??eld */](49, 0, null, 0, 5, "ion-input", [["class", "core-ioninput-password"], ["formControlName", "password"], ["name", "password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ??did */](50, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ??prd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ??did */](52, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ??did */](53, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], clearOnEdit: [1, "clearOnEdit"], placeholder: [2, "placeholder"] }, null), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ??eld */](58, 0, null, null, 24, "ion-grid", [["class", "grid"], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ??did */](59, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](61, 0, null, null, 20, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ??did */](62, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ??eld */](64, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ??did */](65, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ??eld */](67, 0, null, null, 3, "a", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.cancel($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](68, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ??ted */](69, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ??eld */](73, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ??did */](74, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ??eld */](76, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], [[8, "disabled", 0]], null, null, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](77, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ??ted */](78, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n\n        "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_10)), core["_30" /* ??did */](87, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n\n        "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreLoginReconnectPage_11)), core["_30" /* ??did */](91, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_5 = _co.site; _ck(_v, 20, 0, currVal_5); var currVal_13 = _co.credForm; _ck(_v, 24, 0, currVal_13); var currVal_15 = "password"; _ck(_v, 47, 0, currVal_15); var currVal_23 = "password"; _ck(_v, 50, 0, currVal_23); var currVal_24 = "password"; var currVal_25 = false; var currVal_26 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 53, 2, core["_44" /* ??nov */](_v, 54).transform("core.login.password")), ""); _ck(_v, 53, 0, currVal_24, currVal_25, currVal_26); var currVal_27 = "light"; var currVal_28 = ""; _ck(_v, 68, 0, currVal_27, currVal_28); var currVal_31 = ""; _ck(_v, 77, 0, currVal_31); var currVal_33 = _co.showForgottenPassword; _ck(_v, 87, 0, currVal_33); var currVal_34 = (_co.identityProviders && _co.identityProviders.length); _ck(_v, 91, 0, currVal_34); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ??nov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ??nov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ??unv */](_v, 9, 0, core["_44" /* ??nov */](_v, 10).transform("core.login.reconnect")); _ck(_v, 9, 0, currVal_2); var currVal_3 = core["_44" /* ??nov */](_v, 15).statusbarPadding; var currVal_4 = core["_44" /* ??nov */](_v, 15)._hasRefresher; _ck(_v, 14, 0, currVal_3, currVal_4); var currVal_6 = core["_44" /* ??nov */](_v, 26).ngClassUntouched; var currVal_7 = core["_44" /* ??nov */](_v, 26).ngClassTouched; var currVal_8 = core["_44" /* ??nov */](_v, 26).ngClassPristine; var currVal_9 = core["_44" /* ??nov */](_v, 26).ngClassDirty; var currVal_10 = core["_44" /* ??nov */](_v, 26).ngClassValid; var currVal_11 = core["_44" /* ??nov */](_v, 26).ngClassInvalid; var currVal_12 = core["_44" /* ??nov */](_v, 26).ngClassPending; _ck(_v, 22, 0, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12); var currVal_14 = _co.username; _ck(_v, 36, 0, currVal_14); var currVal_16 = core["_44" /* ??nov */](_v, 52).ngClassUntouched; var currVal_17 = core["_44" /* ??nov */](_v, 52).ngClassTouched; var currVal_18 = core["_44" /* ??nov */](_v, 52).ngClassPristine; var currVal_19 = core["_44" /* ??nov */](_v, 52).ngClassDirty; var currVal_20 = core["_44" /* ??nov */](_v, 52).ngClassValid; var currVal_21 = core["_44" /* ??nov */](_v, 52).ngClassInvalid; var currVal_22 = core["_44" /* ??nov */](_v, 52).ngClassPending; _ck(_v, 49, 0, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22); var currVal_29 = core["_56" /* ??unv */](_v, 69, 0, core["_44" /* ??nov */](_v, 70).transform("core.login.cancel")); _ck(_v, 69, 0, currVal_29); var currVal_30 = !_co.credForm.valid; _ck(_v, 76, 0, currVal_30); var currVal_32 = core["_56" /* ??unv */](_v, 78, 0, core["_44" /* ??nov */](_v, 79).transform("core.login.loginbutton")); _ck(_v, 78, 0, currVal_32); }); }
function View_CoreLoginReconnectPage_Host_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "page-core-login-reconnect", [], null, null, null, View_CoreLoginReconnectPage_0, RenderType_CoreLoginReconnectPage)), core["_30" /* ??did */](1, 49152, null, 0, reconnect_CoreLoginReconnectPage, [nav_controller["a" /* NavController */], nav_params["a" /* NavParams */], esm5_forms["d" /* FormBuilder */], app["a" /* CoreAppProvider */], sites["a" /* CoreSitesProvider */], helper["a" /* CoreLoginHelperProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null)], null, null); }
var CoreLoginReconnectPageNgFactory = core["_27" /* ??ccf */]("page-core-login-reconnect", reconnect_CoreLoginReconnectPage, View_CoreLoginReconnectPage_Host_0, {}, {}, []);

//# sourceMappingURL=reconnect.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(371);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(372);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(374);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(373);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(724);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/core/login/pages/reconnect/reconnect.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreLoginReconnectPageModuleNgFactory", function() { return CoreLoginReconnectPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var CoreLoginReconnectPageModuleNgFactory = core["_28" /* ??cmf */](reconnect_module_CoreLoginReconnectPageModule, [], function (_l) { return core["_40" /* ??mod */]([core["_41" /* ??mpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ??CodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], CoreLoginReconnectPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ??mpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ??a */]]]), core["_41" /* ??mpd */](4608, esm5_forms["x" /* ??i */], esm5_forms["x" /* ??i */], []), core["_41" /* ??mpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ??mpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ??mpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ??mpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ??mpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ??mpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ??mpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ??mpd */](512, esm5_forms["v" /* ??ba */], esm5_forms["v" /* ??ba */], []), core["_41" /* ??mpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ??mpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ??mpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ??mpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ??mpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ??mpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ??mpd */](512, reconnect_module_CoreLoginReconnectPageModule, reconnect_module_CoreLoginReconnectPageModule, []), core["_41" /* ??mpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ??mpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ??mpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], reconnect_CoreLoginReconnectPage, [])]); });

//# sourceMappingURL=reconnect.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=52.js.map