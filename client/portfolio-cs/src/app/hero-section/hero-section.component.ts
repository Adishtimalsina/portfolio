import { Component } from '@angular/core';
import {ThreeDComponent} from "../three-d/three-d.component";

@Component({
  selector: 'app-hero-section',
  imports: [ThreeDComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
