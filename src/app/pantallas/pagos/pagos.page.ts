import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  totalPagar = 0;
  numeroPedido = 0;

  constructor(private router: Router,private serviciosGenerales:HomeService,private toastController: ToastController) {}

  restauranteText:string = ''

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
}
