import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage {
  constructor(private router: Router) {}
  login() {
    this.router.navigate(['/login']);
  }
  registro() {
    this.router.navigate(['/registro']);
  }
}
