const createIdGenerator = () => {
    let x = 0;

    return () => x++;
}

const idGenerator = createIdGenerator();

export const Member = (name) => {
    return {
        id: idGenerator(),
        name,
        score: 0,
        selectedCount: 0
    }
}