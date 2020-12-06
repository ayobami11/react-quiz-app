import React from 'react';

import { connect } from 'react-redux';

import { displayQuestion } from '../actions/displayQuestion';

import '../css/Button.css';

const Button = ({ currentQuestion, displayQuestion }) => {
    return (
        <button className="quiz-btn" onClick={displayQuestion}>
            {currentQuestion ? 'Next' : 'Start'}
        </button>
    );
};

const mapStateToProps = ({ currentQuestion }) => {
    return {
        currentQuestion
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayQuestion: () => dispatch(displayQuestion())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
