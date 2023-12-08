
// sorts concerts by ascending date
function sortConcertsByDate(concertList) {
    // Deep copy of array in order to avoid modifying the original array
    let tempObj = structuredClone(concertList);

    // Sort by date, ascending
    tempObj.sort((a, b) => {

        // Substring date to only yyyy-mm-dd hh:mm:ss
        a = a.date.substring(0, 10) + a.date.substring(11, 19)
        b = b.date.substring(0, 10) + b.date.substring(11, 19)

        // Remove '-' & ':' and join
        a = a.split(/[-:]+/).join("")
        b = b.split(/[-:]+/).join("")

        return a - b
    })

    return tempObj
}

export { sortConcertsByDate }