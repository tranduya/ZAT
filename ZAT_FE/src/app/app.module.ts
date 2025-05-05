import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { VypujckyComponent } from './vypujcky/vypujcky.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CSLocaleMessageService } from './helper/cslocale-message.service'
import { MessageService } from '@progress/kendo-angular-l10n'
import "@progress/kendo-angular-intl/locales/cs/all";

import { NotificationModule } from '@progress/kendo-angular-notification';
import { UserManagementComponent } from './user-management/user-management.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { DilaComponent } from './dila/dila.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';



@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    DropdownComponent,
    DropdownFilterComponent,
    NotFoundComponent,
    VypujckyComponent,
    UserManagementComponent,
    NewUserComponent,
    EditUserComponent,
    DilaComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    GridModule,
    IconsModule,
    LabelModule,
    DropDownsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: DilaComponent},
      { path: 'prehled_vypujcek', component: VypujckyComponent},
      { path: 'sprava_uzivatelu', component: UserManagementComponent},
      { path: 'sprava_uzivatelu/novy_uzivatel', component: NewUserComponent},
      { path: 'sprava_uzivatelu/:id', component: EditUserComponent},
      { path: '**', component: NotFoundComponent }
    ]),
    DialogsModule,
    DateInputsModule,
    NotificationModule,
    FormsModule,
    IndicatorsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'cs'
    },
    {
      provide: MessageService,
      useClass: CSLocaleMessageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
