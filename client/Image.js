const html = require('choo/html');

module.exports = function Image({src, crop, width, height}) {
    return html`
        <figure>
            <img src="/transform?image=${src}&crop=${crop}&width=${width}&height=${height}" width="${width}px" height="${height}px">
            <figcaption></figcaption>
        </figure>
  `;
};
