import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HouseListComponent} from './house/house-list/house-list.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './share/header/header.component';
import {FooterComponent} from './share/footer/footer.component';
import {HouseDetailComponent} from './house/house-detail/house-detail.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HouseCreateComponent} from './house/house-create/house-create.component';
import {HouseUpdateComponent} from './house/house-update/house-update.component';
import {TransactionalCreateComponent} from './transactional/transactional-create/transactional-create.component';
import {TransactionalDetailComponent} from './transactional/transactional-detail/transactional-detail.component';
import {ReportCreateComponent} from './report/report-create/report-create.component';
import {AdminPageComponent} from './admin/admin-page/admin-page.component';
import {SnackbarComponent} from './share/snackbar/snackbar.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {HouseOfUserComponent} from './house/house-of-user/house-of-user.component';
import {TransactionalOfUserComponent} from './transactional/transactional-of-user/transactional-of-user.component';
import { TitleComponent } from './share/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    HouseListComponent,
    HeaderComponent,
    FooterComponent,
    HouseDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent,
    HouseCreateComponent,
    HouseUpdateComponent,
    TransactionalCreateComponent,
    TransactionalDetailComponent,
    ReportCreateComponent,
    AdminPageComponent,
    SnackbarComponent,
    HouseOfUserComponent,
    TransactionalOfUserComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
