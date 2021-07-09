import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private accountService:AccountService){

  }
  title = 'schoolSystem';
   isLoggedIn(){
    return this.accountService.loggedIn;
   }
   logOut(){
    return this.accountService.loggedIn="0";
   }
}
