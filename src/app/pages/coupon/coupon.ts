import { DatePipe,CurrencyPipe, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ProductSetting } from '../../services/product-setting';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  imports: [
    ReactiveFormsModule,
    PercentPipe,
    Button,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    SelectModule,
    DatePickerModule,
    Toast,
  ],
  templateUrl: './coupon.html',
  styleUrl: './coupon.css',
  providers:[MessageService]
})
export class Coupon {

  constructor(public productSetting:ProductSetting,private messageService:MessageService){}

  // load data(product) from local storage
  ngOnInit() {
    this.coupons = JSON.parse(localStorage.getItem('coupon') || '[]');
  }

  // message

  show(type:string,detail:string) {
    this.messageService.add({ severity: type, summary: 'Alert', detail: detail, life: 3000 });
  }

  // popup
  isPopupOpen = false;
  selectCategory = ['Phone', 'Laptop'];
  uomList = [
  { code: 'PCS', label: 'Piece' },
  { code: 'KG', label: 'Kilogram' },
  { code: 'G', label: 'Gram' },
  { code: 'L', label: 'Liter' },
  { code: 'ML', label: 'Milliliter' },
  { code: 'BOX', label: 'Box' },
  { code: 'PACK', label: 'Pack' },
  { code: 'DOZEN', label: '12 Pieces' },
];

  coupons: any = [];
  isUpdate = false;
  editId: null | number = null;

  couponForm = new FormGroup({

    couponId: new FormControl('', [
     Validators.required,
     Validators.minLength(1),
     Validators.maxLength(15),
    ]),
    couponName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    amount: new FormControl('', [
      Validators.required,
    ]),
  });

  // Add + update base on condition (function)  both array + local Storage
  AddCoupon(form: any) {
    //for Add coupon
    if (!this.isUpdate === true) {
      if (form.invalid ||this.couponForm.get('couponId')?.value?.trim() === "") {this.show('warn','form Invalid');return;}
      if(!this.checkCoupon(form)){this.show('error','Please Enter Uniq Coupon Id');return;}
      this.coupons.push(form.value);
      localStorage.setItem('coupon', JSON.stringify(this.coupons));
      this.couponForm.reset();
      this.isPopupOpen = false;

    } else {
      // for update coupon
      if (form.invalid || this.editId === null||this.couponForm.get('couponId')?.value?.trim() === "") {this.show('warn','form Invalid');return;}
      if(!this.checkCoupon(form)){this.show('error','Please Enter Uniq Item Code');return;}

      this.coupons = this.coupons.map((p: any) => {
        if (p.couponId === this.editId) {
          let val = { ...p, ...this.couponForm.value };
          return val
        }
        return p;
      });

      localStorage.setItem('coupon', JSON.stringify(this.coupons));
      this.formClose()
    }
  }

  // only get id for edit coupon (function)
  editProduct(data: any, id: number) {
    this.isPopupOpen = true;
    this.isUpdate = true;
    this.editId = id;
    this.couponForm.patchValue({
      ...data,
    });
    this.couponForm.get('couponId')?.disable();
  }
  
  // for delete coupon (function) both array + local Storage
  deleteProduct(id: any) {
    this.coupons = this.coupons.filter((p: any) => {
      return p.couponId !== id;
    });
    localStorage.setItem('coupon', JSON.stringify(this.coupons));
  }
  
  // for check  ItemCode not same
  checkCoupon(form:any):boolean {
    const isCouponExist = this.coupons.some((p:any) => p.couponId === form.value.couponId)
    if (isCouponExist) {
      return false;
    }
    return true
  }
  
  formClose(){
    this.isUpdate=false;
    this.editId=null;
    this.couponForm.reset();
    this.isPopupOpen = false;
    this.couponForm.get('couponId')?.enable()
  }
}
