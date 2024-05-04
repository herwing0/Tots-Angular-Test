  import { Inject, Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { TOTS_CORE_PROVIDER, TotsBaseHttpService, TotsCoreConfig } from '@tots/core';
  import { Observable } from 'rxjs';
  import { NewClient } from '../interfaces/client.intarface';

  @Injectable({
    providedIn: 'root'
  })
  export class ClientService extends TotsBaseHttpService<NewClient> {
    base_url: string;
    constructor(
      @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
      protected override http: HttpClient,
    ) {
      super(config, http);
      this.basePathUrl = 'client';
      this.base_url = 'https://agency-coda.uc.r.appspot.com'
    }

    public getClientList(): Observable<any> {
      let postUrl = this.base_url + '/client/list';
      return this.http.post(postUrl, {});
  }

  public postClient(object: NewClient): Observable<any> {
    let postUrl = this.base_url + '/client/save';
    return this.http.post(postUrl, object)
  }

  public removeClient(id: any): Observable<any>{
    let postUrl = this.base_url + `/client/remove/${id}`
    return this.http.delete(postUrl)
  }

  public getClientById(id: any): Observable<any>{
    let postUrl = this.base_url + `/client/fetch/${id}`
    return this.http.get(postUrl)
  }

  }
  