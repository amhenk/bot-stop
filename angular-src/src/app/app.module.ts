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

import { ItemService } from './services/item.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AddItemComponent } from './components/add-item/add-item.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'store', component: StoreComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'additem', component: AddItemComponent}
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
    FeaturedItemsComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
