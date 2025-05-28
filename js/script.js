document.addEventListener('DOMContentLoaded', () => {
    // HODOR Icon Click Handler (for index.html)
    const hodorIcon = document.getElementById('hodor-icon');
    if (hodorIcon) {
        hodorIcon.addEventListener('click', () => {
            window.location.href = 'pages/hodor_riddle.html';
        });
    }

    // Riddle Submission Handler (for pages/hodor_riddle.html)
    const submitAnswerButton = document.getElementById('submit-answer');
    const riddleAnswerInput = document.getElementById('riddle-answer');

    if (submitAnswerButton && riddleAnswerInput) {
        submitAnswerButton.addEventListener('click', () => {
            const userAnswer = riddleAnswerInput.value.trim().toLowerCase();
            if (userAnswer === 'mannequin') {
                alert('Congratulations!');
                window.location.href = 'vip_page.html'; // Relative path from hodor_riddle.html
            } else {
                alert('Incorrect answer. Try again!');
                riddleAnswerInput.value = ''; // Clear the input field
            }
        });
    }
});
