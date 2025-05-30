# Iowa Brand Icons

## Adding new icons to Icon Browser

[Here is a tool designed to assist in this process.](https://codepen.io/purple_salmon/full/rNPBqgp)

1. Clone this repository
2. Check out a new branch. Example: `git checkout new_icons_9-13-22`
2. Place the new icons in this repository's `icons/` folder with the following naming convention and color variants:
- `(icon-name)-two-color.svg`
- `(icon-name).svg` (black one color variant)
3. Add an icon entry to `icons.json` along with keywords and the date added.

Example:

```json
{
    "name": "laundry-basket",
    "keywords":
    [
        "wash",
        "clothes",
        "clothing",
        "clean",
        "hygiene",
        "cleaner",
        "cleaning",
        "washer",
        "washing machine",
        "cleanse",
        "bottle",
        "dorm",
        "living",
        "home"
    ],
    "dateAdded": "2022-05-24"
},
```
4. Add the corresponding icon entry's name to `categories.json` in the "Recently added" category.

Example:

```json
{
    "label": "Recently added",
    "slug": "recently-added",
    "keywords": "recently-added",
    "icon": "clock",
    "icons": [
        ...
        "laundry-basket",
    ]
},
```

5. Add the icon entry's name to the proper category in `categories.json`

Example:
```json
{
    "label": "Home and Personal",
    "slug": "home-personal",
    "keywords": "home personal house clothes",
    "icon": "person-one",
    "icons": [
        ...
        "laundry-basket",
        ...
    ]
},
```

6. Commit and push your new branch.
7. Generate a PR to merge into `main`.
8. Merge into `main` and take note of the commit hash.
9. Follow the instructions in the README on the [Icon Browser repository](https://github.com/uiowa/brand-icon-browser) to continue updating the Icon Browser with the newly added icons.

## Setting up development environment

### Using the right version of node
```
nvm use
```

Follow any installation instructions given.

### Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies but skips generating the icon variants (for testing purposes)
```
npm run build-no-icons
```