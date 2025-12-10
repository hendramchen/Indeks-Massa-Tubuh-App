import Footer from '@/components/footer';
import Header from '@/components/header';

export default function SigiziLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <main className="container mx-auto min-h-screen">{children}</main>
            <Footer />
        </div>
    );
}
