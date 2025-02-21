import React, { useState, useEffect } from 'react';
import bingoData from '../Data/BingoData';
import './Admin.css';

function Admin() {
  const bingoLetters = ["B", "I", "N", "G", "O"];
  const [numbers, setNumbers] = useState([...Array(75).keys()].map(n => n + 1));
  const [currentNumber, setCurrentNumber] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [searchPlayer, setSearchPlayer] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [players, setPlayers] = useState(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [betAmount, setBetAmount] = useState(0); // Store the bet amount
  const [winAmount, setWinAmount] = useState(0); // Store the win amount after 20% cut

  useEffect(() => {
    let interval;
    if (isRunning && numbers.length > 0) {
      interval = setInterval(() => {
        drawNumber();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isRunning, numbers]);

  const drawNumber = () => {
    if (numbers.length === 0) {
      setIsRunning(false);
      return;
    }
    const index = Math.floor(Math.random() * numbers.length);
    const number = numbers[index];

    let letter;
    if (number >= 1 && number <= 15) letter = "B";
    else if (number >= 16 && number <= 30) letter = "I";
    else if (number >= 31 && number <= 45) letter = "N";
    else if (number >= 46 && number <= 60) letter = "G";
    else letter = "O";

    setCurrentNumber(`${letter}${number}`);
    setSelectedNumbers([...selectedNumbers, number.toString()]);
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const togglePlayerSelection = (player) => {
    setSelectedPlayers(prevSelected =>
      prevSelected.includes(player)
        ? prevSelected.filter(p => p !== player)
        : [...prevSelected, player]
    );
  };

  const checkPlayerWin = () => {
    if (!selectedPlayers.includes(searchPlayer)) {
      setSearchResult("This player is not in the current game.");
      return;
    }

    if (!bingoData.numbers[searchPlayer]) {
      setSearchResult("Player not found.");
      return;
    }

    const card = bingoData.numbers[searchPlayer];
    if (isWinningCard(card)) {
      setSearchResult(`🎉 Player ${searchPlayer.toUpperCase()} Wins! 🎉`);
    } else {
      setSearchResult(`Player ${searchPlayer.toUpperCase()} has not won yet.`);
    }
  };

  const isWinningCard = (card) => {
    if (card.some(row => row.every(num => num === "FREE" || selectedNumbers.includes(num)))) return true;
    
    for (let col = 0; col < 5; col++) {
      if (card.every(row => row[col] === "FREE" || selectedNumbers.includes(row[col]))) return true;
    }

    if ([0, 1, 2, 3, 4].every(i => card[i][i] === "FREE" || selectedNumbers.includes(card[i][i]))) return true;
    if ([0, 1, 2, 3, 4].every(i => card[i][4 - i] === "FREE" || selectedNumbers.includes(card[i][4 - i]))) return true;
    
    const corners = [card[0][0], card[0][4], card[4][0], card[4][4]];
    return corners.every(num => num === "FREE" || selectedNumbers.includes(num));
  };

  const handleBetAmountChange = (e) => {
    setBetAmount(Number(e.target.value));
  };

  const calculateWinAmount = () => {
    const totalBet = betAmount * selectedPlayers.length;
    const win = totalBet - totalBet * 0.15; // Cut 15%
    setWinAmount(win);
  };

  useEffect(() => {
    if (selectedPlayers.length > 0 && betAmount > 0) {
      calculateWinAmount();
    }
  }, [betAmount, selectedPlayers]);

  return (
    <div className="admin-container">
      <h1 className="title">Bingo Number Generator</h1>
      <div className="current-number">{currentNumber ? currentNumber : "Waiting..."}</div>
      
      <div className="button-container">
        <button onClick={() => setIsRunning(true)} className="btn start-stop">Start</button>
        <button onClick={() => setIsRunning(false)} className="btn start-stop">Stop</button>
        <button onClick={() => {
          setNumbers([...Array(75).keys()].map(n => n + 1));
          setCurrentNumber(null);
          setSelectedNumbers([]);
          setIsRunning(false);
          setSearchResult(null);
          setSelectedPlayers([]);
          setBetAmount(0);
          setWinAmount(0);
        }} className="btn reset">Reset</button>
      </div>
      
      <div className="player-selection">
        <h2>Select Players</h2>
        {players.map(player => (
          <label key={player}>
            <input
              type="checkbox"
              checked={selectedPlayers.includes(player)}
              onChange={() => togglePlayerSelection(player)}
            />
            {player.toUpperCase()}
          </label>
        ))}
      </div>

      <div className="bet-container">
        <h2>Enter Bet Amount</h2>
        <input
          type="number"
          min="0"
          value={betAmount}
          onChange={handleBetAmountChange}
          placeholder="Bet Amount"
          className="bet-input"
        />
      </div>

      <div className="win-amount">
        {selectedPlayers.length > 0 && betAmount > 0 && (
          <h2>Total Win Amount : {winAmount.toFixed(2)}</h2>
        )}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter player name (one, two, three...)"
          value={searchPlayer}
          onChange={(e) => setSearchPlayer(e.target.value.toLowerCase())}
          className="search-input"
        />
        <button onClick={checkPlayerWin} className="btn search-btn">Check Winner</button>
      </div>

      {searchResult && <div className="search-result"><h2>{searchResult}</h2></div>}
      
      <table className="bingo-table">
        <thead>
          <tr>
            <th></th>
            {[...Array(15)].map((_, col) => <th key={col}>{col + 1}</th>)}
          </tr>
        </thead>
        <tbody>
          {bingoLetters.map((letter, row) => (
            <tr key={row}>
              <td className="letter">{letter}</td>
              {[...Array(15)].map((_, col) => {
                const num = row * 15 + col + 1;
                return (
                  <td key={num} className={selectedNumbers.includes(num.toString()) ? "selected" : ""}>
                    {num}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
