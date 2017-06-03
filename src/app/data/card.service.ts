import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Card } from './card.component';
import { CARDS } from './mock-data-cards';


@Injectable()
export class CardService {

    constructor(private http: Http) { }
  
    getCards(): Promise<Card[]>{
        return this.http.get('api/cards/getAll')
                        .toPromise()
                        .then(responce => responce.json() as Card[])
                        .catch(this.handleError);
    }
    getRandomCards(n: string): Promise<Card[]>{
        return this.http.get('api/cards/getRandom/'+n)
                        .toPromise()
                        .then(responce => responce.json())
                        .catch(this.handleError);
    }
    getCard(id: string): Promise<any> {
        return this.http.get('api/cards/getById/'+id)
                        .toPromise()
                        .then( (responce) => responce.json())
                        .catch(this.handleError);
    }
    
    getImage(id: string): Promise<any> {
        return this.http.get('api/imgs/getById/'+id)
                        .toPromise()
                        .catch(this.handleError);
    }
    uploadCard(card: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post('api/cards/upload/', {"card": JSON.stringify(card) }, options)
                        .map(res => res.json());
    }
    uploadImage(image: any): Observable<string> {
        const headers = new Headers({ 'Content-Type': 'image' });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.post('api/imgs/upload', image, options)
                        .map(res => res.json());
    }
    private handleError(error: any): Promise<any> {
        console.error('API ERROR: ', error);
        return Promise.reject(error.message || error);
    }
}
