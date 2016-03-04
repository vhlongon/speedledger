import loadAjax from './helpers/ajax';
import Handlebars from 'handlebars';
import {loadHandlebarsHelpers} from './helpers/handlebars-helpers';

// By using arrow function we are able to pass parameters to the class
// I use it here to send options from the instance and merge with defaults on the class
export default (options) => class Component {
  constructor() {
    const defaults = {
      dataUrl: 'data/data.json',
      templateRoot: '',
      templateEl: ''
    };
    this.settings = Object.assign(defaults, options);
  }

  loadData() {
    loadAjax(this.settings.dataUrl,
      (xhr) => {
        let data = JSON.parse(xhr.responseText);
        this.buildTemplate(data);
      }
    );
  }

  buildTemplate(data) {
    loadHandlebarsHelpers();

    let templateElement = document.querySelectorAll(this.settings.templateElement),
      source = document.getElementById(this.settings.templateRoot).innerHTML,
      template = Handlebars.compile(source),
      context = this.groupBy(data, this.settings.sortBy),
      html    = template(context);
    templateElement[0].innerHTML = html;

    this.bindEvents();
  }

  groupBy(data, property) {
    //convert Json data object to array
    return data.reduce(function groupBy(memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      memo[x[property]].type = x[property];

      return memo;
    }, {});
  }

  bindEvents() {
    let rows = document.querySelectorAll('.component__item-list-row');
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener('click', function onClick(e) {
        e.target.classList.toggle('toggled');
      });
    }
  }

  init() {
    this.loadData();

  }
};
