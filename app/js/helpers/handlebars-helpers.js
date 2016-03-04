import Handlebars from 'handlebars';

function loadHandlebarsHelpers() {
  // The module to be exported containing the helpers
  // add extra helpers as function properties here
  let helpers = {

    // Math helpers
    // hashValue is hash.XX on the function declaration
    // usage {{name variable hashValue=variable}}
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
    },

    // compare if variable has specific value, not only default true/false check
    // usage: {{#ifvalue variable value="some value"}}
    //          match the value
    //        {{else}}does not match value
    //      {{/ifvalue}}
    ifvalue: function ifvalue(conditional, options) {
      return options.hash.value === conditional ? options.fn(this) : options.inverse(this);
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
