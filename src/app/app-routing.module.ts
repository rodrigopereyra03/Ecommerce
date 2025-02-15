import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { AppComponent } from './app.component';
import { BannerComponent } from './shared/banner/banner.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
