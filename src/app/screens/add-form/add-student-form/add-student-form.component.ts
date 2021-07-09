import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { connection } from 'src/app/models/connection';
import { Student } from 'src/app/models/students';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify-service.service';
import { GetService } from 'src/app/services/get.service';
import { ImportService } from 'src/app/services/import.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
  providers:[ImportService]
})
export class AddStudentFormComponent implements OnInit {

  constructor( private route: ActivatedRoute,private getService:GetService,private importService:ImportService,private alertifyService:AlertifyService,private accountService:AccountService,private router:Router) { }
  id!:Number;
  student:Student = new Student();
  studentUser:user = new user();
  connection:connection = new connection();
  ngOnInit(): void {
    if(this.accountService.loggedIn!="1" ){
     this.router.navigate(["login"]);
     stop;
    }
    this.id = this.route.snapshot.params['id'];
    this.getService.getConnectionByFamilyId(this.id).subscribe(data => {this.connection.familyId = data[0].familyId});
  }
  add(){
    this.connection.familyId = this.id;
      this.importService.addUser(this.studentUser).subscribe(model=>{
        this.student.loginId=model.id;
        this.importService.addStudent(this.student).subscribe(std=>{this.connection.studentId=std.id; 
            this.importService.addConnection(this.connection).subscribe(()=>  {this.importService.sendMail(model);
              this.router.navigate(["List"]);
          });
          });
        });
  }
}
