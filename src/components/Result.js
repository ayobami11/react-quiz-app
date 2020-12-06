import React from 'react';

import { connect } from 'react-redux';

import '../css/Result.css';

/**
 * The Result component.
 * Prepares the results of the quiz upon completion.
 *
 * @param {object} props The props for the Result component
 */
const Result = ({
    currentQuestionIndex,
    totalScore,
    questions,
    wrongAnswers
}) => {
    // Gathers all the questions which the user missed
    const missedQuestions = wrongAnswers.map((wrongAnswer) => {
        return questions.find(({ answers }) => answers.includes(wrongAnswer));
    });
    /* From the each of the missedQuestions, the user's answer and the correct answers are gathered
    to be rendered on the screen */
    const quizCorrections = missedQuestions.map((missedQuestion) => {
        const userChoice = missedQuestion.answers.find(
            ({ selected }) => selected
        );
        const correctChoice = missedQuestion.answers.find(
            ({ isCorrect }) => isCorrect
        );

        return (
            <div className="correction">
                <p className="missed-question"><i className="fas fa-arrow-circle-right"></i> {missedQuestion.question}</p>
                <p>
                    {/* Displays the option the user selected. 
                    If the user doesn't pick any option, 'No answer' is returned by default */}
                    Your answer:{' '}
                    <span className="option-incorrect">
                        {userChoice?.option || 'No answer'}
                    </span>
                </p>
                <p>
                    {/* Displays the correct answer for the missed question */}
                    Correct answer:{' '}
                    <span className="option-correct">
                        {correctChoice.option}
                    </span>
                </p>
            </div>
        );
    });

    return (
        <div className="Result">
            {currentQuestionIndex ? (
                <>
                    <p className="total-score">
                        Total score: {totalScore} / {questions.length}
                    </p>
                    <div className="corrections">
                        {/* React automatically handles the keys of the array elements */}
                        {React.Children.toArray(quizCorrections)}
                    </div>
                </>
            ) : (
                <p className="welcome">Welcome to the quiz</p>
            )}
        </div>
    );
};

/**
 * Creates and returns the props for the Result component
 *
 * @param {object} props The props for the Result component
 */
const mapStateToProps = ({
    questions,
    currentQuestionIndex,
    totalScore,
    wrongAnswers
}) => {
    return {
        questions,
        currentQuestionIndex,
        totalScore,
        wrongAnswers
    };
};

export default connect(mapStateToProps)(Result);
