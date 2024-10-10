import { Injectable } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoModel } from '../model/motomodel.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MotoService {
  apiURL: string = 'http://localhost:8081/motos/api';
  apiURLModel: string = 'http://localhost:8081/motos/mod';
  motos!: Moto[];
  moto?: Moto;
  motoModel!: MotoModel[];
  motoRecherche?: Moto[];

  constructor(private http: HttpClient) {}

  listeMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(this.apiURL);
  }
  listeModel(): Observable<MotoModel[]> {
    return this.http.get<MotoModel[]>(this.apiURL + '/mod');
  }
  // listeModel(): Observable<MotomodelWrapped> {
  //   return this.http.get<MotomodelWrapped>(this.apiURLModel);
  // }
  ajouterMoto(motor: Moto): Observable<Moto> {
    return this.http.post<Moto>(this.apiURL, motor, httpOptions);
  }
  supprimerMoto(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  consulterMoto(id: number): Observable<Moto> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Moto>(url);
  }
  consulterModel(id: number): MotoModel {
    return this.motoModel.find((mod) => mod.idModel == id)!;
  }
  trierMotos() {
    this.motos = this.motos.sort((n1, n2) => {
      if (n1.idMoto! > n2.idMoto!) {
        return 1;
      }
      if (n1.idMoto! < n2.idMoto!) {
        return -1;
      }
      return 0;
    });
  }

  updateMoto(m: Moto): Observable<Moto> {
    return this.http.put<Moto>(this.apiURL, m, httpOptions);
  }
  rechercheParModel(idModel: number): Observable<Moto[]> {
    const url = `${this.apiURL}/motosmod/${idModel}`;
    return this.http.get<Moto[]>(url);
  }
  rechercherParNom(marque: string): Observable<Moto[]> {
    const url = `${this.apiURL}/motosByMarque/${marque}`;
    return this.http.get<Moto[]>(url);
  }
  ajouterModel(m: MotoModel): Observable<MotoModel> {
    return this.http.post<MotoModel>(this.apiURLModel, m, httpOptions);
  }
}
