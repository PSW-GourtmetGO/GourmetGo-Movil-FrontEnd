import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    restauranteNombre: string = ''
    restauranteImagen: string = ''
    platoNombre: string = ''

    platos = [
        {
            nombre: 'Papipollo',
            imagen: '../../../assets/imagenes/bebida.png',
            precio: '$2.50',
        }
    ]

    categorias = [
        {
            id: 1,
            nombre: 'Platillos',
            idRestaurante: 1
        },
        {
            id: 2,
            nombre: 'Bebidas',
            idRestaurante: 1
        }
    ]

    productos = [
        {
            nombre: 'Té Verde',
            imagen: '../../../assets/imagenes/bebida.png',
            precio: '$1.00',
            idCategoria: 2
        },
        {
            nombre: 'PapiPollo',
            imagen: '../../../assets/imagenes/bebida.png',
            precio: '$5.00',
            idCategoria: 1
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

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.restauranteNombre = params['nombre'];
            this.restauranteImagen = params['imagen']
        });
    }

    buscar(): void {
        const entidad = { nombre: this.platoNombre }
        this.serviciosGenerales.obtenerPlato(entidad).subscribe(response => {
            if (response.success) {
                this.platos = response.restaurantes
            } else {
                this.presentToast('Hubo un problema con el servidor', 'danger');
            }
        }, error => {
            this.presentToast('Hubo un problema con el servidor', 'danger');
        });
    }



    irACarrito(producto: any) {
        this.router.navigate(['/inicio/carrito'], {
            queryParams: {
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: producto.precio
            }
        });
    }

}
