import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

const MaterialComponents = [
		MatInputModule,
		MatButtonModule,
		MatDialogModule,
		MatCardModule,
		MatSidenavModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
