import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-toolbarpagos',
  templateUrl: './toolbarpagos.component.html',
  styleUrls: ['./toolbarpagos.component.scss'],
})
export class ToolbarpagosComponent {
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;
  @Input() cartButton!: boolean;
  @Input() admin!: boolean;

  constructor(private router: Router) {
  }

  irCarrito() {

      this.router.navigate(['/inicio/carrito/']);
    
  }

  dismissModal() { }
}
