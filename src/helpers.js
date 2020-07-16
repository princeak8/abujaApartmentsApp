// import AsyncStorage from "@react-native-community/async-storage";

export const isEmpty = obj => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const checkXterLength = (string) => {
    if(string.length < 20) {
        return string
    }
    return `${string.slice(0, 20)}..`
}

export const shortenXterLength = (string, number=10) => {
    if(string.length < number) {
        return string
    }
    return `${string.slice(0, number)}..`
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// export const getUserDetails = async () => {
//     try {
//         let user = await AsyncStorage.getItem("userData");
//         return JSON.parse(user);
//     } catch (error) {
//         return error;
//     }
// }



