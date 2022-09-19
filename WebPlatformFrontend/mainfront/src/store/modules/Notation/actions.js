import moment from "moment"
import notationService from "../../../services/notation-service"
import helperService from "../../../services/helper-service"

const getAllNotation = async({ commit }, payload) => {
    payload = JSON.stringify(payload)
    console.log(payload)

    await notationService.allNotation(payload).then((response) => {
        let data = response.data
        data.docs.forEach((item) => {

            item.dataCreated = moment(item.dataCreated).format('YYYY.MM.DD');
        });
        commit('setNotation', data);
    }).catch(error => {
        console.log(error)

    })

}
const getOneNotation = async({ commit }, payload) => {
    console.log(payload)
    payload = JSON.stringify(payload)
    return await new Promise((resolve, reject) => {
        notationService.getOneNotation(payload).then((response) => {
            let data = response.data.resp
            data.dataCreated = moment(data.dataCreated).format('YYYY-MM-DD')
            resolve(data)
        }).catch((error) => {
            reject(error.response.data.message)
        })
    })
}

const updateNotation = async({ commit }, payload) => {
    payload = JSON.stringify(payload)
    notationService.updateNotation(payload).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })
}

const createNewNotation = async({ commit }, payload) => {
    let object = payload;
    object = JSON.stringify(payload)
    return await new Promise((resolve, reject) => {
        notationService.createNotation(payload).then((response) => {
                let status = response.data.status
                    // commit("setLastCreateNotation", payload)
                resolve(status)
            })
            .catch(error => {
                let errorInfo = error.response.data.message
                reject(errorInfo)
            })
    })

}
const saveImage = async({ commit }, payload) => {
    console.log(payload)
        // return await new Promise((resolve, reject) => {
    await helperService.saveImage(payload).then(() => {
            console.log('success')
                // resolve('success')
        }).catch((error) => {
            // reject(error)
            console.log(error)
        })
        // })

}
const getAllCategories = async({ commit }) => {
    await notationService.getAllCategories().then((response) => {
        let data = response.data.resp;
        commit("setCategories", data)
    }).catch((error) => {
        console.log(error.response.data.message)
    })
}

export const actions = {
    getAllNotation,
    createNewNotation,
    getAllCategories,
    saveImage,
    getOneNotation,
    updateNotation
}