import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MotoModel} from "../model/motomodel.model";

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styles: [
  ]
})
export class UpdateModelComponent implements OnInit {

  @Input()
  model!: MotoModel;

  @Output()
  modelUpdated = new EventEmitter<MotoModel>();

  @Input()
  ajout!: boolean;


  constructor() { }

  ngOnInit(): void {
    console.log(this.model);

  }
  saveModel(){
    this.modelUpdated.emit(this.model);
  }


}
