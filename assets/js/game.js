

var yourChar;
var yourScore;
var defenderChar;
var defenderScore;
var battleOn;


var players = {
    characters: {
        luke: {
            charId: "luke",
            name: "Luke Skywalker",
            attackpower: 10,
            avatar: "assets/images/luke.png"
        },
        stormtrooper: {
            charId: "stormtrooper",
            name: "Storm Trooper",
            attackpower: 20,
            avatar: "assets/images/stormtrooper.png"
        },
        darthmaul: {
            charId: "darthmaul",
            name: "Darth Maul",
            attackpower: 30,
            avatar: "assets/images/darthmaul.png"
        },
        vader: {
            charId: "vader",
            name: "Vader",
            attackpower: 40,
            avatar: "assets/images/vader.png"
        } 
    }
}

gameinit();

function gameinit() {
    yourChar = "";
    yourScore = "";
    defenderChar = "";
    defenderScore = "";
    battleOn = false;

    $("#message").html("<h1>Select Your Character</h1>")

    displayChars();

}


    $(document).on("click", ".selectchar", function() {
        if (!battleOn) {
            if (yourChar == "") {
                yourCharValue = $(this).attr('value'); 
                yourChar = players.characters[yourCharValue];
                
                $("#youravatar").html("<div class=\"char rounded\"><img src=\"" + yourChar.avatar + "\"></div><br>" + yourChar.name); 
                console.log("You Picked " + yourChar.name);
                delete players.characters[yourCharValue];
                displayChars();
                $("#message").html("<h1>Pick a Defender</h1>");
    
            } else {
                defenderCharValue = $(this).attr('value');
                defenderChar = players.characters[defenderCharValue];
                $("#defenderavatar").html("<div class=\"char rounded\"><img src=\"" + defenderChar.avatar + "\"></div><br>" + defenderChar.name);  
                console.log("Defender is " + defenderChar.name);
                delete players.characters[defenderCharValue];
                displayChars();
                $("#message").html("<h1>Let's Battle!</h1>");
                battleOn = true;
            }
        } else {
            alert("Battle is already on!");
        }
    });



function displayChars() {
    $("#displaychars").html("");
    $.each(players.characters, function(i, v) {
        $("#displaychars").append("<a class=\"selectchar\" value=\"" + v.charId + "\"><div class=\"char rounded\"><img src=\"" + v.avatar + "\"><br>" + v.name + "</div></a>"); 
    });
};


