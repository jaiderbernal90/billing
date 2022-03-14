import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalGlobalService {
  @Output() requestEvent = new EventEmitter<string>();
  constructor() { }
}
