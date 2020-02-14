const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

// State machine for room transitions
let pathStates = {
	street: { canMoveTo: [ 'foyer', 'muddy' ] },
	foyer: { canMoveTo: [ 'stairs', 'street' ] },
	muddy: { canMoveTo: [ 'street', 'pizza' ] },
	pizza: { canMoveTo: [ 'muddy' ] }
};

//rooms look up
const roomLookUp = {
	street: 'street',
	foyer: 'foyer',
	muddy: 'muddy',
	pizza: 'pizza'
};

let currentState = 'green';

const player = {
	name: null,
	currentRoom: null,
	inventory: [ 'pocket watch', 'map' ],
	status: [],
	enter: (room) => {
    player.currentRoom = useItem
    console.log(player.currentRoom.description)
	},
	read: () => {
		return street.sign;
	},
	take: (item) => {
		player.inventory.push(item);
		street.inventory.pop();
	}
};

const actions = {
	read: [ 'read', 'view' ],
	take: [ 'take', 'grab' ],
	accept: [ 'yes', 'i would' ],
	enter: [ 'enter', 'open' ]
};

let street = {
	name: '182 Main St.',
	description:
		'You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.',
	lock: true,
	sign:
		'The sign says "Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code "12345".',
	takeSign: 'That would be selfish. How will other students find their way?',
	inventory: [ 'sign' ]
};

let foyer = {
	name: 'foyer',
	description: '',
	inventory: [ 'newspaper', 'shoes', 'sign' ]
};

let classroom = {
	name: 'Classroom',
	description: 'BCA Class, "Abandon all hope, ye who enter here."',
	inventory: [ 'chairs', 'knowledge' ]
};

let pizzaplace = {
	name: "Mr. Mike's",
	description: 'Pizza place next door',
	inventory: [ 'pizza' ]
};

let stairway = {
	sign: 'Welcome to the classroom. To enter please enter code 12345'
};

function enterState(newState) {
	let validTransitions = states[currentState].canChangeTo;
	if (validTransitions.includes(newState)) {
		currentState = newState;
	} else {
		throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
	}
}

async function play() {
	let input = await ask('\n>');
	let inputClean = input.toLowerCase();
	let inputArray = inputClean.split(' ');
	let useAction = inputArray[0];
	let useItem = inputArray[1];
	console.log(inputArray);

	if (actions['read'].includes(useAction)) {
    console.log(player.read());
    play()
    
  } else if (actions['take'].includes(useAction)){
    player.take(useItem);
    console.log({player});
    console.log({street})
    play()
  } else if (actions['enter'].includes(useAction)){
    player.enter(useItem);
    play()
  }
  else {
		console.log("I don't know how to  " + inputArray[0]);
    console.log({player})
    play();
    
	}
}

async function start() {
	console.log(`182 Main Street 
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign.`);
	player.name = null;
	let userName = await ask(`Oh wait 
  First what is your name? \n`);
	player.name = userName;
	console.log(`Alright ${userName} welcome to your first day of class.`);

	// if answer is affirmative go inside if not('gargle') repeat question
	let input = await ask('type yes to start your day\n');
	if (input === 'yes') {
		player.currentRoom = street;
		play();
	} else {
		console.log("I don't know how to " + input);
	}
}

start();

//------------------------------------old functions
// async function streetSide() {
// const streetMessage = 'We are where we started standing on the street.'
// let input = await ask(streetMessage)
// if (input === 'return to foyer') {
// foyer()
// }
// if (input === 'go to Mr. Mikes') {
// pizzaShop()
// }
// }
//
//
//
// async function foyerEntry(){
// change to state
// if chain of possible actions within room
// const foyerMessage = 'Welcome to the foyer. A small room with a staircase which you are standing at the bottom of. There is a newstand '
//
// let input = await ask(foyerMessage)
// if(input === 'take stairs'){
// stairwayUp()
// } if (input === 'exit to street'){
// streetSide()
// }
//
// }
//
//
// async function stairwayUp() {
// const stairwayMessage = 'You\'ve gone up the stiars and reached a door with a sign '
// console.log(stairwayMessage)
// let input = await ask(stairwayMessage)
// if (input === 'read sign') {
// console.log(stairway.sign)
// }
// if (input === 'enter code 12345') {
// classroom()
// }
// }
//
//if statements for possible actions
//
//
// async function classRoom() {
// const classroomMessage = 'You\'ve entered the classroom. Bob is teaching because you are late'
// let input = await ask(classroomMessage)
//if statement allowing actions and results ---if(input === 'action'){result}
// if (input === 'sit and listen') {
//
// }
// if(input === 'go back down stairs'){
// foyerEntry()
// }
// }
//
// async function pizzaShop() {
// const pizzaMessage = 'you have entered the pizza shop'
// let input = await ask(pizzaMessage)
// if (input === ''){
// console.log('')
// }
// }

// async function game() {
// command = await ask('Do something!');
// }
