import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponSelect } from './coupon-select';

describe('CouponSelect', () => {
  let component: CouponSelect;
  let fixture: ComponentFixture<CouponSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
