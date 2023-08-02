import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFantaComponent } from './component/home-fanta/home-fanta.component';
import { PlayersFantaComponent } from './component/players-fanta/players-fanta.component';
import { LegaFantaComponent } from './component/lega-fanta/lega-fanta.component';
import { SummaryFantaComponent } from './component/summary-fanta/summary-fanta.component';
import { SvincolatiFantaComponent } from './component/svincolati-fanta/svincolati-fanta.component';

const routes: Routes = [
  { path: 'homeFanta', component: HomeFantaComponent },
  { path: 'legaFanta', component: LegaFantaComponent },
  { path: 'playersFanta', component: PlayersFantaComponent },
  { path: 'summaryFanta', component: SummaryFantaComponent },
  { path: 'svincolatiFanta', component: SvincolatiFantaComponent },
  { path: '', redirectTo: '/legaFanta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
