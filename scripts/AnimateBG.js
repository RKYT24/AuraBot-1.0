function spark(event) {
    let i = document.createElement('i');
    i.style.left = (event.pageX) + 'px';
    i.style.top = (event.pageY) + 'px';
    let scaleSize = Math.random() * 0.5 + 0.5;  // Random scale between 0.5 and 1.0
    i.style.transform = `scale(${scaleSize}) rotate(45deg)`;
    i.style.setProperty('--x', getRandomTransitionValue());
    i.style.setProperty('--y', getRandomTransitionValue());

    document.body.appendChild(i);
    setTimeout(() => {
        document.body.removeChild(i);
    }, 2000);
}

function getRandomTransitionValue() {
    return `${Math.random() * 400 - 200}px`;
}

document.addEventListener('mousemove', spark);