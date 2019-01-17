import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "common/guards/auth-guard.service";
import {CheckPermissionsGuard} from "common/guards/check-permissions-guard.service";
import {AdminComponent} from "common/admin/admin.component";
import {SettingsComponent} from "common/admin/settings/settings.component";
import {SettingsResolve} from "common/admin/settings/settings-resolve.service";
import {ArtistsComponent} from "./artists/artists.component";
import {NewArtistPageComponent} from "./artists/new-artist-page/new-artist-page.component";
import {EditArtistPageResolver} from "./artists/new-artist-page/edit-artist-page-resolver.service";
import {AlbumsPageComponent} from "./albums/albums-page/albums-page.component";
import {TracksPageComponent} from "./tracks/tracks-page/tracks-page.component";
import {LyricsPageComponent} from "./lyrics-page/lyrics-page.component";
import {PlaylistsPageComponent} from './playlists-page/playlists-page.component';
import {ProvidersSettingsComponent} from './settings/providers/providers-settings.component';
import {PlayerSettingsComponent} from './settings/player/player-settings.component';
import {BlockedArtistsSettingsComponent} from './settings/blocked-artists/blocked-artists-settings.component';
import {vebtoSettingsRoutes} from 'common/admin/settings/settings-routing.module';
import {vebtoAdminRoutes} from 'common/admin/admin-routing.module';
import {GenresComponent} from './genres/genres.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard, CheckPermissionsGuard],
        canActivateChild: [AuthGuard, CheckPermissionsGuard],
        data: {permissions: ['admin.access']},
        children: [
            {
                path: 'artists',
                children: [
                    {path: '', component: ArtistsComponent, data: {permissions: ['artists.update']}},
                    {path: 'new', component: NewArtistPageComponent, data: {permissions: ['artists.create']}},
                    {path: ':id/edit', component: NewArtistPageComponent, resolve: {artist: EditArtistPageResolver}, data: {permissions: ['artists.update']}},
                ]
            },
            {
                path: 'albums',
                component: AlbumsPageComponent,
                data: {permissions: ['albums.update']}
            },
            {
                path: 'tracks',
                component: TracksPageComponent,
                data: {permissions: ['tracks.update']}
            },
            {
                path: 'genres',
                component: GenresComponent,
                data: {permissions: ['genres.update']}
            },
            {
                path: 'lyrics',
                component: LyricsPageComponent,
                data: {permissions: ['lyrics.update']}
            },
            {
                path: 'playlists',
                component: PlaylistsPageComponent,
                data: {permissions: ['playlists.update']}
            },
            {
                path: 'settings',
                component: SettingsComponent,
                resolve: {settings: SettingsResolve},
                data: {permissions: ['settings.view']},
                children: [
                    {path: 'providers', component: ProvidersSettingsComponent},
                    {path: 'player', component: PlayerSettingsComponent},
                    {path: 'blocked-artists', component: BlockedArtistsSettingsComponent},
                    ...vebtoSettingsRoutes,
                ],
            },
            ...vebtoAdminRoutes,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
