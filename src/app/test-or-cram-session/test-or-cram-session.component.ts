import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CardService } from '../data/card.service';

@Component({
  selector: 'app-test-or-cram-session',
  templateUrl: './test-or-cram-session.component.html',
  styleUrls: ['./test-or-cram-session.component.css'],
  animations: [
    trigger('cardState', [
      state('void', style({transform: 'rotate( 900deg )', opacity: 1})),
      state('opened', style({transform: 'rotate( 0deg )', opacity: 1})),
      state('answering', style({transform: 'rotate( 900deg )', opacity: 1})),
      transition('void <=> *', animate(3000)),
      transition('answering => opened', animate(3000))
    ])
  ]
})
export class TestOrCramSessionComponent implements OnInit {

  cards = Array<any>();
  selectedCard: number;
  isTest: boolean;
  answered: boolean[] = [];
  canAnswer: boolean[] = [];
  animationState: string;
  //answers
  easy: number;
  ok: number;
  hard: number;

  nbAnswers: number;
  max: number

  stateCard: string;

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
            this.selectedCard = 0
        });
    this.easy = 0;
    this.ok = 0;
    this.hard = 0;
    this.max = 0;
    this.nbAnswers = 0;
    if (!this.isTest){
        this.max = this.cards.length
    }
    this.stateCard = 'void';

    for (let i=0; i< this.cards.length; i++) {
      this.answered.push(false)
      this.canAnswer.push(true)
    }
  }
  openCard(i){
    this.selectedCard = i;
    this.stateCard = 'opened';
  }
  seeCard(){
    this.stateCard = 'answering';
  }
  answerCard(a){
    this.nbAnswers++
    if (a === 'easy'){
        this.easy++;
    }
    if (a === 'ok'){
        this.ok++;
    }
    if (a === 'hard'){
        this.hard++;
    }
    if (!this.isTest){
        this.max++;
    }
    this.stateCard = 'void';
    if (this.isTest){
        this.canAnswer[this.selectedCard] = false;
    }
    this.answered[this.selectedCard] = true;
  }
}
