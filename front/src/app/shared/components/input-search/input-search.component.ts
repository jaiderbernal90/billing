import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  @Output() submited = new EventEmitter<string>();
  inputSearch = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.onChange();
  }


  onChange(term = ''): void {
    const search = this.removeAccents(term);
    this.submited.emit(search.trim());
  }

  removeAccents = (str:any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

}
