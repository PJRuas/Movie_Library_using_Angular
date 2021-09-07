import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigPrams } from '../shared/models/config-prams';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configureParameters(config: ConfigPrams): HttpParams {
    let httpParams = new HttpParams();
    if (config.page) {
      httpParams = httpParams.set('_page', config.page.toString());
    }
    if (config.limit) {
      httpParams = httpParams.set('_limit', config.limit.toString());
    }
    if (config.search) {
      httpParams = httpParams.set('q', config.search);
    }
    if (config.field) {
      httpParams = httpParams.set(config.field.type, config.field.value.toString());
    }
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');

    return httpParams;
  }
}
