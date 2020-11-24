import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { LogService } from 'src/app/services/domain/log.service';

import { HttpStatusCode } from 'src/app/enums/http-status-code.enum';
import { ILogNewDTO } from 'src/app/models/ilog.new.dto';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { LogUtils } from 'src/app/shared/utils/log-utils';

@Component({
  selector: 'app-manual-log',
  templateUrl: './manual-log.component.html',
  styleUrls: ['./manual-log.component.css']
})
export class ManualLogComponent extends BaseFormComponent<ILogNewDTO> implements OnInit, OnDestroy {

  // FIELDS

  public httpStatusDescriptions: string[] = [];
  public httpMethods: string[] = [ 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT' ];

  // CONSTRUCTOR

  constructor(
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected alertModalService: AlertModalService,
    private dropdownService: DropdownService,
    private logService: LogService,
  ) {
    super(formBuilder, router, alertModalService);
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    this.form = this.buildForm ();
    this.httpStatusDescriptions = this.dropdownService.listHttpStatusDescriptions ();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe ();
  }

  // OVERRIDED FUNCTIONS

  protected buildForm(): FormGroup {
    return this.formBuilder.group ({
      id: [null],
      data: [null, [Validators.required, Validators.minLength (23), Validators.maxLength (23)]],
      ip: [null, [Validators.required, Validators.minLength (9), Validators.maxLength (17)]],
      request: [null, [Validators.required]],
      status: [null, [Validators.required]],
      userAgent: [null, [Validators.required]],
    });
  }

  protected submit() {

    this.model = (this.form.value as ILogNewDTO);

    if (!LogUtils.checkValidIpAddress (this.model.ip)) {
      this.alertModalService.showDanger ('Error', 'Invalid IP Address');
      return;
    }

    const WAIT_MODAL = this.alertModalService.showWait ();

    this.subscription = this.logService.insertLog (this.model).subscribe (
      response => {
        console.log ('response', response);
        this.alertModalService.hideModal (WAIT_MODAL);
        this.alertModalService.showSuccess ('Success', 'Log inserted!');
        this.router.navigate (['search-logs']);
      },
      error => {
        console.log ('error', error);
        this.alertModalService.hideModal (WAIT_MODAL);
        this.alertModalService.showDanger ('Error', 'Some error happened on log insertion!');
      }
    );
  }

  // HELPER FUNCTIONS

  private getCurrentDateTime(): string {
    let isoString = new Date().toISOString();
    isoString = isoString.replace('T', ' ');
    isoString = isoString.replace('Z', '');
    return isoString;
  }

  public getHttpStatusCode(description: string) {
    return HttpStatusCode[description];
  }

  public formatEnumDescription(description: string): string {
    return description.split ('_').map ((word) => {
      word = word.toLowerCase ();
      if (word.length >= 2) {
        word = (word.charAt (0).toUpperCase () + word.substr (1, word.length - 1));
      }
      return word;
    }).join (' ');
  }

  public getCurrentUserValue(propertyName: string): void {
    switch (propertyName) {
      case 'datetime': {
        this.form.patchValue ({ data: this.getCurrentDateTime () });
        break;
      }

      case 'ip-address': {
        const WAIT_MODAL = this.alertModalService.showWait ();
        this.subscription = this.logService.findUserIpAddress ().subscribe (
          (response: any) => {
            this.alertModalService.hideModal (WAIT_MODAL);

            if (response != null && response.ip) {
              this.form.patchValue ({ ip: response.ip });
            }
            else {
              this.alertModalService.showDanger ('Error', 'Unable to get your IP Address. Please try later.');
            }
          },
          error => {
            this.alertModalService.hideModal (WAIT_MODAL);
            this.alertModalService.showDanger ('Error', 'Unable to get your IP Address. Please try later.');
          }
        );
        break;
      }

      case 'user-agent': {
        this.form.patchValue ({ userAgent: navigator.userAgent });
        break;
      }

      default: { break; }
    }
  }
}
