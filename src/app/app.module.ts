import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import { CardsExampleComponent } from './cards-example/cards-example.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardService } from './data/card.service';
import { CreateCardComponent } from './create-card/create-card.component';
import { TestOrCramSessionComponent } from './test-or-cram-session/test-or-cram-session.component';
import { StartTestOrCramSessionComponent } from './start-test-or-cram-session/start-test-or-cram-session.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsExampleComponent,
    DashboardComponent,
    CardDetailComponent,
    CreateCardComponent,
    TestOrCramSessionComponent, 
    StartTestOrCramSessionComponent,
  ],
  imports: [
    ProgressbarModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
