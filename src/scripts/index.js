var compiler = require('coffee-script');
var errorObject = { value: null };

process.stdout = { isTTY: false };

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
        return { error: errorObject.value };
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


var textarea = document.getElementById('input');
var pre = document.getElementById('output');
var warnings = document.getElementById('warnings');

textarea.addEventListener('keyup', delay(function () {
    pre.innerText = warnings.innerText = '';
    var result = compile(textarea.value);

    if (!result.error) {
        pre.innerText = result.result;
    } else {
        warnings.innerText = formatError(result.error);
    }
}, 200), false);
