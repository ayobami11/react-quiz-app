import React from 'react';

import { connect } from 'react-redux';

import { checkAnswer } from '../actions/checkAnswer';

import '../css/Question.css';

/**
 * Displays each question for the quiz
 *
 * @param {object} props The props for the Question component
 */
const Question = ({ currentQuestion, checkAnswer }) => {
    const questionOptions = currentQuestion.answers.map(
        ({ option, selected }, index, array) => (
            <div className="option">
                <input
                    id={option}
                    className="option-input"
                    name={'question' + array.indexOf(option)}
                    type="radio"
                    checked={selected}
                    readOnly={true}
                    aria-checked={selected}
                />
                <label
                    htmlFor={option}
                    onClick={() => checkAnswer(currentQuestion.id, option)}
                    className={`option-text ${selected && 'option-selected'}`}
                >
                    {option}
                </label>
            </div>
        )
    );

    return (
        <div className="question-container">
            {currentQuestion && (
                <p className="question">{currentQuestion.question}</p>
            )}
            {currentQuestion && (
                <div className="options">
                    {React.Children.toArray(questionOptions)}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ currentQuestion }) => {
    return {
        currentQuestion
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAnswer: (questionId, option) =>
            dispatch(checkAnswer(questionId, option))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
