import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';
import { EspecificoService } from 'src/app/services/especifico/especifico.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  totalPagar = 0;
  numeroPedido = 0;
  restauranteText: string = '';
  restaurantes: any = [];
  private apiUrl = 'http://localhost:4500/api/payment';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviciosGenerales: HomeService,
    private toastController: ToastController,
    private serviciosEspecificos: EspecificoService,
    private http: HttpClient
  ) { }

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
      this.serviciosEspecificos.obtenerEspecifico(params['dato']).subscribe(data => {
        this.restaurantes = data.result[0];
      });
    });
  }

  getImage(image: string): string {
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/gourmetgo-firebase.appspot.com/o/Default%2FnoImagen.jpg?alt=media&token=3ee7f0de-f7f8-48b3-897f-cbb93a4b9872';
    return image ? image : defaultImage;
  }

  payWithPayPal() {
    const id = this.restaurantes.restauranteId;
    const precioTotal = this.restaurantes.precio_total;
    const restauranteId = this.restaurantes.id;

    console.log('ID Restaurante:', id);
    console.log('Pedido ID:', restauranteId);

    this.http.post(`${this.apiUrl}/create-order`, { restaurante: id, precio: precioTotal })
      .subscribe((response: any) => {
        console.log('PayPal order creation response:', response);

        if (response && response.id) {
          const token = response.id;

          this.capturePayPalOrder(token, id, restauranteId);

          const approvalUrl = response.links.find((link: any) => link.rel === 'approve').href;
          if (approvalUrl) {
            window.location.href = approvalUrl;
          } else {
            this.presentToast('No se encontró el enlace de aprobación de PayPal', 'danger');
            console.error('No approval link found in PayPal response', response);
          }
        } else {
          this.presentToast('Respuesta inválida del servidor', 'danger');
          console.error('Invalid server response', response);
        }
      }, (error) => {
        this.presentToast('Error al crear la orden de PayPal', 'danger');
        console.error('Error creating PayPal order', error);
      });
  }

  capturePayPalOrder(token: string, restauranteId: number, pedido:number) {
    this.http.get(`${this.apiUrl}/capture-order?token=${token}&restaurante=${restauranteId}&id=${pedido}`)
      .subscribe((response: any) => {
        console.log('PayPal order capture response:', response);
        console.log(restauranteId);
        console.log(pedido);

        if (response && response.success) {
          this.presentToast('Orden de PayPal capturada correctamente', 'success');
        } else {
          this.presentToast('Error al capturar la orden de PayPal', 'danger');
          console.error('Error capturing PayPal order', response);
        }
      }, (error) => {
        this.presentToast('Error al capturar la orden de PayPal', 'danger');
        console.error('Error capturing PayPal order', error);
      });
  }
}