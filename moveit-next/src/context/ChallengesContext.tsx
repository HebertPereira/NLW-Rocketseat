import { createContext, useState, ReactNode, useEffect } from "react";

import challenges from "../../challenges.json";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExpirience: number;
  expirienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExpirience, setCurrentExpirience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenges] = useState(null);

  const expirienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(()=> {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];

    setActiveChallenges(challenge);

    new Audio('notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio!', {
        body: `Valendo ${challenge.amount}xp!`
      })
      
    }
  }

  function resetChallenge() {
    setActiveChallenges(null);
  }

  function completeChallenge() {
    console.log("Complete Task");
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExpirience = currentExpirience + amount;
    if (finalExpirience >= expirienceToNextLevel) {
      finalExpirience = finalExpirience - expirienceToNextLevel;
      levelUp();
    }
    setCurrentExpirience(finalExpirience);
    setActiveChallenges(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExpirience,
        challengesCompleted,
        activeChallenge,
        expirienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
