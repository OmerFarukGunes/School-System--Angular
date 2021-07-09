import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private accountService:AccountService,private router:Router) { }
  user:user = new user();
  log!:string;
  ngOnInit(): void {
    this.accountService.loggedIn="0";
  }
  login(){
     this.accountService.login(this.user);
  }
}
