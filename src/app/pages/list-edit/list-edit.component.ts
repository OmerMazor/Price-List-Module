import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceList } from 'src/model/PriceList';
import { PriceListService } from 'src/service/price-list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {

  activePriceList: PriceList = {
    priceListID: 0,
    priceListName: "",
    extErpPriceListID: null
  };

  constructor(public _PriceListService: PriceListService, public router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    console.log(this._PriceListService.selectedPriceList)
    if(this._PriceListService.selectedPriceList) {
      this.activePriceList = this._PriceListService.selectedPriceList;
    }
    if (this.activePriceList == undefined || this.activePriceList == null) {
      this.router.navigate(["/pricelist/view"])
    }
  }

  updatePriceList() {
    var isValidationOneSuccesssFull = this.checkPriceListName();
    var isValidationTwoSuccesssFull = this.checkExtErpPriceListIDValidation();

    var copyOfPriceList: any = this.activePriceList
    if (isValidationOneSuccesssFull == true && isValidationTwoSuccesssFull == true) {
      this._PriceListService.UpdatePriceList(
        copyOfPriceList, copyOfPriceList.id
      ).subscribe(
        data => {
          alert("Data Updated Successfully !!")
          this.router.navigate(["/"])
        }, err => {
          alert("Data Cannot Be Updated At the Moment. Please Try Again Later !!")
        }
      )
    }
  }

  onlyText(event: Event) {
    this.activePriceList.priceListName = this.activePriceList.priceListName?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    this.activePriceList.priceListName = this.activePriceList.priceListName?.replace(/[0-9]/g, '')
  }

  isNumberKey(event: any){
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

  checkPriceListName() {
    var priceListName: any = this.activePriceList.priceListName
    if (priceListName.length < 9) {
      alert("priceListName Must Be 10 or Greater then 10 Character ")
      return false;
    }
    else {
      return true;
    }
  }

  checkExtErpPriceListIDValidation() {
    var checkVariable = [];
    if (this.activePriceList.extErpPriceListID != null) {
      checkVariable = this._PriceListService.PriceListData.filter(
        x =>
          (x.priceListID == this.activePriceList.extErpPriceListID
            ||
            x.extErpPriceListID == this.activePriceList.extErpPriceListID
          )
          && (
            x.priceListID != this.activePriceList.priceListID
          )
      )
    }
    if (checkVariable.length > 0) {
      alert("Please Provide A Unique Ext-Erp-Price-List-ID !!")
      return false
    }
    else {
      return true;
    }
  }
}
