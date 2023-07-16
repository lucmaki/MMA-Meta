module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("graphs");
  eleventyConfig.addPassthroughCopy("imgs");
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};