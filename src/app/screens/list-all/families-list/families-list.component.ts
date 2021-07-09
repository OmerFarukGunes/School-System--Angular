import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { families } from 'src/app/models/families';
import { AccountService } from 'src/app/services/account.service';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {

    
  constructor( private getService:GetService,private accountService:AccountService,private router:Router,private deleteService:DeleteService) { }
  filterText = ""
  family?:families[];
  ngOnInit(): void {
    if(this.accountService.loggedIn!="1" ){
      this.router.navigate(["login"]);
      stop;
     }
    this.getService.getFamily(0).subscribe(data=>{this.family= data});
  }
  onDelete(id:Number,logId:Number){
    
    this.getService.getConnectionByStudentId(id).subscribe(data=>{
      this.deleteService.deleteParent(id).subscribe(()=>{
        this.deleteService.deleteUser(logId).subscribe(()=>
        {
            this.getService.getFamily(0).subscribe(data=>{this.family= data});
        
        });
       });
      });
    
  }

}
