import { Component, OnInit } from '@angular/core';
import { IOrderResponse } from 'src/app/shared/inerfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public adminOrders: Array<IOrderResponse> = [];

  constructor(
    private orderService : OrderService,
  ) { }

  ngOnInit(): void {
    this.loadOrders()

  }
  loadOrders(): void{
    this.orderService.getAll().subscribe(data=>{
      this.adminOrders = data;
    },err => {
      console.log(err); 
    })
  }
  deleteOrder(order: IOrderResponse): void {
    this.orderService.delete(order.id).subscribe(() => {
      this.loadOrders();
    }, err => {
      console.log('delete Order error', err);
    });
  }

}
