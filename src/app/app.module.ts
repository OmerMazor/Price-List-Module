import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrderModule } from 'ngx-order-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { ListEditComponent } from './pages/list-edit/list-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    ListEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    OrderModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [OrderPipe,Ng2SearchPipe, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
