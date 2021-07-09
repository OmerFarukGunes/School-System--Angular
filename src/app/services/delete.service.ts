import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateService } from './update.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http:HttpClient,private updateService:UpdateService) { }

  pathStudent = "http://localhost:3004/students"
  pathFamily = "http://localhost:3004/families"
  pathUser = "http://localhost:3004/user"
  pathConnect = "http://localhost:3004/connections"

  deleteStudent(id:Number):Observable<void>{
    let newPath =this.pathStudent;
      newPath+="/"+id;
    return this.http.delete<void>(newPath).pipe();
}
deleteUser(id:Number):Observable<void>{
  let newPath =this.pathUser;
    newPath+="/"+id;
  return this.http.delete<void>(newPath).pipe();
}
deleteParent(id:Number):Observable<void>{
  let newPath =this.pathFamily;
    newPath+="/"+id;
  return this.http.delete<void>(newPath).pipe();
}
deleteConnection(id:Number):Observable<void>{
  let newPath =this.pathConnect;
    newPath+="/"+id;
  return this.http.delete<void>(newPath).pipe();
}
}
