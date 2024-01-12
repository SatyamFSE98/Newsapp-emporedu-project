import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewslistComponent } from './newslist/newslist.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from './security/auth.guard';
// Import your AuthGuard

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: 'full' },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "newslist", component: NewslistComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CUSTOMER'] } },
  { path: "newsdetail", component: NewsdetailComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CUSTOMER'] } },
  { path: "wishlist", component: WishlistComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CUSTOMER'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
