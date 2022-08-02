// ==UserScript==
// @name         shipit
// @namespace    http://asottile.com/
// @version      0.2
// @author       asottile
// @match        https://github.com/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function () {
    var urls = [];

    GM.xmlHttpRequest({
        method: 'GET',
        url: 'https://chriskuehl.github.io/shipit',
        onload: function (resp) {
            if (resp.status === 200) {
                var parser = new DOMParser();
                var html = parser.parseFromString(resp.response, 'text/html').body;
                html.querySelectorAll('#shipit img').forEach(function (e) {
                    urls.push(e.src);
                });
            }
        }
    });

    document.documentElement.addEventListener('click', function (e) {
        var msg;
        if (urls.length && e.target.name === 'pull_request_review[event]' && e.target.value === 'approve') {
            msg = document.querySelector('#pull_request_review_body')
            msg.value = `${msg.value}\n\n![](${urls[Math.floor(Math.random() * urls.length)]})`;
        }
    });
}());
