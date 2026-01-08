import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { InputText, InputTextModule } from 'primeng/inputtext';
import { InputNumber } from "primeng/inputnumber";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pos-screen',
  imports: [Button, InputTextModule, RouterLink],
  templateUrl: './pos-screen.html',
  styleUrl: './pos-screen.css',
})
export class PosScreen {
  posButton=[
    {id:1,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-600/70"},
    {id:2,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-yellow-500/70"},
    {id:2,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-yellow-500/70"},
    {id:4,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-blue-800/60"},
    {id:5,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-red-400"},
    {id:6,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-lime-500/70"},
    {id:6,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-lime-500/70"},
    {id:6,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-lime-500/70"},
    {id:9,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:10,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:11,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:12,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:12,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:13,name:"customers",label:"Customers",class:"col-span-2 row-span-1 bg-green-400"},
  ];
  itemData=[
    {id:234234324324344,name:"Mushroom Swiss",category:"Ecah",img:"assets/logo.png",qty:1,price:30.00,unitPrice:"35.00",discount:"0.00%", vat:"5.500&",total:"31.50"},
    {id:234234324324344,name:"Mushroom Swiss",category:"Ecah",img:"assets/logo.png",qty:1,price:30.00,unitPrice:"35.00",discount:"0.00%", vat:"5.500&",total:"31.50"},
    {id:234234324324344,name:"Mushroom Swiss",category:"Ecah",img:"assets/logo.png",qty:1,price:30.00,unitPrice:"35.00",discount:"0.00%", vat:"5.500&",total:"31.50"},
    {id:234234324324344,name:"Mushroom Swiss",category:"Ecah",img:"assets/logo.png",qty:1,price:30.00,unitPrice:"35.00",discount:"0.00%", vat:"5.500&",total:"31.50"},
  ]
  calculateNum=[
    {id:7,class:""},
    {id:8,class:""},
    {id:9,class:""},
    {id:"←",class:""},
    {id:4,class:""},
    {id:5,class:""},
    {id:6,class:""},
    {id:"C",class:""},
    {id:1,class:""},
    {id:2,class:""},
    {id:3,class:""},
    {id:0,class:"  row-span-2 "},
    {id:0,class:""},
    {id:0,class:""},
    {id:0,class:""},
  ]
}
