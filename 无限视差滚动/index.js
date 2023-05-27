// @ts-nocheck
const imgs = [
    './images/iu1.jpeg',
    './images/iu2.jpeg',
    './images/iu3.jpeg',
    './images/shawn1.jpeg',
    './images/shawn2.jpeg'
]
const scrollContainer = document.querySelector('.scroll-container')
let currentIndex = 0
function createImgElement(index) {
    const imgUrl = imgs[index]
    const imgDom = document.createElement('div')
    imgDom.classList.add('img')
    imgDom.innerHTML = `<img src="${imgUrl}" />`
    scrollContainer.appendChild(imgDom)
    return imgDom
}
function resetScrollContainer() {
    scrollContainer.innerHTML = ''
    const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
    const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
    createImgElement(prevIndex).classList.add('prev')
    createImgElement(currentIndex).classList.add('cur')
    createImgElement(nextIndex).classList.add('next')
}
resetScrollContainer()
let isAnimation = false
scrollContainer.addEventListener('wheel', (e) => {
    if (!e.deltaY) {
        return
    }
    if (isAnimation) {
        return
    }
    isAnimation = true
    if (e.deltaY > 0) {
        scrollContainer.classList.add('scroll-down')
        currentIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
    } else {
        scrollContainer.classList.add('scroll-up')
        currentIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
    }
})
scrollContainer.addEventListener('transitionend', () => {
    isAnimation = false
    scrollContainer.classList.remove('scroll-down')
    scrollContainer.classList.remove('scroll-up')
    resetScrollContainer()
})