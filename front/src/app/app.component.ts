import { Component } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  providers: [IconSetService],
})
export class AppComponent {
  title = '';
  constructor(
    public iconSet: IconSetService,
  ) {
    iconSet.icons = { ...freeSet };
  }

}
