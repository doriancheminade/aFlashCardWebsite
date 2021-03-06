import { Component, OnInit } from '@angular/core';

import { Card } from '../data/card.component';
import { CardService } from '../data/card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    cards: Card[] = [];
    
    constructor(private cardService: CardService){}
    
    ngOnInit(): void{
        this.cardService.getCards()
            .then(cards => this.cards = cards.slice(1,5));
    }
}
