import { Link } from '@inertiajs/react';
export default function Footer() {
    return (
        <footer className="flex w-full flex-col items-center gap-4 bg-gradient-to-r from-[#03a79f] to-[#016c82] py-6 text-white">
            <div className="flex items-center gap-2">
                <img
                    src="/heart.svg"
                    alt="sigizi logo"
                    width={28}
                    height={28}
                    className="h-9 w-9 rounded-full bg-white"
                />
                <Link href="/" className="text-2xl font-semibold text-white">
                    Sigizi
                </Link>
            </div>
            <p className="text-center">© 2025 Sigizi. All rights reserved.</p>
        </footer>
    );
}
