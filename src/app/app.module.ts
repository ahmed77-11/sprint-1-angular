import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MotosComponent } from './motos/motos.component';
import { AddMotoComponent } from './add-moto/add-moto.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';

import { UpdateMotoComponent } from './update-moto/update-moto.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RechercheParModelComponent } from './recherche-par-model/recherche-par-model.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeMotoModelComponent } from './liste-moto-model/liste-moto-model.component';
import { UpdateModelComponent } from './update-model/update-model.component';
import {TokenInterceptor} from "./services/token.interceptor";
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MotosComponent,
    AddMotoComponent,
    UpdateMotoComponent,
    LoginComponent,
    ForbiddenComponent,
    RechercheParModelComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeMotoModelComponent,
    UpdateModelComponent,
    RegisterComponent,
    VerifEmailComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,ReactiveFormsModule,BrowserAnimationsModule,ToastrModule.forRoot()],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
