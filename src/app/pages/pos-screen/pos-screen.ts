import { Component } from '@angular/core';

@Component({
  selector: 'app-pos-screen',
  imports: [],
  templateUrl: './pos-screen.html',
  styleUrl: './pos-screen.css',
})
export class PosScreen {
  posButton=[
    {id:1,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:2,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-yellow-400"},
    {id:3,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-yellow-400"},
    {id:4,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-pink-400"},
    {id:5,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:6,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:7,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:8,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:9,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:10,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:11,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:12,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:12,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:13,name:"customers",label:"Customers",class:"col-span-2 row-span-1 bg-green-400"},
  ];
  itemData=[
    {id:234234324324344,name:"Mushroom Swiss",category:"Ecah",img:"",unitPrice:"35.00",discount:"0.00%", vat:"5.500&"}
  ]
}
