import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HouseListComponent} from "./house/house-list/house-list.component";
import {HouseDetailComponent} from "./house/house-detail/house-detail.component";

const routes: Routes = [
  {
    path: '', component: HouseListComponent,
  },

  {
    path: 'detailHouse/:id', component: HouseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
