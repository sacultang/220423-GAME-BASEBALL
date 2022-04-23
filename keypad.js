let lottos = [0, 0, 0, 0, 0, 0]
let win_nums = [31, 10, 45, 1, 6, 19]

function solution(lottos, win_nums) {
	var answer = []
	const correct = lottos.filter((lotto) => win_nums.includes(lotto)).length
	// console.log(correct)
	const zero = lottos.filter((zero) => zero === 0).length
	// console.log(zero)
	const max = correct + zero
	// console.log(max)

	answer = [check(max), check(correct)]
	console.log(answer)
	return answer
}

solution(lottos, win_nums)

function check(rank) {
	if (rank === 6) {
		return 1
	} else if (rank === 5) {
		return 2
	} else if (rank === 4) {
		return 3
	} else if (rank === 3) {
		return 4
	} else if (rank === 2) {
		return 5
	} else {
		return 6
	}
}
