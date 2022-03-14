import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { InputSearchComponent } from './components/input-search/input-search.component';
// import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { CurrentPageComponent } from './components/current-page/current-page.component';
// import { SelectPageComponent } from './components/select-page/select-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
// import { ButtonGoBackComponent } from './components/button-go-back/button-go-back.component';
import { LoadingButtonDirective } from './directives/loading-button.directive';



@NgModule({
  declarations: [
    LoadingButtonDirective
  ],
  exports: [
    LoadingButtonDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule
  ],

})
export class SharedModule { }
