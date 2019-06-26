import { BookComponent } from "./book.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionModule, TabsModule, TilesModule, GridModule } from "carbon-components-angular";
import { PdfViewerModule } from "ng2-pdf-viewer"; // <- import OrderModule

@NgModule({
	imports: [
		CommonModule,
		AccordionModule,
		TabsModule,
		TilesModule,
		GridModule,
		PdfViewerModule
	],
	declarations: [BookComponent]
})
export class BookModule {

}
