import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {
  constructor(private router: Router,
    private serviciosGenerales: HomeService,
    private toastController: ToastController) { }

  restauranteText: string = ''

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  ngOnInit(): void {
    this.serviciosGenerales.obtenerRestaurantes().subscribe(response => {
      if (response.success) {
        this.restaurantes = response.restaurantes
        console.log(this.restaurantes)
      } else {
        this.presentToast('Hubo un problema con el servidor', 'danger');
      }
    }, error => {
      this.presentToast('Hubo un problema con el servidor', 'danger');
    });
  }

  buscar(): void {
    const entidad = { nombre: this.restauranteText }
    this.serviciosGenerales.obtenerRestaurante(entidad).subscribe(response => {
      if (response.success) {
        this.restaurantes = response.restaurantes
      } else {
        this.presentToast('Hubo un problema con el servidor', 'danger');
      }
    }, error => {
      this.presentToast('Hubo un problema con el servidor', 'danger');
    });
  }

  restaurantes = [
    {
      nombre: 'MEDIA NOCHE RESTAURANT',
      direccion: 'Ambato, ciudadela presidencial',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    }
  ];

  irAMenu(restaurante: any) {
    this.router.navigate(['/inicio/principal/menu'], {
      queryParams: {
        nombre: restaurante.nombre,
        imagen: restaurante.imagen,
        id: restaurante.id
      }
    });
  }
}
