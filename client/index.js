const choo = require('choo');
const Page = require('./Page');

const app = choo();

app.use(function (state, emitter) {
    state.src = null;
    emitter.on('update-src', function (src) {
        const srcUrl = new URL(src);
        const rawSrc = srcUrl.origin + srcUrl.pathname;
        state.src = encodeURIComponent(rawSrc);
        state.originalSrc = rawSrc;
        emitter.emit('render');
    });
});

app.route('*', Page);

app.mount('body');
