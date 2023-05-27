// @ts-nocheck
const items = document.querySelectorAll('.list-item')
const playGround = document.querySelector('.playground')
const list = document.querySelector('.list')
const animationMap = new Map()
const createAnimation = (scrollStart, scrollEnd, valueStart, valueEnd) => {
    return function (scroll) {
        if (scroll < scrollStart) {
            return valueStart
        }
        if (scroll >= scrollEnd) {
            return valueEnd
        }
        return valueStart + (valueEnd - valueStart) * (scroll - scrollStart) / (scrollEnd - scrollStart)
    }
}
const getDomAnimation = (scrollStart, scrollEnd, dom) => {
    scrollStart = scrollStart + dom.dataset.order * 300
    const opacityAnimation = createAnimation(scrollStart, scrollEnd, 0, 1)
    const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1)
    const xAnimation = createAnimation(scrollStart, scrollEnd, list.clientWidth / 2 - dom.offsetLeft, 0)
    const yAnimation = createAnimation(scrollStart, scrollEnd, list.clientHeight / 2 - dom.offsetTop, 0)
    const opacity = (scroll) => {
        return opacityAnimation(scroll)
    }
    const transform = (scroll) => {
        return `translate(${xAnimation(scroll)}px,${yAnimation(scroll)}px) scale(${scaleAnimation(scroll)}) `
    }
    return {
        opacity,
        transform
    }
}
const initMap = () => {
    animationMap.clear()
    const scrollStart = window.innerHeight
    const scrollEnd = window.innerHeight + 1200
    for (const item of items) {
        animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item))
    }
}

const updateStyles = () => {
    const scroll = window.scrollY
    for (let [dom, value] of animationMap) {
        for (const cssProp in value) {
            dom.style[cssProp] = value[cssProp](scroll)
        }
    }
}
initMap()
updateStyles()
window.addEventListener('scroll', updateStyles)
