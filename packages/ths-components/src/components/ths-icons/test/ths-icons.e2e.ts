import { newE2EPage } from '@stencil/core/testing';

describe('ths-icons', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ths-icons></ths-icons>');

    const element = await page.find('ths-icons');
    expect(element).toHaveClass('hydrated');
  });
});
