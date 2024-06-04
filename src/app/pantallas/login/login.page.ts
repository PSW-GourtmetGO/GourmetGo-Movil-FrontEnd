import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  correoText: string = '';
  contraseniaText: string = '';
  
  constructor(private router: Router,private serviciosIniciales:PrincipalService,private toastController: ToastController) {}
  
  ngOnInit(): void {}

  olvidoClave() {
    this.router.navigate(['/olvido-clave']);
  }
  registrar(){
    this.router.navigate(['/registro'])
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
      correo: this.correoText,
      contrasenia: this.contraseniaText
    };

    this.serviciosIniciales.login(cliente).subscribe(response => {
      if (response.success) {
        this.presentToast('Bienvenido');
        localStorage.setItem('id', response.clienteData.id);
        this.router.navigate(['/inicio']);
      } else {
        this.presentToast('Credenciales incorrectas', 'danger');
      }
    }, error => {
      this.presentToast('Credenciales incorrectas', 'danger');
    });
  }
}
