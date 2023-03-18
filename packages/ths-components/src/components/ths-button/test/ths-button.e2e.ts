import { newE2EPage } from '@stencil/core/testing';

describe('ths-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ths-button></ths-button>');

    const element = await page.find('ths-button');
    expect(element).toHaveClass('hydrated');
  });
});
