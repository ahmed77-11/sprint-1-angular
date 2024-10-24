import { MotoModel } from './motomodel.model';
import {Image} from "./image.model";

export class Moto {
  idMoto?: number;
  marqueMoto?: string;
  prixMoto?: number;
  dateCreation?: Date;
  model?: MotoModel;

  image?: Image;
  imageStr!:string;

  images!:Image[];


}
