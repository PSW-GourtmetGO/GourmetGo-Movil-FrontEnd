import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidoClavePageRoutingModule } from './olvido-clave-routing.module';

import { OlvidoClavePage } from './olvido-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidoClavePageRoutingModule
  ],
  declarations: [OlvidoClavePage]
})
export class OlvidoClavePageModule {}
