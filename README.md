# Adding new icons to Icon Browser

1. Clone this repository
2. Check out a new branch. Example: `git checkout new_icons_9-13-22`
2. Place the new icons in this repository's `icons/` folder with the following naming convention and color variants:
- `(icon-name)-two-color.svg`
- `(icon-name).svg` (black one color variant)
3. Add an icon entry to `icons.json` along with keywords and the date added.

Example:

```json
[...]
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
[...]
```
4. Add the corresponding icon entry's name to `categories.json` in the "Recently added" category.

Example:

```json
[...]
{
    "label": "Recently added",
    "slug": "recently-added",
    "keywords": "recently-added",
    "icon": "clock",
    "icons": [
        [...]
        "laundry-basket",
    ]
},
[...]
```

5. Add the icon entry's name to the proper category in `categories.json`

Example:
```json
[...]
{
    "label": "Home and Personal",
    "slug": "home-personal",
    "keywords": "home personal house clothes",
    "icon": "person-one",
    "icons": [
        "laundry-basket",

    ]
},
[...]
```

6. Commit and push your new branch.
7. Generate a PR to merge into `main`.
8. Merge into `main` and take note of the commit hash.
9. Follow the instructions on the [Icon Browser repository](https://github.com/uiowa/brand-icons/blob/main/README.md) to continue updating the Icon Browser with the newly added icons.