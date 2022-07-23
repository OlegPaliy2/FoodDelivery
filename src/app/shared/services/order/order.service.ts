import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, DocumentData, DocumentReference, deleteDoc,
   docData, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderRequest, IOrderResponse } from '../../inerfaces/order/order.interface';
import { IProductRequest } from '../../inerfaces/product/product.interface';
import { IShopResponse } from '../../inerfaces/shop/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  changeBasket = new Subject<boolean>();

  private url = environment.BACKEND_URL;
  private api = {
    orders: `${this.url}/orders`
  }

  constructor(
    private http: HttpClient,
    private firestore: Firestore,

  ) { }

  getAll(): Observable<IOrderResponse[]> {
    return this.http.get<IOrderResponse[]>(this.api.orders);
  }

  create(order: IOrderRequest): Observable<void> {
    return this.http.post<void>(this.api.orders, order)
  }

  update(order: IOrderResponse, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.orders}/${id}`, order)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.orders}/${id}`)
  }
  getAllFB(): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, "products"));
  }
  createFB(product: IProductRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, "products"), product);
  }
  updateFB(product: IShopResponse, id: string): Promise<void> {
    return setDoc(doc(this.firestore, "products", id), product);
  }
  deleteFB(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, "products", id));
  }
}