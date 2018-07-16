export const shortDateFormat = (date: Date) => date.toLocaleDateString('en', { day: '2-digit', month: 'short', year: 'numeric' });
