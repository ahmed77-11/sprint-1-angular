import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';
import { Router } from '@angular/router';
import { MotoModel } from '../model/motomodel.model';
import {Image} from "../model/image.model";

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
  uploadedImage!:File;
  imagePath:any;
  constructor(private motoService: MotoService, private router: Router) {
    this.message = '';
  }
  ngOnInit(): void {
    this.motoService.listeModel().subscribe((motoModels) => {
      this.motoModels = motoModels;
    });
  }

  onImageUpload(event:any){
    this.uploadedImage=event.target.files[0];
    var reader=new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload=(_event)=>{
      this.imagePath=reader.result;
    }
  }
  addMoto(){
    this.motoService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img:Image) => {
        this.newMoto.image=img;
        this.newMoto.model = this.motoModels.find(mod => mod.idModel
          == this.newIdModel)!;
        this.motoService
          .ajouterMoto(this.newMoto)
          .subscribe(() => {
            this.router.navigate(['motos']);
          });
      });
  }

}
