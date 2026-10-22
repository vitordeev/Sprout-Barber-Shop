const section = document.querySelector('.videos');
const track = section?.querySelector('.videos-track');
if (section && track) {
    let startX = 0;
    let startScroll = 0;
    let pointerId = null;
    let dragged = false;
    track.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'mouse' || event.button !== 0)
            return;
        // Leave the native playback controls available for clicking and seeking.
        const video = event.target.closest('video');
        if (video && event.clientY >= video.getBoundingClientRect().bottom - 56)
            return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startScroll = track.scrollLeft;
        dragged = false;
    });
    track.addEventListener('pointermove', (event) => {
        if (event.pointerId !== pointerId)
            return;
        const distance = event.clientX - startX;
        if (!dragged && Math.abs(distance) < 6)
            return;
        if (!dragged) {
            dragged = true;
            track.classList.add('is-dragging');
            track.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        track.scrollLeft = startScroll - distance;
    });
    const finishDrag = (event) => {
        if (event.pointerId !== pointerId)
            return;
        pointerId = null;
        track.classList.remove('is-dragging');
        if (track.hasPointerCapture(event.pointerId))
            track.releasePointerCapture(event.pointerId);
    };
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);
    track.addEventListener('lostpointercapture', finishDrag);
    track.addEventListener('dragstart', (event) => event.preventDefault());
    track.addEventListener('click', (event) => {
        if (!dragged)
            return;
        event.preventDefault();
        event.stopImmediatePropagation();
        dragged = false;
    }, true);
    const move = (direction) => {
        const card = track.querySelector('.video-card');
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const distance = (card?.getBoundingClientRect().width || track.clientWidth) + gap;
        track.scrollBy({
            left: direction * distance,
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
        });
    };
    track.addEventListener('keydown', (event) => {
        if (event.target !== track)
            return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
        }
    });
    // Decode a frame at the start without starting playback, including on mobile.
    section.querySelectorAll('video').forEach((video) => {
        const showBeginning = () => {
            if (video.paused && video.currentTime === 0)
                video.currentTime = 0.01;
        };
        if (video.readyState >= 1)
            showBeginning();
        else
            video.addEventListener('loadedmetadata', showBeginning, { once: true });
        video.addEventListener('play', () => {
            section.querySelectorAll('video').forEach((other) => {
                if (other !== video)
                    other.pause();
            });
        });
    });
}
