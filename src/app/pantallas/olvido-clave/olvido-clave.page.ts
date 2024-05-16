import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido-clave',
  templateUrl: './olvido-clave.page.html',
  styleUrls: ['./olvido-clave.page.scss'],
})
export class OlvidoClavePage {

  constructor(private router: Router) { }
  registro() {
    this.router.navigate(['/registro']);
  }



}
