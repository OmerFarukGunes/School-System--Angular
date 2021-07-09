import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFormComponent } from './screens/add-form/add-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ListAllComponent } from './screens/list-all/list-all.component';
import { LoginComponent } from './screens/login/login.component';
import { AccountService } from './services/account.service';
import { GetService } from './services/get.service';
import { AddStudentFormComponent } from './screens/add-form/add-student-form/add-student-form.component';
import { StudentDetailComponent } from './screens/details/student-detail/student-detail.component';
import { FamilyDetailComponent } from './screens/details/family-detail/family-detail.component';
import { FamiliesListComponent } from './screens/list-all/families-list/families-list.component';
import { AddAdminFormComponent } from './screens/add-form/add-admin-form/add-admin-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
        ListAllComponent,
        LoginComponent,
        AddStudentFormComponent,
        StudentDetailComponent,
        FamilyDetailComponent,
        FamiliesListComponent,
        AddAdminFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AccountService,GetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
