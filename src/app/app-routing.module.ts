import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./pantallas/bienvenida/bienvenida.module').then(
        (m) => m.BienvenidaPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pantallas/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./pantallas/bienvenida/bienvenida.module').then(
        (m) => m.BienvenidaPageModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pantallas/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'olvido-clave',
    loadChildren: () =>
      import('./pantallas/olvido-clave/olvido-clave.module').then(
        (m) => m.OlvidoClavePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
