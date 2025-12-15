import { Autocomplete } from '@/components/autocomplete';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
export default function ParentFilter() {
    const [tags, setTags] = useState([
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
    ]);

    const [selectedTag, setSelectedTag] = useState('');

    const handleCreateTag = (newTag: string) => {
        const value = newTag.toLowerCase().replace(/\s+/g, '-');
        const newOption = { value, label: newTag };
        setTags([...tags, newOption]);
        setSelectedTag(value);
    };
    return (
        <Card className="rounded-none md:rounded-lg">
            <CardHeader>
                <CardTitle>Filter Daftar Orang Tua</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Technology Tag
                        </label>
                        <Autocomplete
                            options={tags}
                            value={selectedTag}
                            onChange={setSelectedTag}
                            onCreateNew={handleCreateTag}
                            placeholder="Select or create a tag..."
                            searchPlaceholder="Search tags..."
                            emptyText="No tags found."
                            createText="Create tag"
                        />
                        {selectedTag && (
                            <p className="text-sm text-gray-600">
                                Selected:{' '}
                                <span className="font-medium">
                                    {
                                        tags.find(
                                            (t) => t.value === selectedTag,
                                        )?.label
                                    }
                                </span>
                            </p>
                        )}
                    </div>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Filter</Button>
            </CardFooter>
        </Card>
    );
}
