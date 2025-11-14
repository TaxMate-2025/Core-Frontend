import Image from 'next/image';

interface IllustrationPanelProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    subtitle?: string;
    textPosition?: {
        top?: string;
        left?: string;
        right?: string;
    };
}

function IllustrationPanel({
    imageSrc,
    imageAlt,
    title,
    subtitle,
    textPosition = { top: '27%', left: '60px' },
}: IllustrationPanelProps) {
    return (
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
            />
            {/* Text Overlay */}
            <div
                className="absolute z-10"
                style={{
                    top: textPosition.top,
                    left: textPosition.left,
                    right: textPosition.right,
                }}
            >
                <h2 className="text-white text-[32px] font-semibold leading-tight">
                    {title}
                    {subtitle && (
                        <>
                            <br />
                            {subtitle}
                        </>
                    )}
                </h2>
            </div>
        </div>
    );
}

export default IllustrationPanel;