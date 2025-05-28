document.addEventListener('DOMContentLoaded', function() {
    // Apply sparkles background (if body element exists)
    if (document.body) {
        document.body.classList.add('sparkles-bg');
    }

    // --- Audio Setup ---
    const backgroundMusicPath = 'assets/background_music.mp3'; // Placeholder
    const errorSoundPath = 'assets/error_sound.wav'; // Placeholder
    let backgroundMusic = null;
    let errorSound = null;

    function initAudio() {
        if (backgroundMusicPath !== 'assets/background_music.mp3' && backgroundMusicPath !== '') {
            backgroundMusic = new Audio(backgroundMusicPath);
            backgroundMusic.loop = true;
            backgroundMusic.volume = 0.3;
            playBackgroundMusic();
        } else {
            console.warn('Background music placeholder not replaced. Music will not play.');
        }
        if (errorSoundPath !== 'assets/error_sound.wav' && errorSoundPath !== '') {
            errorSound = new Audio(errorSoundPath);
            errorSound.volume = 0.5;
        } else {
            console.warn('Error sound placeholder not replaced. Error sounds will not play.');
        }
    }

    function playBackgroundMusic() {
        if (backgroundMusic && document.visibilityState === 'visible') {
            backgroundMusic.play().catch(error => console.error("Error playing background music:", error));
        }
    }

    window.playErrorSound = function() {
        if (errorSound) {
            errorSound.currentTime = 0;
            errorSound.play().catch(error => console.error("Error playing error sound:", error));
        } else {
            console.warn("Error sound not initialized or placeholder not replaced.");
        }
    };

    initAudio(); // Initialize audio for all pages that include script.js

    // --- Homepage Navigation and Riddle Logic (index.html) ---
    const vipDoor = document.getElementById('vipDoor');
    if (vipDoor) {
        vipDoor.addEventListener('click', () => window.location.href = 'vip_riddle.html');
    }

    const homepageRiddleButtons = document.querySelectorAll('#riddles-section .choices button');
    if (homepageRiddleButtons.length > 0) {
        homepageRiddleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const riddleType = this.dataset.riddle;
                const answer = this.dataset.answer;
                const feedbackElement = this.closest('.riddle-container').querySelector('.feedback');
                feedbackElement.style.display = 'none';
                feedbackElement.textContent = '';

                if (riddleType === 'real') {
                    if (answer === 'real_stories') {
                        window.location.href = 'gender_selection_real.html';
                    } else {
                        feedbackElement.textContent = 'Think before you answer.';
                        feedbackElement.style.display = 'block';
                        if(window.playErrorSound) window.playErrorSound();
                    }
                } else if (riddleType === 'fantasy') {
                    if (answer === 'fantasy_stories') {
                        window.location.href = 'gender_selection_fantasy.html';
                    } else {
                        feedbackElement.textContent = 'Think before you answer.';
                        feedbackElement.style.display = 'block';
                        if(window.playErrorSound) window.playErrorSound();
                    }
                }
            });
        });
    }

    // --- VIP Riddle Page Logic (vip_riddle.html) ---
    const vipRiddleAnswerInput = document.getElementById('vipRiddleAnswer');
    const submitVipRiddleButton = document.getElementById('submitVipRiddle');
    const vipRiddleFeedback = document.getElementById('vipRiddleFeedback');
    if (vipRiddleAnswerInput && submitVipRiddleButton && vipRiddleFeedback) {
        submitVipRiddleButton.addEventListener('click', function() {
            const userAnswer = vipRiddleAnswerInput.value.trim().toLowerCase();
            if (userAnswer === 'mannequin') {
                vipRiddleFeedback.textContent = 'Congratulations!';
                vipRiddleFeedback.style.color = '#28a745';
                vipRiddleFeedback.style.display = 'block';
                setTimeout(() => window.location.href = 'vip_page.html', 2000);
            } else {
                vipRiddleFeedback.textContent = 'That is not the correct answer. Try again.';
                vipRiddleFeedback.style.color = '#dc3545';
                vipRiddleFeedback.style.display = 'block';
                vipRiddleAnswerInput.focus();
                if(window.playErrorSound) window.playErrorSound();
            }
        });
        vipRiddleAnswerInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitVipRiddleButton.click();
            }
        });
    }

    // --- Gender Selection Page Logic (gender_selection_real.html & gender_selection_fantasy.html) ---
    const genderRiddleButtons = document.querySelectorAll('.gender-selection-main .choices button');
    if (genderRiddleButtons.length > 0) { // Check if on a gender selection page
        const isFantasyTheme = document.body.classList.contains('theme-fantasy');
        const themePath = isFantasyTheme ? 'fantasy' : 'real';

        genderRiddleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const riddleGender = this.dataset.riddle; // 'male' or 'female' (for the riddle itself)
                const chosenGender = this.dataset.answer; // 'male' or 'female' (the answer chosen)
                const feedbackElement = this.closest('.riddle-container').querySelector('.feedback');
                
                feedbackElement.style.display = 'none';
                feedbackElement.textContent = '';

                let correct = false;
                if (riddleGender === 'male' && chosenGender === 'male') {
                    correct = true;
                    window.location.href = `products_male_${themePath}.html`;
                } else if (riddleGender === 'female' && chosenGender === 'female') {
                    correct = true;
                    window.location.href = `products_female_${themePath}.html`;
                }

                if (!correct) {
                    feedbackElement.textContent = 'Think before you answer.';
                    feedbackElement.style.display = 'block';
                    if(window.playErrorSound) window.playErrorSound();
                }
            });
        });
    }
    console.log("Script loaded. Page-specific logic initialized if elements found.");
});
