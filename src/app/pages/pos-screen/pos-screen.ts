import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { InputText, InputTextModule } from 'primeng/inputtext';
import { InputNumber } from "primeng/inputnumber";
import { RouterLink } from "@angular/router";
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-pos-screen',
  imports: [FormsModule,Button, InputTextModule, AutoCompleteModule, ɵInternalFormsSharedModule],
  templateUrl: './pos-screen.html',
  styleUrl: './pos-screen.css',
})
export class PosScreen {
  ngOnInit(){
    this.products = JSON.parse(localStorage.getItem('product')||'[]')
    console.log(this.products) 
  }
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
    {id:12,name:"customers",label:"Customers",class:"col-span-1 row-span-1 bg-green-400"},
    {id:13,name:"customers",label:"Customers",class:"col-span-2 row-span-1 bg-green-400"},
  ];
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
    {id:"↲",class:"  row-span-2 "},
    {id:0,class:""},
    {id:0,class:""},
    {id:0,class:""},
  ]
  products=[];
  selectedProductsAdvanced:any;
  filteredProducts:any;
  addCartProducts:any[]=[];
  filterproducts(event:AutoCompleteCompleteEvent){
      let filtered: any[] = [];
      let query = event.query;

      for (let index = 0; index < this.products.length; index++) {
        const product:any = this.products[index];
        if (product.itemCode.includes(query)) {
            filtered.push(product);
          }
      }
      this.filteredProducts = filtered;
  }

selectProduct() {
  const existingItem = this.addCartProducts.find(
    i => i.itemCode === this.selectedProductsAdvanced.itemCode
  );

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    this.addCartProducts.push({
      ...this.selectedProductsAdvanced,
      qty: 1
    });
  }
}
onKeyUp(e:any){
  if (e.key !== 'Enter') return;
    if (typeof this.selectedProductsAdvanced === 'object') {
    this.selectProduct();
    this.selectedProductsAdvanced = null;
    return;
  }

  const match = this.products.find(
    (p:any) => p.itemCode === this.selectedProductsAdvanced
  );

  if (match) {
    this.selectedProductsAdvanced = match;
    this.selectProduct();
    this.selectedProductsAdvanced = null;
  }
}
}