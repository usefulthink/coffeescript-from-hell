var compiler    = require('coffee-script');
var errorObject = { value: null };
process.stdout  = { isTTY: false };

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

function onKeyUp() {
    pre.innerText = warnings.innerText = '';
    var result = compile(textarea.value);

    if (!result.error) {
        pre.innerText = result.result;
    } else {
        warnings.innerText = formatError(result.error);
    }
}

function addPanelClickListeners(el) {
    el.addEventListener('click', function () {
        el.parentNode.classList.toggle('open');
    }, false);
}

function shareCode() {
    var url = location.protocol + '//' + location.host + location.pathname;
    copyLink.value = url + '#' + encodeURIComponent(textarea.value);
    copyLink.classList.toggle('show');
    copyLink.select();
    copyLink.focus();
}


var textarea = document.getElementById('input');
var warnings = document.getElementById('warnings');
var pre      = document.getElementById('output');
var share    = document.getElementById('share-code');
var copyLink = document.getElementById('copy-link');
var trigger  = document.querySelectorAll('.trigger');
var code     = decodeURIComponent(location.hash.substr(1));

textarea.value = code;
onKeyUp();

textarea.addEventListener('keyup', delay(onKeyUp, 200), false);
share.addEventListener('click', shareCode, false);
Array.prototype.slice.call(trigger).forEach(addPanelClickListeners);
