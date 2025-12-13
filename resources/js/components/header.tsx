import { cn } from '@/lib/utils';
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
        <header>
            <nav className="border-gray-200 bg-[#d6336c] px-4 py-2.5 lg:px-6">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/heart3.svg" alt="sigizi logo" />
                        <h1 className="text-2xl font-semibold text-white">
                            Sigizi
                        </h1>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            href="#"
                            className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-[#d6336c] focus:ring-4 focus:ring-gray-300 focus:outline-none lg:px-5 lg:py-2.5"
                        >
                            Log in
                        </Link>
                        <Link
                            href="#"
                            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2 rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-4 focus:outline-none lg:px-5 lg:py-2.5"
                        >
                            Register
                        </Link>
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-[#ffdeeb] hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false"
                            onClick={toggleOpen}
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
                    <div
                        className={cn(
                            'hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto',
                            open ? 'block' : 'hidden',
                        )}
                        id="mobile-menu-2"
                    >
                        <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
                            <li>
                                <Link
                                    href="/tabel-zscore"
                                    className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 font-semibold text-white lg:bg-transparent lg:p-0"
                                    aria-current="page"
                                >
                                    Zscores
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/parents"
                                    className="lg:hover:text-primary-700 py-2 pr-4 pl-3 text-[#ffdeeb] lg:border-0 lg:p-0 lg:hover:bg-transparent"
                                >
                                    Parents
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/children"
                                    className="lg:hover:text-primary-700 py-2 pr-4 pl-3 text-[#ffdeeb] lg:border-0 lg:p-0 lg:hover:bg-transparent"
                                >
                                    Children
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
