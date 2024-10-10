import {Component, OnInit} from '@angular/core';
import {MotoService} from "../services/moto.service";
import {MotoModel} from "../model/motomodel.model";

@Component({
  selector: 'app-liste-moto-model',
  templateUrl: './liste-moto-model.component.html',
})
export class ListeMotoModelComponent implements OnInit{

  models!:MotoModel[];
  ajout:boolean=true;

  updatedModel:MotoModel=new MotoModel();
  constructor(private motoService:MotoService) { }
  ngOnInit(): void {
    this.motoService.listeModel().subscribe((models) => {
      this.models=models;
      console.log(models);
    });
  }
  modelUpdated(model:MotoModel){
    console.log("Cat updaed event",model);
    this.motoService.ajouterModel(model).subscribe(()=>{
      this.chargerModels();
      console.log(model);
    });
  }

  private chargerModels() {
    this.motoService.listeModel().subscribe((models) => {
      this.models=models;
      console.log(models);
    });
  }
  updateModel(model:MotoModel){
    this.updatedModel=model;
    this.ajout=false;
  }
}
