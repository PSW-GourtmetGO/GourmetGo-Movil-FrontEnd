import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        loadChildren: () =>
          import('../principal/principal.module').then(
            (m) => m.PrincipalPageModule
          ),
      },
      {
        path: 'carrito',
        loadChildren: () =>
          import('../carrito/carrito.module').then((m) => m.CarritoPageModule),
      },
      {
        path: 'historial',
        loadChildren: () =>
          import('../historial/historial.module').then(
            (m) => m.HistorialPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
