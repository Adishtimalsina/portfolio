import { Component } from '@angular/core';
import {ThreeDComponent} from "../three-d/three-d.component";
import {AboutMeComponent} from "../about-me/about-me.component";

@Component({
  selector: 'app-hero-section',
  imports: [ThreeDComponent, AboutMeComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
