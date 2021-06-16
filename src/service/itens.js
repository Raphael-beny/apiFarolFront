import { http } from './config'

export default {

    listar:() => {
        return http.get('itens')
    },

    buscaUnico:(item) => {
        return http.get('item/{id}', item.id)
    },

    salvar:(item) => {
        return http.post('item', item)
    },

    atualizar:(item) => {
        return http.put('item', item)
    },

    apagar:(item) => {
        return http.delete('item', { data: item })
    },

    atualizarDisponibilidade:(item) => {
        return http.put('item/atualizaDisponibilidade/' + item.id)
    },

    atualizarStatus:(item) => {
        return http.put('item/atualizaStatus/' + item.id)
    }

}