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
    console.log(context);
    this.bindEvents();
  }

  groupBy(data, property) {
    // convert Json data object to array using reduce
    // first parameter is a reducer
      // acc - accumulator - first argument on a reducer function returns
      // the result (object, array, etc) from the latest iteration
      // item - current item of the array being reduced
    // second argument is the initial value - in this case an empty object
    return data.reduce(function groupBy(acc, item) {
      // if the accumulator object does not contain a object that
      // contains the property we are are looking for
      // we create an item on the acc and set the property on in to an empty array
      // to hold other objects that share the same property
      if (!acc[item[property]]) {
        acc[item[property]] = [];
      }
      // here we push the item the property with a certain value with other objects that also
      // share the same value and create a type property and set it to the value of the
      // property we are grouping the objects by, so it is easy to sort them later on
      acc[item[property]].push(item);
      acc[item[property]].type = item[property];

      return acc;
    }, {});
  }

  bindEvents() {
    let rows = document.querySelectorAll('.component__item-list-row');
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
