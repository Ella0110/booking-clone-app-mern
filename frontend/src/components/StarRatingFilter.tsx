type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-4">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            <div className="flex flex-col gap-2">
                {["5", "4", "3", "2", "1"].map((star) => (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="border-[1px] rounded-sm border-neutral-400 size-5"
                            value={star}
                            checked={selectedStars.includes(star)}
                            onChange={onChange}
                        />
                        <span className="text-gray-800 text-sm">
                            {star} Stars
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default StarRatingFilter;
