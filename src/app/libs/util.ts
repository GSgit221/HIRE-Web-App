export function FindVariables(value: string, titles: string[] = []): any {
    let regex = new RegExp(`{{(.*?)}}${titles.length ? '|' : ''}${titles.join('|')}`, 'gi');
    let vars: any;

    let matches: any[] = [];

    while ((vars = regex.exec(value)) !== null) {
        matches.push({ name: vars[0], index: vars.index, isTitle: vars[0].indexOf('{{') === -1 });
    }
    return matches;
}
