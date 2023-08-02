const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("graphs");
  eleventyConfig.addPassthroughCopy("imgs");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor));
  
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};