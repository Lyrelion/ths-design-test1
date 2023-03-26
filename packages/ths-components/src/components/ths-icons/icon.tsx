/*
 * @Description: 渲染 SVG 图标组件
 * @Author: Lyrelion
 * @Date: 2023-03-20 18:16:08
 * @LastEditTime: 2023-03-26 14:32:42
 * @FilePath: \ths-design-test1\packages\ths-components\src\components\ths-icons\icon.tsx
 */

// FunctionalComponent —— 函数式组件的类型定义
// h —— 一个用于渲染 React 元素的函数
// Host —— 一个用于包裹组件的 React 元素，用于提供组件的上下文环境
import { FunctionalComponent, h, Host } from '@stencil/core';
// 用于生成 HTML 元素的 class 名称
// 它可以接受多个参数，参数可以是字符串、对象或数组
// 当参数是字符串时，它会直接返回该字符串作为类名
// 当参数是对象时，它会遍历对象的属性，将属性值为真值（即非空或非零）的属性名作为类名
// 当参数是数组时，它会将数组中的元素递归地当做参数传入，最终返回一个类名字符串
// 在 React 开发中，通常会使用 classnames 来根据组件的状态或属性动态生成类名，以便于定义相应的 CSS 样式
import classnames from 'classnames';
// 数据类型接口
import { CSSStyle } from '../../common/interface';
// 给类名添加前缀
import { getClassPrefix } from '../../utils/utils';

interface IconProps {
  // icon 尺寸 默认 20
  size: number | string;
  // styles 传入的 css 样式
  styles: object;
  // 传入的 class 名称
  classNames?: string;
  // 图标颜色
  color: string;
  // 旋转的角度
  rotate: number;
  // 是否自动旋转
  spin: boolean;
  // 需要渲染的 svg 数据
  svgData: any;
}

/**
 * 将字符串中的大写字母转换为连字符形式
 * @description 使用正则表达式 [A-Z] 匹配字符串中的大写字母
 * @description 使用 replace 方法将其替换为连字符加上对应小写字母的形式
 * @description 例如，如果传入的字符串是 myCamelCaseString，那么函数返回的结果将是 my-camel-case-string
 * @param str
 */
function hyphenate(str) {
  return (str + '').replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase();
  });
}

export const Icon: FunctionalComponent<IconProps> = props => {
  const { size, styles, classNames, color, rotate, spin, svgData } = props;
  if (!svgData) {
    return false;
  }

  /**
   * 将所有子元素的属性名转换为连字符形式
   * childs 是一个数组，其中每个元素代表一个 SVG 元素
   * @description 20230326 使用 svgson 格式化 svg 图片数据后，发现他生成的 JSON 数据里：
   * @description childs 名字 变更为 children
   * @description attrs 变更为 attributes
   */
  const _svgData = svgData.children.map(child => {
    const attributes = {};
    Object.keys(child.attributes).forEach(attrName => {
      attributes[hyphenate(attrName)] = child.attributes[attrName];
    });

    child.attributes = attributes;
    return child;
  });

  // 返回 ths-icon
  const classPrefix: string = getClassPrefix('icon');

  // 第一个参数是表示 HTML 元素的 class 名称的前缀
  // 后面的参数是表示 HTML 元素的 class 名称的字符串，可以是一个或多个
  // 还可以接受一个对象作为最后一个参数，用于设置条件 class 名称。如果该对象的属性值为 true，则表示需要添加该属性名作为 class 名称；否则不添加。例如，{ 'icon-spin': true } 就表示添加一个名为 'icon-spin' 的 class 名称
  const classes = classnames(classPrefix, classNames, `${classPrefix}-block`, { [`${classPrefix}-spin`]: spin });

  const outerStyle: CSSStyle = { color };

  /**
   * 设置一个 HTML 元素的旋转角度样式
   * Number.isSafeInteger: 用于判断数字是否是安全整数【安全整数是指在 JavaScript 中可以精确表示的整数，也就是说在 [-2^53, 2^53] 范围内的整数】
   */
  if (Number.isSafeInteger(rotate)) {
    outerStyle.transform = `rotate(${rotate}deg)`;
  }

  /**
   * 将所有 styles 对象的属性复制到 outerStyle 对象中
   * @description 关于 assign：将一个或多个对象的属性复制到目标对象中
   * @description 第一个参数是目标对象，后面的参数是一个或多个源对象
   * @description 如果目标对象中已经存在相同名称的属性，则该属性的值将被覆盖
   */
  Object.assign(outerStyle, styles);

  /**
   * 使用 Host 和 svg 元素来渲染 Icon 组件
   * Host 元素用于提供组件的上下文环境，svg 元素用于渲染 SVG 图标
   * 在 svg 元素中，使用了 outerStyle 和 classes 来设置样式和 class 名称，使用 svgData.attrs 来设置其他属性
   * 在 svg 元素的子元素中，使用了 _svgData.map() 方法来遍历所有的子元素，并根据它们的类型来渲染对应的 HTML 元素（rect、circle 或 path）
   * 最终，将所有的 HTML 元素嵌套在 svg 元素中返回
   */
  return (
    <Host style={{ display: 'flex' }}>
      <svg style={outerStyle} class={classes} {...svgData.attributes} width={size} height={size}>
        {_svgData.map(child =>
          child.name === 'rect' ? <rect {...child.attributes}></rect> : child.name === 'circle' ? <circle {...child.attributes}></circle> : <path {...child.attributes}></path>,
        )}
      </svg>
    </Host>
  );
};
