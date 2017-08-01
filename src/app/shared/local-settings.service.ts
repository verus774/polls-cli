import {Injectable} from '@angular/core';

@Injectable()
export class LocalSettingsService {
  getLanguage(): string {
    return localStorage['language'] || '';
  }

  setLanguage(language: string) {
    localStorage['language'] = language;
  }
}
