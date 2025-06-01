const ReviewHoursRules = () => {
    return (
        <div className="flex flex-col rounded-lg border border-bookingborder p-5 h-fit gap-2">
            <div className="text-md font-bold">Review house rules</div>
            <div className="text-sm">
                Your host would like vou to agree to the followina house rules:
            </div>
            <li className="text-sm list-disc text-green-700">No smoking</li>
            <li className="text-sm list-disc text-green-700 ">
                Pets are not allowed
            </li>
            <div className="text-sm font-medium">
                By continuing to the next step, you are agreeing to these house
                rules
            </div>
        </div>
    );
};

export default ReviewHoursRules;
