import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';
import { EspecificoService } from 'src/app/services/especifico/especifico.service';

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

  restaurantes:any = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private serviciosGenerales: HomeService,
    private toastController: ToastController,
  private serviciosEspecificos:EspecificoService) { 
    this.cargarCarrito()
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

  ngOnInit(): void {

  }

  cargarCarrito(){
    this.serviciosEspecificos.obtenerCarrito(localStorage.getItem('id')).subscribe(response => {
      if (response.success) {
        this.restaurantes = response.result
        console.log(this.restaurantes)
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

  incrementarCantidad(detalle: any) {
    detalle.cantidad = detalle.cantidad+1
    this.serviciosEspecificos.actualizarCarrito(detalle).subscribe(()=>{
      this.cargarCarrito
    })
  }

  disminuirCantidad(detalle: any) {
    console.log(detalle)
    if (detalle.cantidad > 1) {
      detalle.cantidad = detalle.cantidad-1
      this.serviciosEspecificos.actualizarCarrito(detalle).subscribe(()=>{
        this.cargarCarrito()
      })
    }
  }

  eliminarProducto(detalle: any) {
    this.serviciosEspecificos.borrarCarrito(detalle).subscribe(()=>{
      this.cargarCarrito()
    })
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

  getImage(image: string): string {
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/gourmetgo-firebase.appspot.com/o/Default%2FnoImagen.jpg?alt=media&token=3ee7f0de-f7f8-48b3-897f-cbb93a4b9872';
    return image ? image : defaultImage;
  }
  
}
