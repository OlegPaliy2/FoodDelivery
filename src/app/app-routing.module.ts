import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'menu/:shop', component: ProductsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'products', component: ProductsComponent },
  {path: 'admin', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin-shop' },
      { path: 'admin-shop', component: AdminShopComponent },
      { path: 'admin-products', component: AdminProductsComponent },
      { path: 'admin-discounts', component: AdminDiscountsComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
