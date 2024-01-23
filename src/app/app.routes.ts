import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ProductsComponent } from './pages/admin/products/products.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { EditComponent } from './pages/admin/edit/edit.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { RegisterComponent } from '../app/pages/register/register.component';
import { CategoriesComponent } from '../app/pages/admin/Categories/categoryList/categories.component';
import { CreateCateComponent } from './pages/admin/Categories/create-cate/create-cate.component';
import { EditCateComponent } from './pages/admin/Categories/edit-cate/edit-cate.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      {
        path: 'create', component: CreateComponent
      },
      {
        path:'update/:id', component:EditComponent
      },
      {
        path:'categories', component:CategoriesComponent
      },
      {
        path:'createcate', component:CreateCateComponent
      },
      {
        path:'editcate/:id', component:EditCateComponent
      },
    ],

  },
  { path: 'pages/products', component: ProductsComponent },

];
export class AppRoutingModule { }