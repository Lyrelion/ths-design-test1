import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ths-icons',
  styleUrl: 'ths-icons.css',
  shadow: true,
})
export class ThsIcons {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
