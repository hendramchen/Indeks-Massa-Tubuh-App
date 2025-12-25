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
import { ChildType } from '@/types/child-info';
import { router, useForm } from '@inertiajs/react';
import { Edit2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface ParentEditChildProps {
    child: ChildType;
    showEditText?: boolean;
}

export default function ParentEditChild({
    child,
    showEditText = false,
}: ParentEditChildProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, processing, errors, reset, clearErrors } = useForm({
        name: child.name ?? '',
        birth_date: child.birth_date ?? '',
        gender: child.gender ?? 'male',
    });

    useEffect(() => {
        if (!open) return;
        setData({
            name: child.name ?? '',
            birth_date: child.birth_date ?? '',
            gender: child.gender ?? 'male',
        });
        clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleCancel = () => {
        setOpen(false);
        reset();
        clearErrors();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        router.put(`/children/${child.id}`, data, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {showEditText ? (
                    <Button variant="outline">
                        <Edit2 className="h-4 w-4 cursor-pointer text-gray-700" />{' '}
                        Edit
                    </Button>
                ) : (
                    <Edit2 className="h-4 w-4 cursor-pointer text-gray-700" />
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit Data Anak</DialogTitle>
                <DialogDescription>Perbarui form berikut</DialogDescription>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
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
                                setData('gender', value as 'male' | 'female')
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Laki-laki</SelectItem>
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
    );
}
