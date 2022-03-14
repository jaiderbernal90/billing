import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-form-billing',
  templateUrl: './form-billing.component.html',
  styleUrls: ['./form-billing.component.scss']
})
export class FormBillingComponent implements OnInit {

  listSubscribers: Subscription[] = [];
  form!: FormGroup;
  id!: number;
  code!: number;
  isDetail: boolean = false;
  loading: boolean = false;
  page: number = 1;
  editar:boolean = false;
  detail: any = [];
  p: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private crudServices: CrudService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      number_bill: ['', Validators.required],
      full_name_emitter: ['', [Validators.required]],
      nit_emitter: ['', [Validators.required,Validators.maxLength(12)]],
      full_name_purchaser: ['', [Validators.required]],
      nit_purchaser: ['', [Validators.required,Validators.maxLength(12)]],
      subtotal: [0,Validators.required],
      iva: [0, Validators.required],
      total: [0, Validators.required],
      details: this.formBuilder.array([]),
    });

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] ?? '';
      if (this.id) {
        this.getBilling(this.id);this.editar = true;
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detail');
      }
    });
  }

  isInvalid(name:string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }

  onSubmit() {

    const path = this.id
      ? `/billing/update/${this.id}`
      : '/billing/create';

    this.crudServices
      .postRequest(path, this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res: any) => {
        const { success } = res;
        if (success) {
          this.router.navigate(['/', 'billing']);
        }
      });
  }

  getBilling(id: number) {
    this.crudServices
      .getRequest(`/billing/get/${id}`)
      .subscribe((res: any) => {
        const { success, data } = res;
        if (success) {
          this.form.patchValue(data);          
          this.details.patchValue(data.details);
          this.setBillingForm(data.details,"update");

        }
      });
  }

  onScrollToEnd() {
    this.page++;
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

  // DETAIL
  get details() {
    return this.form.controls["details"] as FormArray;
  }

  addDetail(){
    let id = this.detail.length+1; 
    
    let detailArray = [];
    detailArray.push({
      id:id,
      item_description: null,
      quantity: null,
      total_und: null,
      total: null,
    });

    this.setBillingForm(detailArray,"new");
  }
  setBillingForm(billing: any,action = "") {
    billing.forEach((bill:any,index:number) => {      
      const lessonForm = this.formBuilder.group({
        id: [bill.id],
        item_description: [bill.item_description,[Validators.required]],
        quantity: [bill.quantity,[Validators.required]],
        total_und: [bill.total_und,[Validators.required]],
        total: [bill.total, [Validators.min(1)]],
      });      
      this.details.push(lessonForm);   
    });        
  }
  deleteDetail(event:any):void {    
    event = (this.p >= 2 && this.p > 1) ? 10 + event : event;
    event = (this.p > 2) ? (parseInt(`${this.p-2}0`) + event) : event;
    
    this.details.controls = this.removeItemFromArr( this.details.controls, event );
    this.calculateTotal();
  }

  removeItemFromArr ( arr:any, item:any ):any {
    var i;
    let elem = arr;
    
    for (let k in elem ) {      
      if (k == (item)){
          i = k;
      }
    }
    arr.splice( i, 1 );
    return elem;
  }

  onChangeTotal(number:any){
   let quantity = this.details.controls[number].get("quantity").value,
   total_und = this.details.controls[number].get("total_und").value;

    if(quantity && total_und){
      this.details.controls[number].patchValue({ total: total_und * quantity });
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0,details = this.details.controls,iva = this.form.get("iva").value;
    
    details.forEach((detail)=>{
      detail = detail.value;      
      total += (detail['total'] != null) ? parseInt(detail['total']) : 0; 
    })
    
    this.form.patchValue({subtotal:total,total: total })
    if(iva){
      const ivaT = total*iva/100,
      tT = total+ivaT

      this.form.patchValue({total: tT.toFixed(0)})
    }
  }

}
