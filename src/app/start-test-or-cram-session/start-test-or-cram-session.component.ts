import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-test-or-cram-session',
  templateUrl: './start-test-or-cram-session.component.html',
  styleUrls: ['./start-test-or-cram-session.component.css']
})
export class StartTestOrCramSessionComponent implements OnInit {
  n: number;
  isTest: boolean;
  time: number;
  random: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.n = 5;
    this.isTest = false;
    this.time = 10;
    this.random = true;
  }

  startSession(){
    this.router.navigate(['/cram', this.n, this.isTest, this.time, this.random]);
  }
}
