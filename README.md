# SlothImage

SlothImage is a lightweight javascript library which is developed to help developers serve two major purposes:

- Image Lazy Load: Lazy Loading of Images to improve pagespeed aka First contentful paint.
- Optimize Images: Display Images as per device resolution which means mobile devices will ONLY render mobile images and vice versa.

SlothImage will enable developers to have extremely light-weight pages which inturn improve SEO of the website.

![Dashboard](https://github.com/alimansoor/slothImage/blob/master/brand.png)

### Prerequisites

[Node.js](https://nodejs.org/en/) use to run the application and manages application's dependencies using npm. It also serves as the run-time environment.

[ECMAScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is required to run the code.

## Getting Started

### HTML

In order to lazy load images ONLY, define images using `img` tags and place your image url inside `data-src` attribute and NOT inside `src`

```
<img data-src="url-to-image" src="" />
```

You can define `src` attribute above with a low resolution image to give your page a nice look and feel.

### JavaScript

The easiest way to use SlothImage is to include the script:

```
<script src="slothImage.min.js"></script>

<script>
slothInit({});
</script>
```

That's it!

## ADVANCED - Image Optimization per Resolution

In order to lazy load images and optimize them based on resolutions (mobile and desktop), define your images using `img` tags and place your image url inside `data-src` attribute and NOT inside `src`.

### HTML

Define both desktop and mobile version of your images using selector classes:

```
<img src="" class="_desktop-view" data-src="url-to-high-resolution-desktop-image"  />
<img src="" class="_mobile-view" data-src="url-to-low-resolution-mobile-image"  />
```

In the above example, you can define your images with different versions for both desktop and mobile and SlothImage will render it based on resolutions.

## JavaScript

In order to lazy load images and optimize them based on resolutions, you need to define a breakpoint, desktop and mobile selectors in your javascript code:

```
<script>
slothInit({
   break_point: 767, // breakpoint between desktop and mobile resolution
   selector_desktop: '_desktop-view',
   selector_mobile: '_mobile-view',
   threshold: 300 // threshold is the amount of space which is outside the viewport

});
</script>
```

## Download

SlothImage is a free lightweight library that will help users lazy load images across the entire website and also optimize images across different resolutions e.g. mobile and desktop.

You can download the project from the below options available:

- [Download SlothImage](https://github.com/alimansoor/slothImage/archive/master.zip)
- Clone the repo: `https://github.com/alimansoor/slothImage.git`
- Install with npm: `npm install`

### TODO

- Include more resolutions - desktop, tablet, mobile
- Include Units - em, rem, pt, px

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Creator

**Muhammad Ali Mansoor**

- <https://www.linkedin.com/in/muhammad-mansoor-70857239/>
- <https://github.com/alimansoor>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- OMCSS <https://www.npmjs.com/package/omcss>
- MetaWeather <https://www.metaweather.com/>
