import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { login, logout, register, tabelZscore } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Header({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };
    return (
        <header className="border-b border-[#c4c4c4]">
            <nav className="border-gray-200 bg-gradient-to-r from-[#03a79f] to-[#016c82] px-4 py-2.5 lg:px-6 dark:bg-gray-800">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <Link href="/" className="text-2xl text-white">
                        Sigizi
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {auth.user ? (
                            <Link
                                href={logout()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Logout
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-white hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                        <button
                            onClick={toggleOpen}
                            type="button"
                            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <NavigationMenu
                        className={cn(
                            'hidden h-full font-semibold text-white md:flex',
                            open ? 'block' : 'hidden',
                        )}
                    >
                        <NavigationMenuList className="flex h-full w-[300px] flex-col items-stretch gap-4 space-x-6 py-4 lg:flex-row">
                            <NavigationMenuItem>
                                <Link href={tabelZscore()}>Tabel ZScore</Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/imt-result">Tercatat</Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>
        </header>
    );
}
