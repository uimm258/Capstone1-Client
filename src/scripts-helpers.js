export const findCategory = (category=[], categoryId) =>
    category.find(cateogory => category.id === categoryId)

export const findScript = (scripts=[], scriptsId) => 
    scripts.find(script => script.id === scriptsId)

export const getScriptsForCategory = (scripts=[], categoryId) => (
    (!categoryId)
        ? scripts
        : scripts.filter(script=> script.categoryId === categoryId)
)

export const countScriptsForCategory = (scripts=[], categoryId) => (
    scripts.filter(script => script.categoryId === categoryId).length
)