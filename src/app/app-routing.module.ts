import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'people/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
