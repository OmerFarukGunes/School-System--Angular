import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/students';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(url:string, data:user) {
    return this.http.post(url, data);
  }
}


