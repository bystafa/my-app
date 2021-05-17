import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardBasketPageComponent } from './product-card-basket-page.component';

describe('ProductCardBasketPageComponent', () => {
  let component: ProductCardBasketPageComponent;
  let fixture: ComponentFixture<ProductCardBasketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardBasketPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardBasketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
