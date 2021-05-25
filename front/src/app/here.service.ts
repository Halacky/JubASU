import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class HereService {

  public platform: any;
    public geocoder: any;

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": "uIT2wDlpgB7Q6EJ3aSFv",
            "app_code": "ELMwsBrlTFTwBvi1t8d_ben9_ybniuOfHi3N_BXbXNY"
        });
        this.geocoder = this.platform.getGeocodingService();
    }

    public getAddress(query: string) {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ searchText: query }, (result:any) => {
            if(result.Response.View.length > 0) {
                if(result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);
                } else {
                    reject({ message: "no results found" });
                }
            } else {
                reject({ message: "no results found" });
            }
        }, (error:any) => {
            reject(error);
        });
    });
    }

    public getAddressFromLatLng(query: string) {}
}
