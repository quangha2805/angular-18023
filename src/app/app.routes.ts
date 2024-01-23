import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ProductsComponent } from './pages/admin/products/products.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { EditComponent } from './pages/admin/edit/edit.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { RegisterComponent } from './pages/admin/register/register.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [adminGuard],
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      {
        path: 'create', component: CreateComponent
      },
      {
        path:'update/:id', component:EditComponent
      }
    ],

  },
  { path: 'pages/products', component: ProductsComponent },

];
export class AppRoutingModule { }