import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['admin@facturas.com', [Validators.required, Validators.email]],
      password: ['12345', Validators.required],
    })
    this.checkSession();
  }

  isInvalid(name:string) {
    return this.form.controls[name].invalid && this.form.controls[name].touched;
  }
  login() {

    this.loading = true;
    this.authService.login(this.form.value)
      .pipe((finalize(() => this.loading = false)))
      .subscribe(res => {
        console.log(res);
        
        if (res.success) {
          this.authService.setterSettings(res);
          this.router.navigate(['']);
        }
      })

  }

  checkSession() {
    this.authService.checkSession(true).then(() => {
      this.router.navigate(['']);
    }).catch(() => console.log)
  }

}
