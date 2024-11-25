<div style="text-align: center">

**So Simple!**

![Preview](https://i.ibb.co/0qfvTnN/image.png)

</div>

Live Demo: https://lhcfl.github.io/hexo-theme-sosimple/

[![Build](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/test_and_build.yml/badge.svg)](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/test_and_build.yml) [![Format](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/format_test.yml/badge.svg)](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/format_test.yml) [中文](./README_zh.md)

Super clean theme, aiming to write as little CSS as possible and show the original HTML style. The theme is optimized for no CSS and no JavaScript to ensure that it can be displayed normally under pure HTML. You can even just copy the entire page and paste it into a Markdown editor with the nice formatting kept :\).

Simple but modern, full-featured. Supports automatic generating TOC, built-in full-text fuzzy search, dark/light mode switching etc.

## Install

```bash
git clone https://github.com/Lhcfl/hexo-theme-sosimple.git themes/SoSimple
cd themes/SoSimple
pnpm i # You must do this
```

### Configuration

copy `_config.example.yml` to `_config.yml` and edit it.

Change your hexo config: `theme: SoSimple`

### Update

```bash
git pull origin main
```

## Development

- `.github`: GitHub CI config file
- `includes`: Hexo scripts
- `languages`: I18n files
- `layout`: Pug templates, will render to HTML
- `scripts`: Hexo scripts
- `source`: HTML assets
- `src`: Typescript and SCSS source dir. It will `rollup` into `js/complied/bundle.js` and `bundle.css`

### Formatting

After modifying the theme file, you can format it with the following command:

```bash
pnpm format
pnpm lint
```

See `package.json`
