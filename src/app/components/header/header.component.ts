import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/inerfaces/product/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public total = 0;
  public count = 0;
  public countItem = 0;
  public basket: Array<IProductResponse> = [];
  public menuStyle = 'dropMenuBody';

  constructor() { }

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    } else{
      this.basket = [];
    }
    this.setTotalPrice();
  }
  setTotalPrice(): void {
    if (this.basket.length === 0) {
      this.total = 0;
       this.countItem = 0;
    } else {
      this.total = this.basket.reduce((total, prod) => total + prod.price * prod.count, 0);
      this.countItem = this.basket.reduce((countItem, prod) => countItem + prod.count, 0);
    }
  }
  
  
  showMenu() {
    if (this.menuStyle == 'dropMenuChange') {
       this.menuStyle = 'dropMenuBody';
    } else {
       this.menuStyle = 'dropMenuChange';
    }
 }

}
