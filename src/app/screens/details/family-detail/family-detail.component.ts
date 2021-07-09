import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { families } from 'src/app/models/families';
import { Student } from 'src/app/models/students';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { GetService } from 'src/app/services/get.service';
@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {

 
  constructor( private route: ActivatedRoute,private getService:GetService,private accountService:AccountService,private router:Router) { }
  id!:Number;
  family:families = new families();
  familyUser:user = new user();
  students:Student[]=[];
  ids:Number[]=[];
  ok=false;
  ngOnInit(): void {
    if(this.accountService.loggedIn=="0" || this.accountService.loggedIn=="3"){
      this.router.navigate(["/login"]);
      stop;
    }
    this.id = this.route.snapshot.params['id'];
    this.getService.getFamily(this.id).subscribe(fml=>{this.family= fml[0];
      this.getService.getConnectionByFamilyId(this.id).subscribe(data=>{
        for (let index = 0; index < data.length; index++) {
        this.ids[index]=data[index].studentId;
        }
          this.getService.getStudent(this.ids).subscribe((model)=>this.students=model);
      });
    });
  }

  next(){
    
}
  
  isLoggedIn(){
   return this.accountService.loggedIn
  }
}