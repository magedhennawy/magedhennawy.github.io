(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-home-home-module"],{

/***/ "./src/app/home/home-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home/home.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: "",
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    }];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/home/home-routing.module.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home/home.component.ts");
/* harmony import */ var carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! carbon-components-angular */ "./node_modules/carbon-components-angular/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_2__["HomeRoutingModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__["AccordionModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__["TabsModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__["TilesModule"],
                carbon_components_angular__WEBPACK_IMPORTED_MODULE_4__["GridModule"]
            ],
            declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"]]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/home/home/home.component.html":
/*!***********************************************!*\
  !*** ./src/app/home/home/home.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ibm-tabs>\n\t<ibm-tab heading=\"You May Like\">\n\t\t<p>Cool Things</p><br>\n\t\t<p style=\"margin-bottom: 2rem;\">\n\t\t\tThis is where I will be compiling the cool things that I want to show off\n\t\t</p>\n\t\t<p>Such as:</p><br>\n\t\t<div ibmGrid>\n\t\t\t<div ibmRow>\n\t\t\t\t<div ibmCol [columnNumbers]=\"{'md':3, 'sm': 12}\">\n\t\t\t\t\t<ibm-clickable-tile href=\"https://github.com/magedhennawy\" target=\"_blank\">My Repository</ibm-clickable-tile>\n\t\t\t\t</div>\n\t\t\t\t<div ibmCol [columnNumbers]=\"{'md':3, 'sm': 12}\">\n\t\t\t\t\t<ibm-clickable-tile href=\"https://github.com/IBM/carbon-components-angular\" target=\"_blank\">Carbon Component Library</ibm-clickable-tile>\n\t\t\t\t</div>\n\t\t\t\t<div ibmCol [columnNumbers]=\"{'md':3, 'sm': 12}\">\n\t\t\t\t\t<ibm-clickable-tile href=\"https://instagram.com/ovohenny/\" target=\"_blank\">Instagram plug</ibm-clickable-tile>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</ibm-tab>\n\t<ibm-tab heading=\"Contact Me\">\n\t\t<p>This is how you can reach me :)</p><br>\n\t\t<p style=\"margin-bottom: 2rem;\">\n\t\t\tmagedhennawy@gmail.com \n\t\t</p>\n\t</ibm-tab>\n</ibm-tabs>\n"

/***/ }),

/***/ "./src/app/home/home/home.component.scss":
/*!***********************************************!*\
  !*** ./src/app/home/home/home.component.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".carbon--theme--white .bx--tabs,\n.carbon--theme--white div[role=tabpanel] {\n  padding: 1rem;\n  background-color: #f3f3f3; }\n\n.carbon--theme--white ibm-clickable-tile {\n  display: block;\n  border: #0062ff 1px solid; }\n\n.carbon--theme--white ibm-clickable-tile a {\n    height: 10rem;\n    text-decoration: none;\n    color: #0062ff; }\n\n.carbon--theme--g10 .bx--tabs,\n.carbon--theme--g10 div[role=tabpanel] {\n  padding: 1rem;\n  background-color: #ffff; }\n\n.carbon--theme--g10 ibm-clickable-tile {\n  display: block;\n  border: #0062ff 1px solid; }\n\n.carbon--theme--g10 ibm-clickable-tile a {\n    height: 10rem;\n    text-decoration: none;\n    color: #0062ff; }\n\n.carbon--theme--g100 .bx--tabs,\n.carbon--theme--g100 div[role=tabpanel] {\n  padding: 1rem;\n  background-color: #282828; }\n\n.carbon--theme--g100 ibm-clickable-tile {\n  display: block;\n  border: #f3f3f3 1px solid; }\n\n.carbon--theme--g100 ibm-clickable-tile a {\n    height: 10rem;\n    text-decoration: none;\n    color: #f3f3f3; }\n\n.carbon--theme--g90 .bx--tabs,\n.carbon--theme--g90 div[role=tabpanel] {\n  padding: 1rem;\n  background-color: #3d3d3d; }\n\n.carbon--theme--g90 ibm-clickable-tile {\n  display: block;\n  border: #f3f3f3 1px solid; }\n\n.carbon--theme--g90 ibm-clickable-tile a {\n    height: 10rem;\n    text-decoration: none;\n    color: #f3f3f3; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lL0M6XFxVc2Vyc1xccHJpbmNcXERlc2t0b3BcXG1hZ2VkaGVubmF3eS5naXRodWIuaW8vc3JjXFxhcHBcXGhvbWVcXGhvbWVcXGhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0JDOztFQUdFLGFBQWE7RUFDYix5QkExQjZCLEVBQUE7O0FBc0IvQjtFQVFFLGNBQWM7RUFDZCx5QkE5QjhCLEVBQUE7O0FBcUJoQztJQVlHLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsY0FsQ21CLEVBQUE7O0FBb0J0Qjs7RUFHRSxhQUFhO0VBQ2IsdUJBckIyQixFQUFBOztBQWlCN0I7RUFRRSxjQUFjO0VBQ2QseUJBekI4QixFQUFBOztBQWdCaEM7SUFZRyxhQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLGNBN0JtQixFQUFBOztBQWV0Qjs7RUFHRSxhQUFhO0VBQ2IseUJBaEI2QixFQUFBOztBQVkvQjtFQVFFLGNBQWM7RUFDZCx5QkFwQjhCLEVBQUE7O0FBV2hDO0lBWUcsYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixjQXhCbUIsRUFBQTs7QUFVdEI7O0VBR0UsYUFBYTtFQUNiLHlCQVg2QixFQUFBOztBQU8vQjtFQVFFLGNBQWM7RUFDZCx5QkFmOEIsRUFBQTs7QUFNaEM7SUFZRyxhQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLGNBbkJtQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkdGhlbWUtdmFyaWF0aW9uczogKFxud2hpdGU6IChcblx0dGFicy1iYWNrZ3JvdW5kLWNvbG9yOiAgI2YzZjNmMyxcblx0dGlsZS1ib3JkZXI6XHRcdFx0IzAwNjJmZiAxcHggc29saWQsXG5cdHRpbGUtY29sb3I6IFx0XHRcdCMwMDYyZmZcblx0KSxcbiAgZzEwOiAoXG5cdHRhYnMtYmFja2dyb3VuZC1jb2xvcjogICNmZmZmLFxuXHR0aWxlLWJvcmRlcjpcdFx0XHQjMDA2MmZmIDFweCBzb2xpZCxcblx0dGlsZS1jb2xvcjogXHRcdFx0IzAwNjJmZlxuICApLFxuICBnMTAwOiAoXG5cdHRhYnMtYmFja2dyb3VuZC1jb2xvcjogICMyODI4MjgsXG5cdHRpbGUtYm9yZGVyOlx0XHRcdCNmM2YzZjMgMXB4IHNvbGlkLFxuXHR0aWxlLWNvbG9yOiBcdFx0XHQjZjNmM2YzXG4gICksXG4gIGc5MDogKFxuXHR0YWJzLWJhY2tncm91bmQtY29sb3I6ICAjM2QzZDNkLFxuXHR0aWxlLWJvcmRlcjpcdFx0XHQjZjNmM2YzIDFweCBzb2xpZCxcblx0dGlsZS1jb2xvcjogXHRcdFx0I2YzZjNmM1xuICApXG4pICFkZWZhdWx0O1xuXG5AZWFjaCAkdGhlbWUtbmFtZSwgJHRoZW1lIGluICR0aGVtZS12YXJpYXRpb25zIHtcblx0LmNhcmJvbi0tdGhlbWUtLSN7JHRoZW1lLW5hbWV9IHtcblx0XHQuYngtLXRhYnMsXG5cdFx0ZGl2W3JvbGU9dGFicGFuZWxdIHtcblx0XHRcdHBhZGRpbmc6IDFyZW07XG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBtYXAtZ2V0KCR0aGVtZSwgdGFicy1iYWNrZ3JvdW5kLWNvbG9yKTtcblx0XHR9XG5cblx0XHRpYm0tY2xpY2thYmxlLXRpbGUge1xuXHRcdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0XHRib3JkZXI6IG1hcC1nZXQoJHRoZW1lLCB0aWxlLWJvcmRlcik7XG5cblx0XHRcdGEge1xuXHRcdFx0XHRoZWlnaHQ6IDEwcmVtO1xuXHRcdFx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdFx0XHRcdGNvbG9yOiBtYXAtZ2V0KCR0aGVtZSwgdGlsZS1jb2xvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/home/home/home.component.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home/home.component.ts ***!
  \*********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-home",
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home/home.component.scss")]
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-home-home-module.js.map