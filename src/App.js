import React from 'react';

import { connect } from 'react-redux';

import './App.css';

import Question from './components/Question';
import Button from './components/Button';
import Result from './components/Result';

const App = ({ currentQuestion }) => {
    return (
        <div className="App">
            {currentQuestion ? <Question /> : <Result />}
            <Button />
        </div>
    );
};

const mapStateToProps = ({ currentQuestion }) => {
    return {
        currentQuestion
    };
};

export default connect(mapStateToProps)(App);
