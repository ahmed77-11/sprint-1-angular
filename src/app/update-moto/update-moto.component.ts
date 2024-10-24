import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { Moto } from '../model/moto.model';
import { MotoModel } from '../model/motomodel.model';
import {Image} from "../model/image.model";

@Component({
  selector: 'app-update-moto',
  templateUrl: './update-moto.component.html',
  styles: [],
})
export class UpdateMotoComponent implements OnInit {
  currentMoto = new Moto();
  motoModels!: MotoModel[];
  updatedMotoModelId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private motoService: MotoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.motoService.listeModel().subscribe((data) => {
      this.motoModels = data;
    });
    this.motoService
      .consulterMoto(this.activatedRoute.snapshot.params['id'])
      .subscribe((data) => {
        this.currentMoto = data;
        this.updatedMotoModelId = this.currentMoto.model!.idModel;

      });

    console.log(this.currentMoto);
  }

  updateMoto() {
    this.currentMoto.model = this.motoModels.find(mod => mod.idModel ==
      this.updatedMotoModelId)!;
    this.motoService
      .updateMoto(this.currentMoto)
      .subscribe((prod) => {
        this.router.navigate(['motos']);
      });

  }

  onImageUpload(event: any) {
    if(event.target.files&&event.target.files.length){
      this.uploadedImage=event.target.files[0];
      this.isImageUpdated=true;
      var reader=new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload=(_event)=> {
        this.myImage = reader.result as string;
      }
    }
  }
  onAddImageMoto(){
    this.motoService.uploadImageMoto(this.uploadedImage,this.uploadedImage.name,this.currentMoto.idMoto!)
      .subscribe((img:Image)=>{
        console.log(img.image,img.idImage+"image ajoutée");
        this.currentMoto.images.push(img);
      })
  }
  supprimerImage(img:Image){
    let conf=confirm("Etes-vous sûr ?");
    if(conf){
      this.motoService.supprimerImage(img.idImage!).subscribe(()=>{
        const index=this.currentMoto.images!.indexOf(img,0);
        if(index>-1){
          this.currentMoto.images!.splice(index,1);
        }
      });
    }
  }

}
