// ==UserScript==
// @name         shipit
// @namespace    http://asottile.com/
// @version      0.3
// @author       asottile
// @match        https://github.com/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function () {
    const urls = [];

    GM.xmlHttpRequest({
        method: 'GET',
        url: 'https://chriskuehl.github.io/shipit',
        onload: function (resp) {
            if (resp.status === 200) {
                const parser = new DOMParser();
                const html = parser.parseFromString(resp.response, 'text/html').body;
                html.querySelectorAll('#shipit img').forEach(function (e) {
                    urls.push(e.src);
                });
            }
        }
    });

    document.documentElement.addEventListener('click', function (e) {
        if (urls.length && e.target.name === 'reviewEvent' && e.target.value === 'approve') {
            const msg = document.querySelector('textarea[placeholder="Leave a comment"]');
            msg.focus();
            document.execCommand('insertText', false, `\n\n![](${urls[Math.floor(Math.random() * urls.length)]})`);
        }
    });
}());
