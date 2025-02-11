export enum FileImageTypesEnum {
    PNG = 'image/png',
    JPG = 'image/jpg',
    JPEG = 'image/jpeg'
};

export const imageTypes = () => {
    return [FileImageTypesEnum.JPEG, FileImageTypesEnum.JPG, FileImageTypesEnum.PNG].join(',');
}