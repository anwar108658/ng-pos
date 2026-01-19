import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductSetting } from './services/product-setting';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RouterLinkWithHref, RouterLinkActive,PopoverModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public productSetting:ProductSetting){}
  // sidebar
  isSidebarOpen:boolean=true
  sideMenu=[
    {id:1,route:"product",label:"Product",icon:"pi pi-cart-plus"},
    {id:2,route:"coupon",label:"Coupon",icon:"pi pi-gift"},
    {id:3,route:"customers",label:"Customers",icon:"pi pi-users"},
    {id:4,route:"pos_screen",label:"point of sale",icon:"pi pi-receipt"},
  ]
  
  protected readonly title = signal('pos');
}
