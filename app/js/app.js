// let test = 'Hi, from ES2015 with Babel';
// console.log(test);

import loadAjax from './ajax';

loadAjax(`data/data.json`,
  (xhr) => {
    let data = JSON.parse(xhr.responseText);
    console.log(data);
  }
);
