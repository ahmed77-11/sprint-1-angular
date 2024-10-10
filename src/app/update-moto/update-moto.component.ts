import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { Moto } from '../model/moto.model';
import { MotoModel } from '../model/motomodel.model';

@Component({
  selector: 'app-update-moto',
  templateUrl: './update-moto.component.html',
  styles: [],
})
export class UpdateMotoComponent implements OnInit {
  currentMoto = new Moto();
  motoModels!: MotoModel[];
  updatedMotoModelId!: number;
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
    this.currentMoto.model = this.motoModels.find(
      (m) => m.idModel == this.updatedMotoModelId
    );
    this.motoService.updateMoto(this.currentMoto).subscribe((mot) => {
      this.router.navigate(['motos']);
    });
  }
}
