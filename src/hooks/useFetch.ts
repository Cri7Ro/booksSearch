export default function useFetch() {
    async function get(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async function post(url: string, body: string) {
        const response = await fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    }
    return {get, post};
}