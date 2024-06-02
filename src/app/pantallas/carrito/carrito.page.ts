import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cantidad = 1;
  numeroPedido = 0;
  restauranteText: string = '';
  currentDate: string = '';
  productosSeleccionados: any[] = [];

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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private serviciosGenerales: HomeService,
    private toastController: ToastController) { }

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
    this.route.queryParams.subscribe(params => {
      const nuevoProducto = {
        nombre: params['nombre'],
        imagen: params['imagen'],
        precio: params['precio'],
        cantidad: 1
      };
      this.agregarProducto(nuevoProducto);
    });

    this.currentDate = this.formatDate(new Date());

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

  agregarProducto(producto: any) {
    const index = this.productosSeleccionados.findIndex(p => p.nombre === producto.nombre);
    if (index !== -1) {
      this.productosSeleccionados[index].cantidad++;
    } else {
      this.productosSeleccionados.push(producto);
    }
  }

  incrementarCantidad(index: number) {
    this.productosSeleccionados[index].cantidad++;
  }

  disminuirCantidad(index: number) {
    if (this.productosSeleccionados[index].cantidad > 1) {
      this.productosSeleccionados[index].cantidad--;
    }
  }

  eliminarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
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

  irAPago() {
    this.router.navigate(['/inicio/pagos']);
}
}
