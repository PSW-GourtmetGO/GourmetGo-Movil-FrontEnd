import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PrincipalService } from 'src/app/services/principal/principal.service';

@Component({
  selector: 'app-olvido-clave',
  templateUrl: './olvido-clave.page.html',
  styleUrls: ['./olvido-clave.page.scss'],
})
export class OlvidoClavePage {

  correoText:string =  ''

  constructor(private router: Router,private serviciosIniciales:PrincipalService,private toastController: ToastController) {}

  registro() {
    this.router.navigate(['/registro']);
  }

  ngOnInit(): void {}

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  onSubmit() {
    const cliente = {
      destinatario: this.correoText,
    };

    this.serviciosIniciales.olvido(cliente).subscribe(response => {
      if (response.success) {
        this.presentToast('Contraseña temporal enviada al correo');
        this.router.navigate(['/login']);
      } else {
        this.presentToast('Correo no identificado', 'danger');
      }
    }, error => {
      this.presentToast('Correo no identificado', 'danger');
    });
  }
}
