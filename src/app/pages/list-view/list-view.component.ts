import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PriceList } from 'src/model/PriceList';
import { ErpLogisticSiteService } from 'src/service/erp-logistic-site.service';
import { PriceListService } from 'src/service/price-list.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  collection: PriceList[] = [];
  searchText = "";
  ERPCompanyIds: any;
  ERPServiceChanged!: Subscription;

  constructor(
    public _PriceListService: PriceListService,
    public erpLogisticSiteService: ErpLogisticSiteService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // CALLING API TO GET ALL PRICE LIST DATA
    this._PriceListService.GetAllPriceLists().subscribe(
      (data: any) => {
        this._PriceListService.PriceListData = data;
        // ONCE API CALL IS SUCCESSFULL, WE JUST CALL GET_ERP METHOD FROM erpLogisticSiteService
        // THIS RETURNS AN ARRAY THAT WE SET IN ERPCompanyIds Array
        this.ERPCompanyIds = this.erpLogisticSiteService.getErps();
      },
      (err) => {
        alert(err)
      }
    )
    // EVENT EMITTER IS PRESENT IN ERP LOGISTICS SERVICE.
    // WE ARE SUBSCRIBING HERE. IF TRIGGERED
    // UPDATE ERPCOMPANYIDS
    // CALL FILTERED DATA
    this.ERPServiceChanged = this.erpLogisticSiteService.erpChangeEvent.subscribe(
      data => {
        this.ERPCompanyIds = this.erpLogisticSiteService.getErps();
        this.getFilterData()
      }
    );

  }

  editPriceList(item: any) {
    this._PriceListService.selectedPriceList = item;
    this.router.navigate(["/pricelist/edit"])
  }

  getFilterData(event?: Event) {
    // WHEN EVER USER SEARCH FOR SOMETHING, WE THEN CALL GET PRICE METHOD FROM OUR
    // PRICE LIST SERVICE. NOTE: GET ALL PRICE LIST & GET PRICE LIST ARE 2 DIFFERENT METHOD
    this._PriceListService.GetPriceLists(
      this.ERPCompanyIds, this.searchText, "Working"
    )
  }
}
