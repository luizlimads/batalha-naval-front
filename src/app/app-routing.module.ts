import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela-cadastro/tela-cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DressUpComponent } from './dress-up/dress-up.component';
import { DressUpAvatarComponent } from './dress-up-avatar/dress-up-avatar.component';
import { TelaAdminComponent } from './tela-admin/tela-admin.component';
import { TelaAdminiComponent } from './tela-admini/tela-admini.component';
import { TelaCarregamentoComponent } from './tela-carregamento/tela-carregamento.component';
import { TelaPreComponent } from './tela-pre/tela-pre.component';
import { TelaPartidaComponent } from './tela-partida/tela-partida.component';
import { XpComponent } from './xp/xp.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: TelaLoginComponent },
  { path: 'cadastro', component: TelaCadastroComponent },
  { path: 'admin', component: TelaAdminComponent },
  { path: 'adm', component: TelaAdminiComponent },
  { path: 'dress', component: DressUpComponent },
  { path: 'xp', component: XpComponent },
  { path: 'pre', component: TelaPreComponent },
  { path: 'carr', component: TelaCarregamentoComponent },
  { path: 'partida', component: TelaPartidaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
