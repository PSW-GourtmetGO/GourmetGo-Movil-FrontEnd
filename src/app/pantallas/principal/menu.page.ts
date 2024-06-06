import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EspecificoService } from 'src/app/services/especifico/especifico.service';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    restauranteNombre: string = ''
    restauranteImagen: string = ''
    restauranteId: number = 0
    platoNombre: string = ''

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
            categoria_id: 2
        },
        {
            nombre: 'PapiPollo',
            imagen: '../../../assets/imagenes/bebida.png',
            precio: '$5.00',
            categoria_id: 1
        }
    ]

    constructor(private route: ActivatedRoute,
        private router: Router,
        private serviciosGenerales: HomeService,
        private toastController: ToastController,
        private serviciosEspecificos:EspecificoService) { }

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
            this.restauranteId = params['id']
            this.serviciosGenerales.obtenerCategoriasRestaurante(this.restauranteId).subscribe(data=>{
                this.categorias = data.restaurantes
                this.serviciosGenerales.obtenerPlatosRestaurante(this.restauranteId).subscribe(data=>{
                    this.productos = data.restaurantes
                })
            })
        });
    }

    buscar(): void {
        const entidad = { plato: this.platoNombre,restaurante: this.restauranteId }
        this.serviciosGenerales.obtenerPlatosRestauranteFiltro(entidad).subscribe(response => {
            if (response.success) {
                this.productos = response.restaurantes
            } else {
                this.presentToast('Hubo un problema con el servidor', 'danger');
            }
        }, error => {
            this.presentToast('Hubo un problema con el servidor', 'danger');
        });
    }



    irACarrito(producto: any) {
        const entidad = {restaurante:this.restauranteId,plato:producto.id,cliente:localStorage.getItem('id')}
        this.serviciosEspecificos.agregarCarrito(entidad).subscribe(()=>{
            this.router.navigate(['/inicio/carrito'], {
                queryParams: {
                    nombre: producto.nombre,
                    imagen: producto.imagen,
                    precio: producto.precio
                }
            });
        })
    }

}
