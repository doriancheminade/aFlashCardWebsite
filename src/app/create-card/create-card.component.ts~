import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CardService } from '../data/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  card: any;
  translation: any;
  imageSet: number;
  imageFile: File;

  constructor(private cardService: CardService,
                private router: Router) { 
  }

  ngOnInit() {
    this.imageSet = 0;
    this.translation = {
        translation: "",
        info: "",
        english: "engulishu!",
        example: {
            en: "e",
            ru: "r"
        }
    }
    this.card = {
        type: "t",
        name: "n",
        word: "w",
        image: "",
        translation:[
        ]
    }
    this.card.translation[0] = {...this.translation};
  }
  
  addTranslation(){
    this.card.translation[this.card.translation.length] = {...this.translation};
  }
  removeTranslation(t){
    this.card.translation.splice(t,1);    
  }
  imageChange(e){
    this.imageFile = e.target.files[0];
    this.imageSet = 1;
  }
  submitImage(){
    if(this.imageSet == 1){
        this.cardService.uploadImage(this.imageFile)
                        .subscribe(
                        id => {
                            this.card.image = id;
                            this.submitCard()
                        },err => {
                            this.card.image = '';
                            this.submitCard()
                        });
    }
    else{
        this.submitCard();
    }
  }
  submitCard(){
    this.cardService.uploadCard(this.card)
                    .subscribe(
                    id => {
                       this.goToDetail(id)
                    },err => {
                       this.goToDetail(err)
                    });
  }
  goToDetail(id){
    this.router.navigate(['/detail', id]);
  }
  submit(){
    this.submitImage();
  }
}
