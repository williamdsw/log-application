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

  private showAlertModal(title: string, message: string, type: AlertModalType, dismissTimeout?: number) {
    const MODAL_REF: BsModalRef = this.modalService.show (AlertModalComponent);
    MODAL_REF.content.type = type;
    MODAL_REF.content.title = title;
    MODAL_REF.content.message = message;

    if (dismissTimeout) {
      setTimeout (() => MODAL_REF.hide (), dismissTimeout);
    }
  }

  public showDanger(title: string, message: string) {
    this.showAlertModal (title, message, AlertModalType.DANGER);
  }

  public showSuccess(title: string, message: string) {
    this.showAlertModal (title, message, AlertModalType.SUCCESS, 3000);
  }

  public showWait(): BsModalRef {
    const MODAL_REF: BsModalRef = this.modalService.show (WaitModalComponent);
    return MODAL_REF;
  }

  public hideModal(modalRef: BsModalRef) {
    if (modalRef != null) {
      modalRef.hide ();
    }
  }
}
