webpackJsonp([111],{

/***/ 2047:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./src/addon/mod/feedback/components/components.module.ts
var components_components_module = __webpack_require__(730);

// EXTERNAL MODULE: ./src/addon/mod/feedback/providers/feedback.ts
var feedback = __webpack_require__(136);

// EXTERNAL MODULE: ./src/addon/mod/feedback/providers/helper.ts
var helper = __webpack_require__(256);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/attempt/attempt.ts
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
 * Page that displays a feedback attempt review.
 */
var attempt_AddonModFeedbackAttemptPage = /** @class */ (function () {
    function AddonModFeedbackAttemptPage(navParams, feedbackProvider, navCtrl, domUtils, feedbackHelper, textUtils) {
        this.feedbackProvider = feedbackProvider;
        this.navCtrl = navCtrl;
        this.domUtils = domUtils;
        this.feedbackHelper = feedbackHelper;
        this.textUtils = textUtils;
        this.component = feedback["a" /* AddonModFeedbackProvider */].COMPONENT;
        this.feedbackLoaded = false;
        this.feedbackId = navParams.get('feedbackId') || 0;
        this.courseId = navParams.get('courseId');
        this.attempt = navParams.get('attempt') || false;
        this.componentId = navParams.get('moduleId');
    }
    /**
     * View loaded.
     */
    AddonModFeedbackAttemptPage.prototype.ionViewDidLoad = function () {
        this.fetchData();
    };
    /**
     * Fetch all the data required for the view.
     *
     * @return Promise resolved when done.
     */
    AddonModFeedbackAttemptPage.prototype.fetchData = function () {
        var _this = this;
        // Get the feedback to be able to now if questions should be autonumbered.
        return this.feedbackProvider.getFeedbackById(this.courseId, this.feedbackId).then(function (feedback) {
            _this.feedback = feedback;
            return _this.feedbackProvider.getItems(_this.feedbackId);
        }).then(function (items) {
            // Add responses and format items.
            _this.items = items.items.map(function (item) {
                if (item.typ == 'label') {
                    item.submittedValue = _this.textUtils.replacePluginfileUrls(item.presentation, item.itemfiles);
                }
                else {
                    for (var x in _this.attempt.responses) {
                        if (_this.attempt.responses[x].id == item.id) {
                            item.submittedValue = _this.attempt.responses[x].printval;
                            break;
                        }
                    }
                }
                return _this.feedbackHelper.getItemForm(item, true);
            });
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
            // Some call failed on first fetch, go back.
            _this.navCtrl.pop();
            return Promise.reject(null);
        }).finally(function () {
            _this.feedbackLoaded = true;
        });
    };
    AddonModFeedbackAttemptPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-feedback-attempt',
            templateUrl: 'attempt.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], feedback["a" /* AddonModFeedbackProvider */], ionic_angular["s" /* NavController */],
            dom["a" /* CoreDomUtilsProvider */], helper["a" /* AddonModFeedbackHelperProvider */],
            utils_text["a" /* CoreTextUtilsProvider */]])
    ], AddonModFeedbackAttemptPage);
    return AddonModFeedbackAttemptPage;
}());

//# sourceMappingURL=attempt.js.map
// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/attempt/attempt.module.ts
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
var attempt_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var attempt_module_AddonModFeedbackAttemptPageModule = /** @class */ (function () {
    function AddonModFeedbackAttemptPageModule() {
    }
    AddonModFeedbackAttemptPageModule = attempt_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                attempt_AddonModFeedbackAttemptPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                pipes_module["a" /* CorePipesModule */],
                components_components_module["a" /* AddonModFeedbackComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(attempt_AddonModFeedbackAttemptPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModFeedbackAttemptPageModule);
    return AddonModFeedbackAttemptPageModule;
}());

//# sourceMappingURL=attempt.module.js.map
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

// EXTERNAL MODULE: ./src/core/block/components/only-title-block/only-title-block.ngfactory.js
var only_title_block_ngfactory = __webpack_require__(1539);

// EXTERNAL MODULE: ./src/core/block/components/pre-rendered-block/pre-rendered-block.ngfactory.js
var pre_rendered_block_ngfactory = __webpack_require__(1540);

// EXTERNAL MODULE: ./src/core/block/components/course-blocks/course-blocks.ngfactory.js
var course_blocks_ngfactory = __webpack_require__(1537);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1538);

// EXTERNAL MODULE: ./src/core/course/components/tag-area/tag-area.ngfactory.js
var tag_area_ngfactory = __webpack_require__(1541);

// EXTERNAL MODULE: ./src/addon/mod/feedback/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1550);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./src/directives/user-link.ts
var user_link = __webpack_require__(483);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

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

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(216);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(186);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(162);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(102);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ngfactory.js
var mark_required_ngfactory = __webpack_require__(95);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ts
var mark_required = __webpack_require__(85);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var filter = __webpack_require__(42);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var filter_providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(230);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

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

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/attempt/attempt.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


























































var styles_AddonModFeedbackAttemptPage = [];
var RenderType_AddonModFeedbackAttemptPage = core["_29" /* ??crt */]({ encapsulation: 2, styles: styles_AddonModFeedbackAttemptPage, data: {} });

function View_AddonModFeedbackAttemptPage_1(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.attempt.fullname; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackAttemptPage_2(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ": ", ""])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ??unv */](_v, 1, 0, core["_44" /* ??nov */](_v, 2).transform("addon.mod_feedback.response_nr")); var currVal_1 = _co.attempt.number; _ck(_v, 1, 0, currVal_0, currVal_1); }); }
function View_AddonModFeedbackAttemptPage_4(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""])), core["_49" /* ??ppd */](2, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ??unv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ??nov */](_v.parent.parent, 0), (_co.attempt.timemodified * 1000))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackAttemptPage_3(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 18, "a", [["class", "item item-block"], ["core-user-link", ""], ["ion-item", ""], ["text-wrap", ""]], [[1, "aria-label", 0], [8, "title", 0]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 81920, null, 0, user_link["a" /* CoreUserLinkDirective */], [core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]], [2, split_view["a" /* CoreSplitViewComponent */]]], { userId: [0, "userId"], courseId: [1, "courseId"] }, null), core["_30" /* ??did */](2, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 2, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 3, { _icons: 1 }), core["_30" /* ??did */](6, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](9, 0, null, 0, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ??did */](10, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { user: [0, "user"] }, null), core["_30" /* ??did */](11, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](13, 0, null, 2, 1, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](14, null, ["", ""])), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, 2, 1, null, View_AddonModFeedbackAttemptPage_4)), core["_30" /* ??did */](17, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.attempt.userid; var currVal_3 = _co.attempt.courseid; _ck(_v, 1, 0, currVal_2, currVal_3); var currVal_4 = _co.attempt; _ck(_v, 10, 0, currVal_4); var currVal_6 = _co.attempt.timemodified; _ck(_v, 17, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ??unv */](_v, 0, 0, core["_44" /* ??nov */](_v, 7).transform("core.user.viewprofile")); var currVal_1 = _co.attempt.fullname; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_5 = _co.attempt.fullname; _ck(_v, 14, 0, currVal_5); }); }
function View_AddonModFeedbackAttemptPage_6(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ""])), core["_49" /* ??ppd */](2, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ??unv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ??nov */](_v.parent.parent, 0), (_co.attempt.timemodified * 1000))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackAttemptPage_5(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 5, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 6, { _icons: 1 }), core["_30" /* ??did */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ??eld */](7, 0, null, 2, 3, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](8, null, ["", ": ", " (", ")"])), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_47" /* ??pid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, 2, 1, null, View_AddonModFeedbackAttemptPage_6)), core["_30" /* ??did */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.attempt.timemodified; _ck(_v, 13, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ??unv */](_v, 8, 0, core["_44" /* ??nov */](_v, 9).transform("addon.mod_feedback.response_nr")); var currVal_1 = _co.attempt.number; var currVal_2 = core["_56" /* ??unv */](_v, 8, 2, core["_44" /* ??nov */](_v, 10).transform("addon.mod_feedback.anonymous")); _ck(_v, 8, 0, currVal_0, currVal_1, currVal_2); }); }
function View_AddonModFeedbackAttemptPage_9(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 5, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ??qud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 8, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 9, { _icons: 1 }), core["_30" /* ??did */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], null, null); }
function View_AddonModFeedbackAttemptPage_12(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](1, null, ["", ". "]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.context.$implicit.itemnumber; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackAttemptPage_11(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 7, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ??did */](1, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                            "])), (_l()(), core["_26" /* ??and */](16777216, null, 0, 1, null, View_AddonModFeedbackAttemptPage_12)), core["_30" /* ??did */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_31" /* ??eld */](5, 16777216, null, 0, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ??did */](6, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.parent.context.$implicit.required; _ck(_v, 1, 0, currVal_0); var currVal_1 = (_co.feedback.autonumbering && _v.parent.parent.context.$implicit.itemnumber); _ck(_v, 4, 0, currVal_1); var currVal_2 = _v.parent.parent.context.$implicit.name; var currVal_3 = _co.component; var currVal_4 = _co.componentId; var currVal_5 = "module"; var currVal_6 = _co.feedback.coursemodule; var currVal_7 = _co.courseId; _ck(_v, 6, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }, null); }
function View_AddonModFeedbackAttemptPage_13(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ??eld */](1, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ??did */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.parent.context.$implicit.submittedValue; var currVal_1 = _co.component; var currVal_2 = _co.componentId; var currVal_3 = "module"; var currVal_4 = _co.feedback.coursemodule; var currVal_5 = _co.courseId; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }, null); }
function View_AddonModFeedbackAttemptPage_10(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 12, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ??did */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ??qud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ??qud */](603979776, 11, { _buttons: 1 }), core["_52" /* ??qud */](603979776, 12, { _icons: 1 }), core["_30" /* ??did */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ??and */](16777216, null, 2, 1, null, View_AddonModFeedbackAttemptPage_11)), core["_30" /* ??did */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ??and */](16777216, null, 2, 1, null, View_AddonModFeedbackAttemptPage_13)), core["_30" /* ??did */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 2, ["\n                    "]))], function (_ck, _v) { var currVal_0 = ((_v.parent.context.$implicit.dependitem > 0) ? "light" : ""); _ck(_v, 1, 0, currVal_0); var currVal_1 = _v.parent.context.$implicit.name; _ck(_v, 8, 0, currVal_1); var currVal_2 = _v.parent.context.$implicit.submittedValue; _ck(_v, 11, 0, currVal_2); }, null); }
function View_AddonModFeedbackAttemptPage_8(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 7, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonModFeedbackAttemptPage_9)), core["_30" /* ??did */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonModFeedbackAttemptPage_10)), core["_30" /* ??did */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit.typ == "pagebreak"); _ck(_v, 3, 0, currVal_0); var currVal_1 = (_v.context.$implicit.typ != "pagebreak"); _ck(_v, 6, 0, currVal_1); }, null); }
function View_AddonModFeedbackAttemptPage_7(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ??ted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonModFeedbackAttemptPage_8)), core["_30" /* ??did */](3, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.items; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonModFeedbackAttemptPage_0(_l) { return core["_57" /* ??vid */](0, [core["_47" /* ??pid */](0, format_date["a" /* CoreFormatDatePipe */], [logger["a" /* CoreLoggerProvider */], time["a" /* CoreTimeUtilsProvider */]]), (_l()(), core["_31" /* ??eld */](1, 0, null, null, 17, "ion-header", [], null, null, null, null, null)), core["_30" /* ??did */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ??eld */](4, 0, null, null, 13, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ??did */](5, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ??did */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ??eld */](8, 0, null, 3, 8, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ??did */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, 0, 1, null, View_AddonModFeedbackAttemptPage_1)), core["_30" /* ??did */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, 0, 1, null, View_AddonModFeedbackAttemptPage_2)), core["_30" /* ??did */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ??ted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"])), (_l()(), core["_31" /* ??eld */](20, 0, null, null, 19, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ??did */](21, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ??eld */](23, 0, null, 1, 15, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ??did */](24, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ??eld */](26, 0, null, 0, 11, "ion-list", [["no-margin", ""]], null, null, null, null, null)), core["_30" /* ??did */](27, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonModFeedbackAttemptPage_3)), core["_30" /* ??did */](30, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonModFeedbackAttemptPage_5)), core["_30" /* ??did */](33, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ??and */](16777216, null, null, 1, null, View_AddonModFeedbackAttemptPage_7)), core["_30" /* ??did */](36, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ??ted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ??ted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ??ted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ??ted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_2 = _co.attempt.fullname; _ck(_v, 12, 0, currVal_2); var currVal_3 = !_co.attempt.fullname; _ck(_v, 15, 0, currVal_3); var currVal_6 = _co.feedbackLoaded; _ck(_v, 24, 0, currVal_6); var currVal_7 = _co.attempt.fullname; _ck(_v, 30, 0, currVal_7); var currVal_8 = !_co.attempt.fullname; _ck(_v, 33, 0, currVal_8); var currVal_9 = (_co.items && _co.items.length); _ck(_v, 36, 0, currVal_9); }, function (_ck, _v) { var currVal_0 = core["_44" /* ??nov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ??nov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_4 = core["_44" /* ??nov */](_v, 21).statusbarPadding; var currVal_5 = core["_44" /* ??nov */](_v, 21)._hasRefresher; _ck(_v, 20, 0, currVal_4, currVal_5); }); }
function View_AddonModFeedbackAttemptPage_Host_0(_l) { return core["_57" /* ??vid */](0, [(_l()(), core["_31" /* ??eld */](0, 0, null, null, 1, "page-addon-mod-feedback-attempt", [], null, null, null, View_AddonModFeedbackAttemptPage_0, RenderType_AddonModFeedbackAttemptPage)), core["_30" /* ??did */](1, 49152, null, 0, attempt_AddonModFeedbackAttemptPage, [nav_params["a" /* NavParams */], feedback["a" /* AddonModFeedbackProvider */], nav_controller["a" /* NavController */], dom["a" /* CoreDomUtilsProvider */], helper["a" /* AddonModFeedbackHelperProvider */], utils_text["a" /* CoreTextUtilsProvider */]], null, null)], null, null); }
var AddonModFeedbackAttemptPageNgFactory = core["_27" /* ??ccf */]("page-addon-mod-feedback-attempt", attempt_AddonModFeedbackAttemptPage, View_AddonModFeedbackAttemptPage_Host_0, {}, {}, []);

//# sourceMappingURL=attempt.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/core/block/components/components.module.ts
var block_components_components_module = __webpack_require__(275);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/attempt/attempt.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModFeedbackAttemptPageModuleNgFactory", function() { return AddonModFeedbackAttemptPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








































var AddonModFeedbackAttemptPageModuleNgFactory = core["_28" /* ??cmf */](attempt_module_AddonModFeedbackAttemptPageModule, [], function (_l) { return core["_40" /* ??mod */]([core["_41" /* ??mpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ??CodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], only_title_block_ngfactory["a" /* CoreBlockOnlyTitleComponentNgFactory */], pre_rendered_block_ngfactory["a" /* CoreBlockPreRenderedComponentNgFactory */], course_blocks_ngfactory["a" /* CoreBlockCourseBlocksComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], tag_area_ngfactory["a" /* CoreCourseTagAreaComponentNgFactory */], index_ngfactory["a" /* AddonModFeedbackIndexComponentNgFactory */], AddonModFeedbackAttemptPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ??mpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ??a */]]]), core["_41" /* ??mpd */](4608, esm5_forms["x" /* ??i */], esm5_forms["x" /* ??i */], []), core["_41" /* ??mpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ??mpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ??mpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ??mpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ??mpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ??mpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ??mpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ??mpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ??mpd */](512, esm5_forms["v" /* ??ba */], esm5_forms["v" /* ??ba */], []), core["_41" /* ??mpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ??mpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ??mpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ??mpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ??mpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ??mpd */](512, block_components_components_module["a" /* CoreBlockComponentsModule */], block_components_components_module["a" /* CoreBlockComponentsModule */], []), core["_41" /* ??mpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ??mpd */](512, components_components_module["a" /* AddonModFeedbackComponentsModule */], components_components_module["a" /* AddonModFeedbackComponentsModule */], []), core["_41" /* ??mpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ??mpd */](512, attempt_module_AddonModFeedbackAttemptPageModule, attempt_module_AddonModFeedbackAttemptPageModule, []), core["_41" /* ??mpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ??mpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ??mpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], attempt_AddonModFeedbackAttemptPage, [])]); });

//# sourceMappingURL=attempt.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=111.js.map