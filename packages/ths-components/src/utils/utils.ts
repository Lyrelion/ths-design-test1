/*
 * @Description: 工具函数
 * @Author: Lyrelion
 * @Date: 2023-03-18 10:32:03
 * @LastEditTime: 2023-03-25 10:34:33
 */

/**
 * 匹配字符串中的冒号、连字符和下划线等特殊字符，并将其后面的字符转换为大写字母形式
 * 例如，background-color 转换为 backgroundColor
 */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

/**
 * 匹配以 moz 开头的字符串，并将 moz 后面的第一个大写字母转换为小写字母形式
 * 用于处理 Firefox 浏览器的私有 CSS 属性前缀
 * 例如，MozBoxSizing 转换为 mozBoxSizing
 */
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * stencil 框架自带的测试方法，可忽略
 * @param first
 * @param middle
 * @param last
 */
export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

/**
 * 给类名添加前缀
 * @param suffix 需要添加前缀的类名
 */
export function getClassPrefix(suffix: string): string {
  return suffix ? `ths-${suffix}` : 'ths';
}

/**
 * 判断一个元素是否具有滚动属性
 * @param el 要判断的元素
 * @param vertical boolean 是否垂直方向滚动
 */
const isScroll = (el: HTMLElement, vertical: boolean) => {
  // 根据 vertical 参数的值，获取元素的 overflow-y 或 overflow-x 样式属性值，或者获取元素的 overflow 样式属性值
  const determinedDirection = vertical !== null && vertical !== undefined;
  const overflow = determinedDirection ? (vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x')) : getStyle(el, 'overflow');

  // 如果样式属性值中包含 scroll、auto 或 overlay 字符串，则认为元素具有滚动属性，返回 true，否则返回 false
  return overflow.match(/(scroll|auto|overlay)/);
};

/**
 * 将一个字符串转换为 驼峰命名法 的形式
 * @description 用正则表达式 SPECIAL_CHARS_REGEXP 将字符串中的特殊字符转换为大写字母形式
 * @description 用正则表达式 MOZ_HACK_REGEXP 将以 moz 开头的字符串转换为 Moz 开头的形式
 * @param name
 * @returns
 */
export const camelCase = function (name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_: any, _separator: any, letter: string, offset: any) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/**
 * 将一个字符串转换为 中横线命名法（kebab-case） 的形式
 * @param {string} str
 */
export const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

/**
 * 获取一个元素的滚动容器（即父元素中第一个具有滚动属性的元素）
 * @param el 要获取滚动容器的元素
 * @param vertical 可选参数，指定滚动条是否为纵向
 */
export const getScrollContainer = (el: HTMLElement, vertical?: string) => {
  let parent: HTMLElement = el;
  // 遍历 el 的父元素，检查每个父元素是否具有滚动属性
  while (parent) {
    // 找到根元素（即 window、document 或 document.documentElement）
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    // 找到具有滚动属性的父元素
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }

  return parent;
};

/**
 * 获取一个元素的样式值并返回
 * @param element 要获取样式的元素
 * @param styleName 要获取的样式属性名
 */
export const getStyle = (element: HTMLElement, styleName: string) => {
  if (!element || !styleName) return null;
  // 讲样式转换为 驼峰命名法 的格式
  styleName = camelCase(styleName);

  // 如果样式属性名为 float，则将其转换为 cssFloat，因为在 JavaScript 中不能使用 float 作为属性名
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    // 检查元素的内联样式、计算样式表中，是否存在该样式属性
    const computed = document.defaultView.getComputedStyle(element, '');
    // 返回该属性的值。如果元素不存在或样式属性名为空，则返回 null
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/**
 * 设置 HTML 元素样式
 * @param element HTML 元素
 * @param styleName 样式名称
 * @param value 值
 */
export function setStyle(element: HTMLElement, styleName: any, value: any) {
  if (!element || !styleName) return;

  // 如果样式名称是一个对象
  if (typeof styleName === 'object') {
    // 则会递归地调用自己来设置每个属性
    for (const prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    // 将样式名称转换为驼峰式
    styleName = camelCase(styleName);
    if (styleName === 'opacity') {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      // 根据不同的样式名称设置不同的属性值
      element.style[styleName] = value;
    }
  }
}

/**
 * 检查 HTML 元素是否在指定容器中显示
 * @description 计算它们的位置和大小，然后比较它们的位置关系来判断元素是否在容器中显示
 * @param el 要被检查的元素
 * @param container 容器元素
 * @returns
 */
export const isInContainer = (el: HTMLElement, container: HTMLElement): boolean => {
  if (!el || !container) return false;

  const elRect: DOMRect = el.getBoundingClientRect();
  let containerRect: any;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};

/**
 * 检查一个变量是否是字符串、数字、函数或数组类型
 * @param obj 被检查的变量
 * @returns 
 */
export const isString = obj => typeof obj === 'string';
export const isNumber = obj => typeof obj === 'number';
export const isFunction = obj => typeof obj === 'function';
export const isArray = obj => Array.isArray(obj);

/**
 * 使用 requestAnimationFrame 实现的定时器函数，用法同 window.setInterval
 * @description 每隔指定的时间间隔执行一次回调方法，并将一个 clearTimer 方法作为参数传递给回调方法，以便在回调方法中可以停止定时器
 * @param callback 同 window.setInterval 的回调方法一样
 * @param interval 同 window.setInterval 的间隔时间一样，单位ms
 * @returns clearTimer 的方法，执行即可停止计时
 */
export const lhSetInterval = (callback: (clearTimer: () => void) => void, interval: number) => {
  let timer = null;
  let startTime = Date.now();
  const loop = () => {
    let endTime = Date.now();
    if (endTime - startTime >= interval) {
      startTime = endTime = Date.now();
      callback(() => {
        window.cancelAnimationFrame(timer);
      });
    }
    timer = window.requestAnimationFrame(loop);
  };
  loop();
  return timer;
};

/**
 * 延时函数
 * @param milliseconds 延时时长 ms
 * @returns 返回一个 Promise 对象，等待指定时间后 resolve
 */
export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * TODO: 过滤 HTML 的函数
 * @description 接受一个字符串作为参数，返回一个过滤后的字符串
 * @param str 
 */
export const filterHtmlXSS = str => str;
