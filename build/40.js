webpackJsonp([40],{

/***/ 2109:
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

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var filter = __webpack_require__(42);

// CONCATENATED MODULE: ./src/core/settings/pages/space-usage/space-usage.ts
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
 * Page that displays the space usage settings.
 */
var space_usage_CoreSettingsSpaceUsagePage = /** @class */ (function () {
    function CoreSettingsSpaceUsagePage(filePoolProvider, eventsProvider, sitesProvider, filterProvider, translate, domUtils, appProvider, courseProvider) {
        this.filePoolProvider = filePoolProvider;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.filterProvider = filterProvider;
        this.translate = translate;
        this.domUtils = domUtils;
        this.courseProvider = courseProvider;
        this.usageLoaded = false;
        this.sites = [];
        this.currentSiteId = '';
        this.totalUsage = 0;
        this.totalEntries = 0;
        this.currentSiteId = this.sitesProvider.getCurrentSiteId();
    }
    /**
     * View loaded.
     */
    CoreSettingsSpaceUsagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchData().finally(function () {
            _this.usageLoaded = true;
        });
    };
    /**
     * Convenience function to calculate each site's usage, and the total usage.
     *
     * @return Resolved when done.
     */
    CoreSettingsSpaceUsagePage.prototype.calculateSizeUsage = function () {
        var _this = this;
        return this.sitesProvider.getSortedSites().then(function (sites) {
            _this.sites = sites;
            // Get space usage.
            var promises = _this.sites.map(function (siteEntry) {
                return _this.sitesProvider.getSite(siteEntry.id).then(function (site) {
                    var proms2 = [];
                    proms2.push(_this.calcSiteClearRows(site).then(function (rows) {
                        siteEntry.cacheEntries = rows;
                    }));
                    proms2.push(site.getSpaceUsage().then(function (size) {
                        siteEntry.spaceUsage = size;
                    }));
                    return Promise.all(proms2);
                });
            });
            return Promise.all(promises);
        });
    };
    /**
     * Convenience function to calculate total usage.
     */
    CoreSettingsSpaceUsagePage.prototype.calculateTotalUsage = function () {
        var totalSize = 0, totalEntries = 0;
        this.sites.forEach(function (site) {
            totalSize += (site.spaceUsage ? parseInt(site.spaceUsage, 10) : 0);
            totalEntries += (site.cacheEntries ? parseInt(site.cacheEntries, 10) : 0);
        });
        this.totalUsage = totalSize;
        this.totalEntries = totalEntries;
    };
    /**
     * Convenience function to calculate space usage.
     *
     * @return Resolved when done.
     */
    CoreSettingsSpaceUsagePage.prototype.fetchData = function () {
        var _this = this;
        var promises = [
            this.calculateSizeUsage().then(function () { return _this.calculateTotalUsage(); }),
        ];
        return Promise.all(promises);
    };
    /**
     * Refresh the data.
     *
     * @param refresher Refresher.
     */
    CoreSettingsSpaceUsagePage.prototype.refreshData = function (refresher) {
        this.fetchData().finally(function () {
            refresher.complete();
        });
    };
    /**
     * Convenience function to update site size, along with total usage.
     *
     * @param site Site object with space usage.
     * @param newUsage New space usage of the site in bytes.
     */
    CoreSettingsSpaceUsagePage.prototype.updateSiteUsage = function (site, newUsage) {
        var oldUsage = site.spaceUsage;
        site.spaceUsage = newUsage;
        this.totalUsage -= oldUsage - newUsage;
    };
    /**
     * Calculate the number of rows to be deleted on a site.
     *
     * @param site Site object.
     * @return If there are rows to delete or not.
     */
    CoreSettingsSpaceUsagePage.prototype.calcSiteClearRows = function (site) {
        var clearTables = this.sitesProvider.getSiteTableSchemasToClear();
        var totalEntries = 0;
        var promises = clearTables.map(function (name) {
            return site.getDb().countRecords(name).then(function (rows) {
                totalEntries += rows;
            });
        });
        return Promise.all(promises).then(function () {
            return totalEntries;
        });
    };
    /**
     * Deletes files of a site and the tables that can be cleared.
     *
     * @param siteData Site object with space usage.
     */
    CoreSettingsSpaceUsagePage.prototype.deleteSiteStorage = function (siteData) {
        var _this = this;
        this.filterProvider.formatText(siteData.siteName, { clean: true, singleLine: true, filter: false }, [], siteData.id)
            .then(function (siteName) {
            var title = _this.translate.instant('core.settings.deletesitefilestitle');
            var message = _this.translate.instant('core.settings.deletesitefiles', { sitename: siteName });
            _this.domUtils.showConfirm(message, title).then(function () {
                return _this.sitesProvider.getSite(siteData.id);
            }).then(function (site) {
                // Clear cache tables.
                var cleanSchemas = _this.sitesProvider.getSiteTableSchemasToClear();
                var promises = cleanSchemas.map(function (name) {
                    return site.getDb().deleteRecords(name);
                });
                promises.push(site.deleteFolder().then(function () {
                    _this.filePoolProvider.clearAllPackagesStatus(site.id);
                    _this.filePoolProvider.clearFilepool(site.id);
                    _this.updateSiteUsage(siteData, 0);
                    _this.courseProvider.clearAllCoursesStatus(site.id);
                }).catch(function (error) {
                    if (error && error.code === FileError.NOT_FOUND_ERR) {
                        // Not found, set size 0.
                        _this.filePoolProvider.clearAllPackagesStatus(site.id);
                        _this.updateSiteUsage(siteData, 0);
                    }
                    else {
                        // Error, recalculate the site usage.
                        _this.domUtils.showErrorModal('core.settings.errordeletesitefiles', true);
                        site.getSpaceUsage().then(function (size) {
                            _this.updateSiteUsage(siteData, size);
                        });
                    }
                }).finally(function () {
                    _this.eventsProvider.trigger(events["a" /* CoreEventsProvider */].SITE_STORAGE_DELETED, {}, site.getId());
                    _this.calcSiteClearRows(site).then(function (rows) {
                        siteData.cacheEntries = rows;
                    });
                }));
                return Promise.all(promises);
            }).catch(function () {
                // Ignore cancelled confirmation modal.
            });
        });
    };
    CoreSettingsSpaceUsagePage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-settings-space-usage',
            templateUrl: 'space-usage.html',
        }),
        __metadata("design:paramtypes", [filepool["a" /* CoreFilepoolProvider */],
            events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */],
            filter["a" /* CoreFilterProvider */],
            _ngx_translate_core["c" /* TranslateService */],
            dom["a" /* CoreDomUtilsProvider */],
            app["a" /* CoreAppProvider */],
            course["a" /* CoreCourseProvider */]])
    ], CoreSettingsSpaceUsagePage);
    return CoreSettingsSpaceUsagePage;
}());

//# sourceMappingURL=space-usage.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// CONCATENATED MODULE: ./src/core/settings/pages/space-usage/space-usage.module.ts
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
var space_usage_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var space_usage_module_CoreSettingsSpaceUsagePageModule = /** @class */ (function () {
    function CoreSettingsSpaceUsagePageModule() {
    }
    CoreSettingsSpaceUsagePageModule = space_usage_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                space_usage_CoreSettingsSpaceUsagePage
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(space_usage_CoreSettingsSpaceUsagePage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreSettingsSpaceUsagePageModule);
    return CoreSettingsSpaceUsagePageModule;
}());

//# sourceMappingURL=space-usage.module.js.map
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

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(48);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./src/pipes/bytes-to-size.ts
var bytes_to_size = __webpack_require__(1581);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(161);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(175);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(102);

// CONCATENATED MODULE: ./src/core/settings/pages/space-usage/space-usage.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






















































var styles_CoreSettingsSpaceUsagePage = [];
var RenderType_CoreSettingsSpaceUsagePage = core["_29" /* ??crt */]({ encapsulation: 2, styles: styles_CoreSettingsSpaceUsagePage, data: {} });

function View_CoreSettingsSpaceUsagePage_2(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, "p", [["text-end", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""])), core["_49" /* ??ppd */](2, 1)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ??unv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ??nov */](_v.parent.parent, 0), _v.parent.context.$implicit.spaceUsage)); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreSettingsSpaceUsagePage_3(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 3, "p", [["text-end", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""])), core["_48" /* ??pod */](2, { $a: 0 }), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ??unv */](_v, 1, 0, core["_44" /* ??nov */](_v, 3).transform("core.settings.entriesincache", _ck(_v, 2, 0, _v.parent.context.$implicit.cacheEntries))); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreSettingsSpaceUsagePage_1(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 30, "ion-item", [["class", "item item-block"]], [[2, "core-primary-selected-item", null]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 2, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 3, { _icons: 1 }), core["_30" /* ??did */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ??eld */](7, 0, null, 2, 2, "h2", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_31" /* ??eld */](8, 16777216, null, null, 1, "core-format-text", [["clean", "true"]], null, null, null, null, null)), core["_30" /* ??did */](9, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], siteId: [1, "siteId"], clean: [2, "clean"] }, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ??eld */](11, 0, null, 2, 1, "p", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](12, null, ["", ""])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ??eld */](14, 0, null, 4, 7, "div", [["item-end", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreSettingsSpaceUsagePage_2)), core["_30" /* ??did */](17, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_CoreSettingsSpaceUsagePage_3)), core["_30" /* ??did */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ??eld */](23, 0, null, 4, 6, "button", [["clear", ""], ["color", "danger"], ["icon-only", ""], ["ion-button", ""], ["item-end", ""]], [[8, "hidden", 0], [1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deleteSiteStorage(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ??did */](24, 1097728, [[2, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], clear: [1, "clear"] }, null), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ??eld */](27, 0, null, 0, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ??did */](28, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n        "]))], function (_ck, _v) { var currVal_1 = _v.context.$implicit.siteName; var currVal_2 = _v.context.$implicit.id; var currVal_3 = "true"; _ck(_v, 9, 0, currVal_1, currVal_2, currVal_3); var currVal_5 = (_v.context.$implicit.spaceUsage != null); _ck(_v, 17, 0, currVal_5); var currVal_6 = (_v.context.$implicit.cacheEntries != null); _ck(_v, 20, 0, currVal_6); var currVal_9 = "danger"; var currVal_10 = ""; _ck(_v, 24, 0, currVal_9, currVal_10); var currVal_12 = "trash"; _ck(_v, 28, 0, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.context.$implicit.id == _co.currentSiteId); _ck(_v, 0, 0, currVal_0); var currVal_4 = _v.context.$implicit.fullName; _ck(_v, 12, 0, currVal_4); var currVal_7 = ((!_v.context.$implicit.spaceUsage > "0") && (!_v.context.$implicit.cacheEntries > "0")); var currVal_8 = core["_56" /* ??unv */](_v, 23, 1, core["_44" /* ??nov */](_v, 25).transform("core.settings.deletesitefilestitle")); _ck(_v, 23, 0, currVal_7, currVal_8); var currVal_11 = core["_44" /* ??nov */](_v, 28)._hidden; _ck(_v, 27, 0, currVal_11); }); }
function View_CoreSettingsSpaceUsagePage_0(_l) { return core["_57" /* ??vid */](0, [core["_47" /* ??pid */](0, bytes_to_size["a" /* CoreBytesToSizePipe */], [logger["a" /* CoreLoggerProvider */], utils_text["a" /* CoreTextUtilsProvider */]]), (_l()(), core["_31" /* ??eld */](1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ??did */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ??eld */](4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ??did */](5, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ??did */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ??eld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ??did */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ??ted */](10, 0, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_31" /* ??eld */](15, 0, null, null, 41, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ??did */](16, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](18, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ??did */](19, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ??eld */](21, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ??did */](22, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](26, 0, null, 1, 29, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ??did */](27, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ??and */](16777216, null, 0, 1, null, View_CoreSettingsSpaceUsagePage_1)), core["_30" /* ??did */](30, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ??eld */](32, 0, null, 0, 22, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](33, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 5, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 6, { _icons: 1 }), core["_30" /* ??did */](37, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ??eld */](39, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](40, null, ["", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ??eld */](43, 0, null, 4, 10, "div", [["item-end", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](45, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](46, null, ["", ""])), core["_49" /* ??ppd */](47, 1), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ??eld */](49, 0, null, null, 3, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](50, null, ["", ""])), core["_48" /* ??pod */](51, { $a: 0 }), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n        "])), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_7 = _co.usageLoaded; _ck(_v, 19, 0, currVal_7); var currVal_9 = core["_34" /* ??inlineInterpolate */](1, "", core["_56" /* ??unv */](_v, 22, 0, core["_44" /* ??nov */](_v, 23).transform("core.pulltorefresh")), ""); _ck(_v, 22, 0, currVal_9); var currVal_10 = _co.usageLoaded; _ck(_v, 27, 0, currVal_10); var currVal_11 = _co.sites; _ck(_v, 30, 0, currVal_11); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ??nov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ??nov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ??unv */](_v, 10, 0, core["_44" /* ??nov */](_v, 11).transform("core.settings.spaceusage")); _ck(_v, 10, 0, currVal_2); var currVal_3 = core["_44" /* ??nov */](_v, 16).statusbarPadding; var currVal_4 = core["_44" /* ??nov */](_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ??nov */](_v, 19).state !== "inactive"); var currVal_6 = core["_44" /* ??nov */](_v, 19)._top; _ck(_v, 18, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ??nov */](_v, 22).r.state; _ck(_v, 21, 0, currVal_8); var currVal_12 = core["_56" /* ??unv */](_v, 40, 0, core["_44" /* ??nov */](_v, 41).transform("core.settings.total")); _ck(_v, 40, 0, currVal_12); var currVal_13 = core["_56" /* ??unv */](_v, 46, 0, _ck(_v, 47, 0, core["_44" /* ??nov */](_v, 0), _co.totalUsage)); _ck(_v, 46, 0, currVal_13); var currVal_14 = core["_56" /* ??unv */](_v, 50, 0, core["_44" /* ??nov */](_v, 52).transform("core.settings.entriesincache", _ck(_v, 51, 0, _co.totalEntries))); _ck(_v, 50, 0, currVal_14); }); }
function View_CoreSettingsSpaceUsagePage_Host_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "page-core-settings-space-usage", [], null, null, null, View_CoreSettingsSpaceUsagePage_0, RenderType_CoreSettingsSpaceUsagePage)), core["_30" /* ??did */](1, 49152, null, 0, space_usage_CoreSettingsSpaceUsagePage, [filepool["a" /* CoreFilepoolProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], filter["a" /* CoreFilterProvider */], translate_service["a" /* TranslateService */], dom["a" /* CoreDomUtilsProvider */], app["a" /* CoreAppProvider */], course["a" /* CoreCourseProvider */]], null, null)], null, null); }
var CoreSettingsSpaceUsagePageNgFactory = core["_27" /* ??ccf */]("page-core-settings-space-usage", space_usage_CoreSettingsSpaceUsagePage, View_CoreSettingsSpaceUsagePage_Host_0, {}, {}, []);

//# sourceMappingURL=space-usage.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/core/settings/pages/space-usage/space-usage.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreSettingsSpaceUsagePageModuleNgFactory", function() { return CoreSettingsSpaceUsagePageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var CoreSettingsSpaceUsagePageModuleNgFactory = core["_28" /* ??cmf */](space_usage_module_CoreSettingsSpaceUsagePageModule, [], function (_l) { return core["_40" /* ??mod */]([core["_41" /* ??mpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ??CodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], CoreSettingsSpaceUsagePageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ??mpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ??a */]]]), core["_41" /* ??mpd */](4608, esm5_forms["x" /* ??i */], esm5_forms["x" /* ??i */], []), core["_41" /* ??mpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ??mpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ??mpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ??mpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ??mpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ??mpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ??mpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ??mpd */](512, esm5_forms["v" /* ??ba */], esm5_forms["v" /* ??ba */], []), core["_41" /* ??mpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ??mpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ??mpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ??mpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ??mpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ??mpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ??mpd */](512, space_usage_module_CoreSettingsSpaceUsagePageModule, space_usage_module_CoreSettingsSpaceUsagePageModule, []), core["_41" /* ??mpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ??mpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ??mpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], space_usage_CoreSettingsSpaceUsagePage, [])]); });

//# sourceMappingURL=space-usage.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=40.js.map