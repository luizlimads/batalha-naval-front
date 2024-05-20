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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CadastroPacoteComponent } from './tela-admini/cadastro-pacote/cadastro-pacote.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { TelaPreparacaoComponent } from './tela-preparacao/tela-preparacao.component';

import { DragDropModule } from "@angular/cdk/drag-drop";
import { ShipComponent } from './ship/ship.component';
import { TelaCarregamentoComponent } from './tela-carregamento/tela-carregamento.component';

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
    TelaAdminiComponent,
    CadastroPacoteComponent,
    TelaPreparacaoComponent,
    ShipComponent,
    TelaCarregamentoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCurrencyDirective,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    DragDropModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
