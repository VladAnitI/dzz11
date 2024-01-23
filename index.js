"use strict";
const lion = { name: 'Обезьяна', sound: 'any_link' };
const dog = { name: 'Попугай', sound: 'any_link' };
const cat = { name: 'Собака', sound: 'any_link' };
let animals = [lion, dog, cat];
let DOMAnimalsArr = [];
let blockOn = document.getElementById('animals');
let button = document.getElementById('button');
let exit = document.getElementById('exit');
let modal1 = document.getElementById('modal1');
let newB = document.getElementById('new');
const DOMAnimals = (animals) => {
    if (blockOn) {
        blockOn.innerHTML = '';
    }
    animals.forEach((el) => {
        let div = document.createElement('div');
        let name = el.name;
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
const addAnimal = (animals, newAnimal) => {
    if (typeof newAnimal === 'object' && newAnimal.name && newAnimal.sound) {
        let animal = newAnimal;
        animals.push(animal);
        DOMAnimals(animals);
    }
    else {
        console.error('Неверный формат животного');
    }
};
let sounds = {
    Лев: '',
    Собака: '',
    Кошка: ''
};
const makeSound = (animal) => {
    if (typeof animal === 'object' && animal.name) {
        let sound = sounds[animal.name];
        if (sound) {
            let audio = new Audio(sound);
            audio.play();
        }
        else {
            console.error('Звук не найден');
        }
    }
    else {
        console.error('.');
    }
};
const editAnimal = (animals, index, newData) => {
    let animal = animals[index];
    if (typeof newData === 'object' && newData.name && newData.sound) {
        let newAnimal = newData;
        animal.name = newAnimal.name;
        animal.sound = newAnimal.sound;
        DOMAnimals(animals);
    }
    else {
        console.error('Неверный формат новых данных');
    }
};
const deleteAnimal = (animals, index) => {
    if (index >= 0 && index < animals.length) {
        animals.splice(index, 1);
        DOMAnimals(animals);
    }
    else {
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
    let value = document.getElementById('input')
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
