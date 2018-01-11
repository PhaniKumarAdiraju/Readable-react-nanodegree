//referral: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uid() {
    function uidGenerate() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return uidGenerate()
}

//referral: https://www.w3schools.com/jsref/jsref_tolocalestring.asp
export function formatTimeStamp(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleString()
}

