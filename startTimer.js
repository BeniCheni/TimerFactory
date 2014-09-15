var INCORRECT_PARAMETERS = [
    "Less than the required four parameters - .create() or .create(.2) or .create(.02, \"keydown\") etc...",
        "Incorrect data type in any of the required parameters - .create(\"bad\", \"click\", 1, fuction(){...}) "
        + "where \"bad\" is an invalid input of tickIntervalMinutes, which should be numeric."
];
var incorrectExampleDiv = document.getElementById('incorrect_example_div');

incorrectExampleDiv.innerHTML = "<ul>";
INCORRECT_PARAMETERS.forEach(function(element, index) {
    incorrectExampleDiv.innerHTML += "<li>" + element + "</li>";
});
incorrectExampleDiv.innerHTML += "</ul>";

var timer = TimerFactory.create(1/60, "click keydown focus scroll", 1/60*15, function(){ console.log('OK'); alert('OK'); });
document.debug = true; // Enable time tick logs in console;
timer.start();