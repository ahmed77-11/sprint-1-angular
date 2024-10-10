import { Component, OnInit } from '@angular/core';
import { MotoModel } from '../model/motomodel.model';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';

@Component({
  selector: 'app-recherche-par-model',
  templateUrl: './recherche-par-model.component.html',
  styles: [],
})
export class RechercheParModelComponent implements OnInit {
  motos!: Moto[];
  IdModel!: number;
  models!: MotoModel[];

  constructor(private motoService: MotoService) {}
  ngOnInit(): void {
    this.motoService.listeModel().subscribe((data) => {
      console.log(data);
      this.models = data;
    });
  }
  onChange() {
    this.motoService.rechercheParModel(this.IdModel).subscribe((motos) => {
      this.motos = motos;
    });
  }
}
