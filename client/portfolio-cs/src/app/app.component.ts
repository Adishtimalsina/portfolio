import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component"
import {HeroSectionComponent} from "./hero-section/hero-section.component";
import {CommonModule} from "@angular/common";
import {AboutMeComponent} from "./about-me/about-me.component";
import {ThreeDComponent} from "./three-d/three-d.component";

@Component({
    selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    CommonModule,
    AboutMeComponent,
    ThreeDComponent,
  ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-cs';
}
