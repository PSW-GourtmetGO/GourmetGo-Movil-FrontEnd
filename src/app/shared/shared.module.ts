import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { ToolbarpagosComponent } from './componentes/toolbarpagos/toolbarpagos.component';
import { ToolbarmenuComponent } from './componentes/toolbarmenu/toolbarmenu.component';

@NgModule({
  declarations: [ToolbarComponent, ToolbarpagosComponent, ToolbarmenuComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  exports: [ToolbarComponent, ToolbarpagosComponent, ToolbarmenuComponent],
})
export class SharedModule {}
