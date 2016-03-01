import componentFactory from './Component';

// Using the Component as a factory to be able to pass parameters to
// the Component Class from an instance (SpeedLedger)
let options = {
    data: 'data/data.json',
    templateRoot: 'component-root',
    templateElement: '.component'
  },
  Component = componentFactory(options),
  SpeedLedger = new Component();

// All methods of the component class are available for the instance here
SpeedLedger.init();
