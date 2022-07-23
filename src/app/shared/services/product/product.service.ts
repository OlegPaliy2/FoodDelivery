import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductResponse } from '../../inerfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getByShop(name: string) {
    throw new Error('Method not implemented.');
  }

  private url= environment.BACKEND_URL;
  private api= {product:`${this.url}/product`}

  constructor(private http: HttpClient) { }

  getAll():Observable<IProductResponse[]>{
    return this.http.get<IProductResponse[]>(this.api.product);
  }
  getOne(id:number):Observable<IProductResponse>{
    return this.http.get<IProductResponse>(`${this.api.product}/${id}`);
  }
  create(product : IProductResponse): Observable<void>{
    return this.http.post<void>(this.api.product, product)
  }

  update(product : IProductResponse, id: number): Observable<void>{
    return this.http.patch<void>(`${this.api.product}/${id}`, product)
  }
  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.product}/${id}`)
  }
  getByCategory(categoryName: string):Observable<IProductResponse[]>{
    return this.http.get<IProductResponse[]>(`${this.api.product}?category.path=${categoryName}`);
  }
}
