/**
 * Sloth Image
 * Version: 1.0
 * Description: Image Lazy Load and Resolution Optimization Library
 * Author: Muhammad Ali Mansoor <muhammad.mansoor@live.com>
 * License: MIT
 */

try {
  /* SET OF IMAGES IN DESKTOP OR MOBILE VIEW */
  var images = [];
  var selector_desktop = "";
  var selector_mobile = "";

  var threshold = 300;

  function sanitizeSelector(selector) {
    var selector = selector.trim();
    var first_character = selector.charAt(0);
    if (first_character !== "." && selector.length) {
      // CHECK IF FIRST CHARACTER IS NOT '.' AND CHECK IF PROVIDED SELECTOR IS NOT EMPTY
      selector = "." + selector;
    }
    return (selector = selector !== "." ? selector : "");
  }

  /**
   * Return true/false if provided DOM Element is inside the browser's viewport
   *
   * @param {object} elem - DOM Element e.g. image, iframe
   * @param {Number} threshold - A number value of width e.g. 1920.
   * @returns {Boolean} - true/false
   */
  function isElementInViewport(elem, threshold) {
    var rect = elem.getBoundingClientRect();
    return (
      rect.top >= 0 - threshold &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
      threshold &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Return true/false based on whether DOM Element is HIDDEN OR NOT
   *
   * @param {object} elem - DOM Element e.g. image, iframe
   * @returns {Boolean} - true/false
   */
  function isElementVisible(elem) {
    if (elem.offsetWidth === 0 && elem.offsetHeight === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Unregister Event Listener when all images get rendered on the screen
   *
   */
  function unregisterEvent() {
    var complete = document.querySelectorAll("._img-loaded"); // Get rendered images

    if (complete.length === images.length) {
      // If rendered images === total images
      console.log("Sloth Image Complete - Event Unregister");
      window.removeEventListener("scroll", slothImg);
    }
  }

  /**
   * LAZY/SLOTH LOAD Image(s) which are Inside Browser's Viewport :)
   *
   */
  function slothImg() {
    images.forEach((image) => {
      if (isElementInViewport(image, threshold)) {
        image.src = image.dataset.src || image.src;
        image.onload = () => image.classList.add("_img-loaded");
      }
    });

    unregisterEvent(); // unregister when complete
  }

  /**
   * 1. Set Media Query,
   * 2. Get all images based on view (Desktop/Mobile)
   * 3. Run slothImage() - LAZY LOAD IMAGES BASED ON VIEW
   * 4. Bind slothImg to scroll event
   *
   * @param {object} mql - Media Query
   *
   */
  function setMedia(mql) {
    if (mql.matches) {
      // IF QUERY MACTHES
      console.log("View=Mobile");
      if (selector_desktop) {
        // GET ALL IMAGES WHICH DO NOT CONTAIN DESKTOP SELECTOR
        images = document.querySelectorAll("img:not(" + selector_desktop + ")"); // GET ALL IMAGES WITH NO DESKTOP SELECTOR
      } else {
        images = document.querySelectorAll("img"); // GET ALL ELEMENTS WITH IMG TAG
      }
    } else {
      console.log("View=Desktop");
      if (selector_mobile) {
        // GET ALL IMAGES WHICH DO NOT CONTAIN MOBILE SELECTOR
        images = document.querySelectorAll("img:not(" + selector_mobile + ")"); // GET ALL IMAGES WITH NO DESKTOP SELECTOR
      } else {
        images = document.querySelectorAll("img"); // GET ALL ELEMENTS WITH IMG TAG
      }
    }
    slothImg(); // Run sloth image function
    window.addEventListener("scroll", slothImg); // Bind scroll event with sloth image function
  }

  function slothInit(obj = {}) {
    images = document.querySelectorAll("img"); // GET ALL ELEMENTS WITH IMG TAG

    if (!images.length) {
      // EXIT FUNCTION IF NO IMAGE IS FOUND
      return;
    }

    // Breakpoint between Mobile and Desktop
    var break_point =
      obj.hasOwnProperty("break_point") &&
      typeof obj["break_point"] === "number" ?
      Math.abs(obj["break_point"]) :
      0;

    // Mobile and Desktop Selectors
    selector_desktop =
      obj.hasOwnProperty("selector_desktop") &&
      typeof obj["selector_desktop"] === "string" ?
      sanitizeSelector(obj["selector_desktop"]) :
      "";
    selector_mobile =
      obj.hasOwnProperty("selector_mobile") &&
      typeof obj["selector_mobile"] === "string" ?
      sanitizeSelector(obj["selector_mobile"]) :
      "";

    // Threshold is the amount of space which is outside the viewport. It is to display images which are not complete visible inside the viewport
    threshold =
      obj.hasOwnProperty("threshold") && typeof obj["threshold"] === "number" ?
      Math.abs(obj["threshold"]) :
      300;

    if (break_point && (selector_desktop || selector_mobile)) {
      var mql = window.matchMedia(
        "screen and (max-device-width: " + break_point + "px)"
      );
      setMedia(mql); // CALL LISTENER EXPLICITLY AT RUNTIME
      mql.addListener(setMedia); // ATTACH LISTENER AT STATE CHANGE
    } else {
      // LAZY LOAD IMAGES ONLY
      slothImg();
      window.addEventListener("scroll", slothImg);
    }
  }
} catch (error) {
  console.error("sloth image library has recorded an error", error);
}