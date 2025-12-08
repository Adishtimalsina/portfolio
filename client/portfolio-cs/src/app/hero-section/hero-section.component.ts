import {AfterViewInit, Component, ElementRef, QueryList, ViewChild} from '@angular/core';
import {ThreeDComponent} from "../three-d/three-d.component";
import {AboutMeComponent} from "../about-me/about-me.component";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

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

       gsap.registerPlugin(SplitText);

       let splitTextName = SplitText.create(this.name.nativeElement, {type: "words"});
       let splitTextTag = SplitText.create(this.tag.nativeElement, {type: "chars"});

      gsap.from(splitTextName.words, {
        y:-30,
        autoAlpha:0,
        stagger:0.06
      })

      gsap.from(splitTextTag.chars, {
        x:-30,
        autoAlpha:0,
        stagger:0.03
      })

    }

}
