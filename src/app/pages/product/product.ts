import { DatePipe } from '@angular/common';
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
    DatePipe,
    Button,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    SelectModule,
    DatePickerModule,
    Toast,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
  providers:[MessageService]
})
export class Product {

  constructor(public productSetting:ProductSetting,private messageService:MessageService){}

  // load data(product) from local storage
  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('product') || '[]');
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

  products: any = [];
  isUpdate = false;
  editId: null | number = null;

  productForm = new FormGroup({

    itemCode: new FormControl('', [
     Validators.required,
     Validators.minLength(5),
     Validators.maxLength(15),
    ]),
    uOm: new FormControl('', [Validators.required]),
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    date: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  // Add + update base on condition (function)  both array + local Storage
  AddProduct(form: any) {
    //for Add product
    if (!this.isUpdate === true) {
      if (form.invalid) {this.show('warn','form Invalid');return;}
      if(!this.checkProduct(form)){this.show('error','Please Enter Uniq Item Code');return;}

      const value = { id: Math.random() * 3000, ...form.value };
      this.products.push(value);
      localStorage.setItem('product', JSON.stringify(this.products));
      this.productForm.reset();
      this.isPopupOpen = false;

    } else {
      // for update product
      if (form.invalid || this.editId === null) {this.show('warn','form Invalid');return;}
      if(!this.checkProduct(form)){this.show('error','Please Enter Uniq Item Code');return;}

      this.products = this.products.map((p: any) => {
        if (p.id === this.editId) {
          let val = { ...p, ...this.productForm.value };
          return {
            ...p,
            ...this.productForm.value,
          };
        }
        return p;
      });

      localStorage.setItem('product', JSON.stringify(this.products));
      this.formClose()
    }
  }

  // only get id for edit product (function)
  editProduct(data: any, id: number) {
    this.isPopupOpen = true;
    this.isUpdate = true;
    this.editId = id;
    this.productForm.patchValue({
      ...data,
      date: new Date(data.date),
    });
    this.productForm.get('itemCode')?.disable();
  }
  
  // for delete Product (function) both array + local Storage
  deleteProduct(id: any) {
    this.products = this.products.filter((p: any) => {
      return p.id !== id;
    });
    localStorage.setItem('product', JSON.stringify(this.products));
  }
  
  // for check  ItemCode not same
  checkProduct(form:any):boolean {
    const isProductExist = this.products.some((p:any) => p.itemCode === form.value.itemCode)
    if (isProductExist) {
      return false;
    }
    return true
  }
  
  formClose(){
    this.isUpdate=false;
    this.editId=null;
    this.productForm.reset();
    this.isPopupOpen = false;
    this.productForm.get('itemCode')?.enable()
  }
}
