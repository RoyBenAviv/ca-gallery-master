'use strict';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomTxt() {
    const words = ['Falafel?', 'WTF BRO!', 'Are you joking?',
        'Pinguin', 'JESUS CHRIST', 'MAKARONI!', 'Bamba!', 'TEST ME!',
        'Absolutly', 'Banana', 'Freaking bad', 'UNLUCKY.', 'Nice',
        'Not today.', 'WDYM?', 'Are you real?', 'THAT IS NOT GOOD', 'REALL BAD',
        'R U DRUNK?', 'SUSPICIOUS', 'NO WAY LOL', 'IM THE BOSS', 'Dance.', 'Chicken Dinner', 'Everywhere...',
        'Funny.', 'Not funny.', 'MUHAHAHA', 'LMFAO',
        'I never eat falafel',
        'DOMS DOMS EVERYWHERE',
        'Stop Using i in for loops',
        'Armed in knowledge',
        'Js error "Unexpected String"',
        'One does not simply write js',
        'I`m a simple man i see vanilla JS, i click like!',
        'JS, HTML,CSS?? Even my momma can do that',
        'May the force be with you',
        'I know JS',
        'JS Where everything is made up and the rules dont matter',
        'Not sure if im good at programming or good at googling',
        'But if we could',
        'JS what is this?',
        'Write hello world , add to cv 7 years experienced',
        ];

    var idx = getRandomInt(0, words.length - 1);
    var randomTxt = words[idx];
    return randomTxt;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }