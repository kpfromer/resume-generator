export function getMonthFromInt(value: number): string {
  const names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return names[value - 1];
}

export const removeHttps = (url: string) => url.replace('http://', '').replace('https://', '');

export const insertIntoArray = (arr, value) => {
  return arr.reduce((result, element, index, array) => {
    result.push(element);

    if (index < array.length - 1) {
      result.push(value);
    }

    return result;
  }, []);
};
