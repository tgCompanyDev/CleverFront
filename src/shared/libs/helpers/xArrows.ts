const brightness = 100
export function getRandomContrastingColor(): string {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // const isDark = Math.random() < 0.5; // 50/50 шанс на светлый/темный цвет

    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }

    // // Проверка контраста с серым фоном (примерно)
    // const r = parseInt(color.substring(1, 3), 16);
    // const g = parseInt(color.substring(3, 5), 16);
    // const b = parseInt(color.substring(5, 7), 16);
    // const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // if (isDark && luminance > 0.5) { // Слишком светлый для темного
    //   return getRandomContrastingColor(); // Рекурсивный вызов
    // } else if (!isDark && luminance < 0.5) { // Слишком темный для светлого
    //   return getRandomContrastingColor(); // Рекурсивный вызов
    // }

    // return color;
    {
        const colors = [
            // Голубые
            [0, 128, 255], // Light sky blue
            [0, 191, 255], // Deep sky blue
            [30, 144, 255], // Dodger blue
            [100, 149, 237], // Cornflower blue
            // Синие
            [0, 0, 255], // Blue
            [0, 0, 139], // Dark blue
            [0, 0, 205], // Medium blue
            [70, 130, 180], // Steel blue
            // Зеленые
            [0, 255, 0], // Green
            [0, 128, 0], // Dark green
            [0, 100, 0], // Forest green
            [34, 139, 34], // Dark olive green
            // Серые
            [128, 128, 128], // Gray
            [169, 169, 169], // Dark gray
            [192, 192, 192], // Light gray
            [211, 211, 211], // Light gray
        ];

        // Выбираем случайный цвет из массива
        const randomIndex = Math.floor(Math.random() * colors.length);
        let [r, g, b] = colors[randomIndex];

        // Изменение яркости цвета
        r = Math.round(r * (brightness / 100));
        g = Math.round(g * (brightness / 100));
        b = Math.round(b * (brightness / 100));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}