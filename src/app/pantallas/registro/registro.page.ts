import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  cedulaText: string = '';
  nombreText: string = '';
  apellidoText: string = '';
  fecha_nacimientoText: string = '';
  direccionText: string = '';
  telefonoText: string = '';
  correoText: string = '';
  contraseniaText: string = '';

  constructor(
    private router: Router,
    private serviciosIniciales: PrincipalService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/login']);
  }

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
      cedula: this.cedulaText,
      nombre: this.nombreText,
      apellido: this.apellidoText,
      fecha_nacimiento: this.fecha_nacimientoText,
      direccion: this.direccionText,
      telefono: this.telefonoText,
      correo: this.correoText,
      contrasenia: this.contraseniaText
    };

    this.serviciosIniciales.register(cliente).subscribe(response => {
      if (response.success) {
        this.presentToast('Usuario creado');
        this.router.navigate(['/login'])
      } else {
        this.presentToast('Error al crear el usuario', 'danger');
      }
    }, error => {
      this.presentToast('Error al crear el usuario', 'danger');
    });
  }
}
