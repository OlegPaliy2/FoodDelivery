import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IShopResponse } from '../../inerfaces/shop/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url= environment.BACKEND_URL;
  private api= {shop:`${this.url}/shop`}

  constructor(private http: HttpClient) { }

  getAll():Observable<IShopResponse[]>{
    return this.http.get<IShopResponse[]>(this.api.shop);
  }
  getOne(id:number):Observable<IShopResponse>{
    return this.http.get<IShopResponse>(`${this.api.shop}/${id}`);
  }
  create(shop : IShopResponse): Observable<void>{
    return this.http.post<void>(this.api.shop, shop)
  }

  update(shop : IShopResponse, id: number): Observable<void>{
    return this.http.patch<void>(`${this.api.shop}/${id}`, shop)
  }
  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.shop}/${id}`)
  }
}
