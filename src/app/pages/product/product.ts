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

  show() {
    this.messageService.add({ severity: 'warn', summary: 'Alert', detail: 'Form invalid', life: 3000 });
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

    itemCode: new FormControl(null, [
     Validators.required,
     Validators.minLength(12),
     Validators.maxLength(12),
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
    if (!this.isUpdate === true) {
      if (form.invalid) {this.show(); return;}

      const isProductExist = this.products.some((p:any) => p.itemCode === form.value.itemCode || p.productName === form.value.productName)
      if (isProductExist) {
        console.log("stop")
      }else{
        console.log("first")
      }
      const value = { id: Math.random() * 3000, ...form.value };
      this.products.push(value);
      localStorage.setItem('product', JSON.stringify(this.products));
      this.productForm.reset();
      this.isPopupOpen = false;

    } else {

      if (form.invalid || this.editId === null) {this.show();return;}

      this.products = this.products.map((p: any) => {
        if (p.id === this.editId) {
          let val = { ...p, ...this.productForm.value };
          console.log(val, p);
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
  }

  // for delete Product (function) both array + local Storage
  deleteProduct(id: any) {
    this.products = this.products.filter((p: any) => {
      return p.id !== id;
    });
    localStorage.setItem('product', JSON.stringify(this.products));
  }

  formClose(){
    this.isUpdate=false;
    this.editId=null;
    this.productForm.reset();
    this.isPopupOpen = false;
    console.log(this.isUpdate,this.editId,this.isPopupOpen)
  }
}
