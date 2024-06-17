import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_Auth/auth.guard';
import { ProductComponent } from './product/product.component';
import { ShowProductDetalsComponent } from './show-product-detals/show-product-detals.component';
import { ViewProductDetailsComponent } from './view-product-details/view-product-details.component';
import { ByeProductComponent } from './bye-product/bye-product.component';
import { ByeProductResolveServiceService } from './_service/bye-product-resolve-service.service';
import { OrderConformationComponent } from './order-conformation/order-conformation.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {path:'product',component:ProductComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path:'showProductDetails',component:ShowProductDetalsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  { path: 'product/:id', component: ProductComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  {path:'productViewDetials',component:ViewProductDetailsComponent},
  {path:'byeProduct',component:ByeProductComponent,canActivate:[AuthGuard], data:{roles:['USER']},resolve:{productDetails:ByeProductResolveServiceService}},
  {path:'orderConfirmation', component:OrderConformationComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
