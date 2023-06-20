export default function (response: any, alert: any) {
    if (process.env.NODE_ENV === "development") {
        throw new Error(response.message, { cause: response.name });
    } else {
        alert(response.message, 'error');
    }

}