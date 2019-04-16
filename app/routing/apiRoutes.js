var friends = require("../data/friends");

//console.log(friends)


module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    console.log(friends)
    res.json(friends);
  });


  app.post("/api/friends", function (req, res) {
    var data = req.body;
    console.log(data);
    res.json(closestMatch(data.scores))
    friends.push(data)
  });

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};

function closestMatch(userInput) {
  var match = [];
  friends.forEach(element => {
    var friendArrary = element.scores
    var difference = totalDifference(userInput, friendArrary)
    console.log(difference)
    if (match.length == 0) {
      match[0] = {
        "totalDiff": difference,
        "name": element.name,
        "photo": element.photo
      }

    } else if (match[0]["totalDiff"] > difference) {
      match[0] = {
        "totalDiff": difference,
        "name": element.name,
        "photo": element.photo
      }
    }
    console.log("HAHA")
    console.log(match)
  });

  console.log("---------------------")
  return(match[0])
}

function totalDifference(userInput, friendArray) {
  var difference = []
  //console.log(userInput)
  for (var i = 0; i < userInput.length; i++) {
    //console.log("_____")
    //console.log(Math.abs(userInput[i] - friendArray[i]))
    difference.push(Math.abs(userInput[i] - friendArray[i]));
  }


  function getSum(total, num) {
    return total + num;
  }

  console.log(difference)

  return difference.reduce(getSum);

}