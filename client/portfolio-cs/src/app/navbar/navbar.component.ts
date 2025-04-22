import { Component } from '@angular/core';
import { links } from '../constants'
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  imports: [
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public getNavLinks(){
    links.map((link)=>{
      console.log("links", link)
    })
  }


  protected readonly links = links;
}
