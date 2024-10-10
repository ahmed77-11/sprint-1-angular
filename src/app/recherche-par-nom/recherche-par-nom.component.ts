import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [],
})
export class RechercheParNomComponent implements OnInit {
  marqueMoto!: string;
  motos!: Moto[];
  allMotos!: Moto[];
  searchTerm!: string;

  constructor(private motoService: MotoService) {}
  ngOnInit(): void {
    // this.allMotos = this.motoService.listeMotos();
    this.motoService.listeMotos().subscribe((moto) => {
      this.motos = moto;
    });
  }
  rechercheMoto() {
    this.motoService.rechercherParNom(this.marqueMoto).subscribe((motos) => {
      this.motos = motos;
      console.log(motos);
    });
  }
  onKeyUp(filterText: string) {
    this.motos = this.allMotos.filter((item) =>
      item.marqueMoto?.toLocaleLowerCase().includes(filterText.toLowerCase())
    );
  }
}
