import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_Auth/auth.guard';
import { AuthInterceptor } from './_Auth/auth.intercepter';
import { UserAuthServiceService } from './_service/user-auth-service.service';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DragDirective } from './directives/drag.directive';
import { ShowProductDetalsComponent } from './show-product-detals/show-product-detals.component';
import { ViewProductDetailsComponent } from './view-product-details/view-product-details.component';
import { ByeProductComponent } from './bye-product/bye-product.component';
import { OrderConformationComponent } from './order-conformation/order-conformation.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenComponent,
     UserComponent,
    AdminComponent,
    ProductComponent,
    DragDirective,
    ShowProductDetalsComponent,
    ViewProductDetailsComponent,
    ByeProductComponent,
    OrderConformationComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserAuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
