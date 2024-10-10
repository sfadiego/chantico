import { IFileProps } from '@/intefaces/IFileProps';
import { useGetFile } from '@/services/useGetFileService';

const useLoadFile = ({ image }: { image: IFileProps }) => {
    const fileName = image?.nombre_archivo;
    let { isLoading, data } = useGetFile(fileName, !!fileName);
    return {
        showImage: (!isLoading && data),
        isLoading,
        data
    }

}

export default useLoadFile