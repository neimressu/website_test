// markdown-parser.js - простой Markdown парсер
class MarkdownParser {
    constructor() {
        this.rules = [
            // Заголовки
            { pattern: /^###### (.*$)/gim, replacement: '<h6>$1</h6>' },
            { pattern: /^##### (.*$)/gim, replacement: '<h5>$1</h5>' },
            { pattern: /^#### (.*$)/gim, replacement: '<h4>$1</h4>' },
            { pattern: /^### (.*$)/gim, replacement: '<h3>$1</h3>' },
            { pattern: /^## (.*$)/gim, replacement: '<h2>$1</h2>' },
            { pattern: /^# (.*$)/gim, replacement: '<h1>$1</h1>' },
            
            // Жирный текст
            { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
            { pattern: /__(.*?)__/g, replacement: '<strong>$1</strong>' },
            
            // Курсив
            { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
            { pattern: /_(.*?)_/g, replacement: '<em>$1</em>' },
            
            // Зачеркнутый текст
            { pattern: /~~(.*?)~~/g, replacement: '<del>$1</del>' },
            
            // Ссылки
            { pattern: /\[([^\[]+)\]\(([^\)]+)\)/g, replacement: '<a href="$2" target="_blank" rel="noopener">$1</a>' },
            
            // Изображения
            { pattern: /!\[([^\[]+)\]\(([^\)]+)\)/g, replacement: '<img src="$2" alt="$1" class="markdown-image">' },
            
            // Блочные цитаты
            { pattern: /^\> (.*$)/gim, replacement: '<blockquote>$1</blockquote>' },
            
            // Горизонтальная линия
            { pattern: /^\-\-\-$/gim, replacement: '<hr>' },
            
            // Перенос строки (2+ пробела в конце строки)
            { pattern: /  \n/g, replacement: '<br>' },
            
            // Неупорядоченные списки
            { pattern: /^\s*\* (.*$)/gim, replacement: '<ul><li>$1</li></ul>' },
            { pattern: /^\s*\- (.*$)/gim, replacement: '<ul><li>$1</li></ul>' },
            { pattern: /^\s*\+ (.*$)/gim, replacement: '<ul><li>$1</li></ul>' },
            
            // Упорядоченные списки
            { pattern: /^\s*\d\. (.*$)/gim, replacement: '<ol><li>$1</li></ol>' },
            
            // Встроенный код
            { pattern: /`(.*?)`/g, replacement: '<code>$1</code>' },
            
            // Блоки кода
            { pattern: /```([\s\S]*?)```/g, replacement: '<pre><code>$1</code></pre>' }
        ];
        
        // Очистка вложенных тегов списков
        this.listRules = [
            { pattern: /<\/ul>\s*<ul>/g, replacement: '' },
            { pattern: /<\/ol>\s*<ol>/g, replacement: '' },
            { pattern: /<\/li>\s*<li>/g, replacement: '</li><li>' }
        ];
    }

    parse(markdown) {
        if (!markdown) return '';
        
        let html = markdown;
        
        // Применяем все правила
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        // Чистим вложенные списки
        this.listRules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        // Параграфы для текста без разметки
        html = html.split('\n\n').map(paragraph => {
            if (!paragraph.trim()) return '';
            if (!paragraph.startsWith('<') && !paragraph.endsWith('>')) {
                return `<p>${paragraph}</p>`;
            }
            return paragraph;
        }).join('');
        
        return html.trim();
    }
}
