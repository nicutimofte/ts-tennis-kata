type Point  = "love" | "15" | "30" | "40";

type PlayerOne = {
    kind: "playerOne";
    name: string;
}

type PlayerTwo = {
    kind: "playerTwo";
    name: string;
}

type Player = PlayerOne | PlayerTwo;

type Deuce = {
    kind: "deuce";
}

type Advantage = {
    kind: "advantage";
    player: Player;
}

type Game = {
    kind: "game";
    player: Player; 
}

type PointsData = {
    kind: "points";
    pointsPlayerOne: Point;
    pointsPlayerTwo: Point;
}

type FortyData = { 
    kind: "forty";
    player: Player;
    otherPlayerPoints: Point;
}

type Score = Deuce | PointsData | FortyData | Advantage | Game;

const s1: Score = {
    kind: "points",
    pointsPlayerOne: "40",
    pointsPlayerTwo: "40"
}

function scoreWhenDeuce(player: Player): Advantage {
    return {
        kind: "advantage",
        player
    }
}

function scoreWhenAdvantage(score: Advantage, player: Player): Game | Deuce {
    return player.kind === score.player.kind
        ? {
            kind: "game",
            player
        }
        : {
            kind: "deuce"
        }
}

function incrementPoint(point: Point): "15" | "30" | undefined {
    switch (point) {
        case "love":
            return "15";
        case "15":
            return "30";
        case "30":
            return undefined;
    }
}

function scoreWhenForty(score: FortyData, player: Player): Game | Deuce | FortyData {
    if (player.kind === score.player.kind) {
        return {
            kind: "game",
            player
        }
    } else {
        const newPoints: Point | undefined = incrementPoint(score.otherPlayerPoints);
        return newPoints === undefined 
            ? { kind: "deuce" }
            : { ...score, otherPlayerPoints: newPoints };
    }
}

function updatePointsData(score: PointsData, newPoints: Point, player: Player): PointsData {
    switch (player.kind) {
        case "playerOne":
            return { ...score, pointsPlayerOne: newPoints };
        case "playerTwo":
            return { ...score, pointsPlayerTwo: newPoints };
    }
}

function createFortyData(score: PointsData, player: Player): FortyData {
    const otherPlayerPoints: Point = player.kind === "playerOne"
        ? score.pointsPlayerTwo
        : score.pointsPlayerOne;
    
    return {
        kind: "forty",
        player,
        otherPlayerPoints
    }
}

function scoreWhenPoints(score: PointsData, player: Player): PointsData | FortyData {
    const newPoints: Point | undefined = player.kind === "playerOne"
        ? incrementPoint(score.pointsPlayerOne)
        : incrementPoint(score.pointsPlayerTwo);
    return newPoints === undefined 
        ? createFortyData(score, player)
        : updatePointsData(score, newPoints, player);
}

function score(score: Score, player: Player): Score {
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