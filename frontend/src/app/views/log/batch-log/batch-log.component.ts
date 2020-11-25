import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { LogService } from 'src/app/services/domain/log.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-batch-log',
  templateUrl: './batch-log.component.html',
})
export class BatchLogComponent extends BaseFormComponent<null> implements OnInit, OnDestroy {

  // FIELDS

  private fileContainer: HTMLDivElement = null;
  private labelFile: HTMLLabelElement = null;
  private inputFile: HTMLInputElement = null;
  private extensions: string[] = [
    '.log', '.txt'
  ];

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

    this.fileContainer = document.querySelector ('#fileContainer') as HTMLDivElement;
    this.labelFile = document.querySelector ('#labelFile') as HTMLLabelElement;
    this.inputFile = document.querySelector ('#inputFile') as HTMLInputElement;
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

  protected submit(): void {
    const waitModal = this.alertModalService.showWait();
    this.subscription$ = this.logService.insertLogFiles (this.inputFile.files).subscribe (
      () => {
        this.alertModalService.hideModal(waitModal);
        this.alertModalService.showSuccess ('Success', 'File(s) data inserted successfully!');
        this.router.navigate (['search-logs']);
      },
      (error) => {
        this.alertModalService.hideModal(waitModal);
        this.alertModalService.showDanger ('Error', `Some error happened with those file(s) data: ${error.error.message} `);
      }
    );
  }

  private renderFileList(files: FileList): void {
    this.fileContainer.innerHTML = '';

    for (let index = 0; index < files.length; index++) {
      const currentFile = files.item (index) as File;
      const fileName = currentFile.name.toLowerCase();
      const extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length);

      if (this.extensions.indexOf(extension) === -1) {
        this.fileContainer.innerHTML = '';
        this.form.patchValue ({ file: null });
        this.alertModalService.showDanger('Attention', ' Only .txt and .log files are allowed!');
        this.labelFile.innerHTML = 'Choose File(s)';
        return;
      }

      const paragraph = `<p class="h4 text-monospace"> ${currentFile.name} </p>`;
      this.fileContainer.innerHTML += paragraph;
    }

    this.labelFile.innerHTML = (files.length !== 0 ? `${files.length} file(s)` : 'Choose File(s)');
  }
}

