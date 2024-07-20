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
            "The pen is mightier than the sword if the sword is very short, and the pen is very sharp.",
            "Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life.",
            "The worst thing you can do is nothing.",
            "That's not my cow!"
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
            "I'm not a businessman, I'm a business, man.",
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
let currentImage = 0;

document.addEventListener('DOMContentLoaded', function() {
    const box = document.getElementById('clickableBox');
    const images = document.querySelectorAll('.expandableImage');
    let zIndex = 1; // Initial z-index value for the images
  
    box.addEventListener('click', function(event) {
        const rect = box.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Show a random image
        const randomImage = images[currentImage];
        if (currentImage === images.length - 1) {
            currentImage = 0;
        } else
            currentImage += 1;

        // Reset the image size before displaying it again
        randomImage.style.display = 'block';
        randomImage.style.zIndex = zIndex++; // Increment the z-index for each new image

        // Use requestAnimationFrame to ensure the browser registers the size reset
        requestAnimationFrame(() => {
            randomImage.style.transform = `translate(${x-50}px, ${y-50}px)`
        });
    });
});
  