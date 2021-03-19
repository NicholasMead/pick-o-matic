export const Member = (name, selected, highlighted) => {
    return {
        name, 
        selected: Boolean(selected),
        highlighted: Boolean(highlighted),
        score: 0
    }
}