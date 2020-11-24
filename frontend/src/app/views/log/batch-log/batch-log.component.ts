import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { LogService } from 'src/app/services/domain/log.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-batch-log',
  templateUrl: './batch-log.component.html',
  styleUrls: ['./batch-log.component.css']
})
export class BatchLogComponent extends BaseFormComponent<null> implements OnInit, OnDestroy {

  // FIELDS

  private fileContainer: HTMLDivElement = null;
  private labelFile: HTMLLabelElement = null;
  private inputFile: HTMLInputElement = null;

  // CONSTRUCTOR

  constructor(
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected alertModalService: AlertModalService,
    private logService: LogService,
  ) {
    super(formBuilder, router, alertModalService);
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.form = this.buildForm ();

    this.fileContainer = document.getElementById ('fileContainer') as HTMLDivElement;
    this.labelFile = document.getElementById ('labelFile') as HTMLLabelElement;
    this.inputFile = document.getElementById ('inputFile') as HTMLInputElement;
    this.inputFile.addEventListener ('change', () => {
      this.renderFileList (this.inputFile.files);
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // OVERRIDED FUNCTIONS

  protected buildForm(): FormGroup {
    return this.formBuilder.group ({
      file: [null, [Validators.required]]
    });
  }

  protected submit() {
    const WAIT_MODAL = this.alertModalService.showWait ();

    this.subscription$ = this.logService.insertLogFiles (this.inputFile.files).subscribe (
      response => {
        console.log ('response', response);
        this.alertModalService.hideModal (WAIT_MODAL);
        this.alertModalService.showSuccess ('Success', 'File(s) data inserted successfully!');
        this.router.navigate (['search-logs']);
      },
      error => {
        console.log ('error', error);
        this.alertModalService.hideModal (WAIT_MODAL);
        this.alertModalService.showDanger ('Error', 'Some error happened with those file(s) data!');
      }
    );
  }

  private renderFileList(files: FileList) {
    this.fileContainer.innerHTML = '';

    for (let index = 0; index < files.length; index++) {
      const FILE = files.item (index) as File;
      const fileName = FILE.name.toLowerCase ();

      if (!fileName.includes ('.log') && !fileName.includes ('.txt')) {
        this.fileContainer.innerHTML = '';
        this.form.patchValue ({ file: null });
        console.log (document.getElementById ('inputFile'));
        this.alertModalService.showDanger ('Attention', ' Only .txt and .log files are allowed!');
        return;
      }

      const paragraph = `<p class="h4 text-monospace"> ${FILE.name} </p>`;
      this.fileContainer.innerHTML += paragraph;
    }

    this.labelFile.innerHTML = (files.length !== 0 ? `${files.length} file(s)` : 'Choose File(s)');
  }
}

