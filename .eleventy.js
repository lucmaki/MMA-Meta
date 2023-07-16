const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("graphs");
  eleventyConfig.addPassthroughCopy("imgs");
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor));
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};