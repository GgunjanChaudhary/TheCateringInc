// This file exports an array of hero image filenames for the homepage hero section.
// To update hero images, simply add/remove images in the public/images/hero folder and update this list if needed.

const BASE = import.meta.env.BASE_URL || '/';

const heroImages = {
  home: [
    `${BASE}images/hero/home/Hero_1.jpg`,
    `${BASE}images/hero/home/Hero_2.jpg`,
    // `${BASE}images/hero/home/Hero_3.HEIC`, // HEIC not supported by browsers — convert to .jpg and re-add
    `${BASE}images/hero/home/Hero_4.jpg`,
    `${BASE}images/hero/home/Hero_5.jpg`,
    `${BASE}images/hero/home/Hero_6.jpg`,
  ],
  menus: [
    `${BASE}images/hero/menus/Menu1.jpg`,
    `${BASE}images/hero/menus/Menu2.jpg`,
    `${BASE}images/hero/menus/Menu3.jpg`,
    `${BASE}images/hero/menus/Menu4.jpg`,
  ],
  // Add more pages as needed, e.g.:
  // about: [`${BASE}images/hero/about/About1.jpg`],
}

export default heroImages
