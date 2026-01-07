import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosScreen } from './pos-screen';

describe('PosScreen', () => {
  let component: PosScreen;
  let fixture: ComponentFixture<PosScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
