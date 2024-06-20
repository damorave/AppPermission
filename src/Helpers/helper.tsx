export function DateHelper(date: Date) {

    /**
     * Formateo de la fecha
     */
    const formattedDate = new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    );

    return formattedDate;
};