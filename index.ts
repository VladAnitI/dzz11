interface Animal {
	name?: string;
	sound?: string;
}

const lion: Animal = { name: 'Обезьяна', sound: 'any_link' };
const dog: Animal = { name: 'Попугай', sound: 'any_link' };
const cat: Animal = { name: 'Собака', sound: 'any_link' };

let animals: Animal[] = [lion, dog, cat];
let DOMAnimalsArr: HTMLElement[] = [];

let blockOn: HTMLElement | null = document.getElementById('animals');
let button: HTMLElement | null = document.getElementById('button');
let exit: HTMLElement | null = document.getElementById('exit');
let modal1: HTMLElement | null = document.getElementById('modal1');
let newB: HTMLElement | null = document.getElementById('new');

const DOMAnimals = (animals: Animal[]) => {
	if (blockOn) {
		blockOn.innerHTML = '';
	}
	animals.forEach((el) => {
		let div = document.createElement('div');
		let name: string | undefined = el.name;

		div.setAttribute('class', 'animal');
		div.innerHTML = `<div class="text">${name}</div>
        <div class="bar">
            <div class="sfere sound"></div>
            <div class="sfere transAnimal"></div>
            <div class="sfere removeAnimal"></div>
        </div>`;
		DOMAnimalsArr.push(div);
		if (blockOn) {
			blockOn.appendChild(div);
		}
	});
};

const addAnimal = (animals: object[], newAnimal: any) => {
	if (typeof newAnimal === 'object' && newAnimal.name && newAnimal.sound) {
		let animal: Animal = newAnimal as Animal;
		animals.push(animal);
		DOMAnimals(animals);
	} else {
		console.error('Неверный формат животного');
	}
};

let sounds: { [key: string]: string } = {
	Лев: '',
	Собака: '',
	Кошка: ''
};

const makeSound = (animal: any) => {
	if (typeof animal === 'object' && animal.name) {
		let sound = sounds[animal.name];
		if (sound) {
			let audio = new Audio(sound);
			audio.play();
		} else {
			console.error('Звук не найден');
		}
	} else {
		console.error('.');
	}
};

const editAnimal = (animals: Animal[], index: number, newData: any) => {
	let animal = animals[index];
	if (typeof newData === 'object' && newData.name && newData.sound) {
		let newAnimal: Animal = newData as Animal;
		animal.name = newAnimal.name;
		animal.sound = newAnimal.sound;
		DOMAnimals(animals);
	} else {
		console.error('Неверный формат новых данных');
	}
};

const deleteAnimal = (animals: Animal[], index: number) => {
	if (index >= 0 && index < animals.length) {
		animals.splice(index, 1);
		DOMAnimals(animals);
	} else {
		console.error('Нет животного по индексу');
	}
};

const newAnimal = () => {
	if (modal1) {
		modal1.classList.remove('exitOff');
	}
};

const removeAnimal = () => {
	if (modal1) {
		modal1.classList.add('exitOff');
	}
};

const addAnimalDOM = () => {
	removeAnimal();
	let value: string = (document.getElementById('input') as HTMLInputElement)
		.value;
	let newAnimal = { name: value, sound: 'any_link' };
	addAnimal(animals, newAnimal);
};

DOMAnimals(animals);
if (exit) {
	exit.addEventListener('click', removeAnimal);
}
if (button) {
	button.addEventListener('click', newAnimal);
}
if (newB) {
	newB.addEventListener('click', addAnimalDOM);
}
