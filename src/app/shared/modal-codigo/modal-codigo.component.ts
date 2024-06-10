import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-codigo',
  templateUrl: './modal-codigo.component.html',
  styleUrls: ['./modal-codigo.component.scss'],
})
export class ModalCodigoComponent {

  constructor(private modalController: ModalController) { }

  async abrirModalCodigo() {
    const modal = await this.modalController.create({
      component: ModalCodigoComponent,
      cssClass: 'custom-modal'  // Aplicar la clase CSS personalizada
    });
    return await modal.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
