import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalGlobalService {
  @Output() event = new EventEmitter<string>();
  constructor() { }
}
