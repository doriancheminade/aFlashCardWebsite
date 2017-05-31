import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Card } from './card.component';
import { CARDS } from './mock-data-cards';


@Injectable()
export class CardService {
    private getAllUrl = "api/getAllFlashCards";
    private getByIdUrl = "api/getByIdFlashCards";

    constructor(private http: Http) { }
  
    getCards(): Promise<Card[]>{
        return this.http.get('api/getAllFlashCards')
                        .toPromise()
                        .then(responce => responce.json() as Card[])
                        .catch(this.handleError);
    }
    
    //getCard(id: string): Promise<Card> {
    getCard(id: string): Promise<any> {
    const url = '${this.getByIdUrl}/${id}';
        return this.http.get('api/getByIdFlashCards/'+id)
                        .toPromise()
                        //.then(responce => responce.json().data as Card)
                        .then( (responce) => responce.json())
                        .catch(this.handleError);
    }
    
    getImage(id: string): Promise<any> {
        return this.http.get('api/imgs/getById/'+id)
                        .toPromise()
                        .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('API ERROR: ', error);
        return Promise.reject(error.message || error);
    }
}
