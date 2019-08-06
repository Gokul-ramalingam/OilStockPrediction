import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';
import { RouterModule,Routes} from '@angular/router'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'/search',pathMatch: 'full'},
  {path:'search',component:SearchComponent},
  {path:'search/view/:id',component:ViewComponent},
  {path:'**',component:PageNotFoundComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponent=[
  SearchComponent,
  ViewComponent,
  PageNotFoundComponent
]