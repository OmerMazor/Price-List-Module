import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PriceListService } from './price-list.service';

describe('PriceListService', () => {
    let httpTestingController: HttpTestingController;
    let service: PriceListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.inject(PriceListService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#getData should return expected data', (done) => {
        var expectedData = [{
            "tariffName": "Tariff Name 1",
            "download": "12",
            "upload": "6",
            "taiffBenefits": [
                "Tariff Benefit 1",
                "Tariff Benefit 2",
                "Tariff Benefit 3"
            ],
            "price": "123,093"
        }]

        service.GetAllPriceLists().subscribe(
            data => {
                expect(data).toEqual(expectedData);
                done();
            });
        const testRequest = httpTestingController.expectOne('http://localhost:3000/pricelist');
        testRequest.flush(expectedData);
    });

    it('#getData should use GET to retrieve data', () => {
        service.GetAllPriceLists().subscribe();
        const testRequest = httpTestingController.expectOne('http://localhost:3000/pricelist');
        expect(testRequest.request.method).toEqual('GET');
    });

    // Uncomment the below test if you want to check server error if API not working

    // it('#getData should return an empty object on error', (done) => {
    //   const expectedData = {
    //     "tariffName": "Tariff Name 1",
    //     "download": "12",
    //     "upload": "6",
    //     "taiffBenefits": [
    //       "Tariff Benefit 1",
    //       "Tariff Benefit 2",
    //       "Tariff Benefit 3"
    //     ],
    //     "price": "123,093"
    //   }

    //   service.getTariffData().subscribe(data => {
    //     expect(data).toEqual(expectedData);
    //     done();
    //   });
    //   const testRequest = httpTestingController.expectOne('http://localhost:3000/tariff-data');

    //   testRequest.flush('error', { status: 500, statusText: 'Broken Service' });
    // });
});
