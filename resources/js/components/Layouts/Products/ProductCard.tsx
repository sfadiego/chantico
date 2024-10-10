import React, { useState } from 'react'
import { IProductImage } from '@resources/interfaces/IProductImage';
import { Card, CardBody, Row } from 'react-bootstrap'
import { getImage } from '../../../hooks/useProductService';
import { useGetFile } from '@/services/useGetFileService';
import LoadingComponent from '../LoadingComponent';

interface productCardProps {
    image?: IProductImage,
    price: number,
    name: string,
    classCard?: string
}

const useLoadProductImage = ({ image }) => {
    const fileName = image?.nombre_archivo;
    let { isLoading, data } = useGetFile(fileName, !!fileName);
    return {
        showImage: (!isLoading && data),
        isLoading,
        data
    }
}

export const ProductCard = ({ image, price, name, classCard }: productCardProps) => {
    const { showImage, isLoading, data } = useLoadProductImage({ image });

    return (
        <div className={`${classCard ? classCard : 'col-lg-3 col-md-4 col-12 col-sm-6 col-xl-2 pt-1'}`}>
            <Card className='rounded-0 pb-1'>
                {
                    isLoading && <LoadingComponent extraClass='text-center'></LoadingComponent>
                }

                {
                    (showImage) && <Card.Img className='rounded-0' src={URL.createObjectURL(new Blob([data!]))} ></Card.Img>
                }

                <CardBody className=''>
                    <p className="card-text text-secondary">{name}</p>
                    <b> ${price}</b>
                </CardBody>
            </Card>
        </div>
    )
}
