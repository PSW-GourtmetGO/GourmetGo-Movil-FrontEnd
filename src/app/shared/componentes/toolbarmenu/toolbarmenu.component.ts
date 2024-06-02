import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-toolbarmenu',
  templateUrl: './toolbarmenu.component.html',
  styleUrls: ['./toolbarmenu.component.scss'],
})
export class ToolbarmenuComponent {
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;
  @Input() cartButton!: boolean;
  @Input() admin!: boolean;

  constructor(private router: Router) {
  }

  irRestaurantes() {

      this.router.navigate(['/inicio/principal']);
    
  }

  dismissModal() { }
}
