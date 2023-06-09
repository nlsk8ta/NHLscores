// Array of team IDs to fetch data for
const teamIDs = [
  12, 17, 25, 26, // Joe's Teams
  3, 26, 25, 7,   // Matt's Teams
  3, 13, 2, 54,   // Tom's Teams
  3, 10, 17, 23,  // Ren's Teams
  14, 5, 24, 28,  // Max's Teams
  10, 30, 17, 29  // Jeff's Teams
  6, 22, 29, 9    // Jay's Teams
];

// Function to fetch data for a single team
async function fetchTeamData(teamID) {
  const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamID}/stats`);
  const data = await response.json();
  const stats = data.stats[0].splits[0].stat;
  return {
    wins: stats.wins,
    losses: stats.losses,
    ot: stats.ot,
    points: stats.pts
  };
}

// Function to update a table cell with the given value
function updateTableCell(tableID, rowID, cellID, value) {
  const cell = document.getElementById(`${tableID}${rowID}${cellID}`);
  cell.textContent = value;
}

// Function to update a team's row in the table with the given data
async function updateTableRow(tableID, rowID, teamID) {
  const teamData = await fetchTeamData(teamID);
  updateTableCell(tableID, rowID, 1, teamData.wins);
  updateTableCell(tableID, rowID, 2, teamData.losses);
  updateTableCell(tableID, rowID, 3, teamData.ot);
  updateTableCell(tableID, rowID, 4, teamData.points);
}

// Function to update the total points row for a table
function updateTotalPointsRow(tableID, numRows) {
  let totalPoints = 0;
  for (let i = 1; i <= numRows; i++) {
    const pointsCell = document.getElementById(`${tableID}${i}4`);
    totalPoints += parseInt(pointsCell.textContent);
  }
  updateTableCell(tableID, numRows + 1, 1, 'Total Points');
  updateTableCell(tableID, numRows + 1, 4, totalPoints);
}

// Loop through each table and update the rows with data
const tables = document.getElementsByTagName('table');
for (let i = 0; i < tables.length; i++) {
  const table = tables[i];
  const numRows = table.rows.length - 1;
  const tableID = table.getAttribute('id');
  for (let j = 1; j <= numRows; j++) {
    const rowID = j.toString();
    const teamID = teamIDs[(i * numRows) + (j - 1)];
    updateTableRow(tableID, rowID, teamID);
  }
  updateTotalPointsRow(tableID, numRows);
}
