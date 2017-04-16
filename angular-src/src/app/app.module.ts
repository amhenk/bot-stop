import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/item/item.component';
import { FeaturedItemsComponent } from './components/featured-items/featured-items.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'store', component: StoreComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StoreComponent,
    RegisterComponent,
    LoginComponent,
    ItemComponent,
    FeaturedItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
