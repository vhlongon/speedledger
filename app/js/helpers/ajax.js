export default function loadAjax(url, callback) {
  var xhr = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : '';
  xhr.onreadystatechange = ensureReadiness;

  function ensureReadiness() {
    if (xhr.readyState < 4) {
      return;
    }
    if (xhr.status !== 200) {
      return;
    }
    // all is well
    if (xhr.readyState === 4) {
      callback(xhr);
    }
  }

  xhr.open('GET', url, true);
  xhr.send('');
}
