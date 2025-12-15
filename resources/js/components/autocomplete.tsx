import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export type AutocompleteOption = {
    label: string;
    value: string;
};

export interface AutocompleteProps {
    options?: AutocompleteOption[];
    value: string;
    onChange: (value: string) => void;
    onCreateNew?: (label: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    createText?: string;
    className?: string;
    disabled?: boolean;
}

export function Autocomplete({
    options = [],
    value,
    onChange,
    onCreateNew,
    placeholder = 'Select or create...',
    searchPlaceholder = 'Search...',
    emptyText = 'No results found.',
    createText = 'Create',
    className,
    disabled = false,
}: AutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const popoverRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const selectedOption = useMemo(
        () => options.find((option) => option.value === value),
        [options, value],
    );

    const filteredOptions = useMemo(
        () =>
            options.filter((option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase()),
            ),
        [options, searchValue],
    );

    const showCreateOption = useMemo(() => {
        if (!onCreateNew) return false;
        if (!searchValue) return false;
        return !filteredOptions.some(
            (opt) => opt.label.toLowerCase() === searchValue.toLowerCase(),
        );
    }, [filteredOptions, onCreateNew, searchValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const targetNode = event.target as Node | null;
            if (
                popoverRef.current &&
                targetNode &&
                !popoverRef.current.contains(targetNode)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            inputRef.current?.focus();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleSelect = (currentValue: string) => {
        onChange(currentValue === value ? '' : currentValue);
        setOpen(false);
        setSearchValue('');
    };

    const handleCreate = () => {
        if (!onCreateNew) return;
        const next = searchValue.trim();
        if (!next) return;
        onCreateNew(next);
        setSearchValue('');
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setOpen(false);
            setSearchValue('');
        }
    };

    return (
        <div className="relative w-full" ref={popoverRef}>
            <button
                type="button"
                onClick={() => !disabled && setOpen(!open)}
                disabled={disabled}
                className={cn(
                    'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
                    'hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
            >
                <span className={cn(!selectedOption && 'text-gray-500')}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="flex items-center border-b border-gray-200 px-3">
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {searchValue && (
                            <button
                                type="button"
                                onClick={() => setSearchValue('')}
                                className="ml-2 rounded p-1 hover:bg-gray-100"
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        )}
                    </div>

                    <div className="max-h-64 overflow-y-auto p-1">
                        {filteredOptions.length === 0 && !showCreateOption && (
                            <div className="py-6 text-center text-sm text-gray-500">
                                {emptyText}
                            </div>
                        )}

                        {filteredOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={cn(
                                    'relative flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-sm outline-none select-none',
                                    'hover:bg-gray-100 focus:bg-gray-100',
                                    value === option.value && 'bg-gray-100',
                                )}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === option.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                    )}
                                />
                                {option.label}
                            </button>
                        ))}

                        {showCreateOption && (
                            <button
                                type="button"
                                onClick={handleCreate}
                                className="relative flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-sm font-medium text-blue-600 outline-none select-none hover:bg-blue-50 focus:bg-blue-50"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {createText} &quot;{searchValue}&quot;
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
