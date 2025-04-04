//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { refs } from "./refs";

export function showModal() {
    refs.modal.classList.add('modal--is-open');
    document.addEventListener('keydown', escapeModal);
};

export function hideModal(evt) {
    if (evt.target.classList.contains("modal__close-btn") || evt.target === evt.currentTarget) {
        closeModal();
    }
};

function escapeModal(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
};

function closeModal() {
    if (refs.modal.classList.contains('modal--is-open')) {
        refs.modal.classList.remove('modal--is-open');
    }
    document.removeEventListener('keydown', escapeModal);
};