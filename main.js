document.addEventListener('DOMContentLoaded', () => {
    const projectTrack = document.querySelector('.project-track');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCardsArray = Array.from(projectCards);

    shuffleArray(projectCardsArray);
    projectTrack.innerHTML = '';

    projectCardsArray.forEach(card => {
        projectTrack.appendChild(card);
    });

    projectCardsArray.forEach(card => {
        const clonedCard = card.cloneNode(true);
        projectTrack.appendChild(clonedCard);
    });

    for (let i = 0; i < 5; i++) {
        projectCardsArray.forEach(card => {
            const clonedCard = card.cloneNode(true);
            projectTrack.appendChild(clonedCard);
        });
    }

    const words = [
        "best",
        "smartest",
        "fastest"
    ];
    
    const wordCycle = document.querySelector('.word-cycle');
    let currentIndex = 0;
    
    wordCycle.innerHTML = `<span class="active">${words[0]}</span>`;
    
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % words.length;
        const newSpan = document.createElement('span');
        newSpan.textContent = words[nextIndex];
        wordCycle.appendChild(newSpan);
        const currentSpan = wordCycle.querySelector('span.active');
        setTimeout(() => {
            currentSpan.classList.add('hidden');
            newSpan.classList.add('active');
        }, 50);
        setTimeout(() => {
            currentSpan.remove();
        }, 500);
        
        currentIndex = nextIndex;
    }, 3000);

    createProjectModal();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

function createStarryNight() {
    const starryNight = document.querySelector('.starry-night');
    const numStars = 30;

    function addStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        placeStar(star);
        star.style.fontSize = `${Math.random() * 10 + 4}px`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        starryNight.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
            setTimeout(() => {
                addStar();
            }, 0);
        });
    }

    for (let i = 0; i < numStars; i++) {
        addStar();
    }
}

function placeStar(star) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
}

window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    setTimeout(function() {
        loading.classList.add('hide');
        animateOnScroll();
        createStarryNight();
    }, 500);
});

window.addEventListener('scroll', animateOnScroll); 

function createProjectModal() {
    const modal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card');
    const projectData = {
        'autoguessr': {
            title: 'AutoGuessr',
            subtitle: 'Automated GeoGuessr Bot',
            description: 'A fully automatic GeoGuessr bot to farm XP, medals and achievements. Built with Electron and JavaScript for a seamless desktop experience.',
            techStack: [
                { class: 'tag-js', icon: 'devicon-javascript-plain', title: 'JavaScript' },
                { class: 'tag-electron', icon: 'devicon-electron-original', title: 'Electron' }
            ],
            images: [
                './images/projects/autoguessr/autoguessr_1.png',
                './images/projects/autoguessr/autoguessr_2.png',
                './images/projects/autoguessr/autoguessr_3.png'
            ],
        },
        'tindervm': {
            title: 'TinderVM',
            subtitle: 'Tinder Email Resetter with IMAP',
            description: 'TinderVM is a Python application designed to automate the account recovery process for Tinder users. This tool uses optimised multi-threading to process multiple emails simultaneously, handling password reset requests and automated email retrieving.',
            techStack: [
                { class: 'tag-python', icon: 'devicon-python-plain', title: 'Python' }
            ],
            images: [
                './images/projects/tindervm/tinder_1.png',
                './images/projects/tindervm/tinder_2.png',
                './images/projects/tindervm/tinder_3.png'
            ],
        },
        'imvucheck': {
            title: 'IMVUCheck',
            subtitle: 'Fastest IMVU account checker',
            description: 'IMVUCheck is a Go application designed to quickly check IMVU accounts. It uses optimized multi-threading to handle multiple accounts simultaneously reaching speeds of 60K accounts per minute. Protected with KeyAuth authentication for secure key access.',
            techStack: [
                { class: 'tag-golang', icon: 'devicon-go-original-wordmark', title: 'GoLang' }
            ],
            images: [
                './images/projects/imvucheck/imvucheck_1.png',
                './images/projects/imvucheck/imvucheck_2.png',
                './images/projects/imvucheck/imvucheck_3.png'
            ],
        }
    };

    let currentImageIndex = 0;

    function updateGallery(project, index) {
        const gallery = modal.querySelector('.gallery-container');
        const dots = modal.querySelector('.gallery-dots');
        
        gallery.innerHTML = project.images
            .map((img, i) => `
                <img 
                    src="${img}" 
                    alt="${project.title} screenshot ${i + 1}" 
                    class="gallery-image ${i === index ? 'active' : ''}"
                >
            `)
            .join('');

        dots.innerHTML = project.images
            .map((_, i) => `
                <div class="gallery-dot ${i === index ? 'active' : ''}" data-index="${i}"></div>
            `)
            .join('');
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const project = projectData[projectId];
            
            if (!project) return;

            currentImageIndex = 0;
            modal.querySelector('.modal-title').textContent = project.title;
            modal.querySelector('.modal-subtitle').textContent = project.subtitle;
            const techTags = modal.querySelector('.modal-tech-tags');
            techTags.innerHTML = project.techStack
                .map(tech => `
                    <span class="${tech.class}" title="${tech.title}">
                        <i class="${tech.icon}"></i>
                        ${tech.title}
                    </span>
                `)
                .join('');

            modal.querySelector('.modal-text').textContent = project.description;

            updateGallery(project, currentImageIndex);
            const prevBtn = modal.querySelector('.gallery-prev');
            const nextBtn = modal.querySelector('.gallery-next');
            const dots = modal.querySelector('.gallery-dots');

            prevBtn.onclick = () => {
                currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
                updateGallery(project, currentImageIndex);
            };

            nextBtn.onclick = () => {
                currentImageIndex = (currentImageIndex + 1) % project.images.length;
                updateGallery(project, currentImageIndex);
            };

            dots.onclick = (e) => {
                const dot = e.target.closest('.gallery-dot');
                if (dot) {
                    currentImageIndex = parseInt(dot.dataset.index);
                    updateGallery(project, currentImageIndex);
                }
            };

            const starsContainer = modal.querySelector('.modal-gallery-stars');
            createModalStars(starsContainer);

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
} 

function createModalStars(container) {
    const numStars = 15;

    function addStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.fontSize = `${Math.random() * 8 + 4}px`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
            setTimeout(() => {
                addStar();
            }, 0);
        });
    }

    for (let i = 0; i < numStars; i++) {
        addStar();
    }
} 

function copyDiscordUsername() {
    const username = 'cursoramy';
    navigator.clipboard.writeText(username).then(() => {
        const discordCard = document.querySelector('.contact-card');
        const tooltip = discordCard.querySelector('.copy-tooltip');

        tooltip.textContent = 'Copied!';
        discordCard.classList.add('copied');

        setTimeout(() => {
            tooltip.textContent = 'Click to copy';
            discordCard.classList.remove('copied');
        }, 2000);
    });
} 