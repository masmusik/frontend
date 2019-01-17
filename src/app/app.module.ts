import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {WebPlayerModule} from "./web-player/web-player.module";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, UrlSerializer} from "@angular/router";
import {CoreModule} from "common/core/core.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomUrlSerializer} from "./custom-url-serializer";
import {Bootstrapper} from "common/core/bootstrapper.service";
import {BeMusicBootstrapper} from "./bootstrapper.service";
import {AuthModule} from "common/auth/auth.module";
import {AccountSettingsModule} from "common/account-settings/account-settings.module";
import {MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {APP_CONFIG} from 'common/core/config/vebto-config';
import {BEMUSIC_CONFIG} from './bemusic-config';
import {PagesModule} from '../common/core/pages/pages.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        CoreModule.forRoot(),
        AuthModule,

        AppRoutingModule,
        WebPlayerModule,
        // account settings and pages modules must come after web player
        // module for proper account settings and custom page route override
        AccountSettingsModule,
        PagesModule,

        // material
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    providers: [
        {provide: APP_CONFIG, useValue: BEMUSIC_CONFIG, multi: true},
        {provide: Bootstrapper, useClass: BeMusicBootstrapper},
        {provide: UrlSerializer, useClass: CustomUrlSerializer},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
