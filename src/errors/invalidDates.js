export function invalidDatesError(smallerDate, biggerDate) {
    return {
        type: "invalidDates",
        message: `The dates params aren't valid! The smallerDate: ${smallerDate} can't be bigger than the biggerDate: ${biggerDate} param!`
    }
}