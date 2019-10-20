var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var nunjucks = require('nunjucks');
nunjucks.configure('./layouts', {watch: false})

// Import the josn data for nav links, Cafe Hours and Cafe Menu.
var navlinks = require('./data/nav.json');
var cafehours = require('./data/hours.json');
var foodmenu = require('./data/foodmenu.json');

metalsmith(__dirname)
  .metadata({
    navlinks : navlinks,
    cafehours : cafehours,
    foodmenu : foodmenu
  })
  .clean(true)
  .destination('./output')
  .use(markdown())
  .use(layouts({
    engine: "nunjucks",
    default: "base.njk",
    directory: "layouts",
    pattern: ["*", "!*.css", "!*.jpg", "!*.png"]
  }))
  .build(function (err) { if(err) console.log(err) })
