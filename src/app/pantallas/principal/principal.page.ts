import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {
  constructor() {}
  restaurantes = [
    {
      nombre: 'MEDIA NOCHE RESTAURANT',
      ubicacion: 'Ambato, ciudadela presidencial',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    },
    {
      nombre: 'MEDIA NOCHE RESTAURANT',
      ubicacion: 'Ambato, ciudadela presidencial',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    },
    {
      nombre: 'MEDIA NOCHE RESTAURANT',
      ubicacion: 'Ambato, ciudadela presidencial',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    },
    {
      nombre: 'MEDIA NOCHE RESTAURANT',
      ubicacion: 'Ambato, ciudadela presidencial',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    },
    {
      nombre: 'Restaurante 2',
      ubicacion: 'Ubicación 2',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    },
    {
      nombre: 'Restaurante 3',
      ubicacion: 'Ubicación 3',
      imagen: '../../../assets/imagenes/negocio.png',
      horario: 'Lunes a Domingo 8:00 - 22:00',
    },
  ];
}
