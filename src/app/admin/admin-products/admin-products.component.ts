import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product/product.service';
import {  Storage, ref, deleteObject, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { IShopResponse } from 'src/app/shared/inerfaces/shop/shop.interface';
import { IProductResponse } from 'src/app/shared/inerfaces/product/product.interface';
import { ShopService } from 'src/app/shared/services/shop/shop.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  @ViewChild('close') close!: ElementRef;

  public adminShop: Array<IShopResponse> = [];
  public currentShop!: IShopResponse;
  public currentShopID!: number;
  public adminProducts: Array<IProductResponse> = [];
  public currentProduct!: IProductResponse;
  public currentProductID!: number;
  public editStatus = false;
  public productForm!: FormGroup;
  public isUploaded = false;

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadShop();
    this.loadProducts();

  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      shop:[null, Validators.required],
      name:[null, Validators.required],
      path:[null, Validators.required],
      description:[null, Validators.required],
      weight:[null, Validators.required],
      price:[null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1, Validators.required]
    }) 

  }

  loadShop(): void {
    this.shopService.getAll().subscribe(data => {
      this.adminShop = data as IShopResponse[]
      this.adminShop = data;
    }, err => {
      console.log('load Shop error', err);
    })
  }

  
  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    }, err => {
      console.log('load Product error', err);
    })
  }

  saveProduct(): void {
    if (this.editStatus) {
      this.productService.update(this.productForm.value, this.currentProductID).subscribe(() => {
        this.loadProducts();
        this.editStatus = false;
        this.initProductForm();
        this.close.nativeElement.click();
         this.isUploaded = false;
      }, err => {
        console.log('update Product error', err);
      });
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.close.nativeElement.click();
        this.loadProducts();
        this.initProductForm();
        this.isUploaded = false;
      }, err => {
        console.log('create Product error', err);
      });
    }
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProducts();
      this.deleteImage(product.imagePath);
    }, err => {
      console.log('delete Product error', err);
    });
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      shop:product.shop.id,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,

      imagePath: product.imagePath
    });
    this.currentProductID = product.id;
    this.editStatus = true;
     this.isUploaded = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('product', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`; {
      if (file) {
        try {
          const storageRef = ref(this.storage, path);
          const task = uploadBytes(storageRef, file);
          await task;
          return  await getDownloadURL(storageRef);
        } catch (e: any) {
          return e.message
        }
      } else {
        return '';
      }
    }
  }

  deleteImage(imagePath?:string): void {
    imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
    this.isUploaded = false;
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      console.log('File deleted successfuly');
      this.productForm.patchValue({
        imagePath: null
      })
      
    })
  }
  valueByControl(control: string): string{
    return this.productForm.get(control)?.value;

  }

  changeShop():void{
  }


}

