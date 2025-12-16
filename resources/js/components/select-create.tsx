import { Autocomplete } from '@/components/autocomplete';

export type AutocompleteOption = {
    label: string;
    value: string;
};

interface SelectCreateProps {
    options: AutocompleteOption[];
    setOptions: (options: AutocompleteOption[]) => void;
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    placeholder: string;
}

export default function SelectCreate({
    options,
    setOptions,
    selectedOption,
    setSelectedOption,
    placeholder,
}: SelectCreateProps) {
    const handleCreateCity = (newCity: string) => {
        const value = newCity.toLowerCase().replace(/\s+/g, '-');
        const newOption = { value, label: newCity };
        setOptions([...options, newOption]);
        setSelectedOption(value);
    };
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Pilih {placeholder}</label>
            <Autocomplete
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                onCreateNew={handleCreateCity}
                placeholder="Pilih atau buat baru..."
                searchPlaceholder={`Cari ${placeholder}...`}
                emptyText={`Tidak ada ${placeholder} ditemukan.`}
                createText="Buat baru"
            />
        </div>
    );
}
