import {HttpClient} from '@angular/common/http';

export class HomeService {

    constructor(private http: HttpClient) {}

    getAllProdotti() {
        return this.http.get("https://localhost:8443/prodotti/all");
    }
}
