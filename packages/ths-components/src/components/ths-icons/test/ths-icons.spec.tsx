import { newSpecPage } from '@stencil/core/testing';
import { ThsIcons } from '../ths-icons';

describe('ths-icons', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ThsIcons],
      html: `<ths-icons></ths-icons>`,
    });
    expect(page.root).toEqualHtml(`
      <ths-icons>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ths-icons>
    `);
  });
});
