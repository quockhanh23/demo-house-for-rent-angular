import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HouseListComponent} from './house/house-list/house-list.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HouseDetailComponent} from './house/house-detail/house-detail.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HouseCreateComponent } from './house/house-create/house-create.component';
import { HouseUpdateComponent } from './house/house-update/house-update.component';

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
    HouseUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
