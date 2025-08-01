import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { ThreeDComponent } from "./three-d/three-d.component";
import { NavbarComponent } from "./navbar/navbar.component"
import {HeroSectionComponent} from "./hero-section/hero-section.component";
import {CommonModule} from "@angular/common";
import {AboutMeComponent} from "./about-me/about-me.component";

@Component({
    selector: 'app-root',
  imports: [
    ThreeDComponent, NavbarComponent, HeroSectionComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AboutMeComponent
  ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-cs';
}
