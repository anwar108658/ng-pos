import { Component, ViewChild } from '@angular/core';
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { Popover } from "primeng/popover";
import { CurrencyPipe, Location, PercentPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProductSetting } from '../../services/product-setting';
import { CouponSelectComponent } from '../../components/coupon-select/coupon-select';

@Component({
  selector: 'app-pos-screen',
  imports: [PercentPipe,CurrencyPipe,CouponSelectComponent,FormsModule, Button, InputTextModule, AutoCompleteModule, ɵInternalFormsSharedModule, Popover,TableModule],
  templateUrl: './pos-screen.html',
  styleUrl: './pos-screen.css',
})
export class PosScreen {
  @ViewChild('op') op!:Popover
  @ViewChild('tableCoupon') tableCoupon!:any

  constructor(public productSetting:ProductSetting,private location:Location){}
  ngOnInit(){
    this.products = JSON.parse(localStorage.getItem('product')||'[]')
    this.coupons = JSON.parse(localStorage.getItem('coupon')||'[]')
    console.log(this.coupons)
  }
posButtons = [
  { id: 1, name: 'customers', label: 'Customers', color: 'green', col: 1, row: 1 },
  { id: 2, name: 'orders', label: 'Orders', color: 'yellow', col: 1, row: 1 },
  { id: 3, name: 'sales', label: 'Sales', color: 'blue', col: 1, row: 1 },
  { id: 4, name: 'Back', label: 'back', color: 'red', col: 1, row: 1 },
  { id: 5, name: 'reports', label: 'Reports', color: 'lime', col: 2, row: 1 },
];

getButtonClasses(item: any): string {
  const colorClasses:any = {
    green: 'bg-green-600/70',
    yellow: 'bg-yellow-500/70',
    blue: 'bg-blue-800/60',
    red: 'bg-red-400',
    lime: 'bg-lime-500/70'
  };
  
  const gridClasses = `col-span-${item.col} row-span-${item.row}`;
  
  return `${colorClasses[item.color]} ${gridClasses} rounded-md text-white text-[.8rem] font-semibold p-2`;
}

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
  ]
  products=[];
  coupons:any=[];
  filterCoupons:any=[];
  selectCouponVal:number=0;
  selectedProductsAdvanced:any;
  filteredProducts:any;
  addCartProducts:any[]=[];
  addCartSum:any={};
  selectedRow: any;
  selectRowData:any;
  selectQty:string='';

filterproducts(event: AutoCompleteCompleteEvent) {
  const query = event.query.trim().toLowerCase();
  this.filteredProducts = this.products.filter((product: any) =>
    product.itemCode.toLowerCase().includes(query)
  );
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
      qty: 1,
      discount:0
    });
  }
  this.sumProduct()
}
sumProduct(){
  const subTotal = this.addCartProducts.reduce((acc, item) => {
    let finalPrice = item.qty * item.price
    let discount = finalPrice * (item.discount/100);
    item.price = finalPrice
  return acc + (finalPrice - discount);
}, 0);
  const discount = subTotal * (this.selectCouponVal/100);
  const netAmount = subTotal - discount;

  this.addCartSum = {
   subTotal,
   items:this.addCartProducts.length,
    discount,
    netAmount,
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
  // for delete addCartProducts (function)  array 
  deleteProduct(id: any) {
    this.addCartProducts = this.addCartProducts.filter((p: any) => {
      return p.id !== id;
    });
    this.sumProduct()
  }

  getQty(e:any){
    console.log(e.data)
    this.selectRowData = e.data;
    this.selectQty = String(e.data.qty)
  }
  setQty(c:any){
    const num = [1,2,3,4,5,6,7,8,9,0]
    if(num.includes(c)){
      console.log(this.selectQty.length,"le")
      if (this.selectQty.length == 0 && c == "0") {
        return
      }
      this.selectQty += c
    }else if (c == '←') {
      this.selectQty = this.selectQty.slice(0,-1)
    } else if (c == 'C') {
      this.selectQty='';
    } else if (c == '↲') {
      if (this.selectRowData && this.selectQty.length > 0) {
        this.addCartProducts = this.addCartProducts.map((item)=>{
          if (item.id === this.selectRowData.id) {
            return {...item,qty:Number(this.selectQty)}
          }
          return item
        })
        this.sumProduct()
        this.selectQty = ''
      }
    }
  }

  // for popover on discount
  toggleCoupon(e:any){
    this.op.toggle(e)
    this.filterCoupons = this.coupons
  }
  selectCoupon(coupon:any){
    this.selectCouponVal = coupon;
    this.op.hide()
    this.sumProduct()
  }
  searchCoupons(e:any){
    const val = e.target.value.trim()
    console.log(val)
    this.filterCoupons = this.coupons.filter((item:any) => {
      return item.couponName.toLowerCase().includes(val)
    })
    console.log(this.filterCoupons,this.coupons)
  }
  showCouponToggleForTable(e:any){
    this.tableCoupon.toggleCoupon(e)
  }
  couponSelectForTable(e:any,id:any){
    this.addCartProducts = this.addCartProducts.map((item) => {
      if (item.id == id) {
        return {...item,discount:e}
      }
      return item
    })
    this.sumProduct()
  }

  // pos operational work
  getPosButton(btn:string){
    switch (btn) {
      case 'Back':
        this.location.back()
        break;
    
      default:
        break;
    }
  }
}