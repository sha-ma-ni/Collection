import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from "./mainpage/mainpage.component";
import { AddFigureComponent } from "./figures/add-figure/add-figure.component";
import { SetComponent } from "./sets/set/set.component";
import { LoginComponent } from "./login/login.component";
import { FiguresComponent } from './figures/figures.component';
import { AllsetsComponent } from "./sets/allsets/allsets.component";
import { RegisterComponent } from "./register/register.component";
import { EditfigureComponent} from "./figures/editfigure/editfigure.component";
import { AuthguardGuard } from "./shared/authguard.guard";


const routes: Routes = [
  {
    path: "home",
    component: MainpageComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: "",
    component: LoginComponent

  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "figure",
    component: AddFigureComponent
  },
  {
    path: "set",
    component: SetComponent
  },
  {
    path: "allfigures",
    component: FiguresComponent
  },
  {
    path: "allsets",
    component: AllsetsComponent
  },
  {
    path: "edit",
    component: EditfigureComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
