'use client'

import { FC } from 'react';

type Elemento = {
    title?: string;
    claim: string;
}

type Props = {
    title?: string;
    list: Elemento[];
    image: string;
}

const ListColumnsSection: FC<Props> = ({
    title,
    list,
    image
}) => {
    return (
        <section>

        </section>
    );
};

export default ListColumnsSection;