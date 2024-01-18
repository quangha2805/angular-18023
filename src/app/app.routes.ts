import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { EditComponent } from './pages/admin/edit/edit.component';
export const routes: Routes = [

  { path: '', component: HomeComponent },
  {
    path: 'admin',
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
