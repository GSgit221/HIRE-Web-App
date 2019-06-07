export function FindVariables(value: string): any {
    let regex = new RegExp('{{(.*?)}}', 'gi');
    let vars: any;

    let matches: any[] = [];

    while ((vars = regex.exec(value)) !== null) {
        matches.push({ name: vars[0], index: vars.index });
    }
    return matches;
}
