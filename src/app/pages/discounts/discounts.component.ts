import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/inerfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';


@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  public userDiscounts: Array<IDiscountResponse> = []
  

  constructor(
    private discountService: DiscountService,
    public location : Location,

    ) { }

  ngOnInit(): void {
    this.loadDiscounts();
  }
  loadDiscounts():void{
    this.discountService.getAll().subscribe(data=>{
      this.userDiscounts=data
    }, err=>{
      console.log('load discount error', err);
    })
  }
 


}
