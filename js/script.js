var master_helper = [
    ["Иметь руки", 1],
    ["Иметь уши", 1],
];
var grand_master = [
    ["Word", 1],
    ["Excel", 1],
    ["PowerPoint", 1],
    ["OEBS", 1],
    ["Уровень владения английским", 0],
    ["Результаты тестировки ЕОПЗ", 1],
    ["Тестирование по общим вопросам", 1],
    ["Тестирование по специальным вопросам", 1],
    ["Результат аттестации РСС", 1],
    ["Опыт работы руководителем", 1],

];
var boss_helper = [
    ["Иметь полное доверие начальника", 1]
];
var boss = [
    ["Получить согласие начальника завода", 1],
    ["Продолжать работать", 1],
];
var factory_boss = [
    ["Что-то сделать", 1],
    ["Что-то уметь", 1],
];
var positions = [
    master_helper, //1
    grand_master, //1
    boss_helper, //0
    boss, //0
    factory_boss,
];
var positionNames = [
    "Мастер участка",
    "Старший мастер",
    "Зам. начальника цеха",
    "Начальник цеха",
    "Начальник завода",
];

function checkLevel(arr) { //ideal
    check = 1;
    arr.forEach(function(item) {
        check *= item[1]
    });
    return check;
}

function findCurrentLevel(arr) { //ideal
    var currentLevel = arr[0];
    var currentLevelIndex = arr.length - 1;
    var currentPositionName = positionNames[currentLevelIndex];
    let check = 0;
    arr.forEach(function(item, i) { //перебираем positions
        if (checkLevel(item) == 0 && check == 0) {
            currentLevel = item; //Object
            currentLevelIndex = i; //index in positions
            currentPositionName = positionNames[i]; //string from positionNames
            check = 1;
        }
    });
    return {
        currentLevel: currentLevel,
        currentLevelIndex: currentLevelIndex,
        currentPositionName: currentPositionName
    }
}


$(document).ready(function() {
    var level = findCurrentLevel(positions);

    $("#aim").append("Цель №" + (level.currentLevelIndex + 1));
    $("#aimPositionName").append(level.currentPositionName);

    if (checkBoss(positions)) {
        $("#skills").append("Вы уже босс :)");
    } else {
        $("#positionName").append(level.currentPositionName);
        for (const i of level.currentLevel) {
            let li = document.createElement('li');
            let img = document.createElement('img')
            li.className = "skill";
            img.className = "tic";
            li.innerHTML = i[0];
            if (i[1] == 0) {
                img.src = 'images/greytic.png'
            } else img.src = 'images/greentic.png'
            $("#skills").append(img);
            $("#skills").append(li);
            $("#skills").append("<div></div>");
        }
    }
    drawPositions();
});


function drawPositions() {
    var level = findCurrentLevel(positions);
    var directionCheck = 0;

    if (checkBoss(positions)) {
        for (let i = positions.length - 1; i >= 0; i--) { //завершенные цели
            let button = document.createElement('button');
            button.innerHTML = positionNames[i];
            var tick = document.createElement("img");
            tick.src = "images/greytic.png";
            tick.className = "donetick";
            button.appendChild(tick);
            if (directionCheck % 2 == 1)
                button.className = "doneLeft";
            else
                button.className = "doneRight";
            directionCheck += 1;
            $("#mountpos").append(button);
        }

    } else {
        for (let i = positions.length - 1; i > level.currentLevelIndex; i--) { //будущие цели
            let button = document.createElement('button');
            button.innerHTML = positionNames[i];
            if (directionCheck % 2 == 1)
                button.className = "futureLeft";
            else
                button.className = "futureRight";
            directionCheck += 1;
            $("#mountpos").append(button);
        }
        let button = document.createElement('button'); //текущая цель
        button.innerHTML = positionNames[level.currentLevelIndex];
        var flag = document.createElement("img");
        flag.src = "images/flag.png";
        flag.className = "flag";
        button.appendChild(flag);
        if (directionCheck % 2 == 1)
            button.className = "currentLeft";
        else
            button.className = "currentRight";
        directionCheck += 1;
        $("#mountpos").append(button);

        for (let i = level.currentLevelIndex - 1; i >= 0; i--) { //завершенные цели
            let button = document.createElement('button');
            button.innerHTML = positionNames[i];
            var tick = document.createElement("img");
            tick.src = "images/greytic.png";
            tick.className = "donetick";
            button.appendChild(tick);
            if (directionCheck % 2 == 1)
                button.className = "doneLeft";
            else
                button.className = "doneRight";
            directionCheck += 1;
            $("#mountpos").append(button);
        }
        return true;
    }
}

function checkBoss(positions) {
    var check = 1;
    positions.forEach(function(item, i) {
        check *= checkLevel(item);
    });
    return check;
}