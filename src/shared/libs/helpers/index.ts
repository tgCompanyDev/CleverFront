export function findMaxId(objects) {
    if (objects.length === 0) {
        return null;
    }
    return objects.reduce((maxId, obj) => Math.max(maxId, obj.id), objects[0].id);
}

export const classNames = (...classes:any) => classes.filter(Boolean).join(' ');