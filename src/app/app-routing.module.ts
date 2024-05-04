import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DressUpComponent } from './dress-up/dress-up.component';
import { DressUpAvatarComponent } from './dress-up-avatar/dress-up-avatar.component';
import { TelaAdminComponent } from './tela-admin/tela-admin.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: TelaLoginComponent },
  { path: 'cadastro', component: TelaCadastroComponent },
  { path: 'admin', component: TelaAdminComponent},
  { path: 'dress', component: DressUpComponent},
  { path: 'dres', component: DressUpAvatarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
