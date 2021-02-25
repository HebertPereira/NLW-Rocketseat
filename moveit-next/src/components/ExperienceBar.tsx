import React, { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";

import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExpirience, expirienceToNextLevel } = useContext(
    ChallengesContext
  );

  const percentToNextLevel =
    Math.round(currentExpirience * 100) / expirienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%`, transition: 'width 0.8s' }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExpirience} xp
        </span>
      </div>
      <span>{expirienceToNextLevel} xp</span>
    </header>
  );
}
