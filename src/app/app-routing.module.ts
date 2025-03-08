import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { AppComponent } from './app.component';
import { BannerComponent } from './shared/banner/banner.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AdminCategoryComponent } from './features/admin/category/admin-category/admin-category.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './features/admin/products/admin-products/admin-products.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product/category/:categoryId', component: ProductsComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  { path: 'admin/categories', component: AdminCategoryComponent, canActivate: [AuthGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
