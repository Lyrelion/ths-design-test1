/*
 * @Description: 把所有的 Icon 组件整合到一个大组件中
 * @Author: Lyrelion
 * @Date: 2023-03-26 13:26:42
 * @LastEditTime: 2023-03-26 14:10:40
 * @FilePath: \ths-design-test1\packages\ths-components\scripts\iconsComTemp.js
 */

exports.transformTempCom = (keys, icons) => {
  const temp = keys.map(key => {
    return `<ths-icon-${icons[key]._name} {...{size, styles, classNames, color, rotate, spin }}></ths-icon-${icons[key]._name}>`;
  });
  return `import { Component, Host, Prop, h } from '@stencil/core';

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
            ${temp.join('\n')}
          </Host>
        );
      }
    }
    `;
};
