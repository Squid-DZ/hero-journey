import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'heroes', title: 'Heroes', component: HeroesComponent },
  { path: 'detail/:id', title: 'Hero Detail', component: HeroDetailComponent },
];
