export const findCategory = (category=[], category_id) =>
    category.find(category => category.id === category_id)

export const findScript = (scripts=[], scriptId) => 
    scripts.find(script => {
        return script.id === parseInt(scriptId)
    })

export const getScriptsForCategory = (scripts=[], category_id) => (
    (!category_id)
        ? scripts
        : scripts.filter(script => script.category_id === category_id)
)

export const countScriptsForCategory = (scripts=[], category_id) => (
    scripts.filter(script => script.category_id === category_id).length
)