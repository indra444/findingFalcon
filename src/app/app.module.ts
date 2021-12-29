import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PlanetsComponent } from './planets/planets.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfigService } from './shared/services/app-config.service';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './common/modal/modal.component';
import { HttpErrorInterceptor } from './shared/services/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlanetsComponent,
    ResultComponent,
    HomeComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: AppConfigService) => async () => {
        await appService.initializeApp();
      },
      deps: [AppConfigService],
      multi: true,
    },
    HttpErrorInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
