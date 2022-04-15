import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginLayoutComponent } from './layouts/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { Error404Component } from './modules/errors/error404.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { ButtonPageComponent } from './modules/components/button-page/button-page.component';
import { InputPageComponent } from './modules/components/input-page/input-page.component';
// import { FormBookComponent } from './component/form-book/form-book.component';
// import { BookListComponent } from './component/book-list/book-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'logout', pathMatch: 'full', redirectTo: '/login' },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'component/button', component: ButtonPageComponent },
      { path: 'component/input', component: InputPageComponent },
      // { path: 'edit/:id', component: AddEditComponent },

      // No match route
      { path: '**', component: Error404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
