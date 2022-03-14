import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private translateService: TranslateService
  ) { }

  success(title = '', text = '') {
    Swal.fire({
      title,
      text,
      icon: 'success',
      showConfirmButton: true,
      timer: 4000,
      confirmButtonColor: '#20a8d8',
      confirmButtonText: 'Ok',
    })
  }

  error(message = '') {
    Swal.fire({
      icon: 'warning',
      title: '',
      text: message,
      timer: 4000,
      confirmButtonColor: '#20a8d8',
      confirmButtonText: 'Ok',
    })
  }

  confirmDelete = (message = '') => {
    let title = ''
    let text = ''

    this.translateService.get(`deleteMessage.${message}`).subscribe(res => {
      if (res.title) {
        title = res.title;
        text = res.text;
      }
    })
    return new Promise((resolve, reject) => {
      Swal.fire({
        title,
        text,
        showDenyButton: true,
        confirmButtonColor: '#20a8d8',
        denyButtonColor: '#acb4bc',
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        customClass: {
          container: 'container-class'
        },
      }).then((result:any) => {
        if (result.value) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };
}
