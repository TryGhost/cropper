const html = require('choo/html');
const ImageForm = require('./ImageForm');
const ImageGroup = require('./ImageGroup');

module.exports = function Page({src, originalSrc}, emit) {
    function update(event) {
        event.preventDefault();
        const newSrc = event.target.elements.image_url.value;

        emit('update-src', newSrc);
    }

    if (!src) {
        return html`
            <body>
                ${ImageForm({onsubmit: update})}
            </body>
        `;
    }

    return html`
        <body>
            ${ImageForm({onsubmit: update})}

            <figure>
                <figcaption>Original</figcaption>
                <img src="${originalSrc}" width="300px">
            </figure>

            ${ImageGroup({crop: 'default', src})}
            ${ImageGroup({crop: 'attention', src})}
            ${ImageGroup({crop: 'entropy', src})}
        </body>
    `;
};
