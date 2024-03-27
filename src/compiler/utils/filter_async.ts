export async function filterAsync<T>(
    elements: T[],
    callback: (element: T) => Promise<boolean>
): Promise<T[]> {
    return await elements.reduce(async (accPromise: Promise<T[]>, element) => {
        const acc = await accPromise;
        if (await callback(element)) {
            return [...acc, element];
        }
        return acc;
    }, Promise.resolve([]));
}
