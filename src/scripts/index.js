var compiler    = require('coffee-script');
var errorObject = { value: null };
process.stdout  = { isTTY: false };
var ignoreHashChange = false;

function tryCatch(fn, ctx, args) {
    try {
        return fn.apply(ctx, args);
    } catch (e) {
        errorObject.value = e;
        return errorObject;
    }
}

function compile(code) {
    var result = tryCatch(compiler.compile, compiler, [code]);
    if(result === errorObject) {
        return { error: errorObject.value, result: null };
    } else {
        return { error: null, result: result };
    }
}

function delay(fn, ms) {
    var delayTimeout = null;
    return function () {
        clearTimeout(delayTimeout);
        delayTimeout = setTimeout(fn, ms);
    };
}

function formatError(err) {
    var loc = err.location.first_line + ':' + err.location.first_column;
    return 'Compile Error: (' + loc + '): ' + err.message;
}

function compileCode() {
    ignoreHashChange = true;
    location.hash = encodeURIComponent(textarea.value);
    pre.innerText = warnings.innerText = '';
    var result = compile(textarea.value);

    if (!result.error) {
        pre.innerText = result.result;
    } else {
        warnings.innerText = formatError(result.error);
    }
}

function registerPanelListeners(el) {
    el.addEventListener('click', function () {
        el.parentNode.classList.toggle('open');
    }, false);
}

function onHashChange() {
    console.log('hashchange', ignoreHashChange);
    if (ignoreHashChange) { return ignoreHashChange = false; }
    textarea.value = decodeURIComponent(location.hash.substr(1));
    compileCode();
    ignoreHashChange = false;
}


var textarea = document.getElementById('input');
var warnings = document.getElementById('warnings');
var pre      = document.getElementById('output');
var trigger  = document.querySelectorAll('.trigger');

onHashChange();
window.onhashchange = onHashChange;
textarea.addEventListener('keyup', delay(compileCode, 200), false);
Array.prototype.slice.call(trigger).forEach(registerPanelListeners);
