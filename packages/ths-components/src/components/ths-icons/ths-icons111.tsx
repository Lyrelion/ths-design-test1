import { Component, h } from '@stencil/core';
// 渲染 SVG 图标组件
import { Icon } from './icon';
// 一个测试文件，五角星 svg 图标
import IconSvg from './icon-loading-test';

@Component({
  tag: 'ths-icons-111',
  styleUrl: 'ths-icons.css',
  shadow: true,
})
export class ThsIcons111 {
  render() {
    return <Icon size="100" styles={{}} color={'blue'} svgData={IconSvg} rotate={120} spin={true}></Icon>;
  }
}
