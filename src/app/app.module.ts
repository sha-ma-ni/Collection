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
import { SetComponent } from './sets/allsets/set/set.component';
import { AllsetsComponent } from './sets/allsets/allsets.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditfigureComponent} from "./figures/editfigure/editfigure.component";
import { DeleteFigureComponent } from './figures/delete-figure/delete-figure.component';
import { FiguresComponent } from "./figures/figures.component";
import {NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import { pencilSquare,trash,boxArrowRight } from 'ngx-bootstrap-icons';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ConfirmComponent } from './confirm/confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
    ConfirmComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(icons),
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    BrowserAnimationsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
