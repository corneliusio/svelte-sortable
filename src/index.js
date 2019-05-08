import mjs from './modules/mjs';

(drag => {
    if (drag && drag.length) {
        mjs(import('./Example.svelte' /* webpackChunkName: 'example' */)).then(Example => {
            Array.prototype.forEach.call(drag, target => {
                hmr(new Example({ target }));
            });
        });
    }
})(document.querySelectorAll('[data-drag]'));

function hmr(component) {
    if (module.hot) {
        module.hot.dispose(() => component.$destroy());
    }

    return component;
}

if (module.hot) {
    module.hot.accept();
}
