import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private crudServices: CrudService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private modalService: BsModalService,
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
        }
      });
  }

  onScrollToEnd() {
    this.page++;
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

}
