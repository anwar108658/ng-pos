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
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-product',
  imports: [
    ReactiveFormsModule,
    Button,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    FloatLabelModule,
    SelectModule,
    DatePickerModule,
    Toast,
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  providers:[MessageService]
})
export class Customers {

  constructor(public productSetting:ProductSetting,private messageService:MessageService){}

  // load data(product) from local storage
  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem('customer') || '[]');
  }

  // message

  show(type:string,detail:string) {
    this.messageService.add({ severity: type, summary: 'Alert', detail: detail, life: 3000 });
  }

  // popup
  isPopupOpen = false;
  customers: any = [];
  isUpdate = false;
  editId: null | number = null;

  customerForm = new FormGroup({
    customerId: new FormControl('', [
     Validators.required,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)
    ]),
  });

  // Add + update base on condition (function)  both array + local Storage
  AddCustomer(form: any) {
    //for Add customer
    console.log(form.value)
    if (!this.isUpdate === true) {
      if (form.invalid ||this.customerForm.get('customerId')?.value?.trim() === "") {this.show('warn','form Invalid');return;}
      if(!this.checkCustomer(form)){this.show('error','Please Enter Uniq Customer Id');return;}
      this.customers.push(form.value);
      localStorage.setItem('customer', JSON.stringify(this.customers));
      this.customerForm.reset();
      this.isPopupOpen = false;

    } else {
      // for update customer
      if (form.invalid || this.editId === null||this.customerForm.get('customerId')?.value?.trim() === "") {this.show('warn','form Invalid');return;}
      if(!this.checkCustomer(form)){this.show('error','Please Enter Uniq Customer Id');return;}

      this.customers = this.customers.map((p: any) => {
        if (p.customerId === this.editId) {
          let val = { ...p, ...this.customerForm.value };
          return val
        }
        return p;
      });

      localStorage.setItem('customer', JSON.stringify(this.customers));
      this.formClose()
    }
  }

  // only get id for edit customer (function)
  editProduct(data: any, id: number) {
    this.isPopupOpen = true;
    this.isUpdate = true;
    this.editId = id;
    this.customerForm.patchValue({
      ...data,
    });
    this.customerForm.get('customerId')?.disable();
  }
  
  // for delete customer (function) both array + local Storage
  deleteProduct(id: any) {
    this.customers = this.customers.filter((p: any) => {
      return p.customerId !== id;
    });
    localStorage.setItem('customer', JSON.stringify(this.customers));
  }
  
  // for check  Customer id not same
  checkCustomer(form:any):boolean {
    const isCustomerExist = this.customers.some((p:any) => p.customerId === form.value.customerId)
    if (isCustomerExist) {
      return false;
    }
    return true
  }
  
  formClose(){
    this.isUpdate=false;
    this.editId=null;
    this.customerForm.reset();
    this.isPopupOpen = false;
    this.customerForm.get('customerId')?.enable()
  }
}
