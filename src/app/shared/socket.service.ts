import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SocketService {
  private host = 'https://polls2.herokuapp.com';
  private socket: any;

  constructor() {
    this.socket = io(this.host);
  }

  emit(chanel, message): void {
    this.socket.emit(chanel, message);
  }

  on(event_name): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.off(event_name);
      this.socket.on(event_name, (data) => {
        observer.next(data);
      });
    });
  }

  connect(): void {
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

}
