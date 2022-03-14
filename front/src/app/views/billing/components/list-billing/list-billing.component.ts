import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-list-billing',
  templateUrl: './list-billing.component.html',
  styleUrls: ['./list-billing.component.scss']
})
export class ListBillingComponent implements OnInit {

  @Input() billings: any[] = [];
  constructor(
    private router: Router,
    private notification: NotificationService,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
  }


  deleteBilling(id: number) {
    this.notification.confirmDelete('deleteBilling')
      .then((res) => {
        this.delete(id);
      }).catch((err) => console.log);
  }

  delete(id: number) {
    this.crudService.deleteRequest(`/billing/delete/${id}`)
      .subscribe((res: any) => {
        this.crudService.requestEvent.emit('deleted');
      })
  }

  gotTo(id: number, router: string = 'detail') {
    this.router.navigate(['/', 'billing', `${router}`, id])
  }

}
