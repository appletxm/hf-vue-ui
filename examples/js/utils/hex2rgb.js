export const hex2rgb = function (hex, options) {
  /* eslint-disable */
  // checks and defaults
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string');
  }

  hex = hex.replace(/^#/, '');

  options = options || {};
  options.debug = (typeof options.debug === 'boolean') ? options.debug : false;
  options.rgbStringDefault = (typeof options.rgbStringDefault === 'string') ? options.rgbStringDefault : 'inherit';
  options.yiqDefault = (typeof options.yiqDefault === 'string') ? options.yiqDefault : 'inherit';

  const hlen = hex.length;
  let cleanHex;
  let RGB = [255, 255, 255];
  let rgbString = options.rgbStringDefault;
  let yiqres = options.yiqDefault;

  // expand hex input
  if (hlen === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // check for hex-only chars
  cleanHex = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (cleanHex !== null) {
    const num = parseInt(cleanHex, 16);
    RGB = [num >> 16, num >> 8 & 255, num & 255];
    rgbString = 'rgb(' + RGB[0] + ', ' + RGB[1] + ', ' + RGB[2] + ')';

    const yiq = ((RGB[0] * 299) + (RGB[1] * 587) + (RGB[2] * 114)) / 1000;
    yiqres = (yiq >= 128 || isNaN(yiq)) ? 'black' : 'white';

  } else if (options.debug === true) {
    console.error('(hex2rgb) ' + hex + ': Expected 3 or 6 HEX-ONLY chars. Returning defaults.');
  }

  return {
    rgb: RGB,
    rgbString: rgbString,
    yiq: yiqres
  };

   /* eslint-enable */
}
