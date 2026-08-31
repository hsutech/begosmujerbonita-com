export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/sitemap.xml": "sitemap.xml" });

  eleventyConfig.addTransform("static-audit-fixes", function(content) {
    if (!this.page.outputPath?.endsWith(".html") || content.includes("/assets/static-audit-fixes.css")) {
      return content;
    }
    return content.replace(
      "</head>",
      '  <link rel="stylesheet" href="/assets/static-audit-fixes.css">\n</head>'
    );
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
