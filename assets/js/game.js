
// Initialize Global Variables
var yourChar;
var yourAttackPower;
var yourHealth;
var yourNewAttackPower;

var defenderChar;
var defenderAttackPower;
var defenderHealth;

var battleOn;
var players = [];

// Initialize Game
gameinit();

// Game Initialization Function
function gameinit() {

    // Reset Variable
    yourChar = "";
    yourAttackPower = "";
    yourHealth = "";
    yourNewAttackPower = "";

    defenderChar = "";
    defenderAttackPower = "";
    defenderHealth = "";

    // Set Battle to Off
    battleOn = false;

    // Set Characters JSON Array
    players = {
        characters: {
            luke: {
                charId: "luke",
                name: "Luke Skywalker",
                attackpower: 20,
                counter: 10,
                health: 120,
                avatar: "assets/images/luke.png"
            },
            stormtrooper: {
                charId: "stormtrooper",
                name: "Storm Trooper",
                attackpower: 10,
                counter: 15,
                health: 150,
                avatar: "assets/images/stormtrooper.png"
            },
            darthmaul: {
                charId: "darthmaul",
                name: "Darth Maul",
                attackpower: 10,
                counter: 16,
                health: 160,
                avatar: "assets/images/darthmaul.png"
            },
            vader: {
                charId: "vader",
                name: "Vader",
                attackpower: 12,
                counter: 20,
                health: 180,
                avatar: "assets/images/vader.png"
            } 
        }
    }

    // Empty and Reset Divs
    $("#message").html("<h1>Select Your Character</h1>")
    $("#youravatar, #yourhealth, #attackpower, #defenderavatar, #defenderhealth, #attack, #defenderattackpower, #submessage").html("");

    // Call Function to Display Characters to Pick
    displayChars();
}


// Display Characters to Pick
function displayChars() {
    $("#displaychars").html("");
    $.each(players.characters, function(i, v) {
        $("#displaychars").append("<a href=\"#\" class=\"selectchar\" value=\"" + v.charId + "\"><div class=\"char rounded\"><img src=\"" + v.avatar + "\"><br>" + v.name + "</div></a>"); 
    });
};


// Function called when a character is selected 

$(document).on("click", ".selectchar", function() {
    // Make sure battle is not on
    if (!battleOn) {

        // If Your Character is not set
        if (yourChar == "") {

            // Get picked character
            yourCharValue = $(this).attr('value'); 
            yourChar = players.characters[yourCharValue];

            // Set Attack Power
            yourAttackPower = yourChar.attackpower;
            yourNewAttackPower = yourAttackPower;

            //Set Health
            yourHealth = yourChar.health;

            // Update Avatar, Name and Health in Your section    
            $("#youravatar").html("<div class=\"char rounded\"><img src=\"" + yourChar.avatar + "\"></div><br>" + yourChar.name);
            $("#yourhealth").html(yourHealth);
            $("#attackpower").html("Attack Power: " + yourAttackPower);

            // Remove character from available characters
            delete players.characters[yourCharValue];

            // Display remaining characters to pick enemy
            displayChars();
            $("#message").html("<h1>Pick an Enemy</h1>");

            // If Defender character is not set
        } else if (yourChar != "" && defenderChar == "") {

            // Get picked character
            defenderCharValue = $(this).attr('value');
            defenderChar = players.characters[defenderCharValue];

            // Set Defender Attack Power
            defenderAttackPower = defenderChar.counter;
            defenderHealth = defenderChar.health;

            // Update Avatar, Name and Health in Defender section
            $("#defenderavatar").html("<div class=\"char rounded\"><img src=\"" + defenderChar.avatar + "\"></div><br>" + defenderChar.name);
            $("#defenderhealth").html(defenderHealth);
            $("#defenderattackpower").html("Attack Power: " + defenderAttackPower);

            // Remove character from remaining characters
            delete players.characters[defenderCharValue];

            // Update Message to notify user battle can start
            $("#message").html("<h1>Let's Battle!</h1>");
            
            // Display Attack Button
            $("#displaychars").html("");
            $("#attack").html("<button class=\"btn btn-lg btn-danger mt-5\" id=\"attackbtn\">ATTACK ENEMY</button>");
            battleOn = true;
        }
    } else {
        // If battle is on
        alert("Battle is already on! Attack!");
    }
});

// Function called when Attack button is clicked
$(document).on("click", "#attackbtn", function() {
    // Reduce Defender Health
    defenderHealth -= yourNewAttackPower;
    $("#defenderhealth").html(defenderHealth);

    // Reduce Your Health
    yourHealth -= defenderAttackPower;
    $("#yourhealth").html(yourHealth);

    // Notify user of what happened
    $("#submessage").html("You attacked with " + yourNewAttackPower + " power. Your enemy attacked with " + defenderAttackPower + " power.");
    yourNewAttackPower += yourAttackPower;
    $("#attackpower").html("Attack Power: " + yourNewAttackPower);

    // If your health is less than 0, then you lose
    if (yourHealth < 0) {
        $("#message").html("<h1>You Lose!</h1>");
        $("#attack").html("<button class=\"btn btn-success btn-lg\" id=\"reset\">Restart Game</button>");
    };
    
    // If defender health is less than 0, then you pick new enemy until there are no enemies to fight
    if (defenderHealth < 0) {
        // Check if more enemies left to fight.
        if (Object.keys(players.characters).length > 0) {
            $("#message").html("<h1>Enemy Defeated!</h1>");
            $("#attack").html("<button class=\"btn btn-primary btn-lg\" id=\"pickenemy\">Pick Next Enemy</button>");
            battleOn = false;
        // If no more enemies to fight, you win
        } else {
            $("#message").html("<h1>You Win!</h1>");
            $("#attack").html("<button class=\"btn btn-success btn-lg\" id=\"reset\">Restart Game</button>");
            battleOn = false;
        }
        
    };
});

// Function to reset defender variables and pick new enemy 
$(document).on("click", "#pickenemy", function() {
    $("#submessage").html("");
    defenderChar = "";
    defenderHealth = "";
    $("#message").html("<h1>Pick a Defender</h1>");
    $("#attack").html("");
    displayChars();
});

// Reset function
$(document).on("click", "#reset", function() {
    gameinit();
});