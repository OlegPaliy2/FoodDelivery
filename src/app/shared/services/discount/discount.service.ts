import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountResponse, IDiscountRequest } from '../../inerfaces/discount/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url= environment.BACKEND_URL;
  private api= {discounts:`${this.url}/discounts`}

  constructor(private http: HttpClient) { }

  getAll():Observable<IDiscountResponse[]>{
    return this.http.get<IDiscountResponse[]>(this.api.discounts);
  }
  getOne(id:number):Observable<IDiscountResponse>{
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`);
  }
  create(discount : IDiscountRequest): Observable<void>{
    return this.http.post<void>(this.api.discounts, discount)
  }

  update(discount : IDiscountRequest, id: number): Observable<void>{
    return this.http.patch<void>(`${this.api.discounts}/${id}`, discount)
  }
  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.discounts}/${id}`)
  }
  
}
