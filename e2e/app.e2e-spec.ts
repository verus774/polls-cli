import { PollsCliPage } from './app.po';

describe('polls-cli App', () => {
  let page: PollsCliPage;

  beforeEach(() => {
    page = new PollsCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
