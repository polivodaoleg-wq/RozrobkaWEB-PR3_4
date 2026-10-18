const $btn = document.getElementById('btn-kick');
const $btnSuper = document.getElementById('btn-kick-super');
const $logs = document.getElementById('logs');

function renderHP() {
    this.renderHPText();
    this.renderProgressbarHP();
}

function renderHPText() {
    const { damageHP, defaultHP, elHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}
function renderProgressbarHP() {
    const { damageHP, elProgressbar } = this;
    elProgressbar.style.width = `${damageHP}%`;
}

function changeHP(count) {
    if (this.damageHP < count) {
        this.damageHP = 0;
        alert(`Бідний ${this.name} програв бій!`);
        $btn.disabled = true;
        if ($btnSuper) $btnSuper.disabled = true;
    } else {
        this.damageHP -= count;
    }
    this.renderHP();
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP,
    renderHPText,
    renderProgressbarHP,
    changeHP,
};
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP,
    renderHPText,
    renderProgressbarHP,
    changeHP,
};

function random(num) {
    return Math.ceil(Math.random() * num);
}
function generateLog(firstPerson, secondPerson, count) {
    const { name: firstName } = firstPerson;
    const { name: secondName, damageHP, defaultHP } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, но в то время ${secondName} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`
    ];
    return logs[random(logs.length) - 1];
}

function countClicks(maxLimit = 6) {
    let count = 0;
    return function (btnName) {
        count++;
        const leftClicks = maxLimit - count;
        console.log(`Кнопка "${btnName}" натиснута. Загалом кліків: ${count}`);

        if (leftClicks > 0) {
            console.log(`Залишилось натискань: ${leftClicks}`);
        } else {
            console.log(`Ліміт натискань "${btnName}" вичерпано!`);
        }
        return leftClicks;
    };
}

const trackThunderJolt = countClicks(6);
const trackSuperKick = countClicks(6);

$btn.addEventListener('click', function () {
    const left = trackThunderJolt('Thunder Jolt');
    if (left < 0) {
        $btn.disabled = true;
        return;
    }
    console.log('Kick');
    const countCharacter = random(20);
    const countEnemy = random(20);
    character.changeHP(countCharacter);
    enemy.changeHP(countEnemy);
    const $p = document.createElement('p');
    $p.innerText = generateLog(character, enemy, countEnemy); $logs.insertBefore($p, $logs.children[0]);
});

if ($btnSuper) {
    $btnSuper.addEventListener('click', function () {
        const left = trackSuperKick('Super Attack');
        if (left < 0) {
            $btnSuper.disabled = true;
            return;
        }
        console.log('Super Kick');
        const countCharacter = random(35);
        const countEnemy = random(35);
        character.changeHP(countCharacter);
        enemy.changeHP(countEnemy);
        const $p = document.createElement('p');
        $p.innerText = generateLog(character, enemy, countEnemy); $logs.insertBefore($p, $logs.children[0]);
    });
}
function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}
init();