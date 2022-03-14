import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
export class BillingComponent implements OnInit, OnDestroy {

  listSubscribers: Subscription[] = [];
  term:string = '';
  loading!:boolean;
  billings:any[] = [];
  totalItems: number = 0;
  currentPage:any = 1;
  lastPage: number = 0;

  constructor(
    private modalService: BsModalService,
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

  filterBillings(page?: number, term = '',limit = 10,order = "ASC") {
    const query = [
      `?page=${page ? page : ''}`,
      `&term=${term ? term : ''}`,
      `&order=${order ? order : ''}`,
      `&limit=${limit}`,
      ].join('');
      this.crudServices.getRequest(`/billing/getAll${query}`).subscribe((res: any) => {       
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
    const observer1$ = this.crudServices.requestEvent.subscribe(() => {
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

  onChangeOrder(event:string){
    this.filterBillings(1,'',0,event.toUpperCase());
  }

}
