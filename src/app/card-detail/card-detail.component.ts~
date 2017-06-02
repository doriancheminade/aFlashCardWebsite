import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { CardService } from '../data/card.service';
import { Card } from '../data/card.component';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
    card: any;
    imageRef: string;
    
    constructor(
        private cardService: CardService,
        private route: ActivatedRoute,
        private location: Location,
    ){}
    
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.cardService.getCard(params['id']))
            //.subscribe(card => this.card = card)
            //.subscribe( card => this.imageRef = 'api/imgs/getById/' + this.card.image)
            .subscribe(card => {
                       this.card = card;
                       this.imageRef = "api/imgs/getById/" + this.card[0].image.toString()});
        console.log(this.card)
    }
    
    goBack(): void {
        this.location.back();
    }
}
