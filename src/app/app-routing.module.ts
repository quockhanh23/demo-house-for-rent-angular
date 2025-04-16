import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HouseListComponent} from "./house/house-list/house-list.component";
import {HouseDetailComponent} from "./house/house-detail/house-detail.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";

const routes: Routes = [
  {
    path: '', component: HouseListComponent,
  },
  {
    path: 'detailHouse/:id', component: HouseDetailComponent,
  },
  {
    path: 'detailUser/:id', component: UserDetailComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
