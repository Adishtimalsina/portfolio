import {Component, OnInit} from '@angular/core';
import { links } from '../constants'
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{

  isOpen = false;

  // public getNavLinks(){
  //   links.map((link)=>{
  //     console.log("links", link)
  //   })
  // }


  public static navOpenClose(){

  }


  protected readonly links = links;

  ngOnInit(): void {
  }
}
