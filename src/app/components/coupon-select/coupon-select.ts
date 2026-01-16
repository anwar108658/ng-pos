import { PercentPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-coupon-select',
  templateUrl: './coupon-select.html',
  imports:[PercentPipe,PopoverModule,InputTextModule]
})
export class CouponSelectComponent {
  @Input() coupons: any[] = [];
  @Output() couponSelected = new EventEmitter<number>();

  @ViewChild('op') op!: Popover;

  filterCoupons: any[] = [];

  ngOnInit() {
    this.filterCoupons = [...this.coupons];
  }

  searchCoupons(e: any) {
    const val = e.target.value.toLowerCase().trim();
    this.filterCoupons = this.coupons.filter(c =>
      c.couponName.toLowerCase().includes(val)
    );
  }
toggleCoupon(event: any) {
  this.filterCoupons = [...this.coupons];
  this.op.toggle(event);
}

  selectCoupon(amount: number) {
    this.couponSelected.emit(amount);
    this.op.hide();
  }
}
