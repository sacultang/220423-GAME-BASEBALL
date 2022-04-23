const formEl = document.querySelector('form')
const inputValue = document.querySelector('.input-value')
const btn = document.querySelector('.submit')
const resetBtn = document.querySelector('.reset-icon')
let randomNum = []
let failCheck = 9

function createNum() {
	while (randomNum.length < 4) {
		let num = Math.floor(Math.random() * 9 + 1)
		if (randomNum.indexOf(num) === -1) {
			randomNum.push(num)
		}
	}
}
// createNum()

function checkType() {
	const answer = inputValue.value
	// console.log(answer)
	let answerArr = answer.split('').map((e) => {
		return parseInt(e)
	})
	let set = new Set(answerArr)
	// let setArr = [...set]
	// console.log(set)
	// console.log(answerArr)
	if (randomNum.length === 0) createNum()
	if (answer.trim().length !== 4) {
		alert('4자리수를 입력해주세요')
	} else if (isNaN(answer)) {
		// value가 숫자인지 확인
		alert('숫자를 입력해주세요')
	} else if ([...set].length < 4) {
		alert('다른 숫자를 입력해주세요')
	}
	// value를 숫자로 변환
	else {
		// console.log(answerArr)

		checkGame(answerArr)
		inputValue.value = ''
		inputValue.focus()
	}
}

let correctEl = document.querySelector('.correct')
const popupEl = document.querySelector('.popup')
const popupTextEl = document.querySelector('.popup-text')

function checkGame(check) {
	let correct = 0
	let wrapNum = document.createElement('div')
	wrapNum.className = 'wrap-number'
	correctEl.prepend(wrapNum)
	for (let i = 0; i < check.length; i++) {
		let divEl = document.createElement('div')
		divEl.className = 'number'
		if (check[i] === randomNum[i]) {
			// console.log('good')
			divEl.classList.add('good')
			divEl.innerText = `${check[i]}`
			wrapNum.append(divEl)
			correct++
		} else if (randomNum.includes(check[i])) {
			// console.log('bade')
			divEl.classList.add('notbad')
			divEl.innerText = `${check[i]}`
			wrapNum.append(divEl)
		} else {
			divEl.classList.add('bad')
			divEl.innerText = `${check[i]}`
			wrapNum.append(divEl)
		}
	}

	if (correct !== 4) {
		failCheck -= 1
	}

	// console.log(failCheck)
	if (correct === 4) {
		popupEl.classList.add('popup-color')
		popupTextEl.textContent = '정답'
	} else if (failCheck === 0) {
		popupEl.classList.add('popup-color')
		popupTextEl.textContent = '실패'
	}
}
function resetGame() {
	correctEl.innerHTML = ''
	randomNum = []
}
// console.log(randomNum)
formEl.addEventListener('submit', (e) => {
	e.preventDefault()
	checkType()
})
resetBtn.addEventListener('click', (e) => {
	e.preventDefault()
	popupEl.classList.remove('popup-color')
	resetGame()
})
