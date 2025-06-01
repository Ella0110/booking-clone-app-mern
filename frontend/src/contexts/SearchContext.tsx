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
    const [destination, setDestination] = useState<string>(
        () => sessionStorage.getItem("destination") || ""
    );
    const [checkIn, setCheckIn] = useState<Date>(
        () =>
            new Date(
                sessionStorage.getItem("checkIn") || new Date().toISOString()
            )
    );
    const [checkOut, setCheckOut] = useState<Date>(
        () =>
            new Date(
                sessionStorage.getItem("checkOut") || new Date().toISOString()
            )
    );
    const [adultCount, setAdultCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem("adultCount") || "1")
    );
    const [childCount, setChildCount] = useState<number>(() =>
        parseInt(sessionStorage.getItem("childCount") || "0")
    );
    const [hotelId, setHotelId] = useState<string>(
        () => sessionStorage.getItem("hotelID") || ""
    );

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
        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("adultCount", adultCount.toString());
        sessionStorage.setItem("childCount", childCount.toString());

        if (hotelId) {
            sessionStorage.setItem("hotelId", hotelId);
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
