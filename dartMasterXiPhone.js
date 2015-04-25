
// ******************************** Initialization
// Globel variables, state, parameter handling
var stringEntered = "";
//gameState: 0 = no game
//           1 = game selected
var gameState=0;
var gameValue = parseInt(getParameterByName('game'));
if(!gameValue)
{
    gameValue="";
}
else
{
    gameState=1;
}
document.getElementById("remainsLeft").value=gameValue;
document.getElementById("remainsRight").value=gameValue;
document.getElementById("scoredLeft").value="";
document.getElementById("scoredRight").value="";
document.getElementById("enteredVal").value="";

//setup a stack for each player to undo throws
var leftStack = [];
var rightStack = [];
var stacks = [leftStack,rightStack];

//handle button clicks for numbers
function numClicked(myValue)
{
    newStringEntered =   stringEntered +  myValue;    
    stringEntered=newStringEntered;
    document.getElementById("enteredVal").value = stringEntered;
}

//Handle scoring and possibly game setup
//This may not be the most efficient way, but it works
function submitScore(remainsElementName, scoredElementName, stackIndex)
{
    var scoreValue = eval(document.getElementById(remainsElementName).value);
    var stringVal = eval(stringEntered);
    if(gameState == 1)
    {
	if(stringVal < 181)
	{
    	    scoreValue -= eval(stringEntered);
	    
    	    if(scoreValue > 0)
    	    {
		document.getElementById(scoredElementName).value = stringEntered;
		document.getElementById(remainsElementName).value = scoreValue;
		stacks[stackIndex].push(stringEntered);
    	    }
	    else if (scoreValue == 0 )
	    {
		document.getElementById(remainsElementName).value = "WINNER!";
	    }
	}
    	document.getElementById("enteredVal").value="";
    	stringEntered="";
    }
    else
    {
    	if(stringVal && stringVal > 0)
    	{
    	    gameValue=stringVal;
    	    document.getElementById("remainsLeft").value=gameValue;
    	    document.getElementById("remainsRight").value=gameValue;
    	    document.getElementById("enteredVal").value="";
    	    stringEntered="";
    	    gameState=1;
    	}
    }
}



//handle the overall reset button
function reset()
{
    document.getElementById("remainsLeft").value="";
    document.getElementById("remainsRight").value="";
    document.getElementById("scoredLeft").value="";
    document.getElementById("scoredRight").value="";
    document.getElementById("enteredVal").value="";
    gameState=0;
    stringEntered="";
    stacks[0]=[];
    stacks[1]=[];
}

//reset the current entry or undo the last entry on that side
function resetSide(remainsElementName, scoredElementName, side)
{
    if(stringEntered == "")
    {
	var tempString = stacks[side].pop();
	if(tempString)
	{
	    stringEntered=tempString;
	    document.getElementById("enteredVal").value=stringEntered;
	    document.getElementById(scoredElementName).value = "";
	    var element = document.getElementById(remainsElementName);
	    var remainingVal = eval(element.value) + eval(tempString);
	    element.value = remainingVal;
	}
    }
    else
    {
	document.getElementById("enteredVal").value="";
	stringEntered="";
    }
}

//Blatently stolen from stackoverflow
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function foo()
{
    alert("FOO!");
}

function showResolution()
{
    var screenx = window.innerWidth;
    var screeny = window.innerHeight;
    var foo = screenx + "," + screeny;
    alert(foo);
}
