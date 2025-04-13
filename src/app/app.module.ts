import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HouseListComponent} from './house/house-list/house-list.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HouseDetailComponent } from './house/house-detail/house-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HouseListComponent,
    HeaderComponent,
    FooterComponent,
    HouseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
