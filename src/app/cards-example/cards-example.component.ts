import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Card } from '../data/card.component';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { CardService } from '../data/card.service';

@Component({
  selector: 'app-cards-example',
  templateUrl: './cards-example.component.html',
  styleUrls: ['./cards-example.component.css'],
    providers: [CardService]
})
export class CardsExampleComponent implements OnInit {

    title = 'Flash Cards';
    selectedCard: Card;
    exampleCards: Card[];
    
    constructor(private cardService: CardService,
                private router: Router){}
  
    ngOnInit(): void {
        this.getCards();
    }
    
    onSelect(card: Card): void {    
        this.selectedCard = card;
    }  

    getCards(): void {
        this.cardService.getCards()
            .then( cards => this.exampleCards = cards);
    }
    
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedCard._id]);
    }

}
