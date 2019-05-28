import { Component, ViewEncapsulation, ViewChild } from "@angular/core";

@Component({
	selector: "app-root",
	encapsulation: ViewEncapsulation.None,
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	@ViewChild("container") container;
}
