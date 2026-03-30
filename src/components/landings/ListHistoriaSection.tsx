'use client'

import { FC } from 'react';

type Elemento = {
    title: string;
    claim?: string;
}

type Props = {
    title?: string;
    claim?: string[];
    titlelist?: string;
    list: Elemento[],
    image: string;
    pragma?: string[];
}

const ListHistoriaSection: FC<Props> = ({
    title,
    claim,
    titlelist,
    list,
    image,
    pragma
}) => {
    return (
        <section>

        </section>
    );
};

export default ListHistoriaSection;