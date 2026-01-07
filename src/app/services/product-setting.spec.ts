import { TestBed } from '@angular/core/testing';

import { ProductSetting } from './product-setting';

describe('ProductSetting', () => {
  let service: ProductSetting;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSetting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
