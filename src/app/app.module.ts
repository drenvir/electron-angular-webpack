import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgxElectronModule} from 'ngx-electron';


@NgModule({
    imports: [
        BrowserModule,
        NgxElectronModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}