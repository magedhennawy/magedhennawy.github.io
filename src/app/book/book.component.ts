import { Component, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-home",
	encapsulation: ViewEncapsulation.None,
	templateUrl: "./book.component.html",
	styleUrls: ["./book.component.scss"]
})
export class BookComponent {
	src2 = "/assets/book/Genesis37.pdf";
}
