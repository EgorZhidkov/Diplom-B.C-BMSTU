import clientsService from "../../../services/clients-service";
const getAllClients = async({ commit }, payload) => {
    payload = JSON.stringify(payload);
    await clientsService.getAllClients(payload).then((response) => {
        let data = response.data.resp;
        // data.docs.forEach((item) => {
        //     item.fullName = item.fullName.name + " " + item.fullName.surname
        // })
        commit('setClients', data)
    }).catch((error) => {
        console.log(error)
    })

}

export const actions = {
    getAllClients
}