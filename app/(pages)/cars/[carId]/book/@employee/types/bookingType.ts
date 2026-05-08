export type bookingType = {
    id: number;
    customerName: string;
    createdAt: Date;
    carId: number;
    userId: number | null;
    startDate: Date;
    endDate: Date;
    pickupTime: string;
    car: {
        id: number;
        brand: string;
        modelName: string;
        createdAt: Date;
        plateNo: string;
    };
}[];
