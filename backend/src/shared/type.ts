export interface HotelType {
    _id: string;
    userId: string; // 创建酒店的 user
    name: string;
    city: string;
    country: string;
    description: string;
    type: string; // 酒店的类型
    adultCount: number; // 酒店房间可以容纳的成人人数
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingType[];
}

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
};

export type BookingType = {
    _id: string;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
};

export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};

export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
};
