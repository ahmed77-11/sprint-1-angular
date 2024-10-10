import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';
import { Router } from '@angular/router';
import { MotoModel } from '../model/motomodel.model';

@Component({
  selector: 'app-add-moto',
  templateUrl: './add-moto.component.html',
  styles: [],
})
export class AddMotoComponent implements OnInit {
  newMoto = new Moto();
  message: String;
  motoModels!: MotoModel[];
  newIdModel!: number;
  newMotoModel!: MotoModel;
  constructor(private motoService: MotoService, private router: Router) {
    this.message = '';
  }
  ngOnInit(): void {
    this.motoService.listeModel().subscribe((motoModels) => {
      this.motoModels = motoModels;
    });
  }

  addMoto() {
    this.newMoto.model = this.motoModels.find(
      (motoModel) => motoModel.idModel == this.newIdModel
    );
    this.motoService.ajouterMoto(this.newMoto).subscribe((moto) => {

      this.router.navigate(['motos']);

    });
  }
}
