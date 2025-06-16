export default async function TestRequestServer(status: boolean): Promise<string> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            status ? res("request berhasil") : rej("request gagal")
        }, 2000)
    })
}