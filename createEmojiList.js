const emojiData = require('unicode-emoji-json')
const keywordSet = require('emojilib')
const fs = require('fs')


const createEmojiList = () => {
	let emojiList = []
	for (var emoji in emojiData){
		emojiList.push({emoji: emoji, keywords:keywordSet[emoji], ...emojiData[emoji]})
	}
	
	const output = JSON.stringify(emojiList)
	fs.writeFile('emojiList.json', output, err => {
		if (err) {
			throw err;
		}
		console.log('emojiList saved to emojiList.json')
	})
}

module.exports = createEmojiList