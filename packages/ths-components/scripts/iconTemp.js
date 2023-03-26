/*
 * @Description: Icon 组件通用模板
 * @Author: Lyrelion
 * @Date: 2023-03-26 13:20:53
 * @LastEditTime: 2023-03-26 14:53:50
 * @FilePath: \ths-design-test1\packages\ths-components\scripts\iconTemp.js
 */

exports.transformTemp = (svgData, key) => {
  // console.log(key)
  return `import { Component, h, Prop } from '@stencil/core';
    // 渲染 SVG 图标组件
    import { Icon } from '../ths-icons/icon';
    // svg 图标 JSON 数据
    import { ${key} as svgData } from '@ths-design/icons';

    @Component({
      tag: 'ths-icon-${svgData._name}',
    })
    export class ThsIcon${key.split('ths')[1]} {
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
    `;
};
