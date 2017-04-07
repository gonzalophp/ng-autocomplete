import { Project1Page } from './app.po';

describe('project1 App', () => {
  let page: Project1Page;

  beforeEach(() => {
    page = new Project1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
