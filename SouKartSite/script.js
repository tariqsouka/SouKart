function openDoor() {
    alert('You clicked the door! Now, solving the riddle takes you further...');
    // Placeholder redirection
    window.location.href = "riddle.html";
}

function chooseWorld(choice) {
    if (choice === 'real') {
        alert("You chose Real Stories! Proceeding to the next page...");
        window.location.href = "real_story.html";
    } else if (choice === 'fantasy') {
        alert("You chose Fantasy Stories! Proceeding to the next page...");
        window.location.href = "fantasy_story.html";
    } else {
        alert('Invalid choice!');
    }
}
