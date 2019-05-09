export default function(func, wait, options) {
    let context, args, result,
        timeout = null,
        previous = 0,
        later;

    if (!options) {
        options = {};
    }

    later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    return function() {
        let now = Date.now(),
            remaining;

        if (!previous && options.leading === false) {
            previous = now;
        }

        remaining = wait - (now - previous);

        context = this;
        args = arguments; // eslint-disable-line prefer-rest-params

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }

        return result;
    };
}
