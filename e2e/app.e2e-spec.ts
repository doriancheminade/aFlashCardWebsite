import { AMeanWebsitePage } from './app.po';

describe('a-mean-website App', () => {
  let page: AMeanWebsitePage;

  beforeEach(() => {
    page = new AMeanWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
