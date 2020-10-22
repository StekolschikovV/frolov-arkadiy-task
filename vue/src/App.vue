<template>
  <div class="container">
    <div class="row">
      <div v-for="product of productList" :key="product.id" class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img alt="Card image cap"
               class="card-img-top"
               src="https://www.gannett-cdn.com/-mm-/ada32a4f5055f07292db9003891f8c154f8c42b1/c=0-109-2122-1303/local/-/media/2020/08/11/USATODAY/usatsports/MotleyFool-TMOT-deeef720-rental-home.jpg">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">type: {{ product.type }}</li>
            <li class="list-group-item">rooms: {{ product.attributes.rooms }}</li>
            <li class="list-group-item">area: {{ product.attributes.area }} {{ product.attributes.unit }}</li>
            <li class="list-group-item">address: {{ product.attributes.address.city }}
              , {{ product.attributes.address.street }} {{ product.attributes.address.house }}
              /{{ product.attributes.address.room }}
            </li>
            <li class="list-group-item">
              seller: {{ product.relationships.attributes.last_name }} {{ product.relationships.attributes.first_name }}
            </li>
          </ul>
          <div class="card-body">
            <button class="btn btn-primary" type="button"
                    v-bind:class="{'bg-success': product.isFavorite}"
                    v-on:click="toggleFavorite(product)">
              {{ product.isFavorite ? "Disliked" : "Like" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {environment} from "./environment";
import axios from 'axios';

export default {
  name: 'App',
  data: function () {
    return {
      productList: []
    }
  },
  components: {},
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get(environment.productUrl).then((e) => {
        this.productList = this.normalizeData(e.data.response)
      })
    },
    normalizeData(dataIn) {
      let newProductList = dataIn.map((e) => {
        e.isFavorite = false
        return e
      })
      return newProductList
    },
    toggleFavorite(toggleProduct) {
      let newProductList = this.productList.map((e) => {
        if (e.id === toggleProduct.id) {
          e.isFavorite = !e.isFavorite
          return e
        } else {
          return e
        }
      })
      this.productList = newProductList
    }
  }
}
</script>

<style>

</style>
