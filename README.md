# Mapping the routes

## Run this project
1. Clone [this repo](https://github.com/Roytangrb/mapping-the-routes) to local
2. `npm install`
3. `npm run dev`

## Scripts
* `npm run dev`: start the webpack dev server for dev purpose, auto refresh on code changes. Configured by `webpack.dev.js`
* `npm run build`: build dist for gh-pages deploy and cpanel deploy. Configured by `webpack.prod.js`
* `npm run publish`: deploy to gh-pages, rmb to build first
* `npm run zip`: zip dist bundles

## Configs
* webpack dev server serves at `src/public`
* assets are hosted in `src/public/assets`, use relative path for static assets requests

## Main libraries 
* [GSAP](https://greensock.com/docs/) - Animating SVG, used currently in routes maps, tgt with ScrollMagic to bind animation timeline to user scroll events.
* [ScrollMagic](http://scrollmagic.io/examples/) - Controlling scroll events related interactions, used currently in progress bar, routes map, viewport position detect, seizure map autoplay controll
* [D3.js](https://d3js.org/) - Creating SVG based visuals, used in the seizure map

## Design
 - [shared drive](https://drive.google.com/drive/folders/1TCcus6bVJ_tnKkQ3XWVcAn6VjytE8che)
 - [Zeplin Design](https://app.zeplin.io/project/5c3479e2047c0bbf21929c9f)
 - [fonts](https://fonts.google.com/selection?selection.family=Open+Sans|ZCOOL+XiaoWei&query=open+san)
 - [svg files](https://drive.google.com/drive/folders/1ZEQYJhLoqei248FvjjZL_a3qSUpz4Hj6)