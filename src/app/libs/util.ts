export function FindVariables(value: string, titles: string[] = [], variableRegex = '{{(.*?)}}'): any {
    let regex = new RegExp(`${variableRegex}${titles.length ? '|' : ''}${titles.join('|')}`, 'g');
    let vars: any;

    let matches: any[] = [];

    while ((vars = regex.exec(value)) !== null) {
        matches.push({ name: vars[0], index: vars.index, isTitle: vars[0].indexOf('{{') === -1 });
    }
    return matches;
}
