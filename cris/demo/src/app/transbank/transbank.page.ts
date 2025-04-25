import { Component, OnInit } from '@angular/core';
import { TransbankService } from './transbank-service';
import { RedirectCommand, Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-transbank',
  templateUrl: './transbank.page.html',
  styleUrls: ['./transbank.page.scss'],
})
export class TransbankPage implements OnInit {

  constructor(private tr: TransbankService, 
   private router:Router,
   private location: Location
  ) { }

  ngOnInit() {
  }

  pagar(){
    this.tr.getToken(1)
    .subscribe({
      next:(data:any)=>{
        console.log("respuesta",data)
        //RedirectCommand
        //this.router.navigate([data.url]);
        //this.location=data.url
        window.location.href = data.url + "?token_ws="+data.token ;
      },
      error:(err:any)=>{console.log(err)},
      complete:()=>{}
    })
  }

}
