import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { AlertifyService } from './alertify-service.service';
import { GetService } from './get.service';
@Injectable()
export class AccountService {

  constructor(private getService:GetService,private injector: Injector,private router:Router,private alertifyService:AlertifyService) { }
  loggedIn="";
  login(user:user){
      this.getService.getUserByMail(user).subscribe(data=>{
        if (data[0].password===user.password) {
          if (data[0].role==2) {
            this.getService.getFamilyByLoginId(data[0].id).subscribe(model=>{
              this.loggedIn ="2";
              this.router.navigate(["/familyDetail/",model[0].id]);
            });
          }
          else if (data[0].role ==3) {
            this.getService.getStudentByLoginId(data[0].id).subscribe(std=>{
              this.loggedIn ="3";
              this.router.navigate(["/studentDetail/",std[0].id]);
          });
        }else {
            this.loggedIn ="1";
            this.router.navigate(["/List"]);
        }
        }
        else{
          this.alertifyService.error("hatalı girdi");
        }
      },
      error=>{
        this.alertifyService.error("hatalı girdi");
      }
      );
  }
  getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 5; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
