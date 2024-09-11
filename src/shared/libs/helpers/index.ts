export function findMaxId(array: any[]):number | null {
    if (array.length === 0) {
        return 0;
    }
    return array.reduce((maxId, obj) => Math.max(maxId, obj.id), array[0].id);
}

export const classNames = (...classes:any) => classes.filter(Boolean).join(' ');