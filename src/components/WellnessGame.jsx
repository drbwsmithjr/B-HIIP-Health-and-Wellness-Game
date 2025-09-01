import React, { useState, useEffect } from 'react';
import { Heart, Battery, Brain, Smile, Frown } from 'lucide-react';

const WellnessGame = () => {
  const [character, setCharacter] = useState({
    name: 'Alex',
    health: 50,
    energy: 50,
    mood: 50,
    points: 0,
    level: 1
  });
  
  const [currentScenario, setCurrentScenario] = useState(0);
  const [gameMessage, setGameMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: "Breakfast Time! 🌅",
      question: "What will you choose for breakfast?",
      goodChoice: {
        text: "🥗 Oatmeal with fresh berries and nuts",
        effect: { health: 15, energy: 10, mood: 5 },
        message: "Great choice! A nutritious breakfast gives you sustained energy for the day!"
      },
      badChoice: {
        text: "🍩 Sugary donut and energy drink",
        effect: { health: -10, energy: 5, mood: -5 },
        message: "You feel a quick sugar rush, but it won't last long and might leave you crashing later."
      }
    },
    {
      id: 2,
      title: "Exercise Decision 💪",
      question: "How will you spend your free hour?",
      goodChoice: {
        text: "🏃‍♂️ Go for a 30-minute jog",
        effect: { health: 20, energy: 10, mood: 15 },
        message: "Excellent! Exercise boosts your mood, energy, and overall health!"
      },
      badChoice: {
        text: "📱 Scroll social media on the couch",
        effect: { health: -5, energy: -10, mood: -10 },
        message: "You feel more tired and a bit down after sitting for so long."
      }
    },
    {
      id: 3,
      title: "Stress Management 😤",
      question: "You're feeling overwhelmed. What do you do?",
      goodChoice: {
        text: "🧘‍♂️ Take 10 minutes to meditate",
        effect: { health: 10, energy: 5, mood: 20 },
        message: "Wonderful! Meditation helps clear your mind and reduces stress hormones."
      },
      badChoice: {
        text: "😡 Vent frustration and stay angry",
        effect: { health: -15, energy: -5, mood: -15 },
        message: "Staying in stress mode takes a toll on your body and mind."
      }
    },
    {
      id: 4,
      title: "Bedtime Routine 🌙",
      question: "It's 10 PM. What's your choice?",
      goodChoice: {
        text: "😴 Wind down and get 8 hours of sleep",
        effect: { health: 15, energy: 20, mood: 10 },
        message: "Perfect! Good sleep is essential for recovery and mental clarity."
      },
      badChoice: {
        text: "📺 Stay up watching TV until 2 AM",
        effect: { health: -20, energy: -15, mood: -10 },
        message: "You feel groggy and irritable from lack of sleep."
      }
    },
    {
      id: 5,
      title: "Snack Attack 🍿",
      question: "You're craving a snack. What sounds good?",
      goodChoice: {
        text: "🥕 Fresh vegetables with hummus",
        effect: { health: 10, energy: 5, mood: 5 },
        message: "Smart choice! Nutritious snacks keep your energy stable."
      },
      badChoice: {
        text: "🍟 Bag of chips and soda",
        effect: { health: -10, energy: -5, mood: 5 },
        message: "Tasty in the moment, but processed foods can leave you feeling sluggish."
      }
    },
    {
      id: 6,
      title: "Social Connection 👥",
      question: "Your friend invites you to hang out. How do you respond?",
      goodChoice: {
        text: "😊 Accept and enjoy quality time together",
        effect: { health: 5, energy: 10, mood: 15 },
        message: "Great! Social connections are vital for mental and emotional well-being."
      },
      badChoice: {
        text: "😞 Decline and isolate yourself",
        effect: { health: -5, energy: -10, mood: -20 },
        message: "Isolation can negatively impact your mood and overall health."
      }
    }
  ];

  const makeChoice = (isGoodChoice) => {
    const scenario = scenarios[currentScenario];
    const choice = isGoodChoice ? scenario.goodChoice : scenario.badChoice;
    
    // Update character stats
    const newCharacter = {
      ...character,
      health: Math.max(0, Math.min(100, character.health + choice.effect.health)),
      energy: Math.max(0, Math.min(100, character.energy + choice.effect.energy)),
      mood: Math.max(0, Math.min(100, character.mood + choice.effect.mood)),
      points: character.points + (isGoodChoice ? 10 : 2)
    };

    // Level up if points reach threshold
    if (newCharacter.points >= character.level * 50) {
      newCharacter.level += 1;
    }

    setCharacter(newCharacter);
    setGameMessage(choice.message);
    setShowResult(true);

    // Auto advance after showing result
    setTimeout(() => {
      setShowResult(false);
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
      } else {
        // Game complete
        setCurrentScenario(scenarios.length);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCharacter({
      name: 'Alex',
      health: 50,
      energy: 50,
      mood: 50,
      points: 0,
      level: 1
    });
    setCurrentScenario(0);
    setGameMessage('');
    setShowResult(false);
  };

  const getStatColor = (value) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatBarColor = (value) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = () => {
    if (character.mood >= 70) return '😊';
    if (character.mood >= 40) return '😐';
    return '😔';
  };

  // Game complete screen
  if (currentScenario >= scenarios.length) {
    const averageWellness = Math.round((character.health + character.energy + character.mood) / 3);
    let finalMessage = '';
    
    if (averageWellness >= 80) {
      finalMessage = "🌟 Amazing! You've mastered the art of wellness! Your healthy choices have paid off.";
    } else if (averageWellness >= 60) {
      finalMessage = "👍 Good job! You're on the right track with your wellness journey.";
    } else if (averageWellness >= 40) {
      finalMessage = "💪 You're making progress! Keep focusing on healthier choices.";
    } else {
      finalMessage = "🌱 Every journey starts with a single step. Try focusing on one healthy habit at a time!";
    }

    return (
      <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🎉 B-HIIP Health and Wellness Game Complete! 🎉</h1>
          
          <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Final Wellness Report</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-sm text-gray-600">Health</div>
                <div className={`text-2xl font-bold ${getStatColor(character.health)}`}> 
                  {character.health}%
                </div>
              </div>
              <div>
                <Battery className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-sm text-gray-600">Energy</div>
                <div className={`text-2xl font-bold ${getStatColor(character.energy)}`}> 
                  {character.energy}%
                </div>
              </div>
              <div>
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-sm text-gray-600">Mood</div>
                <div className={`text-2xl font-bold ${getStatColor(character.mood)}`}> 
                  {character.mood}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="text-4xl mb-2">{getMoodEmoji()}</div>
            <p className="text-lg text-gray-700">{finalMessage}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Total Points: </span>
              <span className="font-bold text-blue-600">{character.points}</span>
              <span className="ml-4 text-sm text-gray-600">Level Reached: </span>
              <span className="font-bold text-purple-600">{character.level}</span>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentScenario];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌟 B-HIIP Health and Wellness Game</h1>
        <p className="text-gray-600">Make healthy choices to improve your character's well-being!</p>
      </div>

      {/* Character Stats */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {getMoodEmoji()} {character.name}
          </h2>
          <div className="text-sm text-gray-600">
            Level {character.level} • {character.points} points
          </div>
        </div>

        <div className="space-y-3">
          {/* Health Bar */}
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium w-16">Health:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getStatBarColor(character.health)}`}
                style={{ width: `${character.health}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold w-8 ${getStatColor(character.health)}`}> 
              {character.health}
            </span>
          </div>

          {/* Energy Bar */}
          <div className="flex items-center space-x-3">
            <Battery className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium w-16">Energy:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getStatBarColor(character.energy)}`}
                style={{ width: `${character.energy}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold w-8 ${getStatColor(character.energy)}`}> 
              {character.energy}
            </span>
          </div>

          {/* Mood Bar */}
          <div className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium w-16">Mood:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getStatBarColor(character.mood)}`}
                style={{ width: `${character.mood}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold w-8 ${getStatColor(character.mood)}`}> 
              {character.mood}
            </span>
          </div>
        </div>
      </div>

      {/* Scenario */}
      {!showResult ? (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{scenario.title}</h3>
          <p className="text-lg text-gray-700 mb-6">{scenario.question}</p>

          <div className="space-y-4">
            <button
              onClick={() => makeChoice(true)}
              className="w-full p-4 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 text-left transition-all transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <Smile className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-800">{scenario.goodChoice.text}</span>
              </div>
            </button>

            <button
              onClick={() => makeChoice(false)}
              className="w-full p-4 bg-red-100 hover:bg-red-200 rounded-lg border-2 border-red-300 text-left transition-all transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <Frown className="w-6 h-6 text-red-600" />
                <span className="font-medium text-gray-800">{scenario.badChoice.text}</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="text-4xl mb-4">{getMoodEmoji()}</div>
          <p className="text-lg text-gray-700 mb-4">{gameMessage}</p>
          <div className="text-sm text-gray-500">Moving to next scenario...</div>
        </div>
      )}

      {/* Progress */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Scenario {currentScenario + 1} of {scenarios.length}
      </div>
    </div>
  );
};

export default WellnessGame;