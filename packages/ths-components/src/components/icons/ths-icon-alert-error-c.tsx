import { Component, h, Prop } from '@stencil/core';
// 渲染 SVG 图标组件
import { Icon } from '../ths-icons/icon';
// svg 图标 JSON 数据
import { thsAlertErrorC as svgData } from '@ths-design/icons';

@Component({
  tag: 'ths-icon-alert-error-c',
})
export class ThsIconAlertErrorC {
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

    return <Icon {...{ size, styles, classNames, color, rotate, spin, svgData }} />;
  }
}
