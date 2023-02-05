import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service'; 
import gql from "graphql-tag";
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import {CATEGORIES} from '@app/services/categories.service';
import { SwiperOptions } from 'swiper';
import { DealInterface } from '@app/interfaces/deal';
import { ChangeDetectorRef } from '@angular/core';
import { CapitalizeFirstPipe } from '@pipes/capitalizefirst.pipe';
    //import * as $ from 'jquery';
   declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements AfterViewInit {
  members$: any;
  date="Nov 30, 2022 00:00:00";
    config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  products: any;
  products$: any;  
  categories: any;
  categories$: any;
  deal:any={
    name:"",
    price:""
  };
  constructor(    private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
      public dataApi: DataService,
      public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router
    ) { 
  this.categories=CATEGORIES

    }

  openModal(i:any){
    this._butler.modalOption=i;
  }
  loadProducts(){
    this._butler.skip=0;
    this._butler.limit=9;
  }

  setPreview(member:any){
    this._butler.preview=member;
    this.router.navigate(['/member']);
  }
   public viewChange(option:any){
    if(option=='grid'){
      this._butler.grid=true;
      this._butler.list=false;
    }if(option=='list'){
      this._butler.grid=false;
      this._butler.list=true;
    }
  }

  ngAfterViewInit(): void {
    this._butler.medio=true;
    this.categories$=this.dataApi.categories$;   
    this.cdRef.detectChanges();
    this.loadFromRestUniversal();
  }

  public loadFromRestUniversal(){
      this.members$=this.dataApiService.getAllMembers();
  }
  loadmore(indice:any
    ){
      this._butler.skip=this._butler.skip+9; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
      this.products$=this.dataApi.products$;  
  }
}
