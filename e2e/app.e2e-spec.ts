import {PollsNgxPage} from './app.po';

describe('polls-ngx App', () => {
  let page: PollsNgxPage;

  beforeEach(() => {
    page = new PollsNgxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
