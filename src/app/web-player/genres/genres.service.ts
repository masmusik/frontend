import {Injectable} from '@angular/core';
import {AppHttpClient} from "common/core/http/app-http-client.service";
import {Observable} from "rxjs";
import {Genre} from "../../models/Genre";
import {Artist} from "../../models/Artist";
import {PaginationResponse} from "common/core/types/pagination-response";
import {BackendResponse} from '../../../common/core/types/backend-response';

@Injectable()
export class Genres {
    constructor(private httpClient: AppHttpClient) {}
    
    public getPopular(): Observable<Genre[]> {
        return this.httpClient.get('genres/popular');
    }
    
    public create(params: Partial<Genre>): BackendResponse<{genre: Genre}> {
        return this.httpClient.post('genres', params);
    }

    public update(id: number, params: Partial<Genre>): BackendResponse<{genre: Genre}> {
        return this.httpClient.put('genres/' + id, params);
    }

    public delete(ids: number[]): BackendResponse<void> {
        return this.httpClient.delete('genres', {ids});
    }
    
    public getGenreArtists(name: string, params = {}): Observable<{artistsPagination: PaginationResponse<Artist>, model: Genre}> {
        return this.httpClient.get(`genres/${name}/artists`, params);
    }
}
