import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { ToastController } from '@ionic/angular';
import { EspecificoService } from 'src/app/services/especifico/especifico.service';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  totalPagar = 0;
  numeroPedido = 0;
  restauranteText:string = ''

  constructor(private route: ActivatedRoute,private router: Router,private serviciosGenerales:HomeService,private toastController: ToastController,private serviciosEspecificos:EspecificoService) {}


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
      this.serviciosEspecificos.obtenerEspecifico(params['dato']).subscribe(data=>{
        this.restaurantes = data.result[0]
      })
    });
  }

  restaurantes:any = [];

  getImage(image: string): string {
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/gourmetgo-firebase.appspot.com/o/Default%2FnoImagen.jpg?alt=media&token=3ee7f0de-f7f8-48b3-897f-cbb93a4b9872';
    return image ? image : defaultImage;
  }
}
