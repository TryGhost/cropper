const html = require('choo/html');

module.exports = function ImageForm(opts) {
    return html`
        <form onsubmit=${opts.onsubmit}>
            <input name="image_url" type="url"/>
            <button type="submit">Load image</button>
        </form>
  `;
};
