import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessTheAgeComponent } from './guess-the-age/guess-the-age.component';

const routes: Routes = [
 { path: '**', component: GuessTheAgeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
