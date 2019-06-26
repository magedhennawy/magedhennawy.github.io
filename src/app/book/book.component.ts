import { Component, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-home",
	encapsulation: ViewEncapsulation.None,
	templateUrl: "./book.component.html",
	styleUrls: ["./book.component.scss"]
})
export class BookComponent {

	src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
	src2 = "/assets/book/Genesis37.pdf";
}
