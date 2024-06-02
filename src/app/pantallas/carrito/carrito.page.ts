import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cantidad = 0;
  numeroPedido = 0;
  restauranteText: string = '';
  currentDate: string = '';

  constructor(private router: Router, private serviciosGenerales: HomeService, private toastController: ToastController) {}

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
    this.currentDate = this.formatDate(new Date()); // Inicializa la fecha actual

    this.serviciosGenerales.obtenerPedido().subscribe(response => {
      if (response.success) {
        this.pedidos = response.pedidos
      } else {
        this.presentToast('Hubo un problema con el servidor', 'danger');
      }
    }, error => {
      this.presentToast('Hubo un problema con el servidor', 'danger');
    });

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

  pedidos = [
    {
      nombre: 'GuatiPollo',
      hora: '10:00',
      precio: '$40',
      items: '2'
    }
  ]

  incrementarCantidad() {
    this.cantidad++;
  }

  disminuirCantidad() {
    if (this.cantidad > 0) {
      this.cantidad--;
    }
  }

  formatDate(date: Date): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const dayName = days[date.getDay()];
    const day = ('0' + date.getDate()).slice(-2);
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  }
}
