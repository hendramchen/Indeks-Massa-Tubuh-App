import { formatDateToReadable, genderToLabel } from '@/lib/utils';
import { ChildType } from '@/types/child-info';
import { ParentType } from '@/types/parent-info';
import ParentEditChild from '../parents/parent-edit-child';

interface Props {
    child: ChildType;
    parent: ParentType;
}
export default function ChildBio({ child, parent }: Props) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#d6336c]">
                    Data Anak
                </h1>
                <ParentEditChild child={child} showEditText={true} />
            </div>

            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Jenis Kelamin</h1>
                <p>{genderToLabel(child.gender)}</p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Tanggal Lahir</h1>
                <p>{formatDateToReadable(child.birth_date)}</p>
            </div>
            <hr />
            <h1 className="text-xl font-semibold text-[#d6336c]">
                Data Orang Tua
            </h1>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Nama</h1>
                <p>{parent.name}</p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Telepon</h1>
                <p>{parent.phone}</p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Provinsi</h1>
                <p>{parent.province}</p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Kabupaten/Kota</h1>
                <p>{parent.city}</p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Kecamatan/Desa</h1>
                <p>{parent.district}</p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                <h1 className="font-bold">Alamat</h1>
                <p>{parent.address}</p>
            </div>
        </>
    );
}
