import { Link } from '@inertiajs/react';
export default function Footer() {
    return (
        <footer className="flex w-full flex-col items-center gap-4 bg-[#a61e4d] py-6 text-white">
            <div className="flex items-center gap-2">
                <img src="/heart3.svg" alt="sigizi logo" />
                <Link href="/" className="text-2xl font-semibold text-white">
                    Sigizi
                </Link>
            </div>
            <p className="text-center">© 2025 Sigizi. All rights reserved.</p>
        </footer>
    );
}
