import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother} from "gsap/ScrollSmoother";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-about-me',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChild('aboutMe') aboutMe!: ElementRef;
  @ViewChild('terminal') terminal!: ElementRef;
  @ViewChild('profile') profile!: ElementRef;
  protected profileHeight: number = 0;
  protected profileWidth: number = 0;

  constructor() {

  }
    ngAfterViewInit() {

    this.updateProfileSize();
    window.addEventListener('resize', ()=> this.updateProfileSize());

    const observer = new ResizeObserver(() => {this.updateProfileSize()});
    observer.observe(this.terminal.nativeElement);

      gsap.registerPlugin(ScrollTrigger);

      let tl = gsap.timeline({});

      //  ScrollSmoother.create({
      //   wrapper: this.aboutMe.nativeElement,
      //   content: this.terminal.nativeElement,
      //   smooth:1
      // });

      tl.to(this.terminal.nativeElement, {
        x:0,
        duration: 1,
        easing: 'none',
        scrollTrigger:{
          trigger: this.terminal.nativeElement,
          start:"top 99%",
          end:"bottom 100%",
          toggleActions:"restart pause reverse pause",
          scrub:1
        }
      });

      tl.to(this.profile.nativeElement, {
        x:-100,
        duration: 1,
        easing: 'none',
        scrollTrigger:{
          trigger: this.profile.nativeElement,
          start:"top 99%",
          markers:true,
          toggleActions:"restart pause reverse pause",
          scrub:1
        }
      })

    }
  updateProfileSize(): void {
    const terminalEl = this.terminal.nativeElement;

    const rect = terminalEl.getBoundingClientRect();
    const terminalWidth = rect.width;
    const terminalHeight = rect.height;

    // Set profile size to a % of terminal size (e.g., 80%)
    this.profileWidth = terminalWidth * 0.50 ;
    this.profileHeight = terminalHeight * 0.75 ;

    console.log("profile height", this.profileHeight, "profile width", this.profileWidth);
  }

}
