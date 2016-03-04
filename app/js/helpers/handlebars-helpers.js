import Handlebars from 'handlebars';

function loadHandlebarsHelpers() {
  // The module to be exported
  let helpers = {

    add: function add(context, options) {
      return context + parseFloat(options.hash.to);
    },

    subtract: function subtract(context, options) {
      return context - parseFloat(options.hash.minus);
    },

    divide: function divide(context, options) {
      return context / parseFloat(options.hash.by);
    },

    multiply: function multiply(context, options) {
      return context / parseFloat(options.hash.times);
    },

    floor: function floor(context) {
      return Math.floor(value);
    },

    ceil: function ceil(value) {
      return Math.ceil(context);
    },

    round: function round(context) {
      return Math.round(context);
    }
  };

  function registerHelpers() {
    for (let helper in helpers) {
      if (helpers.hasOwnProperty(helper)) {
        Handlebars.registerHelper(helper, helpers[helper]);
      }
    }
  }

  registerHelpers();
}

export {loadHandlebarsHelpers};
