//Допоміжні функції

import { refs } from "./refs";

export function notFoundEnabled() {
    refs.notFound.classList.add('not-found--visible');
}
export function notFoundDisabled() {
    if (refs.notFound.classList.contains('not-found--visible')) {
        refs.notFound.classList.remove('not-found--visible');
    }
}

export function loaderShow() {

}

