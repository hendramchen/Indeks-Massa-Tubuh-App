import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function ParentDelete({ id }: { id: number | string }) {
    const [open, setOpen] = useState(false);
    const handleCancel = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        router.delete(`/parents/${id}`);
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Hapus Data Orang Tua</DialogTitle>
                <DialogDescription>
                    Anda yakin ingin menghapus data ini?
                </DialogDescription>
                <p>
                    Anda tidak dapat mengembalikan data yang telah dihapus,
                    termasuk data anak yang terkait.
                </p>
                <DialogFooter className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
