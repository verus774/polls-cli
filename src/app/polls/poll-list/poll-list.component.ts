import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {IPoll} from '../poll';
import {NotificationsService} from 'angular2-notifications';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {AuthService} from '../../shared/auth.service';
import {SocketService} from '../../shared/socket.service';
import {ApiService} from '../../shared/api.service';
import {ICategory} from '../../categories/category';
import {TranslateService} from '@ngx-translate/core';
import {RoomService} from '../../rooms/room.service';
import {GroupByPipe} from 'ngx-pipes';

@Component({
  templateUrl: './poll-list.component.html',
  providers: [
    Modal,
    GroupByPipe
  ]
})

export class PollListComponent implements OnInit {
  polls: IPoll[];
  categories: ICategory[];
  useCategoryFilter = false;
  activePoll: IPoll;
  chartData: any[];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  roomUrl: string;
  showQR = false;

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _notificationsService: NotificationsService,
              private _authService: AuthService,
              private _roomService: RoomService,
              private _translate: TranslateService,
              private _groupByPipe: GroupByPipe,
              private _socket: SocketService) {
  }

  ngOnInit(): void {
    let answers: any[] = [];

    this.getCategories();
    this.getPolls();
    this.getActivePoll();

    this.roomUrl = this._roomService.getCurrentRoomUrl();

    this._socket.emit('joinRoom', this._authService.getUser()._id);

    this._socket.on('startPoll').subscribe((data) => {
      this.activePoll = data;

      for (const poll of this.polls) {
        if (data._id === poll._id) {
          poll.active = true;
        }
      }
    });

    this._socket.on('stopPoll').subscribe((data) => {
      this.activePoll = null;

      for (const poll of this.polls) {
        if (data._id === poll._id) {
          poll.active = false;
        }
      }
    });

    this._socket.on('error').subscribe(() => {
      this._notificationsService.error(
        this._translate.instant('NOTIFICATION_ERR.TITLE'),
        this._translate.instant('NOTIFICATION_ERR.CONTENT')
      );
    });

    this._socket.on('answers').subscribe((data) => {
      answers = answers.concat(data);
      this.chartData = this.answersToChartData(answers);
    });
  }

  getPolls(page = this.currentPage, categoryId = ''): void {
    this._api.get(`polls?page=${page}&limit=${this.itemsPerPage}&category=${categoryId}`)
      .subscribe(res => {
          this.polls = res.data;
          this.totalItems = res.meta.paging.total;
          this.currentPage = page;
        },
        _ => {
          this.polls = [];
          this.totalItems = 0;
        }
      );
  }

  getActivePoll(): void {
    this._api.get(`active-poll?room=${this._authService.getUser()._id}`)
      .subscribe(res => {
        this.activePoll = res.data;
      });
  }

  getCategories(): void {
    this._api.get('categories')
      .subscribe(res => this.categories = res.data);
  }

  removePoll(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title(this._translate.instant('POLL_LIST.MODAL_DELETE_TITLE'))
      .body(this._translate.instant('POLL_LIST.MODAL_DELETE_BODY'))
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`polls/${id}`).subscribe(
              () => {
                this._notificationsService.success(
                  this._translate.instant('POLL_LIST.NOTIFICATION_TITLE'),
                  this._translate.instant('POLL_LIST.NOTIFICATION_DELETED')
                );
                this.getPolls();
              },
              () => this._notificationsService.error(
                this._translate.instant('NOTIFICATION_ERR.TITLE'),
                this._translate.instant('NOTIFICATION_ERR.CONTENT')
              )
            );
          });
      });
  }

  startPoll(id: string): void {
    this._socket.emit('startPoll', {access_token: this._authService.getToken(), id: id});
  }

  stopPoll(id: string): void {
    this._socket.emit('stopPoll', {access_token: this._authService.getToken(), id: id});
    this.chartData = [];
  }

  resetCategoryFilter(): void {
    this.useCategoryFilter = false;
    this.getPolls(1);
  }

  onCategorySelectChange(categoryId) {
    this.useCategoryFilter = true;
    this.getPolls(1, categoryId.slice(3));
  }

  answersToChartData(answers: any[]): any[] {
    const groupedAnswers = this._groupByPipe.transform(answers, ['question', 'answer']);
    const result: any[] = [];

    for (const title in groupedAnswers) {
      if (groupedAnswers.hasOwnProperty(title)) {
        const arrayOfStrings = title.split('|');

        const question = arrayOfStrings[0];
        const choice = arrayOfStrings[1];
        const count = groupedAnswers[title].length;

        const obj = {
          title: question,
          data: [{
            name: choice,
            value: count
          }]
        };

        result.push(obj);
      }
    }

    const groupByTitle = this._groupByPipe.transform(result, ['title']);
    const result2: any[] = [];

    for (const title in groupByTitle) {
      if (groupByTitle.hasOwnProperty(title)) {
        const obj = {
          title: title,
          data: []
        };

        for (const el of groupByTitle[title]) {
          obj.data = obj.data.concat(el.data);
        }

        result2.push(obj);
      }
    }

    return result2;
  }

  trackByFn(index, item) {
    return item.name;
  }

}
