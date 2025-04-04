//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { refs } from "./refs";

export function showModal() {
    refs.modal.classList.add('modal--is-open');
}
export function hideModal() {
    if (refs.modal.classList.contains('modal--is-open')) {
        refs.modal.classList.remove('modal--is-open');
    }
}
