import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ths-icons',
})
export class ThsIcons {
  // icon 尺寸 默认 20
  @Prop() size: number | string = 20;
  // styles 传入的 css 样式
  @Prop() styles: object;
  // 传入的 class 名称
  @Prop() classNames: string;
  // 图标颜色
  @Prop() color: string;
  // 旋转的角度
  @Prop() rotate: number;
  // 是否自动旋转
  @Prop() spin: boolean;

  render() {
    const { size, styles, classNames, color, rotate, spin } = this;
    return (
      <Host>
        <ths-icon-aa-c {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-aa-c>
        <ths-icon-add-image {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-add-image>
        <ths-icon-add-user {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-add-user>
        <ths-icon-add {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-add>
        <ths-icon-alert-close-collapse {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-alert-close-collapse>
        <ths-icon-alert-error-c {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-alert-error-c>
        <ths-icon-alert-error-circle-c {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-alert-error-circle-c>
        <ths-icon-wjx-c {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-wjx-c>
        <ths-icon-wjx {...{ size, styles, classNames, color, rotate, spin }}></ths-icon-wjx>
      </Host>
    );
  }
}
