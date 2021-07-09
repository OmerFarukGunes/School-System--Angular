import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ImportService } from 'src/app/services/import.service';
import { AlertifyService } from 'src/app/services/alertify-service.service';
import { GetService } from 'src/app/services/get.service';
@Component({
  selector: 'app-add-admin-form',
  templateUrl: './add-admin-form.component.html',
  styleUrls: ['./add-admin-form.component.css'],
  providers:[ImportService]
})
export class AddAdminFormComponent implements OnInit {

  constructor(private importService:ImportService,private accountService:AccountService,private router:Router,private alertifyService:AlertifyService,private getService:GetService) { }
  id!:Number;
  admin:user = new user();
  ngOnInit() {
    if(this.accountService.loggedIn!="1" ){
      this.router.navigate(["login"]);
      stop;
     }
  }
  add(){
    this.admin.role=1;
    this.getService.checkUserByMail(this.admin).subscribe(checkAdminMail=>{
        if (checkAdminMail.length>0) {
          this.alertifyService.error("Zaten var olan e-mail kaydı");
        }
        else{
          this.importService.addUser(this.admin).subscribe(()=>{ this.alertifyService.success("eklendi");  });

      };
  });
}
}