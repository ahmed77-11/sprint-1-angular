import { Injectable } from '@angular/core';
import { Moto } from '../model/moto.model';
import { MotoModel } from '../model/motomodel.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Image} from "../model/image.model";

const {headers:httpHeaders} = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
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

  constructor(private http: HttpClient,private authService:AuthService) {}


  listeMotos(): Observable<Moto[]> {

    console.log(httpHeaders)
    return this.http.get<Moto[]>(this.apiURL+"/all",{headers:httpHeaders});
  }
  listeModel(): Observable<MotoModel[]> {

    return this.http.get<MotoModel[]>(this.apiURL + '/mod',{headers:httpHeaders});
  }
  // listeModel(): Observable<MotomodelWrapped> {
  //   return this.http.get<MotomodelWrapped>(this.apiURLModel);
  // }
  ajouterMoto(motor: Moto): Observable<Moto> {

    return this.http.post<Moto>(this.apiURL+"/addmoto", motor, {headers:httpHeaders},);
  }
  supprimerMoto(id: number) {

    const url = `${this.apiURL+"/delmoto"}/${id}`;
    return this.http.delete(url, {headers:httpHeaders});
  }
  consulterMoto(id: number): Observable<Moto> {

    const url = `${this.apiURL+"/getbyid"}/${id}`;
    return this.http.get<Moto>(url,{headers:httpHeaders});
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

    return this.http.put<Moto>(this.apiURL+"/updatemoto", m, {headers:httpHeaders});
  }
  rechercheParModel(idModel: number): Observable<Moto[]> {

    const url = `${this.apiURL}/motosmod/${idModel}`;
    return this.http.get<Moto[]>(url,{headers:httpHeaders});
  }
  rechercherParNom(marque: string): Observable<Moto[]> {

    const url = `${this.apiURL}/motosByMarque/${marque}`;
    return this.http.get<Moto[]>(url,{headers:httpHeaders});
  }
  ajouterModel(m: MotoModel): Observable<MotoModel> {

    return this.http.post<MotoModel>(this.apiURLModel, m, {headers:httpHeaders});
  }
  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    console.log(imageFormData)
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(idImage: number): Observable<any> {
    const url=`${this.apiURL}/image/get/info/${idImage}`;
    return this.http.get(url);
  }

  uploadImageMoto(file: File, filename: string, idMoto: number): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadImageMoto'}/${idMoto}`;
    return this.http.post<Image>(url, imageFormData);

  }

  supprimerImage(id: number) {
    const url=`${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url,httpOptions);
  }
  uploadImageFS(file:File,filename:string,idMoto:number):Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idMoto}`;
    return this.http.post<Image>(url, imageFormData);

  }
}
