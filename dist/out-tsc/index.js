var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var s1 = {
    kind: "points",
    pointsPlayerOne: "40",
    pointsPlayerTwo: "40"
};
function scoreWhenDeuce(player) {
    return {
        kind: "advantage",
        player: player
    };
}
function scoreWhenAdvantage(score, player) {
    return player.kind === score.player.kind
        ? {
            kind: "game",
            player: player
        }
        : {
            kind: "deuce"
        };
}
function incrementPoint(point) {
    switch (point) {
        case "love":
            return "15";
        case "15":
            return "30";
        case "30":
            return undefined;
    }
}
function scoreWhenForty(score, player) {
    if (player.kind === score.player.kind) {
        return {
            kind: "game",
            player: player
        };
    }
    else {
        var newPoints = incrementPoint(score.otherPlayerPoints);
        return newPoints === undefined
            ? { kind: "deuce" }
            : __assign({}, score, { otherPlayerPoints: newPoints });
    }
}
function updatePointsData(score, newPoints, player) {
    switch (player.kind) {
        case "playerOne":
            return __assign({}, score, { pointsPlayerOne: newPoints });
        case "playerTwo":
            return __assign({}, score, { pointsPlayerTwo: newPoints });
    }
}
function createFortyData(score, player) {
    var otherPlayerPoints = player.kind === "playerOne"
        ? score.pointsPlayerTwo
        : score.pointsPlayerOne;
    return {
        kind: "forty",
        player: player,
        otherPlayerPoints: otherPlayerPoints
    };
}
function scoreWhenPoints(score, player) {
    var newPoints = player.kind === "playerOne"
        ? incrementPoint(score.pointsPlayerOne)
        : incrementPoint(score.pointsPlayerTwo);
    return newPoints === undefined
        ? createFortyData(score, player)
        : updatePointsData(score, newPoints, player);
}
function score(score, player) {
    switch (score.kind) {
        case "points":
            return scoreWhenPoints(score, player);
        case "forty":
            return scoreWhenForty(score, player);
        case "deuce":
            return scoreWhenDeuce(player);
        case "advantage":
            return scoreWhenAdvantage(score, player);
        case "game":
            return score;
    }
}
//# sourceMappingURL=index.js.map