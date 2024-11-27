<div align="center">

**So Simple!**

![Preview](https://i.ibb.co/0qfvTnN/image.png)  
**Minimalist, fast, morden, full-featured hexo theme**  
[![Build](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/test_and_build.yml/badge.svg)](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/test_and_build.yml) [![Format](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/format_test.yml/badge.svg)](https://github.com/Lhcfl/hexo-theme-sosimple/actions/workflows/format_test.yml)

</div>

hexo-theme-sosimple is a minimalist theme.

Live Demo: https://lhcfl.github.io/hexo-theme-sosimple/

- 📄 **Minimalist**: No fancy animations, dedicated to providing the purest page style.

- ⏱ **Super Speed**: Only 22.5 kB compressed javascript and css files, provides the fastest DOMContentLoaded speed.

- 💻 **Morden**: Use modern template language and complete type annotations to provide a better development experience, with ten-years-ahead-of-hexo technology stack.

- 😎 **Geek**: Optimized for no CSS and no JavaScript to ensure that it can be displayed normally under pure HTML. You can even just copy the entire page and paste it into a Markdown editor with the nice formatting kept :\)

- ✨ **Full Featured**: Supports automatic generating TOC, built-in full-text fuzzy search, dark/light mode switching, comments, and etc.

## Installation

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

### Structures

- `.github`: GitHub CI config file
- `languages`: I18n files
- `scripts`: Hexo scripts
- `source`: HTML assets
- `src`: Typescript and SCSS source dir.

### Formatting

After modifying the theme file, you can format it with the following command:

```bash
pnpm format
pnpm lint
```

See `package.json`
