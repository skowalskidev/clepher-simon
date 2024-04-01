import Image from "next/image";

export const Header = ({ children }: any) => {
    return (
        <header>
            <nav className="flex p-2 gap-3">
                <div className='relative aspect-square w-12 shrink-0'>
                    <Image
                        priority
                        src='/images/profile.jpeg'
                        alt='simon kowalski profile picture'
                        fill
                        className='object-cover rounded-full'
                        sizes="40vw,(min-width: 1024px) 33vw"></Image>
                </div>
                {children}
            </nav>
        </header>
    );
};