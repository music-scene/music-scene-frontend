const defaultImageUrl = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
const defaultProfileImageUrl = "https://upload.wikimedia.org/wikipedia/en/archive/b/b1/20210811082249%21Portrait_placeholder.png"

const allOptions = {
    label: "All",
    value: "All",
    key: "All"
  };

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

// function that returns an array of names alphabetically sorted for the dropdown menu
function getNamesForLists(data, isAll) {
    const allNames = data.map((elm) => elm.name);
    const temp = looper(allNames);

    if (data.length === 1) return temp;

    const names = sortObject(temp);

    if(isAll) names.unshift(allOptions)

    return names;
}

// function to sort names alphabetically
function sortObject(data) {
    return data.sort((a, b) => {
        return a.value.localeCompare(b.value);
    });
}

// function to create an array of names 
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

function setDefaultProfileImageUrl(imageUrl) {
    if (imageUrl.length === 0) return defaultProfileImageUrl;

    return imageUrl;
}


export { sortConcertsByDate, getNamesForLists, setDefaultImageUrl, setDefaultProfileImageUrl, defaultImageUrl, defaultProfileImageUrl };
