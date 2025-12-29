import SelectCreate, { AutocompleteOption } from '@/components/select-create';
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
import { FormEvent, useEffect, useState } from 'react';

interface ParentCreateProps {
    csrfToken: string;
    onParentCreated?: () => void;
}

export default function ParentCreate({
    csrfToken,
    onParentCreated,
}: ParentCreateProps) {
    const [open, setOpen] = useState(false);

    const [provinces, setProvinces] = useState<AutocompleteOption[]>([]);
    const [cities, setCities] = useState<AutocompleteOption[]>([]);
    const [districts, setDistricts] = useState<AutocompleteOption[]>([]);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            phone: '',
            province: '',
            city: '',
            district: '',
            address: '',
        });

    useEffect(() => {
        fetch('/province')
            .then((response) => response.json())
            .then((items) => {
                const mapped = items.map((p: { name: string }) => ({
                    label: p.name,
                    value: p.name,
                }));
                setProvinces(mapped);
            })
            .catch(() => setProvinces([]));

        fetch('/city')
            .then((response) => response.json())
            .then((items) => {
                const mapped = items.map((c: { name: string }) => ({
                    label: c.name,
                    value: c.name,
                }));
                setCities(mapped);
            })
            .catch(() => setCities([]));

        fetch('/district')
            .then((response) => response.json())
            .then((items) => {
                const mapped = items.map((d: { name: string }) => ({
                    label: d.name,
                    value: d.name,
                }));
                setDistricts(mapped);
            })
            .catch(() => setDistricts([]));
    }, []);

    const handleCancel = () => {
        setOpen(false);
        reset();
        clearErrors();
    };

    const ensureLocationExists = async (endpoint: string, name: string) => {
        if (!name) return;
        await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
            },
            body: JSON.stringify({ name }),
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await Promise.all([
            ensureLocationExists('/province', data.province),
            ensureLocationExists('/city', data.city),
            ensureLocationExists('/district', data.district),
        ]);

        post('/parents', {
            onSuccess: () => {
                setOpen(false);
                reset();
                if (onParentCreated) {
                    onParentCreated();
                }
            },
        });
    };

    return (
        <div className="mt-6 mb-4 flex justify-center md:justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button data-test="add-parent-button">
                        <Plus /> Tambah Data Orang Tua
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Buat Baru Data Orang Tua</DialogTitle>
                    <DialogDescription>Lengkapi form berikut</DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <Label htmlFor="phone">Nomor Telepon</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                placeholder="Masukkan nomor telepon"
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-600">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <SelectCreate
                            placeholder="Provinsi"
                            options={provinces}
                            setOptions={setProvinces}
                            selectedOption={data.province}
                            setSelectedOption={(value) =>
                                setData('province', value)
                            }
                        />
                        {errors.province && (
                            <p className="text-sm text-red-600">
                                {errors.province}
                            </p>
                        )}

                        <SelectCreate
                            placeholder="Kabupaten/Kota"
                            options={cities}
                            setOptions={setCities}
                            selectedOption={data.city}
                            setSelectedOption={(value) =>
                                setData('city', value)
                            }
                        />
                        {errors.city && (
                            <p className="text-sm text-red-600">
                                {errors.city}
                            </p>
                        )}

                        <SelectCreate
                            placeholder="Kecamatan/Desa"
                            options={districts}
                            setOptions={setDistricts}
                            selectedOption={data.district}
                            setSelectedOption={(value) =>
                                setData('district', value)
                            }
                        />
                        {errors.district && (
                            <p className="text-sm text-red-600">
                                {errors.district}
                            </p>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                name="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                placeholder="Masukkan alamat"
                            />
                            {errors.address && (
                                <p className="text-sm text-red-600">
                                    {errors.address}
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
