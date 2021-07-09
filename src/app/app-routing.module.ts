import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminFormComponent } from './screens/add-form/add-admin-form/add-admin-form.component';
import { AddFormComponent } from './screens/add-form/add-form.component';
import { AddStudentFormComponent } from './screens/add-form/add-student-form/add-student-form.component';
import { FamilyDetailComponent } from './screens/details/family-detail/family-detail.component';
import { StudentDetailComponent } from './screens/details/student-detail/student-detail.component';
import { FamiliesListComponent } from './screens/list-all/families-list/families-list.component';
import { ListAllComponent } from './screens/list-all/list-all.component';
import { LoginComponent } from './screens/login/login.component';

const routes: Routes = [
  {path:'AddForm',component:AddFormComponent},
  {path:'List',component:ListAllComponent},
  {path:'familyList',component:FamiliesListComponent},
  {path:'login',component:LoginComponent},
  {path:'studentDetail/:id',component:StudentDetailComponent},
  {path:'familyDetail/:id',component:FamilyDetailComponent},
  {path: 'AddForm/:id', component: AddFormComponent },
  {path: 'AddAdmin/:id', component: AddAdminFormComponent },
  {path: 'AddStudent/:id', component: AddStudentFormComponent },
  {path: 'AddAdmin', component: AddAdminFormComponent },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
