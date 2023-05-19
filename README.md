# capo.js
_Get your `<head>` in order_

Inspired by [Harry Roberts](https://twitter.com/csswizardry)' work on [ct.js](https://csswizardry.com/ct/) and [Vitaly Friedman](https://twitter.com/smashingmag)'s [Nordic.js 2022 presentation](https://youtu.be/uqLl-Yew2o8?t=2873):

![](order.png)

## Why it matters

How you order elements in the `<head>` can have an effect on the (perceived) performance of the page.

This script helps you identify which elements are out of order.

## Summary view

The script logs two info groups to the console: the actual order of the `<head>`, and the prioritized order. In this collapsed view, you can see at a glance whether there are any high priority elements out of order.

Each priority has a corresponding color, with red being the highest and blue/grey being the lowest. See [capo.js](https://github.com/rviscomi/capo.js/blob/main/capo.js#L1-L13) for the exact mapping.

Here are a few examples.

### www.nytimes.com

<img width="1314" alt="image" src="https://github.com/rviscomi/capo.js/assets/1120896/5c19e758-9f88-42c1-81e8-9f757a6c92be">

### docs.github.io

<img width="819" alt="image" src="https://github.com/rviscomi/capo.js/assets/1120896/798a0e99-04dd-4d27-a241-b5d77320a46e">

### web.dev

<img width="842" alt="image" src="https://github.com/rviscomi/capo.js/assets/1120896/fe6bb67c-697a-4fdf-aa28-52429239fcf5">

## Detailed view

Expanding the actual or priority views reveals the detailed view. This includes an itemized list of each `<head>` element and its priority as well as a reference to the actual or prioritized `<head>` element.

### www.nytimes.com

Here you can see a drilled-down view of the end of the `<head>` for the NYT site, where high priority origin trial meta elements are set too late.

<img width="472" alt="image" src="https://github.com/rviscomi/capo.js/assets/1120896/c0342d54-9e23-4b91-8df1-277c251ee0c5">
