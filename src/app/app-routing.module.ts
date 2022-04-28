import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEditComponent } from './pages/list-edit/list-edit.component';
import { ListViewComponent } from './pages/list-view/list-view.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: HomeComponent
  // },
  {
    path: "",
    component: ListViewComponent
  },
  {
    path: "pricelist/edit",
    component: ListEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
