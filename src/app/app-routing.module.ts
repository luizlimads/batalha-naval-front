import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TelaAdminComponent } from './tela-admin/tela-admin.component';
import { TelaAdminiComponent } from './tela-admini/tela-admini.component';
import { TelaPreComponent } from './tela-pre/tela-pre.component';
import { TelaPartidaComponent } from './tela-partida/tela-partida.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: TelaLoginComponent },
  { path: 'cadastro', component: TelaCadastroComponent },
  { path: 'admin', component: TelaAdminComponent },
  { path: 'adm', component: TelaAdminiComponent },
  { path: 'pre', component: TelaPreComponent },
  { path: 'partida', component: TelaPartidaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
