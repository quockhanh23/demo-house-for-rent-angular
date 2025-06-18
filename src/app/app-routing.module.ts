import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HouseListComponent} from "./house/house-list/house-list.component";
import {HouseDetailComponent} from "./house/house-detail/house-detail.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {HouseCreateComponent} from "./house/house-create/house-create.component";
import {HouseUpdateComponent} from "./house/house-update/house-update.component";
import {TransactionalCreateComponent} from "./transactional/transactional-create/transactional-create.component";
import {TransactionalDetailComponent} from "./transactional/transactional-detail/transactional-detail.component";
import {ReportCreateComponent} from "./report/report-create/report-create.component";
import {AdminPageComponent} from "./admin/admin-page/admin-page.component";
import {HouseOfUserComponent} from "./house/house-of-user/house-of-user.component";

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
  {
    path: 'createHouse', component: HouseCreateComponent,
  },
  {
    path: 'updateHouse/:id', component: HouseUpdateComponent,
  },
  {
    path: 'createTransactional/:id', component: TransactionalCreateComponent,
  },
  {
    path: 'detailTransactional/:id', component: TransactionalDetailComponent,
  },
  {
    path: 'createReport/:id', component: ReportCreateComponent,
  },
  {
    path: 'adminPage', component: AdminPageComponent,
  },
  {
    path: 'houseOfUser/:id', component: HouseOfUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
