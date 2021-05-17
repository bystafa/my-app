import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MainComponent } from './views/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchLineComponent } from './components/search-line/search-line.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularYandexMapsModule, YA_CONFIG } from 'angular8-yandex-maps';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CatalogPageComponent } from './views/catalog/catalog.component';
import { InfoComponent } from './views/info/info.component';
import { PartnersComponent } from './views/partners/partners.component';
import { DeliveryComponent } from './views/delivery/delivery.component';
import { AuthComponent } from './views/auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';
import { ModalComponent } from './components/modal/modal.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductCardBasketComponent } from './components/basket/product-card-basket/product-card-basket.component';
import { BasketPageComponent } from './views/basket/basket.component';
import { ProductCardBasketPageComponent } from './views/basket/product-card-basket-page/product-card-basket-page.component';
import { ModalAddProductComponent } from './components/modal-add-product/modal-add-product.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './intercepter/token.intercepter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { OrderPageComponent } from './views/order-page/order-page.component';

const appRoutes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'catalog', component: CatalogPageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'info', component: InfoComponent
  },
  {
    path: 'partners', component: PartnersComponent
  },
  {
    path: 'delivery', component: DeliveryComponent
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [AuthGuard]
  },
  {
    path: 'basket', component: BasketPageComponent, canActivate: [AuthGuard]
  }, 
  {
    path: 'order', component: OrderPageComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    SearchLineComponent,
    ProductCardComponent,
    FooterComponent,
    CatalogComponent,
    InfoComponent,
    PartnersComponent,
    DeliveryComponent,
    CatalogPageComponent,
    AuthComponent,
    RegisterComponent,
    ModalComponent,
    BasketComponent,
    ProductCardBasketComponent,
    BasketPageComponent,
    ProductCardBasketPageComponent,
    ModalAddProductComponent,
    LoaderComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    NgbModule,
    AngularYandexMapsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: YA_CONFIG,
      useValue: {
        apikey: '1d27bdf7-3337-4a1e-bfec-70783fe3d127',
        lang: 'ru_RU',
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
