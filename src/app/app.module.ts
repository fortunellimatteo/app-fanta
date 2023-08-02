import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { HomeFantaComponent } from './component/home-fanta/home-fanta.component';
import { PlayersFantaComponent } from './component/players-fanta/players-fanta.component';
import { LegaFantaComponent } from './component/lega-fanta/lega-fanta.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseDialogComponent } from './component/course-dialog/course-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { SummaryFantaComponent } from './component/summary-fanta/summary-fanta.component';
import { SvincolatiFantaComponent } from './component/svincolati-fanta/svincolati-fanta.component';
import { LoginDialogComponent } from './component/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeFantaComponent,
    PlayersFantaComponent,
    LegaFantaComponent,
    CourseDialogComponent,
    SummaryFantaComponent,
    SvincolatiFantaComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
