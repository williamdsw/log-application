import { Injectable } from '@angular/core';
import { HttpStatusCode } from '../enums/http-status-code.enum';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  // HELPER FUNCTIONS

  public listHttpStatusDescriptions(): string[] {
    const DESCRIPTIONS: string[] = [];
    for (const DESCRIPTION in HttpStatusCode) {
      if (HttpStatusCode.hasOwnProperty (DESCRIPTION)) {
        DESCRIPTIONS.push (DESCRIPTION);
      }
    }

    return DESCRIPTIONS;
  }

}
