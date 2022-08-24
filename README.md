# Adding an icon to the Brand Icon Browser

1. Clone this repository
2. In this repository's `icons/` folder, place the following variants and formats, with the following naming convention:
- `(icon-name)-two-color.svg`
- `(icon-name).svg` (black variant)
3. Add the icon entry to `icons.json` (can be at the bottom, doesn't have to be added in alphabetically, the Brand Icon Browser will sort these automatically) along with keywords (see Keywords Guide for more information) and the date added.

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
4. Add 

