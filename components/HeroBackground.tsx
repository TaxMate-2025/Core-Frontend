'use client';

import Image from 'next/image';
import { ReactNode, CSSProperties } from 'react';
import layout_grid from '@/public/layout_grid.svg';

interface HeroBackgroundProps {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    opacity?: number;
}

export const HeroBackground = ({
    children,
    className = '',
    size = 'md',
    opacity = 30,
}: HeroBackgroundProps) => {
    const sizeClasses = {
        sm: 'py-8 sm:py-10 md:py-12',
        md: 'py-16 sm:py-20 md:py-28',
        lg: 'py-24 sm:py-32 md:py-40',
    };

    const gridOpacityStyle: CSSProperties = {
        opacity: opacity / 100,
    };

    return (
        <div className={`relative px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} hero_gradient ${className}`}>
            <div className="absolute inset-0">
                <Image
                    src={layout_grid}
                    alt="background_layout_grid"
                    fill
                    className="object-cover"
                    style={gridOpacityStyle}
                    priority
                />
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default HeroBackground;