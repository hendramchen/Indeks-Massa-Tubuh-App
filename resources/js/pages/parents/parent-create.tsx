import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import { Plus } from 'lucide-react';
export default function ParentCreate() {
    return (
        <div className="mt-6 mb-4 flex justify-center md:justify-end">
            <Dialog>
                <DialogTrigger asChild>
                    <Button data-test="add-parent-button">
                        <Plus /> Tambah Data Orang Tua
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Buat Baru Data Orang Tua</DialogTitle>
                    <DialogDescription>Lengkapi form berikut</DialogDescription>
                    <Form action="/" method="post">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="nama"
                                name="nama"
                                placeholder="Masukkan nama yang ingin difilter"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Alamat</Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder="Masukkan alamat yang ingin difilter"
                            />
                        </div>
                    </Form>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline">Batal</Button>
                        <Button>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
