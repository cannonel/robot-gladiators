/* GAME FUNCTIONS */

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min + 1) + min);

  return value;
};

// fight function
var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player to fight or run
    var promptFight = window.prompt(
      'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
    );

    // if player picks "skip" confirm, then stop loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm(" Are you sure you'd like to quit? ");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye! ");
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money)
        break;
      }
    }


    // remove enemy health by subtracting the amt set in playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name +
        " attacked " +
        enemy.name +
        " . " +
        enemy.name +
        " now has " +
        enemy.health +
        " health remaining. "
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died! ");

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left. ");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable

    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log( enemy.name + " attacked " + playerInfo.name + " . " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "

    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died! ");
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left ");
    }
  } // end of loop
}; // end of fight function

// STARTGAME FUNCTION BEGIN
var startGame = function () {
 // reset player stats
 playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
     

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);


      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

         // if yes, take them to the store() function
         if (storeConfirm) {
          shop();
         }
        }
      }

    // if player isn't alive, break loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("the game has now ended. Let's see how you did!");

  // if player is still alive,player wins
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// go to shop between battles function

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
    }
    else {
        window.alert("You don't have enough money!");
    }
      break;
    case 'UPGRADE':
    case 'upgrade':
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
    }
    else {
        window.alert("You don't have enough money!");
    }
      break;
    case 'LEAVE':
    case 'leave':
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min + 1) + min);

  return value;
};

//SHOP FUNCTION 
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
     playerInfo.refillHealth();
     break;

    case 'UPGRADE':
    case 'upgrade':
      playerInfo.upgradeAttack();
      break;

    case 'LEAVE':
    case 'leave':
      window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

 // function to set name
 var getPlayerName = function() {
   var name = "";

   while (name === "" || name === null) {
     name = prompt("What is your robot's name?");
   }
   console.log("Your robot's name is " + name);
   return name;
 };
/* END GAME FUNCTIONS */

/* GAME INFO / VARIABLES */

 var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
    this.health += 20;
    this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
    this.attack += 6;
    this.money -= 7;
  }
  else {
    window.alert("You don't have enough money!");
  }
}
  };
  

  var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
  ];
/* END GAME INFO / VARIABLES */

// start first game when page loads
startGame();

