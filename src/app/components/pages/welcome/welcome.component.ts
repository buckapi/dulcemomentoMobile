import { Component, OnInit,AfterViewInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { DataApiService } from '@services/data-api.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {
members$:any=[];
parts$:any=[];
cars$:any=[];
originalCars$:any=[];
  constructor(
    private readonly router: Router,
    public _butler:Butler,
    public dataApiService: DataApiService,
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

  public getParts(){
    this.dataApiService.getAllParts().subscribe(response=>{
        this.parts$=response;
      });
  }
  public getCars(){
    this.dataApiService.getAllCars().subscribe(response=>{
        this._butler.cars$=response;
        this._butler.originalCars$=response;
      });
  }
  public getMembers(){
    this.dataApiService.getAllMembers().subscribe(response=>{
        this.members$=response;
      });
  }
  public setPreview(part:any){
    this._butler.preview=part;
    this.router.navigate(['/detail']);
  }
  public setUserd(member:any){
    this._butler.userdSelected=member.userd;
    this._butler.userdFiltered=true;
  }
  ngAfterViewInit(): void {
    this.getMembers();
    this.getParts();
    this.getCars();
  }

}
