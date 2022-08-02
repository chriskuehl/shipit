// ==UserScript==
// @name         shipit
// @namespace    http://markkeller.dev/
// @version      0.2
// @author       keller00
// @match        https://github.com/*
// ==/UserScript==

(function () {
    document.documentElement.addEventListener('click', function (e) {
        var msg;
        if (e.target.name === 'pull_request_review[event]' && e.target.value === 'approve') {
            msg = document.querySelector('#pull_request_review_body')
            msg.value = `${msg.value}\n\n:ship: :ship:`;
        }
    });
}());
