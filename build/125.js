webpackJsonp([125],{

/***/ 2031:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/core/pushnotifications/providers/pushnotifications.ts
var pushnotifications = __webpack_require__(138);

// EXTERNAL MODULE: ./src/addon/messageoutput/airnotifier/providers/airnotifier.ts
var airnotifier = __webpack_require__(498);

// CONCATENATED MODULE: ./src/addon/messageoutput/airnotifier/pages/devices/devices.ts
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
 * Page that displays the list of devices.
 */
var devices_AddonMessageOutputAirnotifierDevicesPage = /** @class */ (function () {
    function AddonMessageOutputAirnotifierDevicesPage(domUtils, airnotifierProivder, pushNotificationsProvider) {
        this.domUtils = domUtils;
        this.airnotifierProivder = airnotifierProivder;
        this.pushNotificationsProvider = pushNotificationsProvider;
        this.devices = [];
        this.devicesLoaded = false;
    }
    /**
     * View loaded.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.ionViewDidLoad = function () {
        this.fetchDevices();
    };
    /**
     * Fetches the list of devices.
     *
     * @return Promise resolved when done.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.fetchDevices = function () {
        var _this = this;
        return this.airnotifierProivder.getUserDevices().then(function (devices) {
            var pushId = _this.pushNotificationsProvider.getPushId();
            // Convert enabled to boolean and search current device.
            devices.forEach(function (device) {
                device.enable = !!device.enable;
                device.current = pushId && pushId == device.pushid;
            });
            _this.devices = devices;
        }).catch(function (message) {
            _this.domUtils.showErrorModal(message);
        }).finally(function () {
            _this.devicesLoaded = true;
        });
    };
    /**
     * Update list of devices after a certain time. The purpose is to store the updated data, it won't be reflected in the view.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.updateDevicesAfterDelay = function () {
        var _this = this;
        // Cancel pending updates.
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(function () {
            _this.updateTimeout = null;
            _this.updateDevices();
        }, 5000);
    };
    /**
     * Fetch devices. The purpose is to store the updated data, it won't be reflected in the view.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.updateDevices = function () {
        var _this = this;
        this.airnotifierProivder.invalidateUserDevices().finally(function () {
            _this.airnotifierProivder.getUserDevices();
        });
    };
    /**
     * Refresh the list of devices.
     *
     * @param refresher Refresher.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.refreshDevices = function (refresher) {
        var _this = this;
        this.airnotifierProivder.invalidateUserDevices().finally(function () {
            _this.fetchDevices().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Enable or disable a certain device.
     *
     * @param device The device object.
     * @param enable True to enable the device, false to disable it.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.enableDevice = function (device, enable) {
        var _this = this;
        device.updating = true;
        this.airnotifierProivder.enableDevice(device.id, enable).then(function () {
            // Update the list of devices since it was modified.
            _this.updateDevicesAfterDelay();
        }).catch(function (message) {
            // Show error and revert change.
            _this.domUtils.showErrorModal(message);
            device.enable = !device.enable;
        }).finally(function () {
            device.updating = false;
        });
    };
    /**
     * Page destroyed.
     */
    AddonMessageOutputAirnotifierDevicesPage.prototype.ngOnDestroy = function () {
        // If there is a pending action to update devices, execute it right now.
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
            this.updateDevices();
        }
    };
    AddonMessageOutputAirnotifierDevicesPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-message-output-airnotifier-devices',
            templateUrl: 'devices.html',
        }),
        __metadata("design:paramtypes", [dom["a" /* CoreDomUtilsProvider */], airnotifier["a" /* AddonMessageOutputAirnotifierProvider */],
            pushnotifications["a" /* CorePushNotificationsProvider */]])
    ], AddonMessageOutputAirnotifierDevicesPage);
    return AddonMessageOutputAirnotifierDevicesPage;
}());

//# sourceMappingURL=devices.js.map
// CONCATENATED MODULE: ./src/addon/messageoutput/airnotifier/pages/devices/devices.module.ts
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
var devices_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var devices_module_AddonMessageOutputAirnotifierDevicesPageModule = /** @class */ (function () {
    function AddonMessageOutputAirnotifierDevicesPageModule() {
    }
    AddonMessageOutputAirnotifierDevicesPageModule = devices_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                devices_AddonMessageOutputAirnotifierDevicesPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(devices_AddonMessageOutputAirnotifierDevicesPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessageOutputAirnotifierDevicesPageModule);
    return AddonMessageOutputAirnotifierDevicesPageModule;
}());

//# sourceMappingURL=devices.module.js.map
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

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(123);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.ngfactory.js
var toggle_ngfactory = __webpack_require__(728);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.js + 1 modules
var toggle = __webpack_require__(317);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/tap-click/haptic.js
var haptic = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(161);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(175);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(89);

// CONCATENATED MODULE: ./src/addon/messageoutput/airnotifier/pages/devices/devices.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













































var styles_AddonMessageOutputAirnotifierDevicesPage = [];
var RenderType_AddonMessageOutputAirnotifierDevicesPage = core["_29" /* ??crt */]({ encapsulation: 2, styles: styles_AddonMessageOutputAirnotifierDevicesPage, data: {} });

function View_AddonMessageOutputAirnotifierDevicesPage_2(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["(", ")"])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ??unv */](_v, 1, 0, core["_44" /* ??nov */](_v, 2).transform("core.currentdevice")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessageOutputAirnotifierDevicesPage_3(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "ion-spinner", [["item-end", ""]], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ??did */](1, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ??nov */](_v, 1)._paused; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonMessageOutputAirnotifierDevicesPage_1(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 23, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 2, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 3, { _icons: 1 }), core["_30" /* ??did */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](7, 0, null, 1, 5, "ion-label", [], [[2, "core-bold", null]], null, null, null, null)), core["_30" /* ??did */](8, 16384, [[1, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ??ted */](9, null, ["\n                    ", "\n                    "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonMessageOutputAirnotifierDevicesPage_2)), core["_30" /* ??did */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, 4, 1, null, View_AddonMessageOutputAirnotifierDevicesPage_3)), core["_30" /* ??did */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](17, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ??nov */](_v, 18)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_v.context.$implicit.enable = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = (_co.enableDevice(_v.context.$implicit, _v.context.$implicit.enable) !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ??did */](18, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], { disabled: [0, "disabled"] }, null), core["_50" /* ??prd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ??did */](20, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ??prd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ??did */](22, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_2 = _v.context.$implicit.current; _ck(_v, 11, 0, currVal_2); var currVal_3 = _v.context.$implicit.updating; _ck(_v, 15, 0, currVal_3); var currVal_14 = _v.context.$implicit.updating; _ck(_v, 18, 0, currVal_14); var currVal_15 = _v.context.$implicit.updating; var currVal_16 = _v.context.$implicit.enable; _ck(_v, 20, 0, currVal_15, currVal_16); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.current; _ck(_v, 7, 0, currVal_0); var currVal_1 = _v.context.$implicit.model; _ck(_v, 9, 0, currVal_1); var currVal_4 = core["_44" /* ??nov */](_v, 18)._disabled; var currVal_5 = core["_44" /* ??nov */](_v, 18)._value; var currVal_6 = core["_44" /* ??nov */](_v, 18)._activated; var currVal_7 = core["_44" /* ??nov */](_v, 22).ngClassUntouched; var currVal_8 = core["_44" /* ??nov */](_v, 22).ngClassTouched; var currVal_9 = core["_44" /* ??nov */](_v, 22).ngClassPristine; var currVal_10 = core["_44" /* ??nov */](_v, 22).ngClassDirty; var currVal_11 = core["_44" /* ??nov */](_v, 22).ngClassValid; var currVal_12 = core["_44" /* ??nov */](_v, 22).ngClassInvalid; var currVal_13 = core["_44" /* ??nov */](_v, 22).ngClassPending; _ck(_v, 17, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); }); }
function View_AddonMessageOutputAirnotifierDevicesPage_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ??did */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ??eld */](3, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ??did */](4, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ??did */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ??eld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ??did */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ??ted */](9, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_31" /* ??eld */](14, 0, null, null, 21, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ??did */](15, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](17, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshDevices($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ??did */](18, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ??eld */](20, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ??did */](21, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](25, 0, null, 1, 9, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ??did */](26, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ??eld */](28, 0, null, 0, 5, "ion-list", [], null, null, null, null, null)), core["_30" /* ??did */](29, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonMessageOutputAirnotifierDevicesPage_1)), core["_30" /* ??did */](32, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_7 = _co.devicesLoaded; _ck(_v, 18, 0, currVal_7); var currVal_9 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 21, 0, core["_44" /* ??nov */](_v, 22).transform("core.pulltorefresh")), ""); _ck(_v, 21, 0, currVal_9); var currVal_10 = _co.devicesLoaded; _ck(_v, 26, 0, currVal_10); var currVal_11 = _co.devices; _ck(_v, 32, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_44" /* ??nov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ??nov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ??unv */](_v, 9, 0, core["_44" /* ??nov */](_v, 10).transform("addon.messageoutput_airnotifier.processorsettingsdesc")); _ck(_v, 9, 0, currVal_2); var currVal_3 = core["_44" /* ??nov */](_v, 15).statusbarPadding; var currVal_4 = core["_44" /* ??nov */](_v, 15)._hasRefresher; _ck(_v, 14, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ??nov */](_v, 18).state !== "inactive"); var currVal_6 = core["_44" /* ??nov */](_v, 18)._top; _ck(_v, 17, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ??nov */](_v, 21).r.state; _ck(_v, 20, 0, currVal_8); }); }
function View_AddonMessageOutputAirnotifierDevicesPage_Host_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "page-addon-message-output-airnotifier-devices", [], null, null, null, View_AddonMessageOutputAirnotifierDevicesPage_0, RenderType_AddonMessageOutputAirnotifierDevicesPage)), core["_30" /* ??did */](1, 180224, null, 0, devices_AddonMessageOutputAirnotifierDevicesPage, [dom["a" /* CoreDomUtilsProvider */], airnotifier["a" /* AddonMessageOutputAirnotifierProvider */], pushnotifications["a" /* CorePushNotificationsProvider */]], null, null)], null, null); }
var AddonMessageOutputAirnotifierDevicesPageNgFactory = core["_27" /* ??ccf */]("page-addon-message-output-airnotifier-devices", devices_AddonMessageOutputAirnotifierDevicesPage, View_AddonMessageOutputAirnotifierDevicesPage_Host_0, {}, {}, []);

//# sourceMappingURL=devices.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/addon/messageoutput/airnotifier/pages/devices/devices.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessageOutputAirnotifierDevicesPageModuleNgFactory", function() { return AddonMessageOutputAirnotifierDevicesPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonMessageOutputAirnotifierDevicesPageModuleNgFactory = core["_28" /* ??cmf */](devices_module_AddonMessageOutputAirnotifierDevicesPageModule, [], function (_l) { return core["_40" /* ??mod */]([core["_41" /* ??mpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ??CodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonMessageOutputAirnotifierDevicesPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ??mpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ??a */]]]), core["_41" /* ??mpd */](4608, esm5_forms["x" /* ??i */], esm5_forms["x" /* ??i */], []), core["_41" /* ??mpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ??mpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ??mpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ??mpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ??mpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ??mpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ??mpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ??mpd */](512, esm5_forms["v" /* ??ba */], esm5_forms["v" /* ??ba */], []), core["_41" /* ??mpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ??mpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ??mpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ??mpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ??mpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ??mpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ??mpd */](512, devices_module_AddonMessageOutputAirnotifierDevicesPageModule, devices_module_AddonMessageOutputAirnotifierDevicesPageModule, []), core["_41" /* ??mpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ??mpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ??mpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], devices_AddonMessageOutputAirnotifierDevicesPage, [])]); });

//# sourceMappingURL=devices.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=125.js.map