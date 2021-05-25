import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message, Reviews } from "./interfaces";

@Injectable({
    providedIn: "root"
})

export class ReviewsService{
    constructor(private http: HttpClient){

    }

    fetch(): Observable<Reviews[]>{
        return this.http.get<Reviews[]>("/api/feedback/");
    }
    
    create(name: string,group: string, city: string, placeOfWork: string, feedback: string, date: string, imageSrc?: File): Observable<Reviews>{

        const fd = new FormData();
        if(imageSrc){
            fd.append('name', name);
            fd.append('group', group);
            fd.append('city', city);
            fd.append('placeOfWork', placeOfWork);
            fd.append('date', date);
            fd.append('feedback', feedback);
            fd.append('image', imageSrc);
        }else{
            fd.append('name', name);
            fd.append('group', group);
            fd.append('city', city);
            fd.append('placeOfWork', placeOfWork);
            fd.append('date', date);
            fd.append('feedback', feedback);
        }

            

        return this.http.post<Reviews>("/api/feedback/", fd);
        
    }

    delete(id: string): Observable<Message>{
        return this.http.delete<Message>(`/api/adminPanel/${id}`);
    }

    getById(id: string) :Observable<Reviews>{
        return this.http.get<Reviews>(`/api/adminPanel/${id}`);
    }

}