export function isDateBetweenBooking(
    startDate: Date,
    endDate: Date,
    date: Date = new Date()
): boolean {
    return date >= startDate && date <= endDate;
}
