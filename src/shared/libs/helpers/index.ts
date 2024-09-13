export function findMaxId(array: any[]): number | null {
    if (array.length === 0) {
        return 0;
    }
    return array.reduce((maxId, obj) => Math.max(maxId, obj.id), array[0].id);
}

export const classNames = (...classes: any) => classes.filter(Boolean).join(' ');

export function formatTelegramLink(url: string) {
    // Удаляем префикс https:// или http://
    const cleanedUrl = url.replace(/^https?:\/\//, '');
    
    // Проверяем, начинается ли строка с "t.me/"
    if (cleanedUrl.startsWith('t.me/')) {
      // Извлекаем имя пользователя после "t.me/"
      const username = cleanedUrl.split('t.me/')[1];
  
      // Возвращаем форматированный результат
      return `@${username}`;
    }
  
    return cleanedUrl; // Возврат оригинального URL, если он не "t.me"
  }