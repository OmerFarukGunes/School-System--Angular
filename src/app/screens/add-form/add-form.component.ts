import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { connection } from 'src/app/models/connection';
import { families } from 'src/app/models/families';
import { Student } from 'src/app/models/students';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { GetService } from 'src/app/services/get.service';
import { ImportService } from 'src/app/services/import.service';
import { UpdateService } from 'src/app/services/update.service';
import { AlertifyService } from 'src/app/services/alertify-service.service';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  providers:[ImportService]
})
export class AddFormComponent implements OnInit {

  constructor( private importService:ImportService,private accountService:AccountService,private router:Router, private route: ActivatedRoute,private getService:GetService,private updateService:UpdateService,private alertifyService:AlertifyService) { }
  student:Student = new Student();
  family:families = new families();
  familyUser:user = new user();
  studentUser:user = new user();
  connect:connection = new connection();
  isAddMode!: boolean;
  id!:number;
  form!:NgForm;
  ngOnInit(): void {
    if(this.accountService.loggedIn!="1" ){
      this.router.navigate(["login"]);
      stop;
     }
   else{
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
       this.getService.getStudents(this.id).subscribe(std=>{this.student= std[0];
        this.getService.getConnectionByStudentId(this.id).subscribe(cStd=>{
          this.getService.getFamily(cStd[0].familyId).subscribe(fml=>{this.family= fml[0];
           this.getService.getUserById(fml[0].loginId).subscribe(fmlUser=>{this.familyUser= fmlUser[0];
            this.getService.getUserById(std[0].loginId).subscribe(stdUser=>{this.studentUser= stdUser[0];
            });
           });
          });
        });
      });
   }
   }
  }
  onSubmit() {
   
    if (this.isAddMode) {
        this.add();
    } else {
        this.update();
       
    }
}
 add(){
  this.familyUser.role =2;
  this.studentUser.role=3;
  this.getService.checkUserByMail(this.studentUser).subscribe(checkStudentMail=>{
    this.getService.checkUserByMail(this.familyUser).subscribe(checkParentMail=>{
      if (checkStudentMail.length>0 || checkParentMail.length >0) {
        this.alertifyService.error("Zaten var olan e-mail kaydı");
      }
      else{
        this.importService.addUser(this.familyUser).subscribe(data=>{ 
          this.family.loginId=data.id
          this.importService.addUser(this.studentUser).subscribe(model=>{
            this.student.loginId=model.id;
            this.importService.addStudent(this.student).subscribe(std=>{this.connect.studentId=std.id; 
              this.importService.addFamily(this.family).subscribe(fml=>{this.connect.familyId =fml.id;
                this.importService.addConnection(this.connect).subscribe(()=>  { this.importService.sendMail(data);
                  this.importService.sendMail(model);
                 this.router.navigate(["List"]);
              });
              });
            });
         });
        });
      }
    })
  });
  
}

 update(){
 
  this.updateService.updateStudent(this.student);
  this.updateService.updateFamily(this.family);
  this.updateService.updateUser(this.familyUser);
  this.updateService.updateUser(this.studentUser);
}
}

