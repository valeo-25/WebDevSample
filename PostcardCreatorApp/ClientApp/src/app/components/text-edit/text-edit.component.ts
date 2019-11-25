import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TextOptionsModel } from '../../models/text-options-model';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css']
})
export class TextEditComponent implements OnInit {

  @Output() textSettingsUpdated = new EventEmitter();

  private textOptions: TextOptionsModel = new TextOptionsModel();

  constructor() { }

  ngOnInit() {
    this.textOptions.text = "";
    this.textOptions.posX = 10;
    this.textOptions.posY = 50;
    this.textOptions.color = "black";
  }

  updateTextSettings() {
    this.textSettingsUpdated.emit(this.textOptions);
  }

}
