import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DressUpComponent } from './dress-up/dress-up.component';
import { DressUpAvatarComponent } from './dress-up-avatar/dress-up-avatar.component';
import { TelaAdminComponent } from './tela-admin/tela-admin.component';
import { NgxCurrencyDirective } from "ngx-currency";
import { TelaAdminiComponent } from './tela-admini/tela-admini.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InputComponent,
    TelaLoginComponent,
    TelaCadastroComponent,
    HomePageComponent,
    DressUpComponent,
    DressUpAvatarComponent,
    TelaAdminComponent,
    TelaAdminiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCurrencyDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
