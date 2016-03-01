import loadAjax from './ajax';
import Handlebars from 'handlebars';

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
    let templateElement = document.querySelectorAll(this.settings.templateElement),
      source = document.getElementById(this.settings.templateRoot).innerHTML,
      template = Handlebars.compile(source),
      context = data,
      html    = template(context);

    templateElement[0].innerHTML = html;
    console.log(templateElement);
  }
  init() {
    this.loadData();
  }
};
