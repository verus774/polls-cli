import {Component, Input, OnInit} from '@angular/core';
import {SocketService} from '../../shared/socket.service';
import {IPoll} from '../poll';

@Component({
  templateUrl: './answers-chart.component.html',
  selector: 'app-answers-chart'
})

export class AnswersChartComponent implements OnInit {
  @Input() activePoll: IPoll;
  answers: any[] = [];
  results: any[] = [];

  constructor(private _socket: SocketService) {
  }

  ngOnInit(): void {
    this._socket.on('answers').subscribe((data) => {
      this.answers = this.answers.concat(data.answers);
      this.results = this.getResults(this.answers, this.activePoll);
    });
  }

  groupBy(items: any[], keys: string[]): any[] {
    const last = keys.length - 1;
    return items.reduce((res, obj) => {
      keys.reduce((res, grp, i) =>
        res[obj[grp]] || (res[obj[grp]] = i === last ? [] : {}), res).push(obj);
      return res;
    }, {});
  }

  getCountedAnswers(groupedAnswers: any[]): any[] {
    const countedAnswers = [];

    for (const prop in groupedAnswers) {
      if (groupedAnswers.hasOwnProperty(prop)) {
        for (const ppp in groupedAnswers[prop]) {
          if (groupedAnswers[prop].hasOwnProperty(ppp)) {
            countedAnswers.push({
              question: prop,
              answer: ppp,
              count: groupedAnswers[prop][ppp].length
            });
          }
        }
      }
    }
    return countedAnswers;
  }

  getResults(answers: any[], activePoll: IPoll): any[] {
    let groupedAnswers = [];
    let countedAnswers = [];
    const results = [];

    groupedAnswers = this.groupBy(answers, ['id', 'answer']);
    countedAnswers = this.getCountedAnswers(groupedAnswers);

    for (const answer of countedAnswers) {
      let answerText;
      let questionText;
      let questionId;

      for (const question of activePoll.questions) {
        if (answer.question === question._id) {
          answerText = question.choices[answer.answer];
          questionText = question.text;
          questionId = question._id
        }
      }

      results.push({
        questionId: questionId,
        questionText: questionText,
        answer: answerText,
        count: answer.count
      });
    }
    return results;
  }

}
