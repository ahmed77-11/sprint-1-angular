import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotosComponent } from './motos/motos.component';
import { AddMotoComponent } from './add-moto/add-moto.component';
import { UpdateMotoComponent } from './update-moto/update-moto.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MotoGuard } from './moto.guard';
import { RechercheParModelComponent } from './recherche-par-model/recherche-par-model.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import {ListeMotoModelComponent} from "./liste-moto-model/liste-moto-model.component";

const routes: Routes = [
  {
    path: 'motos',
    component: MotosComponent,
  },
  {
    path: 'add-moto',
    component: AddMotoComponent,
    canActivate: [MotoGuard],
  },
  {
    path: 'updateMoto/:id',
    component: UpdateMotoComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: 'rechercheParModel', component: RechercheParModelComponent },
  { path: 'rechercheParMarque', component: RechercheParNomComponent },
  { path: '', redirectTo: 'motos', pathMatch: 'full' },
  {path:"listeModels",component:ListeMotoModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
