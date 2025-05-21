import { hotelTypes } from "../config/hotel-option-config";

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-4">
            <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
            <div className="flex flex-col gap-2">
                {hotelTypes.map((hotelType) => (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded-xl size-5"
                            value={hotelType}
                            checked={selectedHotelTypes.includes(hotelType)}
                            onChange={onChange}
                        />
                        <span className="text-gray-800 text-sm">
                            {hotelType}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default HotelTypesFilter;
