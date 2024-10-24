import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';
import { AuthService } from '../services/auth.service';
import {Image} from "../model/image.model";

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styles: [],
})
export class MotosComponent implements OnInit {
  motos?: Moto[];
  constructor(
    private motoService: MotoService,
    public authService: AuthService
  ) {
    this.motos = [];
  }
  ngOnInit(): void {
    this.chargerMotos();
  }
  chargerMotos() {
    this.motoService.listeMotos().subscribe((moto) => {
      console.log(moto);
      this.motos = moto;
      this.motos.forEach((mot)=>{
        mot.imageStr='data:'+mot.images[0].type+';base64,'+mot.images[0].image;
      })
    });
  }
  supprimerMoto(m: Moto) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.motoService.supprimerMoto(m.idMoto!).subscribe(() => {
        console.log('moto supprimé');
        this.chargerMotos();
      });
    }
  }
}
