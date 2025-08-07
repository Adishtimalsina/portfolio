import {AfterViewInit, Component, ElementRef, QueryList, ViewChild} from '@angular/core';
import {ThreeDComponent} from "../three-d/three-d.component";
import {AboutMeComponent} from "../about-me/about-me.component";
import { gsap } from "gsap";
import { ScrollSmoother} from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-hero-section',
  imports: [ThreeDComponent, AboutMeComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('heroDiv') heroDiv!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('tag') tag!: ElementRef;
  @ViewChild('hand') hand!: ElementRef;

    ngAfterViewInit() {

      // gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      //
      //  ScrollSmoother.create({
      //   wrapper: this.heroSection.nativeElement,
      //   content: this.heroDiv.nativeElement,
      //   smooth:1
      // });
      //
      // gsap.to(this.heroSection.nativeElement, {
      //   x:500,
      //   duration: 2,
      //   easing: 'none',
      //   scrollTrigger:{
      //     trigger: this.heroSection.nativeElement,
      //     start:"top top",
      //     end:"+=100%",
      //     toggleActions:"restart pause reverse pause",
      //     scrub:3
      //   }
      // })

    }

}
