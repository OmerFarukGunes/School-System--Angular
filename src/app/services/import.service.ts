import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { async, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Student } from '../models/students';
import { families } from '../models/families';
import { user } from '../models/user';
import { connection } from '../models/connection';
import { EmailService } from './email.service';
@Injectable()
export class ImportService {

  constructor( private http:HttpClient,private httpService:EmailService) { }
  pathStudent = "http://localhost:3004/students"
  pathFamily = "http://localhost:3004/families"
  pathUser = "http://localhost:3004/user"
  pathConnect = "http://localhost:3004/connections"

httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Token'
    })
 }
 addFamily(family:families):Observable<families>{
 

  return this.http.post<families>(this.pathFamily,family,this.httpOptions).pipe(
    catchError(this.handleError)
    //loglama ve hata yakalama komutlari
  );
} 

sendMail(user:user){
  this.httpService.sendEmail("http://localhost:3000/sendmail", user).subscribe(
    data => {
      let res:any = data; 
      console.log(
        `Succes ${res.messageId}`
      );
    },
    err => {
      console.log(err);
    }
  );
}

 addUser(user:user):Observable<user>{
  
  user.password = this.getRandomString();
 return this.http.post<user>(this.pathUser,user,this.httpOptions).pipe(
    catchError(this.handleError)
    //loglama ve hata yakalama komutlari
  );
}

 addConnection(connection:connection):Observable<connection>{
  return this.http.post<connection>(this.pathConnect,connection,this.httpOptions).pipe(
    catchError(this.handleError)
    //loglama ve hata yakalama komutlari
  );
}
   addStudent(student:Student):Observable<Student>{
 
    return  this.http.post<Student>(this.pathStudent,student,this.httpOptions).pipe(
      catchError(this.handleError),
      //loglama ve hata yakalama komutlari
    );

  }
  handleError(err:HttpErrorResponse){
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
      errorMessage + 'Bir hata olustu' + err.error.message
    }
    else{
      errorMessage='sistemsel bir hata';
    }
    return throwError(errorMessage);
  }

   getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 10; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}