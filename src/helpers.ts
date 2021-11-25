export function getMonthFromInt(value: number): string {
  switch (value) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sept';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return 'N/A';
  }
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
