import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

   // CONSTRUCTOR

  constructor() { }

  // HELPER FUNCTIONS

  public getPager(totalItems: number, currentPage: number, pageSize: number): object {
    const totalPages = Math.ceil(totalItems / pageSize);
    currentPage = (currentPage < 1 ? 1 : (currentPage > totalPages ? totalPages : currentPage));

    let startPage: number;
    let endPage: number;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    }
    else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      }
      else if (currentPage + 4 >= totalPages) {
        startPage = (totalPages - 9);
        endPage = totalPages;
      }
      else {
        startPage = (currentPage - 5);
        endPage = (currentPage + 4);
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min ((startIndex + pageSize - 1), (totalItems - 1));
    const keys = Array ((endPage + 1) - startPage).keys ();
    const pages = Array.from (keys).map (value => startPage + value);

    return {
      totalItems, currentPage, pageSize, totalPages,
      startPage, endPage, startIndex, endIndex, pages
    };
  }
}
