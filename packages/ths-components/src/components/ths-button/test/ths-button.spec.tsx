import { newSpecPage } from '@stencil/core/testing';
import { ThsButton } from '../ths-button';

describe('ths-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ThsButton],
      html: `<ths-button></ths-button>`,
    });
    expect(page.root).toEqualHtml(`
      <ths-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ths-button>
    `);
  });
});
