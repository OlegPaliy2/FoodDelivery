import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Storage, ref, deleteObject, uploadBytes, getDownloadURL } from '@angular/fire/storage';

import { IDiscountResponse } from 'src/app/shared/inerfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

  public adminDiscounts: Array<IDiscountResponse> = [];
  public currentDiscount!: IDiscountResponse;
  public currentDiscountID!: number;
  public editStatus = false;
  public name = '';
  public discountForm!: FormGroup;
  public isUploaded = false;
  public code = ''


  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  randomeCode(): void {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const codeLength = 14;
    for (var i = 0; i <= codeLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      this.code += chars.substring(randomNumber, randomNumber + 1);
    }
  }


  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      name: [null, Validators.required]
    })
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    }, err => {
      console.log('load discount error', err);

    })
  }
  saveDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountID).subscribe(() => {
        this.loadDiscounts();
        this.editStatus = false;
        this.close.nativeElement.click();
        this.initDiscountForm();
        this.isUploaded = false;
      }, err => {
        console.log('update discount error', err);
      });
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.close.nativeElement.click();
        this.loadDiscounts();
        this.initDiscountForm();
        this.isUploaded = false;
      }, err => {
        console.log('create discount error', err);
      });
    }
  }

  
  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscounts();
      this.deleteImage(discount.imagePath);
    }, err => {
      console.log('delete discount error ', err);
    })
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      description: discount.description,
      imagePath: discount.imagePath,
      name: discount.name
    })
    this.currentDiscountID = discount.id;
    this.editStatus = true;
    this.isUploaded = true;

  }


  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
          return await getDownloadURL(storageRef);
        } catch (e: any) {
          return e.message
        }
      } else {
        return '';
      }
    }
  }

  deleteImage(imagePath?: string): void {
    imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
    this.isUploaded = false;
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      console.log('File deleted successfuly');
      this.discountForm.patchValue({
        imagePath: null
      })

    })
  }
  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;

  }


}
