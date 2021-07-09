import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { families } from '../models/families';
import { Student } from '../models/students';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient) {}
  pathStudent = "http://localhost:3004/students/"
  pathFamily = "http://localhost:3004/families/"
  pathUser = "http://localhost:3004/user/"

  updateStudent(student:Student) {
    this.http.put<Student>(this.pathStudent + student.id, student).subscribe({
      error:()  => {
          alert("hata");
      }
  });
  }
  updateFamily(family:families) {
    this.http.put<families>(this.pathFamily + family.id, family).subscribe({
      error: error => {
          alert("hata");
      }
  });
  }
  updateUser(user:user) {
    this.http.put<user>(this.pathUser + user.id, user).subscribe({
      error: error => {
          alert("hata");
      }
  });
  }
}
