import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { BootstrapModule } from './bootstrap/bootstrap.module';

import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { WaitModalComponent } from './modals/wait-modal/wait-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    WaitModalComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    BootstrapModule
  ],
  exports: [
    AlertModalComponent,
    WaitModalComponent,
    ErrorMessageComponent,
    NgxMaskModule,
    BootstrapModule
  ]
})
export class SharedModule { }
