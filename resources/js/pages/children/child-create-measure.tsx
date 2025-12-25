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
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function ChildCreateMeasure({ id }: { id: number | string }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            weight: '0',
            height: '0',
            note_date: new Date().toISOString().split('T')[0],
        });

    const handleCancel = () => {
        setOpen(false);
        reset();
        clearErrors();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        post(`/calculate/${id}`, {
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
                        <Plus /> Tambah Data
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Buat Pengukuran Baru</DialogTitle>
                    <DialogDescription>
                        Lengkapi berat dan tinggi badan anak
                    </DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="weight">Berat Badan (kg)</Label>
                            <Input
                                id="weight"
                                name="weight"
                                value={data.weight}
                                type="number"
                                onChange={(e) =>
                                    setData('weight', e.target.value)
                                }
                                placeholder="Masukkan berat badan"
                                min="1"
                                max="100"
                                step="0.1"
                            />
                            {errors.weight && (
                                <p className="text-sm text-red-600">
                                    {errors.weight}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">
                                Panjang / Tinggi Badan (cm)
                            </Label>
                            <Input
                                id="height"
                                name="height"
                                value={data.height}
                                type="number"
                                onChange={(e) =>
                                    setData('height', e.target.value)
                                }
                                placeholder="Masukkan panjang / tinggi"
                                min="1"
                                max="200"
                                step="0.1"
                            />
                            {errors.height && (
                                <p className="text-sm text-red-600">
                                    {errors.height}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="note_date">
                                Tanggal Pencatatan
                            </Label>
                            <Input
                                id="note_date"
                                className="w-full bg-gray-700 font-semibold text-white"
                                name="note_date"
                                type="date"
                                value={data.note_date}
                                onChange={(e) =>
                                    setData('note_date', e.target.value)
                                }
                            />
                            {errors.note_date && (
                                <p className="text-sm text-red-600">
                                    {errors.note_date}
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
