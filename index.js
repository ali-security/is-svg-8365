'use strict';
const htmlCommentRegex = require('html-comment-regex');

function isBinary(buf) {
	const isBuf = Buffer.isBuffer(buf);

	for (let i = 0; i < 24; i++) {
		const charCode = isBuf ? buf[i] : buf.charCodeAt(i);

		if (charCode === 65533 || charCode <= 8) {
			return true;
		}
	}

	return false;
}

const removeDtdMarkupDeclarations = svg => svg.replace(/\[?(?:\s*<![A-Z]+[^>]*>\s*)*\]?/g, '');

const clean = svg => {
	svg = removeDtdMarkupDeclarations(svg);
	return svg;
};

const regex = /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*\s*(?:\[?(?:\s*<![^>]*>\s*)*\]?)*[^>]*>\s*)?<svg[^>]*>[^]*<\/svg>\s*$/i;

module.exports = input => Boolean(input) && !isBinary(input) && regex.test(clean(input.toString()).replace(htmlCommentRegex, ''));
