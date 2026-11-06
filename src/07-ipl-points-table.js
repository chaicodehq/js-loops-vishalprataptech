/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  const teamAcc = matches.reduce((acc, curr) => {
    // 1. Initialize teams if they don't exist yet
    if (!acc[curr.team1]) {
      acc[curr.team1] = { team: curr.team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    }
    if (!acc[curr.team2]) {
      acc[curr.team2] = { team: curr.team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    }

    // 2. Increment matches played
    acc[curr.team1].played += 1;
    acc[curr.team2].played += 1;

    // 3. Handle match results
    if (curr.result === 'win') {
      if (curr.winner === curr.team1) {
        acc[curr.team1].won += 1;
        acc[curr.team1].points += 2;
        acc[curr.team2].lost += 1;
      } else {
        acc[curr.team2].won += 1;
        acc[curr.team2].points += 2;
        acc[curr.team1].lost += 1;
      }
    } else if (curr.result === 'tie') {
      acc[curr.team1].tied += 1;
      acc[curr.team1].points += 1;
      acc[curr.team2].tied += 1;
      acc[curr.team2].points += 1;
    } else if (curr.result === 'no_result') {
      acc[curr.team1].noResult += 1;
      acc[curr.team1].points += 1;
      acc[curr.team2].noResult += 1;
      acc[curr.team2].points += 1;
    }

    return acc;
  }, {});

 const arrayOfResult =  Object.values(teamAcc);
 const sortedArray = arrayOfResult.sort((a,b)=>{
  if(a.points > b.points){
    return -1
  }else if(b.points > a.points){
    return 1
  }else if(a.points === b.points){
    return a.team.localeCompare(b.team)
  }
 })
  return sortedArray

}
