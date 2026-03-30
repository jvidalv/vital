<p align='center'>
  <img src='https://i.imgur.com/KVmyXyo.png' alt='Vital - Vite Starter Template' width='600'/>
</p>

<p align='center'>
Mocking up web app with <b>Vital</b><sup><em>(speed)</em></sup><br>
</p>

<br>

<p align='center'>
<a href="https://vital.josepvidal.dev">Live Demo</a>
</p>

<br>

## Features

- ⚡️ [Vite 7](https://vitejs.dev/) - Next generation frontend tooling
- ⚛️ [React 19](https://react.dev/) - Latest version with improved performance
- 🦾 [TypeScript 5.9](https://www.typescriptlang.org/) - Strongly typed JavaScript
- 🎨 [Tailwind CSS v4](https://tailwindcss.com/) - Latest utility-first CSS framework with CSS-based config
- 👑 [Atomic Design organization](https://bradfrost.com/blog/post/atomic-web-design/) - Component architecture
- 🗂 [Path aliases](https://github.com/vitejs/vite/issues/88#issuecomment-762415200) - Clean imports
- 😃 [Hero Icons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- 🤖 **LLM-ready** - Comprehensive AI assistance docs ([CLAUDE.md](CLAUDE.md), [AGENTS.md](AGENTS.md), [BUGBOT.md](BUGBOT.md))
- ☁️ Deploy on Netlify or Vercel, zero-config

### Code Quality

- [ESLint 9](https://eslint.org/) - Find and fix problems in JavaScript/TypeScript
- [Prettier 3](https://prettier.io/) - Opinionated code formatter
- [Commitlint](https://commitlint.js.org/) - Lint commit messages
- [lint-staged](https://github.com/okonet/lint-staged) - Run linters on git staged files

### Dev Tools

- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Official React plugin for Vite
- [PostCSS](https://postcss.org/) - Transform CSS with JavaScript
- [Netlify](https://www.netlify.com/) / [Vercel](https://vercel.com/) - Zero-config deployment

## Try it now!

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/jvidalv/vital/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit jvidalv/vital my-vital-app
cd my-vital-app
yarn # If you don't have yarn installed, run: npm install -g yarn
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Rename `name` and `author` fields in `package.json`
- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `index.html`
- [ ] Change the favicon in `public`
- [ ] Modify the manifest in `public`
- [ ] Clean up the README's

And, enjoy :)

## Usage

### Development

Just run and visit http://127.0.0.1:3000/

```bash
yarn dev
```

### Build

To build the App, run

```bash
yarn build
```

And you will see the generated file in `dist` that ready to be served.

## Deployment

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your repository, `OK` along the way, and your App will be live in a minute.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jvidalv/vital)

### Deploy on Vercel

Go to [Vercel](https://vercel.com/new) and select your repository, Vercel will detect Vite automatically and configure the build settings for you. Your App will be live in a minute.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jvidalv/vital)

**Note:** Both platforms automatically detect Vite projects and configure:
- **Build Command**: `yarn build`
- **Output Directory**: `dist`
- **Install Command**: `yarn install`

## Why

I have created several React apps recently. Setting the configs up is kinda the bottleneck for me to make the ideas simply come true within a very short time.

So I made this starter template for myself to create apps more easily, along with some good practices that I have learned from making those apps. Feel free to tweak it or even maintains your own forks.
