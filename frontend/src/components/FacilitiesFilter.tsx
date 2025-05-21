import { hotelFacilities } from "../config/hotel-option-config";

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-4">
            <h4 className="text-md font-semibold mb-2">Facilities</h4>
            <div className="flex flex-col gap-2">
                {hotelFacilities.map((facility) => (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded-sm border-neutral-400 size-5"
                            value={facility}
                            checked={selectedFacilities.includes(facility)}
                            onChange={onChange}
                        />
                        <span className="text-gray-800 text-sm">
                            {facility}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FacilitiesFilter;
