import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { percentage, ref, uploadBytesResumable, Storage, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IShopResponse } from 'src/app/shared/inerfaces/shop/shop.interface';
import { ShopService } from 'src/app/shared/services/shop/shop.service';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.scss']
})
export class AdminShopComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
 
   public adminShop: Array<IShopResponse> = [];
   public currentShop!: IShopResponse;
   public currentShopID!: number;
   public editStatus = false;
   public shopForm!: FormGroup;
   public isUploaded = false;
   public uploadPercent!: number;
   constructor(
     private shopService: ShopService,
     private fb: FormBuilder,
     private storage: Storage
   ) { }
 
   ngOnInit(): void {
     this.initShopForm();
     this.loadShop();
   }
 
   initShopForm(): void {
     this.shopForm = this.fb.group({
       name:[null, Validators.required],
       path:[null, Validators.required],
       imagePath: [null, Validators.required],
     })
   }
 
   loadShop(): void {
     this.shopService.getAll().subscribe(data => {
       this.adminShop = data;
     }, err => {
       console.log('load Category error', err);
     })
   }
 
   saveShop(): void {
     if (this.editStatus) {
       this.shopService.update(this.shopForm.value, this.currentShopID).subscribe(() => {
         this.loadShop();
         this.editStatus = false;
         this.initShopForm();
         this.close.nativeElement.click();
          this.isUploaded = false;
       }, err => {
         console.log('update Shop error', err);
       });
     } else {
       this.shopService.create(this.shopForm.value).subscribe(() => {
         this.close.nativeElement.click();
         this.loadShop();
         this.initShopForm();
         this.isUploaded = false;
       }, err => {
         console.log('create Shop error', err);
       });
     }
   }
 
   deleteShop(shop: IShopResponse): void {
     this.shopService.delete(shop.id).subscribe(() => {
       this.loadShop();
       this.deleteImage(shop.imagePath);
     }, err => {
       console.log('delete Shop error', err);
     });
   }
 
   editShop(shop: IShopResponse): void {
     this.shopForm.patchValue({
       name: shop.name,
       path: shop.path,
       imagePath: shop.imagePath
     });
     this.currentShopID = shop.id;
     this.editStatus = true;
      this.isUploaded = true;
   }
 
   upload(event: any): void {
     const file = event.target.files[0];
     this.uploadFile('shop', file.name, file)
       .then(data => {
         this.shopForm.patchValue({
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
     const path = `${folder}/${name}.${ext}`;
     let url = '';
     if (file) {
       try {
         const storageRef = ref(this.storage, path);
         const task = uploadBytesResumable(storageRef, file);
         percentage(task).subscribe(data => {
           this.uploadPercent = data.progress
         });
         await task;
         url = await getDownloadURL(storageRef);
       } catch (e: any) {
         console.error(e);
       }
     } else {
       console.log('wrong format')
     }
     return Promise.resolve(url);
   }
 
   deleteImage(imagePath?:string): void {
     imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
     this.isUploaded = false;
     const task = ref(this.storage, imagePath);
     deleteObject(task).then(() => {
       console.log('File deleted successfuly');
       this.shopForm.patchValue({
         imagePath: null
       })
       
     })
   }
   valueByControl(control: string): string{
     return this.shopForm.get(control)?.value;
 
   }
 
 }
