import { Routes } from '@angular/router';
import { AboutMeComponent } from "./about-me/about-me.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'about-me',
  loadComponent:()=>import('./about-me/about-me.component').then(m => m.AboutMeComponent)},
];
