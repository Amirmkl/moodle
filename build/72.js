webpackJsonp([72],{

/***/ 2079:
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/core/course/providers/module-prefetch-delegate.ts
var module_prefetch_delegate = __webpack_require__(50);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var helper = __webpack_require__(38);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// CONCATENATED MODULE: ./src/addon/storagemanager/pages/course-storage/course-storage.ts
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
 * Page that displays the amount of file storage used by each activity on the course, and allows
 * the user to delete these files.
 */
var course_storage_AddonStorageManagerCourseStoragePage = /** @class */ (function () {
    function AddonStorageManagerCourseStoragePage(navParams, courseProvider, prefetchDelegate, courseHelperProvider, domUtils, translate) {
        this.courseProvider = courseProvider;
        this.prefetchDelegate = prefetchDelegate;
        this.courseHelperProvider = courseHelperProvider;
        this.domUtils = domUtils;
        this.translate = translate;
        this.course = navParams.get('course');
    }
    /**
     * View loaded.
     */
    AddonStorageManagerCourseStoragePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.courseProvider.getSections(this.course.id, false, true).then(function (sections) {
            _this.courseHelperProvider.addHandlerDataForModules(sections, _this.course.id);
            _this.sections = sections;
            _this.totalSize = 0;
            var allPromises = [];
            _this.sections.forEach(function (section) {
                section.totalSize = 0;
                section.modules.forEach(function (module) {
                    module.parentSection = section;
                    module.totalSize = 0;
                    // Note: This function only gets the size for modules which are downloadable.
                    // For other modules it always returns 0, even if they have downloaded some files.
                    // However there is no 100% reliable way to actually track the files in this case.
                    // You can maybe guess it based on the component and componentid.
                    // But these aren't necessarily consistent, for example mod_frog vs mmaModFrog.
                    // There is nothing enforcing correct values.
                    // Most modules which have large files are downloadable, so I think this is sufficient.
                    var promise = _this.prefetchDelegate.getModuleDownloadedSize(module, _this.course.id).
                        then(function (size) {
                        // There are some cases where the return from this is not a valid number.
                        if (!isNaN(size)) {
                            module.totalSize = Number(size);
                            section.totalSize += size;
                            _this.totalSize += size;
                        }
                    });
                    allPromises.push(promise);
                });
            });
            Promise.all(allPromises).then(function () {
                _this.loaded = true;
            });
        });
    };
    /**
     * The user has requested a delete for the whole course data.
     *
     * (This works by deleting data for each module on the course that has data.)
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteForCourse = function () {
        var modules = [];
        this.sections.forEach(function (section) {
            section.modules.forEach(function (module) {
                if (module.totalSize > 0) {
                    modules.push(module);
                }
            });
        });
        this.deleteModules(modules);
    };
    /**
     * The user has requested a delete for a section's data.
     *
     * (This works by deleting data for each module in the section that has data.)
     *
     * @param section Section object with information about section and modules
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteForSection = function (section) {
        var modules = [];
        section.modules.forEach(function (module) {
            if (module.totalSize > 0) {
                modules.push(module);
            }
        });
        this.deleteModules(modules);
    };
    /**
     * The user has requested a delete for a module's data
     *
     * @param module Module details
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteForModule = function (module) {
        if (module.totalSize > 0) {
            this.deleteModules([module]);
        }
    };
    /**
     * Deletes the specified modules, showing the loading overlay while it happens.
     *
     * @param modules Modules to delete
     * @return Promise<void> Once deleting has finished
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteModules = function (modules) {
        var _this = this;
        var modal = this.domUtils.showModalLoading();
        var promises = [];
        modules.forEach(function (module) {
            // Remove the files.
            var promise = _this.prefetchDelegate.removeModuleFiles(module, _this.course.id).then(function () {
                // When the files are removed, update the size.
                module.parentSection.totalSize -= module.totalSize;
                _this.totalSize -= module.totalSize;
                module.totalSize = 0;
            });
            promises.push(promise);
        });
        return Promise.all(promises).then(function () {
            modal.dismiss();
        }).catch(function (error) {
            modal.dismiss();
            _this.domUtils.showErrorModalDefault(error, _this.translate.instant('core.errordeletefile'));
        });
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonStorageManagerCourseStoragePage.prototype, "content", void 0);
    AddonStorageManagerCourseStoragePage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-storagemanager-course-storage',
            templateUrl: 'course-storage.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */],
            course["a" /* CoreCourseProvider */],
            module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */],
            helper["a" /* CoreCourseHelperProvider */],
            dom["a" /* CoreDomUtilsProvider */],
            _ngx_translate_core["c" /* TranslateService */]])
    ], AddonStorageManagerCourseStoragePage);
    return AddonStorageManagerCourseStoragePage;
}());

//# sourceMappingURL=course-storage.js.map
// CONCATENATED MODULE: ./src/addon/storagemanager/pages/course-storage/course-storage.module.ts
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
var course_storage_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var course_storage_module_AddonStorageManagerCourseStoragePageModule = /** @class */ (function () {
    function AddonStorageManagerCourseStoragePageModule() {
    }
    AddonStorageManagerCourseStoragePageModule = course_storage_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                course_storage_AddonStorageManagerCourseStoragePage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(course_storage_AddonStorageManagerCourseStoragePage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonStorageManagerCourseStoragePageModule);
    return AddonStorageManagerCourseStoragePageModule;
}());

//# sourceMappingURL=course-storage.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(90);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon_icon = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(91);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card-header.js
var card_header = __webpack_require__(321);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card-content.js
var card_content = __webpack_require__(490);

// EXTERNAL MODULE: ./src/pipes/bytes-to-size.ts
var bytes_to_size = __webpack_require__(1581);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/storagemanager/pages/course-storage/course-storage.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 















































var styles_AddonStorageManagerCourseStoragePage = [];
var RenderType_AddonStorageManagerCourseStoragePage = core["_29" /* ??crt */]({ encapsulation: 2, styles: styles_AddonStorageManagerCourseStoragePage, data: {} });

function View_AddonStorageManagerCourseStoragePage_5(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 0, "img", [["alt", ""], ["class", "core-module-icon"], ["role", "presentation"]], [[8, "src", 4]], null, null, null, null))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.handlerData.icon; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonStorageManagerCourseStoragePage_4(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 33, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ??eld */](2, 0, null, null, 30, "ion-item", [["class", "item item-block"], ["no-padding", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](3, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 8, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 9, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 10, { _icons: 1 }), core["_30" /* ??did */](7, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                                "])), (_l()(), core["_31" /* ??eld */](9, 0, null, 2, 5, "ion-row", [["class", "row"]], [[8, "className", 0]], null, null, null, null)), core["_30" /* ??did */](10, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                                    "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonStorageManagerCourseStoragePage_5)), core["_30" /* ??did */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](14, null, ["", "\n                                "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                                "])), (_l()(), core["_31" /* ??eld */](16, 0, null, 2, 6, "ion-row", [["class", "size row"]], null, null, null, null, null)), core["_30" /* ??did */](17, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ??eld */](19, 0, null, null, 1, "ion-icon", [["name", "cube"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ??did */](20, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ??ted */](21, null, ["\n                                    ", "\n                                "])), core["_49" /* ??ppd */](22, 1), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                                "])), (_l()(), core["_31" /* ??eld */](24, 0, null, 4, 7, "button", [["icon-only", ""], ["ion-button", ""], ["item-end", ""], ["outline", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deleteForModule(_v.parent.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](25, 1097728, [[9, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { outline: [0, "outline"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                                    "])), (_l()(), core["_31" /* ??eld */](27, 0, null, 0, 3, "core-icon", [["name", "trash"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ??did */](28, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"], ariaLabel: [1, "ariaLabel"] }, null), core["_48" /* ??pod */](29, { name: 0 }), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                                "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_1 = _v.parent.context.$implicit.handlerData.icon; _ck(_v, 13, 0, currVal_1); var currVal_4 = "cube"; _ck(_v, 20, 0, currVal_4); var currVal_6 = ""; _ck(_v, 25, 0, currVal_6); var currVal_7 = "trash"; var currVal_8 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 28, 1, core["_44" /* ??nov */](_v, 30).transform("addon.storagemanager.deletedatafrom", _ck(_v, 29, 0, _v.parent.context.$implicit.name))), ""); _ck(_v, 28, 0, currVal_7, currVal_8); }, function (_ck, _v) { var currVal_0 = core["_34" /* ??inlineInterpolate */](1, "", _v.parent.context.$implicit.handlerData.class, ""); _ck(_v, 9, 0, currVal_0); var currVal_2 = _v.parent.context.$implicit.name; _ck(_v, 14, 0, currVal_2); var currVal_3 = core["_44" /* ??nov */](_v, 20)._hidden; _ck(_v, 19, 0, currVal_3); var currVal_5 = core["_56" /* ??unv */](_v, 21, 0, _ck(_v, 22, 0, core["_44" /* ??nov */](_v.parent.parent.parent.parent, 0), _v.parent.context.$implicit.totalSize)); _ck(_v, 21, 0, currVal_5); }); }
function View_AddonStorageManagerCourseStoragePage_3(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonStorageManagerCourseStoragePage_4)), core["_30" /* ??did */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit.totalSize > 0); _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonStorageManagerCourseStoragePage_2(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 45, "ion-card", [["class", "section"]], null, null, null, null, null)), core["_30" /* ??did */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](3, 0, null, null, 34, "ion-card-header", [], null, null, null, null, null)), core["_30" /* ??did */](4, 16384, null, 0, card_header["a" /* CardHeader */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ??eld */](6, 0, null, null, 30, "ion-item", [["class", "item item-block"], ["no-padding", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](7, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 6, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 7, { _icons: 1 }), core["_30" /* ??did */](11, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ??eld */](13, 0, null, 2, 5, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ??did */](14, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ??eld */](16, 0, null, null, 1, "h2", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](17, null, ["", ""])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ??eld */](20, 0, null, 2, 6, "ion-row", [["class", "size row"]], null, null, null, null, null)), core["_30" /* ??did */](21, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ??eld */](23, 0, null, null, 1, "ion-icon", [["name", "cube"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ??did */](24, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ??ted */](25, null, ["\n                            ", "\n                        "])), core["_49" /* ??ppd */](26, 1), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ??eld */](28, 0, null, 4, 7, "button", [["icon-only", ""], ["ion-button", ""], ["item-end", ""], ["no-padding", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deleteForSection(_v.parent.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](29, 1097728, [[6, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                            "])), (_l()(), core["_31" /* ??eld */](31, 0, null, 0, 3, "core-icon", [["name", "trash"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ??did */](32, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"], ariaLabel: [1, "ariaLabel"] }, null), core["_48" /* ??pod */](33, { name: 0 }), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                        "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](39, 0, null, null, 5, "ion-card-content", [], null, null, null, null, null)), core["_30" /* ??did */](40, 16384, null, 0, card_content["a" /* CardContent */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonStorageManagerCourseStoragePage_3)), core["_30" /* ??did */](43, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_2 = "cube"; _ck(_v, 24, 0, currVal_2); var currVal_4 = "trash"; var currVal_5 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 32, 1, core["_44" /* ??nov */](_v, 34).transform("addon.storagemanager.deletedatafrom", _ck(_v, 33, 0, _v.parent.context.$implicit.name))), ""); _ck(_v, 32, 0, currVal_4, currVal_5); var currVal_6 = _v.parent.context.$implicit.modules; _ck(_v, 43, 0, currVal_6); }, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.name; _ck(_v, 17, 0, currVal_0); var currVal_1 = core["_44" /* ??nov */](_v, 24)._hidden; _ck(_v, 23, 0, currVal_1); var currVal_3 = core["_56" /* ??unv */](_v, 25, 0, _ck(_v, 26, 0, core["_44" /* ??nov */](_v.parent.parent, 0), _v.parent.context.$implicit.totalSize)); _ck(_v, 25, 0, currVal_3); }); }
function View_AddonStorageManagerCourseStoragePage_1(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonStorageManagerCourseStoragePage_2)), core["_30" /* ??did */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit.totalSize > 0); _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonStorageManagerCourseStoragePage_0(_l) { return core["_57" /* ??vid */](0, [core["_47" /* ??pid */](0, bytes_to_size["a" /* CoreBytesToSizePipe */], [logger["a" /* CoreLoggerProvider */], utils_text["a" /* CoreTextUtilsProvider */]]), core["_52" /* ??qud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ??eld */](2, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ??did */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ??eld */](5, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ??did */](6, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ??did */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ??eld */](9, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ??did */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ??ted */](11, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_31" /* ??eld */](16, 0, null, null, 49, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ??did */](17, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](19, 0, null, 1, 45, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ??did */](20, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ??eld */](22, 0, null, 0, 38, "ion-card", [["class", "wholecourse"]], null, null, null, null, null)), core["_30" /* ??did */](23, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ??eld */](25, 0, null, null, 34, "ion-card-header", [], null, null, null, null, null)), core["_30" /* ??did */](26, 16384, null, 0, card_header["a" /* CardHeader */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](28, 0, null, null, 1, "h1", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](29, null, ["", ""])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](31, 0, null, null, 2, "p", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](32, null, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](35, 0, null, null, 23, "ion-item", [["class", "item item-block"], ["no-padding", ""], ["padding-top", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](36, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 3, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 4, { _icons: 1 }), core["_30" /* ??did */](40, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ??eld */](42, 0, null, 2, 7, "ion-row", [["class", "size row"]], null, null, null, null, null)), core["_30" /* ??did */](43, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ??eld */](45, 0, null, null, 1, "ion-icon", [["name", "cube"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ??did */](46, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ??ted */](47, null, ["\n                        ", "\n                        ", "\n                    "])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_49" /* ??ppd */](49, 1), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ??eld */](51, 0, null, 4, 6, "button", [["icon-only", ""], ["ion-button", ""], ["item-end", ""], ["no-padding", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deleteForCourse() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](52, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ??eld */](54, 0, null, 0, 2, "core-icon", [["name", "trash"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ??did */](55, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"], ariaLabel: [1, "ariaLabel"] }, null), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ??and */](16777216, null, 0, 1, null, View_AddonStorageManagerCourseStoragePage_1)), core["_30" /* ??did */](63, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_5 = _co.loaded; _ck(_v, 20, 0, currVal_5); var currVal_9 = "cube"; _ck(_v, 46, 0, currVal_9); var currVal_13 = "trash"; var currVal_14 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 55, 1, core["_44" /* ??nov */](_v, 56).transform("addon.storagemanager.deletecourse")), ""); _ck(_v, 55, 0, currVal_13, currVal_14); var currVal_15 = _co.sections; _ck(_v, 63, 0, currVal_15); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ??nov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ??nov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ??unv */](_v, 11, 0, core["_44" /* ??nov */](_v, 12).transform("addon.storagemanager.managestorage")); _ck(_v, 11, 0, currVal_2); var currVal_3 = core["_44" /* ??nov */](_v, 17).statusbarPadding; var currVal_4 = core["_44" /* ??nov */](_v, 17)._hasRefresher; _ck(_v, 16, 0, currVal_3, currVal_4); var currVal_6 = _co.course.displayname; _ck(_v, 29, 0, currVal_6); var currVal_7 = core["_56" /* ??unv */](_v, 32, 0, core["_44" /* ??nov */](_v, 33).transform("addon.storagemanager.info")); _ck(_v, 32, 0, currVal_7); var currVal_8 = core["_44" /* ??nov */](_v, 46)._hidden; _ck(_v, 45, 0, currVal_8); var currVal_10 = core["_56" /* ??unv */](_v, 47, 0, core["_44" /* ??nov */](_v, 48).transform("addon.storagemanager.storageused")); var currVal_11 = core["_56" /* ??unv */](_v, 47, 1, _ck(_v, 49, 0, core["_44" /* ??nov */](_v, 0), _co.totalSize)); _ck(_v, 47, 0, currVal_10, currVal_11); var currVal_12 = (_co.totalSize == 0); _ck(_v, 51, 0, currVal_12); }); }
function View_AddonStorageManagerCourseStoragePage_Host_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "page-addon-storagemanager-course-storage", [], null, null, null, View_AddonStorageManagerCourseStoragePage_0, RenderType_AddonStorageManagerCourseStoragePage)), core["_30" /* ??did */](1, 49152, null, 0, course_storage_AddonStorageManagerCourseStoragePage, [nav_params["a" /* NavParams */], course["a" /* CoreCourseProvider */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], helper["a" /* CoreCourseHelperProvider */], dom["a" /* CoreDomUtilsProvider */], translate_service["a" /* TranslateService */]], null, null)], null, null); }
var AddonStorageManagerCourseStoragePageNgFactory = core["_27" /* ??ccf */]("page-addon-storagemanager-course-storage", course_storage_AddonStorageManagerCourseStoragePage, View_AddonStorageManagerCourseStoragePage_Host_0, {}, {}, []);

//# sourceMappingURL=course-storage.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/addon/storagemanager/pages/course-storage/course-storage.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonStorageManagerCourseStoragePageModuleNgFactory", function() { return AddonStorageManagerCourseStoragePageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonStorageManagerCourseStoragePageModuleNgFactory = core["_28" /* ??cmf */](course_storage_module_AddonStorageManagerCourseStoragePageModule, [], function (_l) { return core["_40" /* ??mod */]([core["_41" /* ??mpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ??CodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonStorageManagerCourseStoragePageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ??mpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ??a */]]]), core["_41" /* ??mpd */](4608, esm5_forms["x" /* ??i */], esm5_forms["x" /* ??i */], []), core["_41" /* ??mpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ??mpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ??mpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ??mpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ??mpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ??mpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ??mpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ??mpd */](512, esm5_forms["v" /* ??ba */], esm5_forms["v" /* ??ba */], []), core["_41" /* ??mpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ??mpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ??mpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ??mpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ??mpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ??mpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ??mpd */](512, course_storage_module_AddonStorageManagerCourseStoragePageModule, course_storage_module_AddonStorageManagerCourseStoragePageModule, []), core["_41" /* ??mpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ??mpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ??mpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], course_storage_AddonStorageManagerCourseStoragePage, [])]); });

//# sourceMappingURL=course-storage.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=72.js.map