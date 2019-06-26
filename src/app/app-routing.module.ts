import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookComponent } from "./book/book.component";

const routes: Routes = [
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
		component: BookComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
