import { Inject, Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { HttpClient } from '@angular/common/http';
import { TOTS_CORE_PROVIDER, TotsBaseHttpService, TotsCoreConfig } from '@tots/core';
import { Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends TotsBaseHttpService<Client> {
  base_url: string;
  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient,
  ) {
    super(config, http);
    this.basePathUrl = 'client';
    this.base_url = 'https://agency-coda.uc.r.appspot.com'
  }

  public doLogin(loginObj: LoginInterface): Observable<any> {
    let postUrl = this.base_url + '/mia-auth/login';
    return this.http.post(postUrl, loginObj);
}

public registerUser(register: LoginInterface): Observable<any> {
  let postUrl = this.base_url + '/mia-auth/register'
  return this.http.post(postUrl, register)
}


}
 