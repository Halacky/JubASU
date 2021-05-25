import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelPageComponent } from './admin-panel-page/admin-panel-page.component';
import { ReviewDetailsComponent } from './admin-panel-page/review-details/review-details.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { StaffPageComponent } from './staff-page/staff-page.component';

const routes: Routes = [
  {path: "", component: SiteLayoutComponent, children:[
    {path: "", component: MainPageComponent},
    {path: "gallery", component: GalleryPageComponent},
    {path: "history", component: HistoryPageComponent},
    {path: "reviews", component: ReviewsPageComponent},
    {path: "staff", component: StaffPageComponent},
    {path: "adminPanel", component: AdminPanelPageComponent, canActivate: [AuthGuard]},
    {path: "adminPanel/:id", component: ReviewDetailsComponent, canActivate: [AuthGuard]}
  ]},
  {path: "login", component: AuthLayoutComponent, children:[
    {path:"login", component: LoginPageComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
