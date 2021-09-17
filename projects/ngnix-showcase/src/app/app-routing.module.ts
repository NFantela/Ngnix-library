import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'a', loadChildren: () => import('./features/lazy-a/lazy-a.module').then(m => m.LazyAModule) },
  { path: 'b', loadChildren: () => import('./features/lazy-b/lazy-b.module').then(m => m.LazyBModule) },
  { path: 'pipes', loadChildren: () => import('./features/pipes/pipes.module').then(m => m.PipesShowcaseModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
