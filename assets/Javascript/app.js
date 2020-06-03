var wins=0;
var losses=0;
var skippedCount=0;
var questionGen=[0,1,2,3,4,5,6,7,8,9];
var questionTimer=25;
var intervalId;
var delay;
var correct="";
var userResponse="";
var q="";
var questionsAnswers = [
    {
        question: "Q: He is his own best friend.",
        photo: "assets/images/barf.jpg alt=Mog",
        answer_a: "Lonestar",
        answer_b: "Bender",
        answer_c: "Barf",
        answer_d: "Clifford",
        answer: "3",
        correct: "Barf",
    },
    {
        question: "Q: What is beyond Ludicris Speed?",
        photo: "assets/images/q3_ludicrousspeed.gif alt=speed",
        answer_a: "Snails Pace",
        answer_b: "Ridiculous Speed",
        answer_c: "Light Speed",
        answer_d: "Plaid",
        answer: "4",
        correct: "Plaid",
    },
    {
        question: "Q: What was the combination for the airlock also an idiots luggage?",
        photo: "assets/images/airlock.jpg alt=Airlock",
        answer_a: "8675309",
        answer_b: "1,2,3,4,5",
        answer_c: "Password",
        answer_d: "OpenSaysMe",
        answer: "2",
        correct: "12345",
    },
    {
        question: "Q: Who is the only person in the galaxy to dare give Dark Helmet the Raspberry is:",
        photo: "assets/images/spaceballs_radarjam.jpg alt=jam radar",
        answer_a: "Lone Starr",
        answer_b: "Bender",
        answer_c: "Yogurt",
        answer_d: "Shmuchers",
        answer: "1",
        correct: "Lone Starr",
    },
    {
        question: "Q: What Orders are taken too literal?",
        photo: "assets/images/comb.gif alt=dessert",
        answer_a: "Reading between the lines",
        answer_b: "Trying to find the needle in the haystack",
        answer_c: "Combing the dessert",
        answer_d: "Turnning over every leaf",
        answer: "3",
        correct: "Combing the dessert",
    },
    {
        question: "Q: Dark Helmet is surrounded by what on the bridge?",
        photo: "assets/images/Assholes.png alt=Crew",
        answer_a: "Idiots",
        answer_b: "Assholes",
        answer_c: "Yogurt",
        answer_d: "Storm Troopers",
        answer: "2",
        correct: "Assholes",
    },
    {
        question: "Q: What Spaceballs Merchandise will the kids love?",
        photo: "assets/images/merchandise.gif alt=Merchandise",
        answer_a: "Lunchbox",
        answer_b: "Breakfast Cereal",
        answer_c: "VHS",
        answer_d: "Flamethrower",
        answer: "4",
        correct: "Flamethrower",
    },
    {
        question: "Q: What did Colonel Sandurz not see Dark Helmet doing again?",
        photo: "assets/images/playing.jpg alt=dolls",
        answer_a: "On the John",
        answer_b: "Locked in a locker",
        answer_c: "Playing with his dolls agian",
        answer_d: "Sleeping",
        answer: "3",
        correct: "Playing with his dolls agian",
    },
    {
        question: "Q: When will then be now?",
        photo: "assets/images/thenbenow.gif alt=VHS",
        answer_a: "Soon",
        answer_b: "Later",
        answer_c: "Tomorrow",
        answer_d: "Yesterday",
        answer: "1",
        correct: "Soon",
    },
    {
        question: "Q: Who is Dark Helmet to Lone Starr?",
        photo: "assets/images/darkhelmet.jpg alt=Darkhelmet",
        answer_a: "Evil",
        answer_b: "I am your father's brother's nephew's cousin's former roommate",
        answer_c: "Absolutely Nothing",
        answer_d: "All of these things",
        answer: "4",
        correct: "All of these things",
    },
];
$(document).ready(function() {
    gameStart();
    function gameStart() {
        var startBtn = $("<button>");
        startBtn.text("Start");
        $(".start").append(startBtn);
        console.log(questionGen.length)
    }
});
$(".start").on("click", function(){
    $(".start").empty();
    randomQuestion();
});
function randomQuestion() { 
    $(".question, .answer, .message_recieved, .correct, .photo-holder, .times-up, .gameover, .message, .wins, .losses, .skipped, .do-over").empty();
    $(".timer").html("<h4>Time Remaining:  <span>25</span> seconds</h4>");
    var questionIndex = questionGen[Math.floor(Math.random() * questionGen.length)];  
    q = questionsAnswers[questionIndex];
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    questionTimer = 25;
    correct = q.answer;
    $(".question").text(q.question);
    $(".photo-holder").html("<img src=" + q.photo + " height = '200px'>")
    $(".first").text(q.answer_a);
    $(".second").text(q.answer_b);
    $(".third").text(q.answer_c);
    $(".fourth").text(q.answer_d);
    questionGen.splice($.inArray(questionIndex,questionGen), 1);
};
function decrement() {
    questionTimer--;
    $(".timer").html("<h4>Time Remaining:  <span>" + questionTimer + "</span> seconds</h4");
    if (questionTimer === 0) {
        timerStop();
        $(".question, .answer").empty();
        $(".message_recieved").text("Times Up! This is why Good is dumb!");
        $(".correct").html("You should have gone with; <span>" + q.correct + "</span>!");
        skippedCount++
        if(questionGen.length > 0) {
            delay = setTimeout(randomQuestion, 1500);
        } else {
            delay = setTimeout(endGame, 1500);
        };
    };    
};
function timerStop() {
    clearInterval(intervalId);
};
$(".answer").on("click", function() {
    userResponse = $(this).attr("value");
    rightWrong();
});
function rightWrong() {    
    if (correct === userResponse) {
        $(".question, .answer").empty();
        $(".message_recieved").text("Yogurt would be proud!");
        wins++;
        timerStop();
    } else {
        $(".question, .answer").empty();
        $(".message_recieved").text("Dark Helmet Prevails!");
        $(".correct").html("You should have gone with; <span>" + q.correct + "</span>!");
        losses++;
        timerStop();
    };
    if(questionGen.length > 0) {
        delay = setTimeout(randomQuestion, 1500);
    } else {
        delay = setTimeout(endGame, 1500);
    };
};
function endGame() {
    clearInterval(intervalId);
    $(".timer, .question, .answer, .message_recieved, .correct, .photo-holder, .times-up").empty();
    $(".gameover").text("That's a wrap.");
    $(".message").text("Are you worthy of the Schwartz?");
    $(".wins").text("Good: " + wins);
    $(".losses").text("Bad: " + losses);
    $(".skipped").text("Just didn't even try: " + skippedCount);
    $(".do_over").text("Go Another Round?");
};
$(".do_over").on("click", function() {
    wins = 0;
    losses = 0;
    skippedCount = 0;
    questionGen = [0,1,2,3,4,5,6,7,8,9];
    questionTimer = 25;
    correct = "";
    userResponse = "";
    q = "";
    $(".gameover, .message, .wins, .losses, .skipped, .do_over").empty();
    randomQuestion();
});