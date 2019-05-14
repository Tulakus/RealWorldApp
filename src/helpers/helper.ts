export function getDate(date: string): string {
    const tempDate = new Date(date);
    const a = tempDate.toLocaleDateString("en-us", {
        month: 'long',
        day: 'numeric'
    })
    return `${a}th`
}