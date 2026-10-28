import './style.css'
import importUrl from './img-import.png'

const newUrl = new URL('./img-new-url.png', import.meta.url).href

document.querySelector('#import').src = importUrl
document.querySelector('#import-url').textContent = importUrl
document.querySelector('#new-url').src = newUrl
document.querySelector('#new-url-url').textContent = newUrl
