(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/home/home.module": [
		"./src/app/home/home.module.ts",
		"app-home-home-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

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
/* harmony import */ var _book_book_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./book/book.component */ "./src/app/book/book.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: "",
        loadChildren: "app/home/home.module#HomeModule"
    },
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "miriam",
        // redirectTo: "/miriam",
        pathMatch: "full",
        component: _book_book_component__WEBPACK_IMPORTED_MODULE_2__["BookComponent"]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
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

module.exports = "<div #container class=\"container carbon--theme--g100\">\n\t<div class=\"demo-content\" ibmGrid>\n\t\t<div ibmRow>\n\t\t\t<div ibmCol [columnNumbers]=\"{'lg':11, 'md':11, 'sm': 11}\">\n\t\t\t\t<h1 class=\"title\">Maged<br>Hennawy</h1>\n\t\t\t</div>\n\t\t\t<div ibmCol [columnNumbers]=\"{'lg':1, 'md':1, 'sm': 1}\">\n\t\t\t\t<a routerLink=\"/miriam\" class=\"hidden\">For Miriam</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div ibmRow>\n\t\t\t<p style=\"margin-top: 2rem; padding: 0 10px;\">This is how you can keep up with my life as a developer</p>\n\t\t</div>\n\t\t<div class=\"body-text\" ibmRow>\n\t\t\t<div ibmCol [columnNumbers]=\"{'lg':6, 'md':12, 'sm': 12}\">\n\t\t\t\t<p>\n\t\t\t\t\tI'm a software developer with a heavy interest in full-stack development, focused on Angular, and currently on my way to be your favourite react developer.\n\t\t\t\t\tThis website was built using IBM's very own Carbon theme. Built by my old team and yours truly.\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<div ibmCol [columnNumbers]=\"{'lg':6, 'md':12, 'sm': 12}\">\n\t\t\t\t<p>\n\t\t\t\t\tWho am I?\n\t\t\t\t</p>\n\t\t\t\t<br>\n\t\t\t\t<ul ibmList class=\"list\">\n\t\t\t\t\t<li ibmListItem>UofT CS Alumni</li>\n\t\t\t\t\t<li ibmListItem>Full-stack developer</li>\n\t\t\t\t\t<li ibmListItem>Script Builder</li>\n\t\t\t\t\t<li ibmListItem>Un-unethical Hacker</li>\n\t\t\t\t\t<li ibmListItem style=\"list-style-position: inside; padding-left: 16px; text-indent: -0.5em;\">UX Designer</li>\n\t\t\t\t\t<li ibmListItem>Car Enthusiast</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  min-width: 100%;\n  min-height: 100%;\n  padding: 2rem 5% 0; }\n\n.demo-content {\n  margin-top: 1rem; }\n\n.demo-content .title {\n    font-size: 4rem;\n    font-weight: 400; }\n\n.demo-content .hidden {\n    font-size: 8px; }\n\n.demo-content .body-text {\n    margin-top: 2rem;\n    margin-bottom: 4rem; }\n\n.demo-content .list {\n    max-width: 500px;\n    padding-left: 50px;\n    -webkit-column-count: 2;\n       -moz-column-count: 2;\n            column-count: 2; }\n\n.demo-content .list li {\n      font-weight: bold; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFxwcmluY1xcRGVza3RvcFxcbWFnZWRoZW5uYXd5LmdpdGh1Yi5pby9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0Msa0JBQWtCO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxlQUFlO0VBQ2xCLGdCQUFnQjtFQUNoQixrQkFBa0IsRUFBQTs7QUFHbkI7RUFDQyxnQkFBZ0IsRUFBQTs7QUFEakI7SUFJRSxlQUFlO0lBQ2YsZ0JBQWdCLEVBQUE7O0FBTGxCO0lBU0UsY0FBYyxFQUFBOztBQVRoQjtJQWNFLGdCQUFnQjtJQUNoQixtQkFBbUIsRUFBQTs7QUFmckI7SUFtQkUsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQix1QkFBZTtPQUFmLG9CQUFlO1lBQWYsZUFBZSxFQUFBOztBQXJCakI7TUF3QkcsaUJBQWlCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vYXNzZXRzL3Njc3Mvc2Nzcy11dGlscy5zY3NzXCI7XG5cbi5jb250YWluZXIge1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAxMDAlO1xuXHRwYWRkaW5nOiAycmVtIDUlIDA7XG59XG5cbi5kZW1vLWNvbnRlbnQge1xuXHRtYXJnaW4tdG9wOiAxcmVtO1xuXG5cdC50aXRsZSB7XG5cdFx0Zm9udC1zaXplOiA0cmVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdH1cblxuXHQuaGlkZGVuIHtcblx0XHRmb250LXNpemU6IDhweDtcblx0XHRcblx0fVxuXG5cdC5ib2R5LXRleHQge1xuXHRcdG1hcmdpbi10b3A6IDJyZW07XG5cdFx0bWFyZ2luLWJvdHRvbTogNHJlbTtcblx0fVxuXG5cdC5saXN0IHtcblx0XHRtYXgtd2lkdGg6IDUwMHB4O1xuXHRcdHBhZGRpbmctbGVmdDogNTBweDtcblx0XHRjb2x1bW4tY291bnQ6IDI7XG5cblx0XHRsaSB7XG5cdFx0XHRmb250LXdlaWdodDogYm9sZDtcblx0XHR9XG5cdH1cbn1cbiJdfQ== */"

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
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("container"),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "container", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
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
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! carbon-components-angular */ "./node_modules/carbon-components-angular/index.js");
/* harmony import */ var _book_book_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./book/book.module */ "./src/app/book/book.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__["ListModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__["RadioModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_7__["GridModule"],
                _book_book_module__WEBPACK_IMPORTED_MODULE_8__["BookModule"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/book/book.component.html":
/*!******************************************!*\
  !*** ./src/app/book/book.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"pdf-container\">\n  <pdf-viewer [src]=\"src2\"\n              [render-text]=\"true\"\n  ></pdf-viewer>\n</div> "

/***/ }),

/***/ "./src/app/book/book.component.scss":
/*!******************************************!*\
  !*** ./src/app/book/book.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".demo-content {\n  display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYm9vay9DOlxcVXNlcnNcXHByaW5jXFxEZXNrdG9wXFxtYWdlZGhlbm5hd3kuZ2l0aHViLmlvL3NyY1xcYXBwXFxib29rXFxib29rLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsYUFBYSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvYm9vay9ib29rLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRlbW8tY29udGVudHtcblx0ZGlzcGxheTogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/book/book.component.ts":
/*!****************************************!*\
  !*** ./src/app/book/book.component.ts ***!
  \****************************************/
/*! exports provided: BookComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookComponent", function() { return BookComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BookComponent = /** @class */ (function () {
    function BookComponent() {
        this.src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
        this.src2 = "/assets/book/Genesis37.pdf";
    }
    BookComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-home",
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! ./book.component.html */ "./src/app/book/book.component.html"),
            styles: [__webpack_require__(/*! ./book.component.scss */ "./src/app/book/book.component.scss")]
        })
    ], BookComponent);
    return BookComponent;
}());



/***/ }),

/***/ "./src/app/book/book.module.ts":
/*!*************************************!*\
  !*** ./src/app/book/book.module.ts ***!
  \*************************************/
/*! exports provided: BookModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookModule", function() { return BookModule; });
/* harmony import */ var _book_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./book.component */ "./src/app/book/book.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! carbon-components-angular */ "./node_modules/carbon-components-angular/index.js");
/* harmony import */ var ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-pdf-viewer */ "./node_modules/ng2-pdf-viewer/fesm5/ng2-pdf-viewer.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




 // <- import OrderModule
var BookModule = /** @class */ (function () {
    function BookModule() {
    }
    BookModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_3__["AccordionModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_3__["TabsModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_3__["TilesModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_3__["GridModule"],
                ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_4__["PdfViewerModule"]
            ],
            declarations: [_book_component__WEBPACK_IMPORTED_MODULE_0__["BookComponent"]]
        })
    ], BookModule);
    return BookModule;
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
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


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
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\princ\Desktop\magedhennawy.github.io\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map