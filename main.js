const formEl = document.querySelector('form')
const inputValue = document.querySelector('.input-value')
const checkBtn = document.querySelector('.submit-check ')
const retryBtn = document.querySelector('.submit-retry')
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
	let answerArr = answer.split('').map((e) => {
		return parseInt(e)
	})
	console.log(Number.isNaN(answerArr))
	let set = new Set(answerArr)
	// let setArr = [...set]
	// console.log(set)
	// console.log(answerArr.indexOf(0))
	if (randomNum.length === 0) createNum()
	if (answer.trim().length !== 4) {
		alert('4자리수를 입력해주세요')
	} else if (Number.isNaN(answerArr) || NaN) {
		// value가 숫자인지 확인
		alert('숫자를 입력해주세요')
	} else if ([...set].length < 4) {
		alert('다른 숫자를 입력해주세요')
	} else if (answerArr.indexOf(0) > -1) {
		alert('1~9까지 숫자를 입력해 주세요')
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
const strikeText = document.querySelector('.strike-text')
const ballText = document.querySelector('.ball-text')
let confe = document.querySelector('#my-canvas')
const failText = document.querySelector('.fail-text')

function checkGame(check) {
	let strike = 0
	let ball = 0
	let wrapNum = document.createElement('div')
	wrapNum.className = 'wrap-number'
	correctEl.prepend(wrapNum)
	for (let i = 0; i < check.length; i++) {
		let divEl = document.createElement('div')
		let spanEl = document.createElement('span')
		spanEl.className = 'text-num'
		divEl.className = 'number'
		if (check[i] === randomNum[i]) {
			// console.log('good')
			divEl.classList.add('good')
			spanEl.innerText = `${check[i]}`
			divEl.append(spanEl)
			wrapNum.append(divEl)
			strike++
			strikeText.textContent = `${strike}`
		} else if (randomNum.includes(check[i])) {
			// console.log('bade')
			divEl.classList.add('notbad')
			spanEl.innerText = `${check[i]}`
			divEl.append(spanEl)
			wrapNum.append(divEl)
			ball++
			ballText.innerHTML = `${ball}`
		} else {
			divEl.classList.add('bad')
			spanEl.innerText = `${check[i]}`
			divEl.append(spanEl)
			wrapNum.append(divEl)
		}
	}

	if (strike !== 4) {
		failCheck -= 1
		// console.log(failCheck)
		failText.textContent = `${failCheck}`
	}
	if (strike === 4) {
		// 나타나기
		popupEl.classList.add('active')
		popupTextEl.textContent = '정답'
		confe.classList.add('active')

		// 숨기기
		formEl.classList.add('hidden')
	} else if (failCheck === 0) {
		// 나타나기
		popupEl.classList.add('active')
		popupTextEl.textContent = '실패'
		confe.classList.add('active')

		// 숨기기
		formEl.classList.add('hidden')
	}
}

//  게임 초기화
function resetGame() {
	popupEl.classList.remove('active')
	confe.classList.remove('active')
	formEl.classList.remove('hidden')
	strikeText.classList.remove('hidden')
	inputValue.value = ''
	inputValue.focus()
	correctEl.innerHTML = ''
	randomNum = []
	failCheck = 9
	strikeText.textContent = 0
	ballText.textContent = 0
	failText.textContent = failCheck
}
// console.log(randomNum)
checkBtn.addEventListener('click', (e) => {
	e.preventDefault()
	checkType()
})
resetBtn.addEventListener('click', (e) => {
	e.preventDefault()
	resetGame()
})
retryBtn.addEventListener('click', (e) => {
	e.preventDefault()
	resetGame()
})

var confettiSettings = { target: 'my-canvas' }
var confetti = new ConfettiGenerator(confettiSettings)
confetti.render()
