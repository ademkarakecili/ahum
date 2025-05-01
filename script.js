class Cloud {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'cloud';
        this.size = Math.random() * 50 + 50;
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.top = `${Math.random() * 100}px`;
        this.element.style.animationDuration = `${Math.random() * 20 + 20}s`;
        document.querySelector('.garden').appendChild(this.element);
    }
}

class Butterfly {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'butterfly';
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speed = Math.random() * 2 + 1;
        this.direction = Math.random() * 360;
        this.updatePosition();
        document.querySelector('.garden').appendChild(this.element);
    }

    updatePosition() {
        this.x += Math.cos(this.direction * Math.PI / 180) * this.speed;
        this.y += Math.sin(this.direction * Math.PI / 180) * this.speed;

        if (this.x < 0 || this.x > window.innerWidth) {
            this.direction = 180 - this.direction;
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.direction = -this.direction;
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.transform = `rotate(${this.direction}deg)`;

        requestAnimationFrame(() => this.updatePosition());
    }
}

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = document.createElement('div');
        this.element.className = 'flower';
        this.element.style.left = `${x}px`;
        this.element.style.bottom = `${y}px`;
        this.element.style.animation = `sway ${5 + Math.random() * 2}s ease-in-out infinite`;
        
        this.createFlower();
        document.querySelector('.garden').appendChild(this.element);
    }

    createFlower() {
        const stem = document.createElement('div');
        stem.className = 'stem';
        this.element.appendChild(stem);

        const leaf1 = document.createElement('div');
        leaf1.className = 'leaf left';
        leaf1.style.top = '40px';
        stem.appendChild(leaf1);

        const leaf2 = document.createElement('div');
        leaf2.className = 'leaf right';
        leaf2.style.top = '60px';
        stem.appendChild(leaf2);

        const flowerHead = document.createElement('div');
        flowerHead.style.position = 'absolute';
        flowerHead.style.bottom = '100px';
        flowerHead.style.left = '50%';
        flowerHead.style.transform = 'translateX(-50%) rotate(180deg)';
        flowerHead.style.animation = 'float 3s ease-in-out infinite';
        this.element.appendChild(flowerHead);

        // İç katman
        for (let i = 0; i < 8; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const angle = i * 45;
            petal.style.transform = `rotate(${angle}deg) translateY(-5px)`;
            flowerHead.appendChild(petal);
        }

        // Orta katman
        for (let i = 0; i < 8; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const angle = i * 45 + 22.5;
            petal.style.transform = `rotate(${angle}deg) translateY(-8px)`;
            flowerHead.appendChild(petal);
        }

        // Dış katman
        for (let i = 0; i < 8; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const angle = i * 45;
            petal.style.transform = `rotate(${angle}deg) translateY(-12px)`;
            flowerHead.appendChild(petal);
        }
    }

    bloom() {
        this.element.style.transform = 'scale(1)';
        this.element.style.opacity = '1';
    }
}

function createGarden() {
    const garden = document.querySelector('.garden');
    const flowers = [];

    // Bulutları oluştur
    for (let i = 0; i < 5; i++) {
        new Cloud();
    }

    // Kelebekleri oluştur
    for (let i = 0; i < 3; i++) {
        new Butterfly();
    }

    // Çiçekleri oluştur
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight / 2);
        const flower = new Flower(x, y);
        flowers.push(flower);
        
        setTimeout(() => {
            flower.bloom();
        }, i * 400);
    }
}

// Sayfa yüklendiğinde bahçeyi oluştur
window.addEventListener('load', createGarden);

// Pencere boyutu değiştiğinde çiçekleri yeniden düzenle
window.addEventListener('resize', () => {
    const garden = document.querySelector('.garden');
    garden.innerHTML = '';
    createGarden();
}); 