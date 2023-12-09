const defaultImageUrl = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

// sorts concerts by ascending date
function sortConcertsByDate(concertList) {
    // Deep copy of array in order to avoid modifying the original array
    let tempObj = structuredClone(concertList);
    
    if (tempObj.length === 1) return tempObj

    // Sort by date, ascending
    tempObj.sort((a, b) => {
        // Substring date to only yyyy-mm-dd hh:mm:ss
        a = a.date.substring(0, 10) + a.date.substring(11, 19);
        b = b.date.substring(0, 10) + b.date.substring(11, 19);

        // Remove '-' & ':' and join
        a = a.split(/[-:]+/).join("");
        b = b.split(/[-:]+/).join("");

        return a - b;
    });

    return tempObj;
}

// function that returns an array of venues name alphabetically sorted for the dropdown menu
function getVenuesNames(data) {
    const allVenues = data.map((elm) => elm.name);
    const temp = looper(allVenues);

    if (data.length === 1) return temp;

    const venues = sortObject(temp);

    return venues;
}

// function to sort venues alphabetically
function sortObject(data) {
    return data.sort((a, b) => {
        return a.value.localeCompare(b.value);
    });
}

// function to create an array of venues names 
function looper(type) {
    const newArray = [];

    if (type.length === 1) {
        newArray.push({
            key: type[0],
            text: type[0],
            value: type[0],
        });
        return newArray;
    }

    for (let i = 0; i < type.length; i++) {
        const exists = newArray.some((elm) => elm.key === type[i]);
        if (!exists) {
            newArray.push({
                key: type[i],
                text: type[i],
                value: type[i],
            });
        }
    }
    return newArray;
}

function setDefaultImageUrl(imageUrl) {
    if (imageUrl.length === 0) return defaultImageUrl;

    return imageUrl;
}

export { sortConcertsByDate, getVenuesNames, setDefaultImageUrl, defaultImageUrl };
