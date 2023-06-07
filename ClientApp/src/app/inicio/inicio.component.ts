import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio.component.html'
})

export class InicioComponent {

  // Router para navegar entre pags
  constructor(private router: Router) { }

  public Libreria = "Lib pepito";

  public Navegar() {
    this.router.navigate(['/login']);
  }
}
