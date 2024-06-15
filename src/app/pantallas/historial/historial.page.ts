import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { HomeService } from 'src/app/services/home/home.service';
import { ModalController, ToastController } from '@ionic/angular';
import { EspecificoService } from 'src/app/services/especifico/especifico.service';
import { ModalCodigoComponent } from '../../shared/modal-codigo/modal-codigo.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  constructor(
    private router: Router,
    private serviciosGenerales: HomeService,
    private toastController: ToastController,
    private serviciosEspecificos: EspecificoService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute // Inyecta ActivatedRoute
  ) { }

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
    // Verifica si hay un parámetro "pedido" en la URL
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['pedido'] === 'exito') {
        this.presentToast('Se realizó el pedido', 'success');
      }
    });

    // Obtén el historial
    this.serviciosEspecificos.obtenerHistorial(localStorage.getItem('id')).subscribe(response => {
      if (response.success) {
        this.restaurantes = response.result;
        console.log(this.restaurantes);
      } else {
        this.presentToast('Hubo un problema con el servidor', 'danger');
      }
    }, error => {
      this.presentToast('Hubo un problema con el servidor', 'danger');
    });
  }

  restaurantes: any = [];

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

  getImage(image: string): string {
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/gourmetgo-firebase.appspot.com/o/Default%2FnoImagen.jpg?alt=media&token=3ee7f0de-f7f8-48b3-897f-cbb93a4b9872';
    return image ? image : defaultImage;
  }

  mostrarModalCodigo: boolean = false;
  mostrarModalCarrito: boolean = false;
  codigoRestaurante: string = '';
  detalleRestaurante: any = [];

  abrirModalCodigo(codigo: string) {
    this.codigoRestaurante = codigo;
    this.mostrarModalCodigo = true;
  }

  abrirModalCarrito(codigo: any) {
    this.detalleRestaurante = codigo;
    this.mostrarModalCarrito = true;
  }

  cerrarModalCodigo() {
    this.mostrarModalCodigo = false;
    this.mostrarModalCarrito = false;
  }
}
