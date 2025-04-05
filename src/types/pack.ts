export interface ItemListPack{
    id_pack: number;
    description: string;
    shortDescription: string;
    uriIcon: string;
    slug: string;
    id_ambito?: number;
    id_sector?: number;
    slug_ambito?: string;
    slug_sector?: string;
}

export interface Pack{
    id_pack: number;
    description: string;
    shortDescription: string;
    uriIcon: string;
    slug: string;
    id_ambito: number;
    id_sector: number;
    slug_ambito: string;
    slug_sector: string;
    descriptionForHighLight: string;
    
}