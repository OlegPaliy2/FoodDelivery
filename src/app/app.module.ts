import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { AdminShopComponent } from './admin/admin-shop/admin-shop.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { HistoryComponent } from './pages/history/history.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    HomeComponent,
    DiscountsComponent,
    ShopComponent,
    PaymentComponent,
    BasketComponent,
    AdminComponent,
    AdminShopComponent,
    AdminProductsComponent,
    AdminDiscountsComponent,
    AdminOrdersComponent,
    HistoryComponent,
    ProductsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
