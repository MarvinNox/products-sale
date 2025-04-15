//Константи

export const STORAGE_KEYS = {
    LS_WL_KEY: 'userWishList',
    LS_USER_CART_KEY: 'userCart',
    LS_USER_THEME: 'dark',
    BASE_URL_ALL: "https://dummyjson.com/products?limit=12&skip=0",
    CATEGORIES_KEY: "https://dummyjson.com/products/category-list",
    currentPage: 1,
    selectedProdId: '',
    selectedCategory: '',
    searchValue: '',
    light: {
        '--main__text': '#242424',
        '--main__back': 'rgba(255, 255, 255, 0.87)',
        '--search__back': '#f8f9fa',
        '--search__back--focus': '#fff',
        '--nav__counter': '#ff6b0a',
        '--categ__btn': '#2d3748',
        '--products__item--back': '#fff',
        '--products__categ': '#4a5568',
        '--color2': '#010101'
    },
    dark: {
        '--main__text': '#e9e8e8',
        '--main__back': 'rgba(0, 0, 0, 0.87)',
        '--search__back': '#131212',
        '--search__back--focus': '#000',
        '--nav__counter': 'f8f9fa',
        '--categ__btn': '#d2c8b7',
        '--products__item--back': '#3a3a3a',
        '--products__categ': '#b5aa97',
        '--color2': '#ffffff'
    },
};