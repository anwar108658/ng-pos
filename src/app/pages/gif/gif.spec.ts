import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gif } from './gif';

describe('Gif', () => {
  let component: Gif;
  let fixture: ComponentFixture<Gif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gif]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gif);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
