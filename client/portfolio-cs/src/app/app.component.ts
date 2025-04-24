import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThreeDComponent } from "./three-d/three-d.component";
import { NavbarComponent } from "./navbar/navbar.component"
import {HeroSectionComponent} from "./hero-section/hero-section.component";

@Component({
    selector: 'app-root',
  imports: [
    ThreeDComponent, NavbarComponent, HeroSectionComponent
  ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-cs';
}
