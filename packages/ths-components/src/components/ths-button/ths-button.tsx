import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'ths-button',
  styleUrl: 'ths-button.css',
  shadow: true,
})
export class ThsButton {
  @Prop({
    attribute: 'button-text'
  }) buttonText: string;

  render() {
    return (
      <div class="button-bg">
        <span>{this.buttonText}</span>
      </div>
    );
  }
}
