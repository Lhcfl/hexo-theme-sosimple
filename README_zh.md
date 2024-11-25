<div style="text-align: center">

**So Simple!**

![Preview](https://i.ibb.co/0qfvTnN/image.png)

</div>

Live Demo: https://lhcfl.github.io/hexo-theme-sosimple/

[![Build](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/test_and_build.yml/badge.svg)](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/test_and_build.yml) [![Format](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/format_test.yml/badge.svg)](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/format_test.yml)

超级干净的，致力于尽可能少写 CSS，展现原汁原味的 HTML 风格主题。主题对于无 CSS 和无 JavaScript 做了优化，确保在纯粹的 HTML 下也可以正常显示。适合极端纯洁的HTML爱好者。

简约但现代化，功能齐全。

支持自动生成 TOC、内置全文搜索、亮色-暗色模式切换。

## Install

```bash
git clone https://github.com/Lhcfl/hexo-theme-sosimple.git themes/SoSimple
cd themes/SoSimple
pnpm i # 这这一步是必须的！
```

### 配置

复制`_config.example.yml`为`_config.yml`  
修改hexo根目录下的 `_config.yml` ： `theme: SoSimple`

### 更新

在SoSimple的目录下

```bash
git pull origin main
```

## 开发

### 准备工作

进入SoSimple的目录，执行

```bash
pnpm i
```

安装所有依赖。

### 目录结构

- `.github`: GitHub 的 CI 配置文件，用于自动部署样例
- `includes`: 主题内置的 Hexo 脚本
- `languages`: I18n 文件
- `layout` 主题使用的模板，在服务端（也就是 `hexo g`）渲染成最后的 HTML
- `scripts`: 主题内置的 Hexo 脚本
- `source`: 主题需要的HTML资产
- `src`: 主题前端相关的 typescript 脚本。这些脚本会被 `rollup` 打包并压缩成一个 `js/complied/bundle.js` 和 `bundle.css`

### 代码格式化

对本主题做出修改后，使用下面的命令可以对代码进行格式化

```bash
pnpm format
pnpm lint
```

详见 `package.json`
