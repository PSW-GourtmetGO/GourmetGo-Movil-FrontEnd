import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  cedulaText : string = ''
  nombreText : string = ''
  apellidoText : string = ''
  fecha_nacimientoText: Date | null = null;
  direccionText : string = ''
  telefonoText :string = ''
  correoText :string = ''
  contraseniaText :string = ''


  constructor(private router: Router) { }
  login() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    console.log('Información guardada:');
    console.log('Cédula:', this.cedulaText);
    console.log('Nombre:', this.nombreText);
    console.log('Apellido:', this.apellidoText);
    console.log('Fecha de Nacimiento:', this.fecha_nacimientoText);
    console.log('Dirección:', this.direccionText);
    console.log('Teléfono:', this.telefonoText);
    console.log('Correo:', this.correoText);
    console.log('Contraseña:', this.contraseniaText);
  }
}
