import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { Student } from '../models/students';
import { user } from '../models/user';
import { connection } from '../models/connection';
import { families } from '../models/families';
import { AccountService } from './account.service';
@Injectable()
export class GetService {

  constructor( private http:HttpClient) { }
  pathStudent = "http://localhost:3004/students"
  pathFamily = "http://localhost:3004/families"
  pathUser = "http://localhost:3004/user"
  pathConnect = "http://localhost:3004/connections"

  getStudent(ids:Number[]):Observable<Student[]>{
    const num:string = ids.join(',');
    let newPath =this.pathStudent;
    return this.http.get<Student[]>(this.pathStudent,{params: new HttpParams().set('?id=', num)}).pipe();
  }
  getStudents(id:Number):Observable<Student[]>{
    let newPath =this.pathStudent;
    if (id>0) {
      newPath+="?id="+id;
    }
    console.log(newPath);
    return this.http.get<Student[]>(newPath).pipe(
      catchError(this.handleError)
      //loglama ve hata yakalama komutlari
    );
  }
  getFamily(id:Number):Observable<families[]>{
    let newPath =this.pathFamily;
    if (id>0) {
      newPath+="?id="+id;
    }
    return this.http.get<families[]>(newPath).pipe(
      catchError(this.handleError)
      //loglama ve hata yakalama komutlari
    );
  }
  getStudentByLoginId(id:Number):Observable<Student[]>{
    let newPath =this.pathStudent;
    if (id>0) {
      newPath+="?loginId="+id;
    }
    return this.http.get<Student[]>(newPath).pipe(
      catchError(this.handleError)
      //loglama ve hata yakalama komutlari
    );
  }
  getFamilyByLoginId(id:Number):Observable<families[]>{
    let newPath =this.pathFamily;
    if (id>0) {
      newPath+="?loginId="+id;
    }
    return this.http.get<families[]>(newPath).pipe(
      catchError(this.handleError)
      //loglama ve hata yakalama komutlari
    );
  }
  checkUserByMail(user:user):Observable<user[]>{

    let newPath =this.pathUser;
    if(user.emailAddress){
      newPath+="?emailAddress="+user.emailAddress;
    }
    return this.http.get<user[]>(newPath).pipe(

      catchError(this.handleError)
      //loglama ve hata yakalama komutlari
    );
  }
  getUserByMail(user:user):Observable<user[]>{

    let newPath =this.pathUser;
    if(user.emailAddress){
      newPath+="?emailAddress="+user.emailAddress;
    }
    return this.http.get<user[]>(newPath).pipe(
      tap(data=>{
        if (data[0].password===user.password) {
          return true;
        }
        else{
          return false;
        }
      }),
      catchError(this.handleError)
      //loglama ve hata yakalama komutlari
    );
  }
  getUserById(id:Number):Observable<user[]>{
    let newPath =this.pathUser;
      newPath+="?id="+id;
    return this.http.get<user[]>(newPath).pipe(
      catchError(this.handleError)
    );
  }
  getConnectionByFamilyId(id:Number):Observable<connection[]>{
   let newPath=this.pathConnect;
    newPath+= "?familyId=" +id;

  return this.http.get<connection[]>(newPath).pipe(
    catchError(this.handleError)
    //loglama ve hata yakalama komutlari
  );
  }
  getConnectionByStudentId(id:Number):Observable<connection[]>{
    let newPath=this.pathConnect;
     newPath+= "?studentId=" +id;
   return this.http.get<connection[]>(newPath).pipe(
     catchError(this.handleError)
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
}
