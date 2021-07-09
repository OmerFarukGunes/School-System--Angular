import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/students';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { GetService } from 'src/app/services/get.service';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

 
  constructor( private route: ActivatedRoute,private getService:GetService,private accountService:AccountService,private router:Router) { }
  id!:Number;
  student:Student = new Student();
  studentUser:user = new user();
  ngOnInit(): void {
    if(this.accountService.loggedIn=="0" || this.accountService.loggedIn=="2"){
      this.router.navigate(["/login"]);
      stop;
    }
    this.id = this.route.snapshot.params['id'];
    this.getService.getStudents(this.id).subscribe(std=>{this.student= std[0];
      this.getService.getConnectionByStudentId(this.id).subscribe(model=>{
        this.getService.getUserById(std[0].loginId).subscribe(stdUser=>{this.studentUser= stdUser[0];
      });
      
    });
    });

  }
}

