import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErpLogisticSiteService {
  // THIS SERVICE IS NOT NEEDED , CREATED JUST TO COVER UP THE ERRORS
  erpChangeEvent: EventEmitter<any> = new EventEmitter<number>();
  ERPCompanyIds: any[] = [10, 12, 13, 14, 11]
  constructor() { }
  getErps() {
    return this.ERPCompanyIds
  }
}
