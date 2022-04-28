import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PriceList } from 'src/model/PriceList';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  selectedPriceList!: PriceList;
  PriceListData!: PriceList[];

  constructor(private http: HttpClient) { }

  // THIS WAS NOT THE PART OR REQUIREMENT AS DATA RETREIVED WAS NEEDED TO BE ASSUMED
  // BUT WE HAVE CREATED A FAKE BACKEND USING JSON_SERVER THAT PROVIDE US WITH THE API TO PRFORM
  // CRUD OPERATIONS IN OUR FAKE DB.

  // MOCK DATA IS AVAILABLE IN DB/DATABASE.JSON

  // Start JSON Server using npm run server
  // and then hit the API to retrieve data

  GetAllPriceLists(): Observable<any> {
    // ACCORDING TO INDUSTRY PRACTICE
    // WE ALWAYS HAVE 2 DIFFERENT METHODS TO GET (ALL_DATA) & (FILTER_DATA)
    // THE API IS SAME BUT RETURN ALL AVAILABLE DATA IN THE DB FOR THE PRICE LIST
    return this.http.get<any>("http://localhost:3000/" + 'pricelist').pipe(catchError(this.error))
  }

  GetPriceLists(ERPCompanyIds: any[], SearchString: any, Case: string) {
    // THIS METHOD HANDLES THE SEARCH STRING & ERP COMPANY ID PARAMETERS IN THE API AND
    // FETCH FILTERED DATA BASED ON THAT, SINCE AS THE ASSIGNMENT INSTRUCTED TO ASSUMED THE FILTERED
    // DATA. WE DIDN'T ASSUMED BUT CREATED AN IMPLEMENTATION OF HOW THE END DATA WILL BE AVAILABLE
    // WHEN API RECEIVES ERPCOMPANY_IDS & SEARCH STRING AS PARAMETER
    if (Case == "Working") {
      // IN THIS CONDITION WE HAVE DONE SOME FILTERATION AT THE FRONT TO CREATE THE REQUIRED RESPONSE
      // WHEN SEARCH STRING & ERP COMPANY IDS IS SET IN API PARAMETER
      this.GetAllPriceLists().subscribe(
        (data: any) => {
          // WE JUST RECEIVE RESPONSE AND START FILTERATION FIRST BASED ON
          // SEARCH STRING
          var Data = data.filter(function (v: any, i: any) {
            if (
              (v.extErpPriceListID != null && v.extErpPriceListID.toLowerCase().indexOf(SearchString.toLowerCase()) >= 0)
              ||
              v.priceListName.toLowerCase().indexOf(SearchString.toLowerCase()) >= 0
              ||
              v.priceListID.toString().toLowerCase().indexOf(SearchString.toLowerCase()) >= 0
            ) {
              return true;
            } else
              return false;
          })
          // THIS DATA WILL NOW BE FILTERED BASED ON COMPANY ID'S THAT WILL BE AVAILABLE IN API PARAMETERS
          Data = Data.filter((el: any) => ERPCompanyIds.some(f => f.toString() == el.ERPCompanyId.toString()))
          // AND FINALLY WE SET DATA TO PRICE LIST DATA. NOTE: THIS IS THE DATA THAT WILL BE RETURNED
          // IF WE HAVE AN ACTUAL API THAT ACCEPT PARAMTERS. AND MOSTLY THE ABOVE LOGIC WILL BE PRESENT AND THE BACKEND
          this.PriceListData = Data
        }
      )
    }
    else {
      // THE ACTUAL API WILL LOOK LIKE THIS , HANDLING THE PARAMETES TO BRING FILTERED DATA
      // BUT SINCE JSON SERVER PROVIDE SIMPLE API HANDLING WITHOUT QUERY PARAMETERS
      // WE WILL NOT BE ABLE TO RECEIVE DATA FROM THIS API. THE CORRECT RESPONSE THAT WILL
      // BE RECEIVED ASSUMING IF IT WAS A REAL SERVER AND BACKEND IS SHOWN IN ABOVE CONDITION. TERMED AS 'WORKING'
      this.http.get<any>(
        "http://localhost:3000/" +
        'pricelist/?ERPCompanyIds=' + ERPCompanyIds.toString() +
        "&SearchString=" + SearchString
      ).pipe(catchError(this.error))
    }
  }

  UpdatePriceList(object: any, edittedID: any) {
    // THIS IS A SIPMPLE PUT API PROVIDED BY JSON SERVER TO HANDLE UPDATE REQUEST
    return this.http.put<any>("http://localhost:3000/" + 'pricelist/' + edittedID, object).pipe(catchError(this.error))
  }

  // A SIMPLE ERROR HANDLING FUNCTION
  // IF API CALL FAILED
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
