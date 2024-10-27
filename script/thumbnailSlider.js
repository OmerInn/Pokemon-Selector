const thumbs = document.querySelectorAll('.thumb li');
const infoSlider = document.querySelectorAll('.info-slider');
const imgSlider = document.querySelectorAll('.img-slider');
const items = document.querySelectorAll('.item');

let index = 0;

document.addEventListener("DOMContentLoaded", () => {
    const firstThumb = thumbs[index];
    const bgColor = firstThumb.getAttribute('data-bg-color');
    document.querySelector('.carousel').style.backgroundColor = bgColor;
});

thumbs.forEach((thumb, ind) => {
    thumb.addEventListener('click', () => {
        const selectedThumb = document.querySelector('.thumb.selected');

        if (selectedThumb) {
            selectedThumb.classList.remove('selected');
        }

        thumb.classList.add('selected');
        index = ind;

        infoSlider.forEach(slide => {
            slide.style.transform = `translateY(${index * -100}%)`;
        });

        imgSlider.forEach(slide => {
            slide.style.transform = `translateX(${index * -100}%)`;
        });

        const activeItem = document.querySelector('.item.active');
        if (activeItem) {
            activeItem.classList.remove('active');
        }
        items[index].classList.add('active');

        const bgColor = thumb.getAttribute('data-bg-color');
        document.querySelector('.carousel').style.backgroundColor = bgColor;
    });
});
