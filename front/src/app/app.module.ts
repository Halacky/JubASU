import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AdminPanelPageComponent } from './admin-panel-page/admin-panel-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReviewsPageComponent } from './reviews-page/reviews-page.component';
import { StaffPageComponent } from './staff-page/staff-page.component';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import { SpecializationComponent } from './main-page/specialization/specialization.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemoriesComponent } from './main-page/memories/memories.component'
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { ReviewDetailsComponent } from './admin-panel-page/review-details/review-details.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanComponent } from './main-page/plan/plan.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { MapComponent } from './main-page/map/map.component';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { AgmCoreModule } from '@agm/core';

registerLocaleData(ru);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AdminPanelPageComponent,
    GalleryPageComponent,
    HistoryPageComponent,
    LoginPageComponent,
    MainPageComponent,
    ReviewsPageComponent,
    StaffPageComponent,
    SpecializationComponent,
    LoaderComponent,
    AuthLayoutComponent,
    ReviewDetailsComponent,
    PlanComponent,
    MemoriesComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    AngularYandexMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmpsulfDZcum02Yz_Nsa71MO3NLkM2ZFE'
    })
  ],
  exports:[
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: ru_RU }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
