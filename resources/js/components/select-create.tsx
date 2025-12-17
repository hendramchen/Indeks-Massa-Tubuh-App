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
    hasCreateButton?: boolean;
}

export default function SelectCreate({
    options,
    setOptions,
    selectedOption,
    setSelectedOption,
    placeholder,
    hasCreateButton = true,
}: SelectCreateProps) {
    const handleCreateOpt = (newOpt: string) => {
        const newOption = { value: newOpt, label: newOpt };
        setOptions([...options, newOption]);
        setSelectedOption(newOpt);
    };
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Pilih {placeholder}</label>
            <Autocomplete
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                onCreateNew={hasCreateButton ? handleCreateOpt : undefined}
                placeholder="Pilih atau buat baru..."
                searchPlaceholder={`Cari ${placeholder}...`}
                emptyText={`Tidak ada ${placeholder} ditemukan.`}
                createText="Buat baru"
            />
        </div>
    );
}
