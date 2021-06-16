<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de itens de inventário</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
            campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>
     
      <form @submit.prevent="salvar">

          <label>Descricao</label>
          <input type="text" placeholder="Descrição" v-model="item.descricao">
          <label>Codigo</label>
          <input type="text" placeholder="Código"  v-model="item.codigo">
          <label>Localizacao</label>
          <input type="text" placeholder="Localização" v-model="item.localizacao">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>DESCRIÇÃO</th>
            <th>CÓDIGO</th>
            <th>LOCALIZAÇÃO</th>
            <th>DATA MOVIMENTAÇÃO</th>
            <th>SÉRIE</th>
            <th>DISPONIBILIDADE</th>
            <th>STATUS</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="item of itens" :key="item.id">

            <td>{{ item.descricao }}</td>
            <td>{{ item.codigo }}</td>
            <td>{{ item.localizacao }}</td>
            <td>{{ item.dataMoviment }}</td>
            <td>{{ item.serie }} </td>
            <td>{{ item.disponibilidade }} <button @click="setarDisp(item)" class="waves-effect waves-light btn-small">Indisponibilizar</button></td> 
            <td>{{ item.status }} <button @click="setarStatus(item)" class="waves-effect waves-light btn-small">Inativar</button></td> 
            <td>
              <button @click="editar(item)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(item)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Item from './service/itens'

export default {

  data(){
    return {
      item:{
        id: '',
        descricao: '',
        codigo: '',
        localizacao: ''
      },
      itens: [],
      errors: []
    }

  },

  mounted(){
     this.listar()
  },

  methods:{

    listar(){
      Item.listar().then(resposta => {
        this.itens = resposta.data
      })
    },

    salvar(){

      if(!this.item.id){
          Item.salvar(this.item).then(() =>{
            this.item = {}
            alert('Salvo com sucesso!')
            this.listar()
            this.errors = []
          }).catch(e =>{
            this.errors = e.response.data.errors
          })
       }else{
          Item.atualizar(this.item).then(() =>{
            this.item = {}
            alert('Atualizado com sucesso!')
            this.listar()
            this.errors = []
          }).catch(e =>{
            this.errors = e.response.data.errors
          })
       }
    },

    editar(item){
      this.item = item
    },


    remover(item){

      if(confirm('Deseja excluir o item?')){
        Item.apagar(item).then(() =>{
          this.listar()
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    },

    setarDisp(item){
      Item.atualizarDisponibilidade(item).then(() =>{
          this.item = {}
            alert('Atualizado com sucesso!')
            this.listar()
            this.errors = []
          }).catch(e =>{
            this.errors = e.response.data.errors
      })

    },

    setarStatus(item){
      Item.atualizarStatus(item).then(() =>{
          this.item = {}
            alert('Atualizado com sucesso!')
            this.listar()
            this.errors = []
          }).catch(e =>{
            this.errors = e.response.data.errors
      })

    }

  }

}

</script>

<style>

</style>
