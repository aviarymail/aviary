const rgx1 = /(radio|checkbox)/i;
const rgx2 = /(file|reset|submit|button)/i;

export function serializeForm<T>(form: HTMLFormElement): T {
  let i = 0;
  let j;
  let key;
  let tmp;
  let out = {};

  while ((tmp = form.elements[i++])) {
    // Ignore unnamed, disabled, or (...rgx2) inputs
    if (!tmp.name || tmp.disabled || rgx2.test(tmp.type)) continue;
    key = tmp.name;

    // Grab all values from multi-select
    if (tmp.type === 'select-multiple') {
      out[key] = [];
      for (j = 0; j < tmp.options.length; j++) {
        if (tmp.options[j].selected) {
          out[key].push(tmp.options[j].value);
        }
      }
    } else if (rgx1.test(tmp.type)) {
      if (tmp.checked) {
        j = out[key];
        tmp = tmp.value === 'on' || tmp.value;
        out[key] = j == null && j !== 0 ? tmp : [].concat(j, tmp);
      }
    } else if (tmp.value || tmp.value === 0) {
      j = out[key];
      out[key] = j == null && j !== 0 ? tmp.value : [].concat(j, tmp.value);
    }
  }

  return out as T;
}
