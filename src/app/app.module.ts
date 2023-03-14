import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FooterComponent } from './footer/footer.component';
import { AddFigureComponent } from './figures/add-figure/add-figure.component';
import { SetComponent } from './sets/set/set.component';
import { AllsetsComponent } from './sets/allsets/allsets.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditfigureComponent } from './figures/editfigure/editfigure.component';
import { DeleteFigureComponent } from './figures/delete-figure/delete-figure.component';
import { FiguresComponent } from "./figures/figures.component";
import {NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import { pencilSquare,trash,boxArrowRight } from 'ngx-bootstrap-icons';


const icons = {
  pencilSquare,
  trash,
  boxArrowRight
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent,
    FooterComponent,
    AddFigureComponent,
    SetComponent,
    AllsetsComponent,
    LoginComponent,
    RegisterComponent,
    EditfigureComponent,
    DeleteFigureComponent,
    FiguresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(icons),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
