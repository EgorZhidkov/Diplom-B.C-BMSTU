import axios from "axios";
const fileAxiosSender = axios.create({
    baseURL: process.env.VUE_APP_SERVER,
    headers: { 'Content-Type': 'multipart/form-data', }
})
export default {
    saveImage(image) {
        const formData = new FormData()
        formData.append('file', image)
        return fileAxiosSender.post('/saveImage', formData, {
            transformRequest: [
                function(data) {
                    return data;
                },
            ],
            onUploadProgress: (progressEvent) => {
                let complete =
                    (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';
                console.log('complete: ', complete);
            },
        })
    },
    getImage(filePath) {
        let object = {}
        object.imageName = filePath
        object = JSON.stringify(object)
        console.log(object)
        return fileAxiosSender.post('/sendImage', object, {
            headers: { 'Content-Type': 'application/json' },
            responseType: "blob"
        })
    }
}