<template>
  <div id="x" class="container">

    <b-form-row>
      <b-col>
        <h1>Buscador</h1>
      </b-col>
      <b-col class="text-right">
        <b-button
          @click="procesar"
          variant="outline-primary"
          size="md"
          pill
          v-b-tooltip.hover
          title="Cargar archivo"
        >
          <font-awesome-icon icon="upload" />
        </b-button>
      </b-col>
    </b-form-row>


    <b-form-row>
      <b-col>
        <b-form-group label="Institución">
          <b-input
            type="text"
            v-model="filter.organismo_nombre"
            size="sm"
            debounce="1000"
          /> </b-form-group
      ></b-col>
      <b-col>
        <b-form-group label="Nombre">
          <b-input
            type="text"
            v-model="filter.nombre"
            size="sm"
            debounce="1000"
          /> </b-form-group
      ></b-col>
    </b-form-row>

    <hr />
    <!--h2>
      Resultados <span class="badge badge-secondary">{{ totalRegistros }}</span>
    </h2-->

    <b-pagination
      v-model="filter.pagina"
      :total-rows="totalRegistros"
      per-page="30"
      size="md"
      limit="11"
      align="center"
    ></b-pagination>

    <b-table
      id="tabla"
      ref="tabla"
      :items="myProvider"
      :fields="fields"
      :filter="filter"
      @row-clicked="editar"
      :current-page="filter.pagina"
      per-page="10"
      small
      hover
      head-variant="light"
    >
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>

      <template #head(remuliquida_mensual)="data">
        <div class="text-right">{{ data.label }}</div>
      </template>
      <template #cell(remuliquida_mensual)="data">
        <div class="text-right">{{ data.value | filterPeso }}</div>
      </template>
      <template #head(remuneracionbruta)="data">
        <div class="text-right">{{ data.label }}</div>
      </template>
      <template #cell(remuneracionbruta)="data">
        <div class="text-right">{{ data.value | filterPeso }}</div>
      </template>
    </b-table>



    <!--Ventana modal para edicion-->

    <text-upload @actualizado="refrescar" />
    <salario-popup v-model="salario" />
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
//import NavBar from "@/components/NavBar.vue";

import TextUpload from "@/components/TextUpload.vue";
import SalarioPopup from "@/components/SalarioPopup.vue";
export default {
  
  components: {
    TextUpload,SalarioPopup
  },
  data: function () {
    return {
      apiurl: process.env.VUE_APP_API,

      filter: {
        pagina: 1,
        organismo_nombre: "",
        nombre: "",
      },

      fields: [
        { key: "organismo_nombre", label: "Institución" },
        { key: "nombre", label: "Nombre" },
        { key: "anyo", label: "Año" },
        { key: "mes", label: "Mes" },
        { key: "remuliquida_mensual", label: "Líquido" },
        { key: "remuneracionbruta", label: "Bruto" },
      ],
      mensaje: "",

      salario: {},
      totalRegistros: 0,
    };
  },
  computed: {},
  filters: {
    filterPeso: function (num) {
      return (num * 1)
        .toFixed(0)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },


  },
  methods: {
    myProvider: function (ctx) {
      console.log("myProvider");
      console.log(ctx);

      var self = this;

      const promise = axios.post(this.apiurl + "apirouter.php", {
        entidad: "Salario",
        metodo: "filtrar",
        filtro: this.filter,
      });

      // Must return a promise that resolves to an array of items
      return promise.then((response) => {
        console.log(response.data);

        self.totalRegistros = response.data.totalRegistros;
        const items = response.data.registros;
        // Must return an array of items or an empty array if an error occurred
        return items || [];
      });
    },
    refrescar() {
      console.log("refrescar");
      this.$refs.tabla.refresh();
    },


    procesar: function () {
      console.log("procesar");

      this.$bvModal.show("textUpload");
    },
    editar: function (val) {
      console.log(val);
      this.salario = val;
      this.$bvModal.show("salarioPopup");
    },
  },
  created: function () {},
  mounted: function () {
    console.log("mounting....");
  },
};
</script>
