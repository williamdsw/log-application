import { Injectable } from '@angular/core';

import { HttpStatusCode } from '../enums/http-status-code.enum';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  // HELPER FUNCTIONS

  public listHttpStatusDescriptions(): string[] {
    const listDescriptions: string[] = [];
    for (const description in HttpStatusCode) {
      if (HttpStatusCode.hasOwnProperty (description)) {
        listDescriptions.push (description);
      }
    }

    return listDescriptions;
  }

}
