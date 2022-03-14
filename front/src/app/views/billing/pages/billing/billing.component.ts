import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ModalGlobalService } from 'src/app/shared/services/modal-global.service';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  listSubscribers: Subscription[] = [];
  term:string = '';
  loading!:boolean;
  billings:any[] = [];
  totalItems: number = 0;
  currentPage:any = 1;
  lastPage: number = 0;

  constructor(
    // private modalService: BsModalService,
    private modalGlobalService: ModalGlobalService,
    private crudServices: CrudService,
  ) { }


  ngOnInit(): void {
    this.getBillings();
    this.listenObserver();
  }

  filter(search: string = '') {
    this.term = search;
    search.trim().length > 0 ? this.filterBillings(0, this.term) : this.getBillings();
  }

  filterBillings(page?: number, term = '',limit = 10) {
    const query = [
      `?page=${page ? page : ''}`,
      `&term=${term ? term : ''}`,
      `&limit=${limit}`,
      ].join('');
      this.crudServices.getRequest(`/billing/getAll${query}`).subscribe((res: any) => {
        console.log(res);
        
        const { billings } = res;
        this.billings = billings.data;
        this.currentPage = page;
        this.totalItems = billings.total;
        this.lastPage = billings.last_page;
      })
  }

  getBillings(){
    this.crudServices.getRequest('/billing/getAll')
    .pipe(finalize(() => this.loading = false))
    .subscribe((res: any) => {
      const { billings } = res;
      
      this.currentPage = billings.current_page;
      this.totalItems = billings.total;
      this.billings = billings.data;
      this.lastPage = billings.last_page;
    })
  }

  listenObserver = () => {
    const observer1$ = this.modalGlobalService.event.subscribe(() => {
      this.getBillings();
    })

    this.listSubscribers = [observer1$];
  }

    
  pageChanged(event: any): void {
    const { page } = event;
    this.filterBillings(page)
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

  onChangeRegisterNumber(limit:number){    
    this.filterBillings(1,'',limit);
  }

}
