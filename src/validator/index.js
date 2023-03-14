import Messages from './messages.js';
import moment from 'moment';

export default class {
  constructor() {
    this.errors = {};
  }

  hasErrorByKey(attrKey) {
    return attrKey in this.errors && this.errors[attrKey].length > 0;
  }

  getErrorByKey(attrKey) {
    return (attrKey in this.errors) ? this.errors[attrKey] : [];
  }

  clearErrors() {
    this.errors = {};
  }

  invalid(attrKey, messages, params) {
    // attrKey is string.
    // params is object.
    // messages is following object. { attrOn: *num*, attrOff: *num* }
    if (!(attrKey in this.errors)) {
      this.errors[attrKey] = [];
    }
    const message = this.buildMessage(messages, params);
    this.errors[attrKey].push(message);
  }

  buildMessage(messages, params) {
    if ('attr' in params && 'attrOn' in messages) {
      // attr名あり
      return Messages.get(messages.attrOn, params);
    } else if ('attrOff' in messages) {
      // attr名なし
      return Messages.get(messages.attrOff, params);
    }
    return '';
  }

  buildParams(attrName, params) {
    const attrParams = attrName ? { attr: attrName } : {};
    return { ...params, ...attrParams };
  }

  checkRequire(attrKey, value, attrName) {
    const messages = { attrOn: 1111, attrOff: 1111 };
    const params = this.buildParams(attrName, {});
    if ((typeof (value) !== 'number' && !SafeTrim(value)) || (typeof (value) === 'object' && !Object.keys(value).length)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkRequireSelect(attrKey, value, attrName) {
    const messages = { attrOn: 1112, attrOff: 1112 };
    const params = this.buildParams(attrName, {});
    if (!value || (typeof (value) === 'object' && !(value instanceof Date) && !Object.keys(value).length)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkRequireSelectAdd(attrKey, value, attrName) {
    const messages = { attrOn: 1113, attrOff: 1113 };
    const params = this.buildParams(attrName, {});
    if (!value || (typeof (value) === 'object' && !Object.keys(value).length)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkRequireFile(attrKey, value, attrName) {
    const messages = { attrOn: 1112, attrOff: 1112 };
    const params = this.buildParams(attrName, {});
    if (value === null || value === undefined || !value || !value.name) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkFileType(attrKey, file, typeRegex, attrName) {
    const messages = { attrOn: 1211, attrOff: 1211 };
    const params = this.buildParams(attrName, {});
    if (!file.type.match(typeRegex)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkLength(attrKey, value, length, attrName) {
    const messages = { attrOn: 1125, attrOff: 1125 };
    const params = this.buildParams(attrName, { length: length });
    if (value === null || value === undefined || value.length != length) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkMinLength(attrKey, value, min, attrName) {
    const messages = { attrOn: 1121, attrOff: 1121 };
    const params = this.buildParams(attrName, { min: min });
    if (value === null || value === undefined || value.length < min) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkMaxLength(attrKey, value, max, attrName) {
    const messages = { attrOn: 1122, attrOff: 1122 };
    const params = this.buildParams(attrName, { max: max });
    if (value !== null && value !== undefined && value.length > max) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkLessThan(attrKey, value, max, attrName) {
    const messages = { attrOn: 1132, attrOff: 1132 };
    const params = this.buildParams(attrName, { max: max });
    if (parseInt(value) > max) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkGreaterThan(attrKey, value, min, attrName) {
    const messages = { attrOn: 1131, attrOff: 1131 };
    const params = this.buildParams(attrName, { min: min });
    if (parseInt(value) < min) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkTimeBefore(attrKey, value, toDate, attrName, attrNameTo) {
    const messages = { attrOn: 1162, attrOff: 1162 };
    const params = this.buildParams(attrName, { attr_to: attrNameTo });
    if (moment(value) <= toDate) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkDateTimeBefore(attrKey, fromDate, toDate, attrName) {
    const messages = { attrOn: 1163, attrOff: 1163 };
    const params = this.buildParams(attrName, {});
    if (toDate <= fromDate) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkStartTimeBefore(attrKey, fromDate, toDate, attrName) {
    const messages = { attrOn: 1164, attrOff: 1164 };
    const params = this.buildParams(attrName, {});
    if (toDate < fromDate) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkReservableTimeBefore(attrKey, fromDate, toDate, attrName) {
    const messages = { attrOn: 1166, attrOff: 1166 };
    const params = this.buildParams(attrName, {});
    if (toDate < fromDate) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkDateBeforeTime(attrKey, value, toTime, attrName, attrNameTo) {
    const messages = { attrOn: 1165, attrOff: 1165 };
    const params = this.buildParams(attrName, { attr_to: attrNameTo });
    if (!moment(value).isSameOrAfter(toTime, 'day')) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkDateBefore(attrKey, value, maxDate, attrName, maxAttrName) {
    const messages = { attrOn: 1135, attrOff: 1135 };
    const params = this.buildParams(attrName, { max: maxAttrName });
    if (moment(value) > moment(maxDate)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkKatakana(attrKey, value, attrName) {
    const messages = { attrOn: 1155, attrOff: 1155 };
    const params = this.buildParams(attrName, {});
    if (!/^[ァ-ヶー]+$/.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkDigit(attrKey, value, attrName) {
    const messages = { attrOn: 1151, attrOff: 1151 };
    const params = this.buildParams(attrName, {});
    if (!/^\d+$/.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkPassword(attrKey, value, attrName) {
    const messages = { attrOn: 1142, attrOff: 1142 };
    const params = this.buildParams(attrName, {});
    if (!/^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-/:-@[-`{-~])[!-~]{12,72}$/i.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkSameValue(attrKey, src, dist, attrName) {
    const messages = { attrOn: 1143, attrOff: 1343 };
    const params = this.buildParams(attrName, {});
    if (src !== dist) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkAlphanumeric(attrKey, value, attrName) {
    const messages = { attrOn: 1153, attrOff: 1153 };
    const params = this.buildParams(attrName, {});
    if (!/^[a-z0-9]+$/i.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkAscii(attrKey, value, attrName) {
    const messages = { attrOn: 1154, attrOff: 1154 };
    const params = this.buildParams(attrName, {});
    if (!/^[\x20-\x7e]*$/.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkAsciiWithoutSpace(attrKey, value, attrName) {
    const messages = { attrOn: 1154, attrOff: 1154 };
    const params = this.buildParams(attrName, {});
    if (!/^[\x21-\x7e]*$/.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkDate(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!value.match(/^\d{4}(\/|-)\d{1,2}(\/|-)\d{1,2}$/)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    var y = parseInt(value.split(/\/|-/)[0]);
    var m = parseInt(value.split(/\/|-/)[1] - 1);
    var d = parseInt(value.split(/\/|-/)[2]);
    var date = new Date(y, m, d);
    if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkDateDisplay(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!moment(value, ['YYYY/MM/DD', 'YYYY/M/D'], true).isValid()) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  timeFormatRegex() {
    return new RegExp(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/);
  }

  checkTime(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!this.timeFormatRegex().exec(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkPhone(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!value.match(/^\d{2,3}(-| )?\d{3,4}(-| )?\d{4}$/)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkPostCode(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!value.match(/^\d{3}(-| )?\d{4}$/)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkEmail(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!/^\w[\w+\-.]*@\w[\w-.]*\.\w[\w]+$/.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkFromToValidity(attrKey, value, valueTo, attrName, attrNameTo) {
    const messages = { attrOn: 1161, attrOff: 1161 };
    const params = this.buildParams(attrName, { attr_to: attrNameTo });
    if (value && valueTo && (value > valueTo)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkArrayUnique(attrKey, value, attrName) {
    const messages = { attrOn: 1171, attrOff: 1171 };
    const params = this.buildParams(attrName, {});
    if (value.filter((item, index) => item && value.indexOf(item) !== index).length > 0) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkExists(attrKey, value, arrValidation, attrName) {
    const messages = { attrOn: 1181, attrOff: 1181 };
    const params = this.buildParams(attrName, {});
    value.forEach((item) => {
      if (!arrValidation.includes(item)) {
        this.invalid(attrKey, messages, params);
        return false;
      }
    });

    return true;
  }

  checkUrl(attrKey, value, attrName) {
    const regex = new RegExp('^((http|https)?:\\/\\/)' +
      '(www\\.)?' +
      '([\\-a-z\\d%_.~+]{1,256}\\.[/\\-a-z\\d%_.~+]+)' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i');
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    // Make sure the string starts with the HTTP protocol, as regular expression parsing freezes for long sentences.
    const isNotStartsWithHttpProtocol = !value.startsWith('http://') && !value.startsWith('https://');
    if (value && (isNotStartsWithHttpProtocol || !regex.test(value))) {
      this.invalid(attrKey, messages, params);
      return false;
    }

    return true;
  }

  checkNotIncludeInvalidCharacter(attrKey, value, attrName) {
    const messages = { attrOn: 1144, attrOff: 1144 };
    const params = this.buildParams(attrName, {});
    // Surrogate pair & Emoji
    if (/[\uD800-\uDBFF|\uDC00-\uDFFF|\u2600-\u26FF|\u2700-\u27BF]/.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkMaxNumber(attrKey, value, max, attrName) {
    const messages = { attrOn: 1124, attrOff: 1124 };
    const params = this.buildParams(attrName, { max: max });
    if (value !== null && value !== undefined && value.length > max) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }

  checkTel(attrKey, value, attrName) {
    const messages = { attrOn: 1141, attrOff: 1141 };
    const params = this.buildParams(attrName, {});
    if (!value.match(/^\d{10,11}$/)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }
  checkInstagram(attrKey, value, attrName) {
    const messages = { attrOn: 1145, attrOff: 1145 };
    const params = this.buildParams(attrName, {});
    if (!/^[A-Za-z0-9\\d_.]+$/i.test(value)) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }
  checDivisibleByFifteen(attrKey, value, attrName) {
    const messages = { attrOn: 1182, attrOff: 1182 };
    const params = this.buildParams(attrName);
    if (value && parseInt(value) % 15 != 0) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }
  checkPositiveNumber(attrKey, value, attrName) {
    const messages = { attrOn: 1191, attrOff: 1191 };
    const params = this.buildParams(attrName, {});
    if (Math.floor(value) == 0 ) {
      this.invalid(attrKey, messages, params);
      return false;
    }
    return true;
  }
}
