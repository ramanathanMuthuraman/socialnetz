Handlebars.registerHelper('val', function(actions) {
  return actions[0].link;
});