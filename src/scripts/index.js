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
        sidePanel.classList.add('can-run');
        warnings.parentNode.classList.remove('has-errors');

    } else {
        sidePanel.classList.remove('can-run');
        warnings.parentNode.classList.add('has-errors');
        warnings.innerText = formatError(result.error);
    }
}

function registerPanelListeners(el) {
    el.addEventListener('click', function () {
        el.parentNode.classList.toggle('open');
    }, false);
}

function runScript(el) {
    el.addEventListener('click', function () {
        var result = compile(textarea.value);
        eval(result.result);
    }, false);
}

function onKeyUp() {
    delay(compileCode, 200)();
    updateStatusbar();
}

function updateStatusbar () {
    var position = getCursorPosition();
    var text = textarea.value;
    statusbar.position.innerText = position.line + ',' + position.column;
    statusbar.totalChars.innerText = text.replace('\n', '').length;
    statusbar.totalLines.innerText = text.split('\n').length;
}

function onHashChange() {
    if (ignoreHashChange) { return ignoreHashChange = false; }
    textarea.value = decodeURIComponent(location.hash.substr(1));
    compileCode();
    ignoreHashChange = false;
}

function getCursorPosition() {
    var selectionStart = textarea.selectionStart;
    var lines = textarea.value.substr(0, selectionStart).split('\n');
    return {
        line: lines.length,
        column: lines[lines.length - 1].length + 1
    };
}


var textarea  = document.getElementById('input');
var warnings  = document.getElementById('warnings');
var pre       = document.getElementById('output');
var sidePanel = document.getElementById('sidepanel');
var runButton = document.querySelectorAll('.run-script');
var trigger   = document.querySelectorAll('.trigger');
var statusbar = {
    position: document.getElementById('cursor-position'),
    fileName: document.getElementById('file-name'),
    totalLines: document.getElementById('total-lines'),
    totalChars: document.getElementById('total-chars')
};

onHashChange();
window.onhashchange = onHashChange;
textarea.addEventListener('keyup', onKeyUp, false);
textarea.addEventListener('click', updateStatusbar, false);
textarea.addEventListener('focus', updateStatusbar, false);
Array.prototype.slice.call(trigger).forEach(registerPanelListeners);
Array.prototype.slice.call(runButton).forEach(runScript);
