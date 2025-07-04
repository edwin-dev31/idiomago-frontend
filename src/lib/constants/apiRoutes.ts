export const apiRoutes = {

    login: "/auth/login",
    register: "/auth/register",
    categories: "/api/category",
    languages: "/api/language",
    users: {
        byId: (userId: number | string) => `/api/users/${userId}`,
        uploadAvatar: (userId: number | string) => `/api/users/${userId}/avatar`,

    },
    
    words: {
        saveMultiple: "/api/view/save/word/multiple",
        saveSingle: "/api/view/save/word/single",
        myWords: (userId: string | number) => `/api/view/my-words/${userId}`,

    },

    favorites: {
        base: "/api/favorites",
        byUser: (userId: number | string)  => `/api/favorites/${userId}`,
        byUserAndWord: (userId: number, wordId: number) => `/api/favorites/${userId}/${wordId}`,
    },
    search: {
        byLanguage: (code: string) => `/api/view/search/lang/${code}`,
        byCategory: (categoryId: number) => `/api/view/search/categories/${categoryId}`,
        byDescription: (text: string) => `/api/view/search/description/${text}`,
        byExample: (text: string) => `/api/view/search/example/${text}`,
    },
    view: {
        changeImage: (wordTranslationId: number) => `/api/view/images/change/${wordTranslationId}`,
        allWords: "/api/view",
        favoriteWords: "/api/view/favorite",
        wordFooter: "/api/footer"
    },

    
};
