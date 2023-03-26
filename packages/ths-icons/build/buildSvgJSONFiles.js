/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description: 将 svg 文件转换为 JSON 格式并输出
 * @Author: Lyrelion
 * @Date: 2023-03-26 09:16:18
 * @LastEditTime: 2023-03-26 11:10:54
 * @FilePath: \ths-design-test1\packages\ths-icons\build\buildSvgJSONFiles.js
 */

// 处理文件路径
const { resolve, basename, extname } = require('path');
// 读取和写入文件
const fs = require('fs');

// 优化 svg 图像，统一 svg 格式（比如将 svg 改成根据传入的颜色控制颜色 fill="currentColor"）
const { optimize } = require('svgo');
// 将 SVG 图像转换为 JSON 格式
const svgson = require('svgson');

// 将字符串转换为驼峰命名法
// import camelCase from 'camelcase';
const camelCase = require('camelcase');
// 美化代码格式
const prettier = require('prettier');

// 声明文件夹路径（存放 svg 源文件的文件夹，两种类型产物的文件夹）
const entryDir = resolve(__dirname, '../svgs');
const outDir = resolve(__dirname, '../icons');
const outDirEsm = resolve(__dirname, '../icons_esm');

// svgo 的插件系统，可以进行格式化选项的配置
// 经过格式化的处理，就可以把一些颜色信息，统一处理为根据当前 svg 标签外层的颜色信息变化
const svgoPlugins = [
  {
    name: 'convertColors',
    params: { currentColor: /^(?!url|none)./ },
  },
  {
    name: 'cleanupListOfValues',
    active: true,
  },
  {
    name: 'removeStyleElement',
    active: true,
  },
  {
    name: 'removeViewBox',
    active: false,
  },
  {
    name: 'removeDimensions',
    active: true,
  },
];

/**
 * 使用 svgson 把 svg 文件格式化为 object key-value 的形式
 * @param {*} svgString svg 文件内容
 * @param {*} svgFileName  svg 文件名
 * @returns 
 */
const transSvg = (svgString, svgFileName) => {
  return new Promise((resolve, reject) => {
    try {
      const result = optimize(svgString, {
        plugins: svgoPlugins,
      });
      // console.log(result.data)

      // 如果是 xxx.svg 结尾，则为普通 svg，需要格式化颜色
      // 如果是以 xxx-c.svg 结尾，就直接输出，不格式化颜色
      const formatSvgJsonData = svgson.parseSync(svgFileName.slice(-2) === '-c' ? svgString : result.data);
      resolve(formatSvgJsonData);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * 这一步是为了每次编译后所有产物都是最新，以免上次残留文件影响此次的编译
 * @param {*} entryDir 存放 svg 文件夹
 * @param {*} outDir 输出 cjs 组件文件夹
 * @param {*} outDirEsm 输出 esm 组件文件夹
 * @param {*} prefix 图标前缀
 * @param {*} suffix 图标后缀
 */
async function build(entryDir, outDir, outDirEsm, prefix, suffix) {
  // Build 流程开始
  // 清空产物（icons、icons_esm） 文件夹，这一步是为了每次编译后所有产物都是最新，以免上次残留文件影响此次的编译
  fs.rmdirSync(outDir, { recursive: true });
  fs.rmdirSync(outDirEsm, { recursive: true });
  fs.mkdirSync(outDirEsm);
  fs.mkdirSync(outDir);

  const prettierConfig = require(resolve(__dirname, '../../../.prettierrc.js'));

  const indexFileName = 'index.js';

  // 读取 svg 文件夹下的文件，转译成 React 组件，并输出
  const files = fs.readdirSync(entryDir, 'utf-8');

  // 定义一个数组 batches，其中包含了符合条件的 SVG 文件列表，也就是后缀为 svg 的文件
  const batches = files
    .filter((f) => extname(f) === '.svg')
    .map(async (file) => {
      try {
        // 使用 map 方法对每个 SVG 文件进行异步处理
        // console.log('打印 svg 文件 ---', file)

        /**
         * -------------------- 整合并输出文件 --------------------
         * 将 SVG 文件转换为 JSON 格式，并将其输出到指定目录中，以便在代码中使用
         * 同时，还将 JSON 对象转换为 CommonJS 和 ES6 的模块输出形式，以满足不同的代码使用场景
         */
        // 使用 Node.js 内置模块 path 的 basename 方法，获取 SVG 文件名（不包含扩展名）
        const svgFileName = basename(file, '.svg');
        // 根据 SVG 文件名，生成对应的组件名
        const componentName = `${prefix}${camelCase(svgFileName, { pascalCase: true })}${suffix}`;
        // 定义输出的 js 文件名称
        const jsonFileName = `${componentName}.js`;
        // 使用 Node.js 内置模块 fs 的 readFileSync 方法，读取 SVG 文件内容
        const svgContent = fs.readFileSync(resolve(entryDir, file), 'utf-8');
        // 将 SVG 文件内容转换为 JSON 格式
        let JSONCode = await transSvg(svgContent, svgFileName);
        JSONCode._name = svgFileName;

        // cjs
        // 将 JSON 对象转换为字符串，并定义为 CommonJS 的模块输出形式
        let _JSONCode = `exports.default = ${JSON.stringify(JSONCode)}`;
        const formattedCode = prettier.format(_JSONCode, prettierConfig);
        // 使用 Node.js 内置模块 fs 的 writeFileSync 方法，将处理后的 JSON 字符串写入文件系统中
        fs.writeFileSync(resolve(outDir, jsonFileName), formattedCode, 'utf-8');

        // esm
        // 将 JSON 对象转换为字符串，并定义为 ES6 的模块输出形式
        let _JSONCode_esm = `export default ${JSON.stringify(JSONCode)}`;
        const formattedCode_esm = prettier.format(_JSONCode_esm, prettierConfig);
        // 使用 Node.js 内置模块 fs 的 writeFileSync 方法，将处理后的 JSON 字符串写入文件系统中
        fs.writeFileSync(resolve(outDirEsm, jsonFileName), formattedCode_esm, 'utf-8');

        // 将文件名和组件名作为一个对象返回
        return { fileName: jsonFileName, componentName };
      } catch (error) {
        console.error('整合并输出文件时，发生了错误 ---', error);
        throw error;
      }
    });

  const arr = await Promise.all(batches);

  /**
   * -------------- 生成 index.js 入口文件 --------------
   * -------------- 实现在项目中 通过 require 或 import 引用转换后的 SVG 组件 --------------
   */

  // cjs
  // 使用 arr 数组中的组件名生成 CommonJS 的模块输出形式，保存到 indexFileContent 变量中
  // 使用 Node.js 内置模块 fs 的 writeFileSync 方法，将生成的 CommonJS 模块输出形式写入文件系统中，并在文件开头加上一个注释以禁用 TypeScript 中的 require 引入校验
  const indexFileContent = arr
    .map((a) => `exports.${a.componentName} = require('./${a.componentName}').default;`)
    .join('\n');
  fs.writeFileSync(
    resolve(outDir, indexFileName),
    '/* eslint-disable @typescript-eslint/no-var-requires */' + '\n' + indexFileContent + '\n',
    'utf-8',
  );

  // esm
  // 使用 arr 数组中的组件名生成 ES6 的模块输出形式，保存到 indexFileContent_esm 变量中
  const indexFileContent_esm = arr
    .map((a) => `export { default as ${a.componentName} } from './${a.componentName}';`)
    .join('\n');
  fs.writeFileSync(resolve(outDirEsm, indexFileName), indexFileContent_esm + '\n', 'utf-8');

  return arr;
}

build(entryDir, outDir, outDirEsm, 'ths', '');
