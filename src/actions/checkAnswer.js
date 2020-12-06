export const checkAnswer = (questionId, option) => {
    return {
        type: 'CHECK_ANSWER',
        questionId,
        option
    }
}