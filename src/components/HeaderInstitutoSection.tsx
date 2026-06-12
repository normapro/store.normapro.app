'use client'
import { FC } from 'react';

type Props = {
    text: string;
    variant?: 'dark' | 'light';
}

const HeaderInstitutoSection: FC<Props> = ({ text, variant = 'dark' }) => {
    const isDark = variant === 'dark';

    return (
        <div className={`w-full ${isDark ? 'bg-[#010D3D]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto w-full px-6 py-4">
            <p className={`font-bold text-base md:text-lg mb-3 ${isDark ? 'text-white' : 'text-[#010D3D]'}`}>
                {text}
            </p>
            <hr className={`border-t ${isDark ? 'border-white' : 'border-[#010D3D]'}`} />
        </div>
        </div>
    );
};

export default HeaderInstitutoSection;