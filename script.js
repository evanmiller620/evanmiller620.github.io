document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const navLinks = document.querySelectorAll('.nav-link');
    const quoteElement = document.querySelector('.quote');
    const authorElement = document.querySelector('.quote-author');
    const box = document.querySelector('.quote-container');

    const quotes = {
        TerryPratchett: [
            "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
            "It's still magic even if you know how it's done.",
            "In ancient times cats were worshipped as gods; they have not forgotten this.",
            "If you don't turn your life into a story, you just become a part of someone else's story.",
            "The pen is mightier than the sword if the sword is very short, and the pen is very sharp."
        ],
        RickRiordan: [
            "With great power... comes great need to take a nap. Wake me up later.",
            "It's funny how humans can wrap their mind around things and fit them into their version of reality.",
        ],
        EoinColfer: [
            "Confidence is ignorance. If you're feeling cocky, it's because there's something you don't know.",
            "Dreams come true all the time, just not for the dreamers",
            "The thing about reading is that if you are hooked, you're not going to stop just because one series is over; you're going to go and find something else.",
        ],
        KanyeWest: [
            "I feel like I'm too busy writing history to read it.",
            "I'm not a businessman, I'm a business, man.",
            "People always tell you, 'Be humble. Be humble.' When was the last time someone told you to be amazing? Be great! Be great! Be awesome! Be awesome!",
        ]
    };

    function getRandomQuote() {
        const authors = Object.keys(quotes);
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        const randomQuote = quotes[randomAuthor][Math.floor(Math.random() * quotes[randomAuthor].length)];
        return { text: randomQuote, author: randomAuthor };
    }

    function setRandomQuote() {
        const selectedQuote = getRandomQuote();
        quoteElement.textContent = `"${selectedQuote.text}"`;
        
        let authorName = selectedQuote.author.replace(/([A-Z])/g, ' $1').trim();
        authorElement.textContent = `- ${authorName}`;
        authorElement.className = `quote-author author-${selectedQuote.author}`;
    }


    box.addEventListener('click', setRandomQuote);
    box.addEventListener('touchstart', setRandomQuote); // Touch support for mobile devices

    setRandomQuote();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            document.body.style.opacity = 0;
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    window.addEventListener('pageshow', () => {
        document.body.style.opacity = 1;
    });
});

function animateResumeItems() {
    const resumeItems = document.querySelectorAll('.resume-item');
    resumeItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
}

if (window.location.pathname.includes('resume.html')) {
    window.addEventListener('load', animateResumeItems);
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startGame');
    const scoreElement = document.getElementById('score');

    const amongUs = {
        x: 50,
        y: canvas.height - 60,
        width: 50,
        height: 50,
        jumping: false,
        jumpHeight: 100,
        jumpSpeed: 5,
        currentJumpHeight: 0
    };

    const obstacle = {
        x: canvas.width,
        y: canvas.height - 40,
        width: 20,
        height: 40,
        speed: 5
    };

    let score = 0;
    let gameLoop;
    let amongUsImage = new Image();
    amongUsImage.src = 'among-us.png';

    function drawAmongUs() {
        ctx.drawImage(amongUsImage, amongUs.x, amongUs.y - amongUs.currentJumpHeight, amongUs.width, amongUs.height);
    }

    function drawObstacle() {
        ctx.fillStyle = '#ff4136';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    function jump() {
        if (!amongUs.jumping) {
            amongUs.jumping = true;
            function jumpAnimation() {
                if (amongUs.currentJumpHeight < amongUs.jumpHeight && amongUs.jumping) {
                    amongUs.currentJumpHeight += amongUs.jumpSpeed;
                    requestAnimationFrame(jumpAnimation);
                } else {
                    amongUs.jumping = false;
                    function fallAnimation() {
                        if (amongUs.currentJumpHeight > 0) {
                            amongUs.currentJumpHeight -= amongUs.jumpSpeed;
                            requestAnimationFrame(fallAnimation);
                        }
                    }
                    fallAnimation();
                }
            }
            jumpAnimation();
        }
    }

    function moveObstacle() {
        obstacle.x -= obstacle.speed;
        if (obstacle.x < -obstacle.width) {
            obstacle.x = canvas.width;
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
    }

    function checkCollision() {
        if (
            amongUs.x < obstacle.x + obstacle.width &&
            amongUs.x + amongUs.width > obstacle.x &&
            amongUs.y - amongUs.currentJumpHeight < obstacle.y + obstacle.height &&
            amongUs.y - amongUs.currentJumpHeight + amongUs.height > obstacle.y
        ) {
            return true;
        }
        return false;
    }

    function gameOver() {
        cancelAnimationFrame(gameLoop);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Arial';
        ctx.fillText(`Game Over! Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2);
        startButton.style.display = 'inline-block';
    }

    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAmongUs();
        drawObstacle();
        moveObstacle();

        if (checkCollision()) {
            gameOver();
            return;
        }

        gameLoop = requestAnimationFrame(updateGame);
    }

    function startGame() {
        score = 0;
        scoreElement.textContent = 'Score: 0';
        obstacle.x = canvas.width;
        amongUs.currentJumpHeight = 0;
        amongUs.jumping = false;
        startButton.style.display = 'none';
        updateGame();
    }

    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            jump();
        }
    });

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', (event) => {
        event.preventDefault();
        jump();
    });
});