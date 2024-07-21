#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

// Глобальная переменная для хранения имени игрока
let playerName;

/**
 * Функция для ожидания заданного количества времени
 * @param {number} ms - Число в миллисекундах
 * @returns {Promise<void>} - Промис, который задерживает выполнение через заданный промежуток времени
 */
const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

/**
 * Функция для вывода приветственного сообщения
 */
const welcome = async () => {
	// Создание анимации "Кто хочет стать миллионером?" с использованием библиотеки chalk-animation
	const rainbowTitle = chalkAnimation.rainbow(
		'Кто хочет стать миллионером? \n'
	);

	// Пауза 2 секунды
	await sleep();

	// Остановка анимации
	rainbowTitle.stop();

	// Вывод приветственного сообщения
	console.log(`
    ${chalk.bgBlue('Как играть?')}
    Это простой квиз в терминале".
    Если  неправильно ответишь на вопрос, тогда ${chalk.bgRed('проиграешь')}
    Поэтому, сконцентрируйся и ответь на все вопросы правильно.
  `);
};

/**
 * Функция для обработки ответа пользователя
 * @param {boolean} isCorrect - Истина, если ответ правильный
 * @returns {Promise<void>} - Промис, который обрабатывает ответ пользователя
 */
const handleAnswer = async isCorrect => {
	// Создание спиннера
	const spinner = createSpinner('Проверяю ответ...').start();

	// Пауза 2 секунды
	await sleep();

	// Проверка ответа пользователя и отображение соответствующего сообщения
	if (isCorrect) {
		// Вывести сообщение, если ответ пользователя правильный
		spinner.success({
			text: `✅ Правильный ответ, ${playerName}. Молодец!`,
		});
	} else {
		// Вывести сообщение, если ответ пользователя неправильный
		spinner.error({ text: `Это конец, ты проиграл ${playerName}!💀` });
		// Выход из игры
		process.exit(1);
	}
};

/**
 * Функция для получения имени пользователя
 * @returns {Promise<void>} - Промис, который возвращает имя пользователя
 */
const askName = async () => {
	// Запрос имени пользователя
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: 'Как тебя зовут?',
		default() {
			return 'Игрок';
		},
	});

	// Переменная для хранения имени пользователя
	playerName = answers.player_name;
};

/**
 * Функция для победы
 */
const winner = () => {
	// Очистка консоли
	console.clear();

	// Создание анимации "1 0 0 0 0 0 0" с использованием библиотеки chalk
	figlet(`1 0 0 0 0 0 0`, (error, data) => {
		console.log(gradient.pastel.multiline(data) + '\n');

		// Вывод сообщения о победе
		console.log(chalk.green(`Поздравляю, теперь ты джаваскриптионер! `));

		// Выход из игры
		process.exit(0);
	});
};

// Первый вопрос
const question1 = async () => {
	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: 'Когда был создан JavaScript?\n',
		choices: [
			'25 мая, 1995 года',
			'24 ноября, 1995 года',
			'4 декабря, 1995 года',
			'17 января, 1997 года',
		],
	});

	return handleAnswer(answers.question_1 === '4 декабря, 1995 года');
};

// Второй вопрос
const question2 = async () => {
	const answers = await inquirer.prompt({
		name: 'question_2',
		type: 'list',
		message:
			'Какое значение будет у константы number? const number = 1_1 + "1" + Number(1)\n',
		choices: ['3', '"3"', '"1111"', '142345'],
	});
	return handleAnswer(answers.question_2 === '"1111"');
};

// Третий вопрос
const question3 = async () => {
	const answers = await inquirer.prompt({
		name: 'question_3',
		type: 'list',
		message: `Что будет, если попробовать вывести 4-й элемент массива? ['💀', '🔥', '👁️']\n`,
		choices: ['0', '👁️', '💀', 'undefined'],
	});

	return handleAnswer(answers.question_3 === 'undefined');
};

// Четвертый вопрос
const question4 = async () => {
	const answers = await inquirer.prompt({
		name: 'question_4',
		type: 'list',
		message: 'Какой тип данных НЕ примитивный?\n',
		choices: ['boolean', 'number', 'NaN', 'object'],
	});
	return handleAnswer(answers.question_4 === 'object');
};

// Пятый вопрос
const question5 = async () => {
	const answers = await inquirer.prompt({
		name: 'question_5',
		type: 'list',
		message: `JavaScript – это высокоуровневый, однопоточный, интерпретируемый, прототипно-ориентированный, мультипарадигмальный, динамический язык программирования, с ___ event loop'ом.`,
		choices: ['мультипоточным', 'неблокирующим', 'синхронным', 'промисным'],
	});

	return handleAnswer(answers.question_5 === 'неблокирующим');
};

// Запуск игры, то  есть запуск функций welcome, askName, question1, question2, question3, question4, question5, winner
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
