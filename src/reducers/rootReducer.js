import questions from '../questions.json';

const initialState = {
    currentQuestionIndex: 0,
    currentQuestion: null,
    userAnswer: null,
    wrongAnswers: [],
    totalScore: 0,
    questions
};

/**
 * Takes in an array and shuffles the elements of the array.
 * 
 * @param {array} inputArray The array to be shuffled
 */
const shuffleArray = (inputArray) => {
    let inputArrayCopy = [...inputArray];
    const shuffledArray = [];

    while (shuffledArray.length < inputArray.length) {
        const randomArrayIndex = Math.floor(Math.random() * inputArrayCopy.length);
        const randomArrayElement = inputArrayCopy[randomArrayIndex];
        
        shuffledArray.push(randomArrayElement);

        inputArrayCopy = inputArrayCopy.filter(question => question !== randomArrayElement);
    }

    return shuffledArray;
}

const rootReducer = (state = initialState, action) => {
    if (action.type === 'DISPLAY_QUESTION') {
        let questions = state.questions;
        let currentQuestionIndex = state.currentQuestionIndex;
        let currentQuestion = state.currentQuestion;
        let userAnswer = state.userAnswer;
        let totalScore = state.totalScore;
        let wrongAnswers = state.wrongAnswers;
        
        // Restarts the quiz after completion
        if (currentQuestion === undefined) {
            questions = shuffleArray(questions);

            questions.map((question) => {
                question.answers = shuffleArray(question.answers);
                return question.answers.map((answer) => answer.selected = false);
            });

            // Resets for each round of quiz questions
            currentQuestionIndex = 0;
            totalScore = 0;
            wrongAnswers = [];
        }
        
        // Increments the user's score based on the option selected
        if (userAnswer?.isCorrect && currentQuestion) totalScore += 1;

        /* If the user doesn't pick any answer, the userAnswer is set to the first option. This actually doesn't pick the first option 
        as the user's answer because the selected property on the userAnswer is still set to false. This is done just to make sure the 
        userAnswer always returns an object that contains a selected property. So, if userAnswer.selected is set to false, a default 
        text of 'No answer' is displayed. */
        else if (!userAnswer?.isCorrect && currentQuestion) wrongAnswers = [...wrongAnswers, userAnswer || currentQuestion.answers[0]];
        
        // Changes the currentQuestion to the next question in the array
        if (currentQuestionIndex < questions.length && currentQuestion) currentQuestionIndex += 1;
        
        currentQuestion = questions[currentQuestionIndex];
        userAnswer = null;

        return {
            ...state,
            questions,
            currentQuestion,
            currentQuestionIndex,
            userAnswer,
            totalScore,
            wrongAnswers
        }
    }

    if (action.type === 'CHECK_ANSWER') {
        const question = state.questions.find(({id}) => id === action.questionId);
        let userAnswer = question.answers.find(({option}) => option === action.option);
        
        const questionOptions = question.answers.map(answer => {
            if (answer === userAnswer) {
                answer.selected = !answer.selected;
            } else {
                answer.selected = false;
            }
            return answer;
        });

        if (questionOptions.every(({ selected }) => !selected)) userAnswer = null;

        const currentQuestion = {...state.currentQuestion};
        currentQuestion.answers = questionOptions;

        return {
            ...state,
            currentQuestion,
            userAnswer
        }
    }

    return state;
};

export default rootReducer;
