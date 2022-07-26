export const getImageURL = (imageName: string): string => {
  return `${process.env.NEXT_PUBLIC_API_BASEURL}/${imageName}`;
};
