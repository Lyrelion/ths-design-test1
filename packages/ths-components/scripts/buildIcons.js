/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Description: 将 ths-icons 库中导出的所有图标数据转化为 Icon 组件模板，并将其输出到指定的目录中
 * @Author: Lyrelion
 * @Date: 2023-03-26 13:25:58
 * @LastEditTime: 2023-03-26 14:56:19
 * @FilePath: \ths-design-test1\packages\ths-components\scripts\buildIcons.js
 */

// 解析路径
const { resolve } = require('path');
// 文件操作
const fs = require('fs');
// 代码格式化
const prettier = require('prettier');

// 从 ths-icons 库中导入的所有图标数据（已经转换为 JSON 了）
const icons = require('@ths-design/icons');
// 用于转化模板的辅助函数 —— Icon 组件通用模板
const transformTemp = require('./iconTemp').transformTemp;
// 用于转化模板的辅助函数 —— 把所有的 Icon 组件整合到一个大组件中
const transformCom = require('./iconsComTemp').transformTempCom;

// 输出目录的路径
const outDir = resolve(__dirname, '../src/components/icons');
const outDirIcons = resolve(__dirname, '../src/components/ths-icons');
// prettier 的配置文件
const prettierConfig = require(resolve(__dirname, '../.prettierrc.json'));

/**
 * 构建操作
 */
async function build() {
  // 清空输出目录
  fs.rmdirSync(outDir, { recursive: true });
  fs.mkdirSync(outDir);

  // console.log('const icons = require("@ths-design/icons"); ---', icons);
  
  // 遍历 icons 数据
  if (icons && Object.keys(icons).length) {
    Object.keys(icons).forEach(key => {
      // console.log(key);
      
      // 组装文件名称
      const jsonFileName = `ths-icon-${icons[key]._name}.tsx`;
      // 加上模板，动态生成组件
      let temp = transformTemp(icons[key], key);
      // 格式化代码
      const formattedCode = prettier.format(temp, prettierConfig);
      // 写入文件
      fs.writeFileSync(resolve(outDir, jsonFileName), formattedCode, 'utf-8');
    });

    // 把所有的 Icon 组件整合到一个大组件中
    let iconsTemp = transformCom(Object.keys(icons), icons);
    const formattedCodeCom = prettier.format(iconsTemp, prettierConfig);
    fs.writeFileSync(resolve(outDirIcons, 'ths-icons.tsx'), formattedCodeCom, 'utf-8');
  }
}

build();
