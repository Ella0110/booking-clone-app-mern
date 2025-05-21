import { useState, type FormEvent } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { VscCalendar } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 因为 DatePicker 没有样式，所以我们吟咏这个样式
import { useNavigate } from "react-router";

const SearchBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate();
    const [destination, setDestination] = useState<string>(search.destination); // 存储从 context 拿到的数据，默认值用 context 的内容
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        // 防止 form 自动提交
        event.preventDefault();
        // 保存输入的数据到上下文
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        );
        // 导航到 search pag e
        navigate("/search");
    };
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1); // 取最近一年的数据
    return (
        <form
            onSubmit={handleSubmit}
            className="-mt-6 p-1 bg-orange-300 rounded shadow-md  flex flex-row item-center gap-1"
        >
            <div className="flex flex-row w-1/5 items-center flex-1 rounded bg-white p-2">
                <MdTravelExplore size={25} className="text-gray-700 mr-2" />
                <input
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-hidden"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>
            <div className="flex items-center justify-between w-3/10 bg-white px-2 rounded gap-2">
                <VscAccount size={25} className="text-gray-700 mr-2" />
                <label className="flex item-center ">
                    <div className="flex items-center">Adults: </div>
                    <input
                        className="w-full p-1 focus:outline-hidden font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) =>
                            setAdultCount(parseInt(event.target.value))
                        }
                    />
                </label>
                <label className=" flex">
                    <div className="flex items-center">Children: </div>
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(event) =>
                            setChildCount(parseInt(event.target.value))
                        }
                    />
                </label>
            </div>
            <div className="flex flex-row w-1/5 items-center justify-between bg-white px-2 rounded gap-2">
                <VscCalendar
                    size={25}
                    className="text-gray-700 mr-2 shrink-0"
                />
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="mt-0.5 w-4/5 bg-white p-2 rounded focus:outline-none"
                    wrapperClassName="flex-1"
                />
            </div>
            <div className="flex flex-row w-1/5 items-center justify-between bg-white px-2 rounded gap-2">
                <VscCalendar
                    size={25}
                    className="text-gray-700 mr-2 shrink-0"
                />
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="flex items-center mt-0.5 w-4/5 bg-white p-2 rounded focus:outline-none"
                    wrapperClassName="w-4/5"
                />
            </div>
            <div className="flex rounded gap-1 w-1/10">
                <button className=" w-full bg-bookingbutton rounded text-white h-full p-2 font-medium text-xl hover:bg-bookingbuttonhover">
                    Search
                </button>
                {/* <button className="w-1/3 bg-[#d71a14] rounded text-white h-full p-2 font-medium  text-xl hover:bg-[#bb1611]">
                    Clear
                </button> */}
            </div>
        </form>
    );
};

export default SearchBar;
