const choo = require('choo');
const Page = require('./Page');

const app = choo();

app.use(function (state, emitter) {
    state.src = null;
    emitter.on('update-src', function (src) {
        state.src = encodeURIComponent(src);
        state.originalSrc = src;
        emitter.emit('render');
    });
});

app.route('*', Page);

app.mount('body');
