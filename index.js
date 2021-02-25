'use strict';
const alfy = require('alfy');
const fs = require('fs')

// Check for emojiList data
// If it doesn't exist, generate it.
let emojiList;
try {
	emojiList = fs.readFileSync('./emojiList.json', 'utf-8')
} catch (error) {
	const createEmojiList = require('./createEmojiList.js')
	console.log('No emojiList found. Generating one.')
	createEmojiList();
	emojiList = fs.readFileSync('./emojiList.json', 'utf-8')
}
finally {
	emojiList = JSON.parse(emojiList);
}


(async () => {
	const q = alfy.input.replace(' ','_')
	
	const exactMatches = emojiList.filter(({keywords})=>keywords.includes(q))
	const fuzzyMatches = emojiList.filter(({keywords})=>keywords.some(keyword=>keyword.includes(q)))
	
	const data = [
		...exactMatches,
		...fuzzyMatches.filter(emoji=>!exactMatches.includes(emoji)),
	]

	let all = '';
	const items = data.map(item => {
		const emoji = item.emoji;
		all += emoji;

		return {
			title: item.name,
			subtitle: `Copy ${emoji} (${item.slug}) to clipboard`,
			arg: emoji,
			icon: {
				path: `./apple emoji icons/${item.slug}.png`
			}
		};
	});

	items.push({
		title: all,
		arg: all,
		icon: all,
		subtitle: `Copy ${all} to clipboard`,
	});

  alfy.output(items);
})();