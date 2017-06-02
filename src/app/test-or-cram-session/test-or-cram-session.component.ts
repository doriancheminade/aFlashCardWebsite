import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { CardService } from '../data/card.service';

@Component({
  selector: 'app-test-or-cram-session',
  templateUrl: './test-or-cram-session.component.html',
  styleUrls: ['./test-or-cram-session.component.css']
})
export class TestOrCramSessionComponent implements OnInit {

  cards: any[];
  selectedCard: any;
  isTest: boolean;
  answered: boolean[] = [];
  canAnswer: boolean[] = [];
  //answers
  easy: number;
  ok: number;
  hard: number;
  
  nbAnswers: number;
  max: number
  
  state: number;

  constructor(
        private cardService: CardService,
        private router: Router,
        private route: ActivatedRoute) 
  { }

  ngOnInit() {
    this.route.params
        .switchMap((params: Params) => {
            this.isTest = params['isTest']            
            return this.cardService.getRandomCards(params['n'])            
        })
        .subscribe(cards => {
            this.cards = cards
            this.selectedCard = cards[0]
        });
    this.easy = 0;
    this.ok = 0;
    this.hard = 0;
    this.max = 0;
    this.nbAnswers = 0;
    if(!this.isTest){
        this.max = this.cards.length
    }
    this.state = 0;
    
    for(let i=0; i< this.cards.length; i++) { 
      this.answered.push(false) 
      this.canAnswer.push(true) 
    } 
  }
  openCard(card, i){
    this.selectedCard = card;
    this.state = 1;
    this.answered[i] = true;
    if(this.isTest){
        this.canAnswer[i] = false;
    }
  }
  seeCard(){
    this.state = 2;
  }
  answerCard(card, a){
  this.nbAnswers++
    if(a == 'easy'){
        this.easy++;
    }
    if(a == 'ok'){
        this.ok++;
    }
    if(a == 'hard'){
        this.hard++;
    }
    if(!this.isTest){
        this.max++;
    }
    this.state = 0;
  }
}
