import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
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
      nombre: 'Pikos',
      imagen: '../../../assets/imagenes/negocio.png',
      precioTotal:'40',
      cantidad: '2',
    }
  ];

  getColorByEstado(estado: any): string {
    switch (estado) {
      case "Pendiente":
        return "#FFB572";
      case "Completo":
        return "#6BE2BE";
      case "Preparado":
        return "#9290FE";
      default:
        return "#eb459f";
    }
  }
}
