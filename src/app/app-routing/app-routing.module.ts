import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { CardsExampleComponent } from '../cards-example/cards-example.component';
import { CreateCardComponent } from '../create-card/create-card.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: CardDetailComponent },
    { path: 'cards-example', component: CardsExampleComponent },
    { path: 'create-card', component: CreateCardComponent }
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forRoot(routes)
  ],
    exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
