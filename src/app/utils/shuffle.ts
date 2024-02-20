export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index within the remaining unshuffled portion of the array
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the current element with the randomly chosen element
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};
