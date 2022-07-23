import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IProductResponse } from 'src/app/shared/inerfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public basket: Array<IProductResponse>=[];
  public total = 0;
  public count = 0;
  public countItem = 0;
  public windowPosition = window.scrollTo(0,0)

  
  constructor(
    private orderService: OrderService,
    public Location: Location,
  ) { }

  ngOnInit(): void {
    this.windowPosition
    this.loadBasket()
    this.checkChangeBasket();
  }
  checkChangeBasket(): void{
    this.orderService.changeBasket.subscribe(()=> {
      this.loadBasket();
    });
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
  

  changeCount(product: IProductResponse, status: boolean): void{

    if(status){
      ++product.count;
    }
    else if(!status && product.count > 1){
      --product.count;
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    product.count =1;
    this.orderService.changeBasket.next(true);
  }
  
  deleteProduct(product: IProductResponse): void{
    if(confirm('Ви впевнені?')){
      const index = this.basket.findIndex(p => p.id === product.id);
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.orderService.changeBasket.next(true);
    }
  }


  addToBasket(product: IProductResponse): void{
  let basket: IProductResponse[] =[];
  if(localStorage.length > 0 && localStorage.getItem('basket')){
    basket = JSON.parse(localStorage.getItem('basket') as string );
    if(basket.some(prod =>prod.id===product.id)){
      const index =basket.findIndex(prod =>prod.id===product.id);
      basket[index].count += product.count;
      }
      else{
        basket.push(product);
      }
    }
    else{
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  
  }
}

