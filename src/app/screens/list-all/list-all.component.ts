import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/students';
import { AccountService } from 'src/app/services/account.service';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css'],
  providers:[GetService]
})
export class ListAllComponent implements OnInit {
   
  constructor( private getService:GetService,private accountService:AccountService,private router:Router,private deleteService:DeleteService) { }
  filterText = ""
  students?:Student[];
  ngOnInit(): void {
    
    if(this.accountService.loggedIn!="1" ){
      this.router.navigate(["login"]);
      stop;
     }
    this.getService.getStudents(0).subscribe(data=>{this.students= data});
  }
  onDelete(id:Number,logId:Number){
    
    this.getService.getConnectionByStudentId(id).subscribe(data=>{
      this.deleteService.deleteStudent(id).subscribe(()=>{
        this.deleteService.deleteUser(logId).subscribe(()=>
        {
          this.getService.getStudents(0).subscribe(data=>{this.students= data});
        });
       });
      });
    
      }
   
  }


