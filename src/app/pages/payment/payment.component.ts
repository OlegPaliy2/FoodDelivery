import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/inerfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public orderForm!: FormGroup;
  public basket: Array<IProductResponse>=[];
  public total = 0;
  public countItem = 0;
  public windowPosition = window.scrollTo(0,0)

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.initOrderForm();
    this.loadBasket();
    this.checkChangeBasket();
    this.windowPosition

  }


  initOrderForm(): void{
    this.orderForm = this.fb.group({
      name:[null, Validators.required],
      phoneNumber:[null, Validators.required],
      email:[null, Validators.email],
      address:[null, Validators.required],
      houseNumber:[null, Validators.required],
      apartmentNumber:[null],
      payment:['card', Validators.required],
      notes:[null]
    })
  }

  changePayment(element: HTMLInputElement): void{
    this.orderForm.patchValue({
      payment: element.value
    })
    

  }
  confirmOrder(): void{
    const order = {
      ...this.orderForm.value,
      basket: this.basket,
      price: this.total,
      status: 'PENDING'
    }
    this.orderService.createFB(order).then(()=>{
      localStorage.removeItem('basket');
      this.orderService.changeBasket.next(false);
      this.loadBasket();
      this.orderForm.reset();
    })
    .catch(err =>{
        console.log(err);
      })
    this.orderService.create(order).subscribe(()=> {
      localStorage.removeItem('basket');
      this.orderService.changeBasket.next(false);
      this.loadBasket();
      confirm('Ваше замовлення прийнято!')
      this.orderForm.reset();

    },err =>{
      console.log(err);
    })
    
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

}
