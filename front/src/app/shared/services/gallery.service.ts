import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Gallery } from "./interfaces";

@Injectable({
    providedIn: "root"
})

export class GalleryService{
    constructor(private http: HttpClient){

    }
    

    fetch(): Observable<Gallery[]>{
        return this.http.get<Gallery[]>('/api/gallery/');
    }
}