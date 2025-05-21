import React, { useContext, useState } from "react";

// 为什么要有这个 search context 呢？因为用户搜索的内容我们在很多地方都需要用到，需要记录这个数据，所以使用上下文
type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number
    ) => void;
};

type SearchContentProviderProps = { children: React.ReactNode };

// create a context
const SearchContext = React.createContext<SearchContext | undefined>(undefined);

// create a provider
export const SearchContextProvider = ({
    children,
}: SearchContentProviderProps) => {
    const [destination, setDestination] = useState<string>(""); // 括号里是默认值
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>("");

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number
    ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hotelId) {
            setHotelId(hotelId);
        }
    };
    return (
        <SearchContext.Provider
            value={{
                destination,
                checkIn,
                checkOut,
                adultCount,
                childCount,
                hotelId,
                saveSearchValues,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

// 返回一个 hook
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
};
