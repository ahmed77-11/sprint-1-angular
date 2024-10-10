import { Component, OnInit } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoService } from '../services/moto.service';
import { AuthService } from '../services/auth.service';

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
