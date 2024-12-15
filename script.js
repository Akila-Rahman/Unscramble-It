
        const rounds = [
            { name: "Baby Panda", pool: ["cat", "dog", "sun", "tree", "book", "cook", "cake", "bun", "run", "free"], maxScore: 10, image: "baby-panda.png" },
            { name: "Teen Panda", pool: ["flower", "planet", "bridge", "rabbit", "jungle", "hook", "look", "ok", "Doraemon", "book"], maxScore: 10, image: "teen-panda.png" },
            { name: "Pro Panda", pool: ["Doraemon", "shizuka", "Nobita", "zian", "soniyo", "doraeme", "dekisugi", "doracake", "book", "look"], maxScore: 10, image: "pro-panda.png" }
        ];

        let currentRound = 0;
        let currentWord = "";
        let scrambledWord = "";
        let score = 0;

        function shuffleWord(word) {
            return word.split('').sort(() => Math.random() - 0.5).join('');
        }

        function updateRoundUI() {
            document.getElementById('round-name').textContent = `${rounds[currentRound].name} Round`;
            document.getElementById('round-image').src = rounds[currentRound].image;
            document.getElementById('scrambled-word').textContent = scrambledWord;
            document.getElementById('hint').textContent = `Hint: ${currentWord[0]}...`;
        }

        function generateWord() {
            const words = rounds[currentRound].pool;
            currentWord = words[Math.floor(Math.random() * words.length)];
            scrambledWord = shuffleWord(currentWord);
            document.getElementById('user-input').value = "";
            document.getElementById('feedback').textContent = "";
            updateRoundUI();
        }

        function checkAnswer() {
            const userGuess = document.getElementById('user-input').value.trim().toLowerCase();
            if (userGuess === currentWord) {
                document.getElementById('feedback').textContent = "Correct! 🎉";
                score++;
            } else {
                document.getElementById('feedback').textContent = `Wrong! The correct word was "${currentWord}".`;
            }
            document.getElementById('score').textContent = `Score: ${score}`;

            if (score >= rounds[currentRound].maxScore) {
                currentRound++;
                if (currentRound < rounds.length) {
                    alert(`Congratulations! Welcome to the ${rounds[currentRound].name} round.`);
                    score = 0; // Reset score for the new round
                    document.getElementById('score').textContent = `Score: ${score}`;
                } else {
                    document.getElementById('winner-image').style.display = "block";
                    alert("You are a winner! 🏆 Congratulations on completing all rounds!");
                    return; // End the game
                }
            }

            setTimeout(generateWord, 2000);
        }

        // Initialize the game
        generateWord();