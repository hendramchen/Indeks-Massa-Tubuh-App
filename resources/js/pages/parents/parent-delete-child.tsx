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
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export function ParentDeleteChild({ id }: { id: number | string }) {
    const [open, setOpen] = useState(false);
    const handleCancel = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        router.delete(`/children/${id}`);
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Trash2 className="h-4 w-4 cursor-pointer text-red-600" />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Hapus Data Anak</DialogTitle>
                <DialogDescription>
                    Anda yakin ingin menghapus data ini?
                </DialogDescription>
                <p>Anda tidak dapat mengembalikan data yang telah dihapus</p>
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
