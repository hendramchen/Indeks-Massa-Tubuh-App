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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface ParentCreateProps {
    parentInfoId: number | string;
}

export default function ParentCreateChild({ parentInfoId }: ParentCreateProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            birth_date: '',
            gender: 'male',
            parent_info_id: parentInfoId,
        });

    const handleCancel = () => {
        setOpen(false);
        reset();
        clearErrors();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(data);

        post('/children', {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <div className="flex justify-center md:justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button data-test="add-parent-button">
                        <Plus /> Tambah Data Anak
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Buat Baru Data Anak</DialogTitle>
                    <DialogDescription>Lengkapi form berikut</DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="hidden"
                            name="parent_info_id"
                            value={parentInfoId}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Masukkan nama"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthdate">Tanggal Lahir</Label>
                            <Input
                                id="birth_date"
                                className="w-full bg-gray-700 font-semibold text-white"
                                name="birth_date"
                                type="date"
                                value={data.birth_date}
                                onChange={(e) =>
                                    setData('birth_date', e.target.value)
                                }
                            />
                            {errors.birth_date && (
                                <p className="text-sm text-red-600">
                                    {errors.birth_date}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <Select
                                name="gender"
                                value={data.gender}
                                onValueChange={(value) =>
                                    setData(
                                        'gender',
                                        value as 'male' | 'female',
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">
                                        Laki-laki
                                    </SelectItem>
                                    <SelectItem value="female">
                                        Perempuan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && (
                                <p className="text-sm text-red-600">
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        <DialogFooter className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
