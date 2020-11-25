import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertModalType } from '../enums/modal-alert-type.enum';

import { AlertModalComponent } from '../shared/modals/alert-modal/alert-modal.component';
import { WaitModalComponent } from '../shared/modals/wait-modal/wait-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  // CONSTRUCTOR

  constructor(private modalService: BsModalService) {}

  // HELPER FUNCTIONS

  private showAlertModal(title: string, message: string, type: AlertModalType, dismissTimeout?: number): void {
    const modalRef = this.modalService.show (AlertModalComponent);
    modalRef.content.type = type;
    modalRef.content.title = title;
    modalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout (() => modalRef.hide (), dismissTimeout);
    }
  }

  public showDanger(title: string, message: string): void {
    this.showAlertModal (title, message, AlertModalType.DANGER);
  }

  public showSuccess(title: string, message: string): void {
    this.showAlertModal (title, message, AlertModalType.SUCCESS, 3000);
  }

  public showWait(): BsModalRef {
    const config = { ignoreBackdropClick: true, keyboard: false };
    const modalRef = this.modalService.show (WaitModalComponent, config);
    return modalRef;
  }

  public hideModal(modalRef: BsModalRef): void {
    if (modalRef != null) {
      modalRef.hide ();
    }
  }
}
