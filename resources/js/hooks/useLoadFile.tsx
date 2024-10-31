import { IFileProps } from '@/intefaces/IFileProps';
import { useGetFile } from '@/services/useGetFileService';

const useLoadFile = ({ picture }: { picture: IFileProps|undefined }) => {
    const fileName = picture?.nombre_archivo || '';
    let { isLoading, data } = useGetFile(fileName, !!fileName);
    return {
        showImage: (!isLoading && data),
        isLoading,
        data
    }

}

export default useLoadFile