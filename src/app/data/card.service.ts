import { Injectable } from '@angular/core';

import { Card } from './card.component';
import { CARDS } from './mock-data-cards';

@Injectable()
export class CardService {

    getCards(): Promise<Card[]>{
        return Promise.resolve(CARDS);
    }
    
    getCard(id: number): Promise<Card> {
        return this.getCards()
                   .then(cards => cards.find(card => card.id === id));
    }
}
