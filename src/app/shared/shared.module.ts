import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { ToolbarpagosComponent } from './componentes/toolbarpagos/toolbarpagos.component';

@NgModule({
  declarations: [ToolbarComponent, ToolbarpagosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  exports: [ToolbarComponent, ToolbarpagosComponent],
})
export class SharedModule {}
