import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements AfterViewInit {
   galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  quantity=1;
  constructor(
    private readonly router: Router,
    public _butler:Butler
    ) { }
 
    config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: false,
    spaceBetween: 5,
    navigation: false
  }; 
  imagesArray:any=[];
  plus(){
    this.quantity=this.quantity+1;
    console.log("quantity: "+this.quantity);
  }
  minus(){
    if(this.quantity>1){      
    this.quantity=this.quantity-1;
    console.log("quantity: "+this.quantity);
    }
  }

  addToCar(){
    this._butler.preview.quantity=this.quantity;
    this._butler.car.push(this._butler.preview);
    this._butler.subTotalGral=this._butler.subTotalGral+(this._butler.preview.quantity*this._butler.preview.price);
    this._butler.numProd=this._butler.numProd+1;
    this.quantity=1;
    this.router.navigate(['welcome']);
  }
  ngAfterViewInit(): void {




    if(this._butler.preview.name==undefined){
      this.router.navigate(['welcome'])
    }


    // if(this._butler.preview.name!=undefined){
    //   let size = this._butler.preview.images.length;
    //   for(let i = 0;i<size;i++ ){
    //     this.imagesArray.push({
    //       small: ''+this._butler.preview.images[i],
    //       medium: ''+this._butler.preview.images[i],
    //       big: ''+this._butler.preview.images[i]
    //     })
    //   }
    // }
    this.quantity=1;
  }
  ngOnInit() {
    this.galleryOptions = [
      {
        width: '50%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        width: '100%',
        breakpoint: 400,
        previewZoom: true,
        previewCloseOnEsc:true,
        previewCloseOnClick:true,
        previewKeyboardNavigation:true,
        previewFullscreen:true
      }
    ];

    this.galleryImages = [
    
    ];
    if(this._butler.preview.name!=undefined){
      let size = this._butler.preview.images.length;
      for(let i = 0;i<size;i++ ){
        this.galleryImages.push({
          small: ''+this._butler.preview.images[i],
          medium: ''+this._butler.preview.images[i],
          big: ''+this._butler.preview.images[i]
        })
      }
    }
  }
}
