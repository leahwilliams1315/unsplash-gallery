
export const convertSelectedImgObj = (selectedImage) => {

  const bestTitle = selectedImage.sponsorship?.tagline ||
    (selectedImage.alt_description?.length < selectedImage.description?.length ?
    selectedImage.alt_description : selectedImage.description);

  return {
    color: selectedImage.color,
    createdAt: selectedImage.created_at,
    description: bestTitle,
    altDescription: selectedImage.alt_description,
    downloadLink: `${selectedImage.urls.raw}.jpg`,
    regularImgLink: selectedImage.urls.regular,
    id: selectedImage.id
  }
};
