import React, { useState } from 'react';
import './App.css';
import { QUESTIONS } from './questions.jsx';
/**
 * Main application component.
 */
function App() {
  // Screens: 'main' | 'quiz' | 'results'
  const [screen, setScreen] = useState('main');

  // Data needed for the quiz
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  // Keep track of attempts for display on the Main screen
  // Each attempt is an object: { questionCount, correctCount, wrongQuestions[] }
  const [attempts, setAttempts] = useState([]);

  /**
   * Shuffle the QUESTIONS array and start the quiz.
   */
  const startQuiz = () => {
    // Simple shuffle (Fisher-Yates or naive approach)
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestionList(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setShowAnswer(false);
    setScreen('quiz');
  };

  /**
   * Move to the next question in the list (Question stage).
   */
  const moveToNextQuestion = () => {
    setShowAnswer(false);

    // If there are more questions, go to the next one
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If we've reached the end of the list, you could auto-finalize,
      // or you could keep letting the user press "finalize" manually.
      // For now, let's do nothing special. The user can press "Finalize."
      finalizeQuiz();
    }
  };

  /**
   * Mark current question as correct or wrong.
   */
  const markCorrect = () => {
    setScore(score + 1);
    moveToNextQuestion();
  };

  const markWrong = () => {
    // Add the current question to the list of wrongAnswers
    const currentQ = questionList[currentQuestionIndex];
    setWrongAnswers([...wrongAnswers, currentQ]);
    moveToNextQuestion();
  };

  /**
   * Finalize the quiz and go to the Results screen.
   */
  const finalizeQuiz = () => {
    // Save attempt data
    const attemptData = {
      questionCount: questionList.length,
      correctCount: score,
      wrongQuestions: wrongAnswers,
    };
    setAttempts([...attempts, attemptData]);
    setScreen('results');
  };

  /**
   * Return to the Main screen from Results screen.
   */
  const goToMain = () => {
    setScreen('main');
  };

  /**
   * Main screen layout
   */
  const renderMainScreen = () => {
    return (
      <div style={styles.container}>
        <h1>Main Screen</h1>
        <button onClick={startQuiz}>Start Quiz</button>
        <h2>Previous Attempts:</h2>
        <ul>
          {attempts.map((att, i) => (
            <li key={i}>
              Attempt {i + 1}: {att.correctCount} / {att.questionCount} correct
            </li>
          ))}
        </ul>
      </div>
    );
  };

  /**
   * Quiz screen layout (with two "stages": Question and Outcome).
   */
  const renderQuizScreen = () => {
    const currentQ = questionList[currentQuestionIndex];

    if (!currentQ) {
      // Fallback if no question is loaded
      return (
        <div style={styles.container}>
          <p>No questions to display.</p>
          <button onClick={goToMain}>Back to Main</button>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <h1>Quiz Screen</h1>
        <h2>Question {currentQuestionIndex + 1} of {questionList.length}:</h2>
        <p>{currentQ.question}</p>

        {!showAnswer && (
          <button onClick={() => setShowAnswer(true)}>
            Show Answer
          </button>
        )}

        {showAnswer && (
          <div>
            <p><b>Valid answers:</b></p>
            <ul style={styles.textLeft}>
              {currentQ.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
               ))}
            </ul>
            <button onClick={markCorrect}>Correct</button>
            <button onClick={markWrong}>Wrong</button>
          </div>
        )}

        <hr />
        <button onClick={finalizeQuiz}>
          Finalize
        </button>
      </div>
    );
  };

  /**
   * Results screen layout
   */
  const renderResultsScreen = () => {
    // Retrieve the last attempt
    const lastAttempt = attempts[attempts.length - 1];

    if (!lastAttempt) {
      return (
        <div style={styles.container}>
          <p>No results to display.</p>
          <button onClick={goToMain}>To Main</button>
        </div>
      );
    }

    const { questionCount, correctCount, wrongQuestions } = lastAttempt;

    return (
      <div style={styles.container}>
        <h1>Results</h1>
        <p>
          You scored {correctCount} out of {questionCount}.
        </p>
        <h3>Incorrectly Answered Questions:</h3>
        {wrongQuestions.length === 0 ? (
          <p>All correct!</p>
        ) : (
          <ul>
            {wrongQuestions.map((q) => (
              <li key={q.id}>{q.question}</li>
            ))}
          </ul>
        )}
        <button onClick={goToMain}>To Main</button>
      </div>
    );
  };

  /**
   * Conditionally render the screen based on current `screen` state.
   */
  const renderScreen = () => {
    switch (screen) {
      case 'main':
        return renderMainScreen();
      case 'quiz':
        return renderQuizScreen();
      case 'results':
        return renderResultsScreen();
      default:
        return <div>Invalid screen state</div>;
    }
  };

  return <div>{renderScreen()}</div>;
}

/**
 * Simple CSS-in-JS object for inline styling.
 */
const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '2rem',
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  }
};

export default App;
