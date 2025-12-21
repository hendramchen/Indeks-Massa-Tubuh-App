import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
export default function ParentDelete() {
    const [open, setOpen] = useState(false);
    const handleCancel = () => {
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
                        onClick={handleCancel}
                    >
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
