const controls = document.querySelector('.services-controls');
if (controls) {
    controls.hidden = false;
    const buttons = controls.querySelectorAll('button');
    buttons.forEach((button) => button.addEventListener('click', () => {
        const category = button.dataset['filter'];
        buttons.forEach((item) => {
            item.classList.toggle('active', item === button);
            item.setAttribute('aria-pressed', String(item === button));
        });
        document.querySelectorAll('.service').forEach((card) => {
            card.hidden =
                category !== 'all' && card.dataset['category'] !== category;
        });
    }));
}
