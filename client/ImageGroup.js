const html = require('choo/html');
const Image = require('./Image');

module.exports = function ImageGroup({src, crop}) {
    return html`
        <div class="group">

            ${crop}

            <div class="row">
                ${Image({src, crop, width: 400, height: 400})}
                ${Image({src, crop, width: 200, height: 400})}
                ${Image({src, crop, width: 100, height: 400})}
            </div>

            <div class="row">
                ${Image({src, crop, width: 400, height: 100})}
                ${Image({src, crop, width: 200, height: 100})}
                ${Image({src, crop, width: 100, height: 100})}
            </div>

        </div>
    `;
};
