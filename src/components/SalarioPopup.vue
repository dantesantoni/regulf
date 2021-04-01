<template>
  <b-modal
    ref="salarioPopup"
    id="salarioPopup"
    title="Salario"
    size="lg"
    ok-title="Cerrar"
    ok-only
  >



    <b-form-row>
      <b-col>
        <b-form-group label="id">
          <b-form-input v-model="value.id" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="tipo_contrato">
          <b-form-input v-model="value.tipo_contrato" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="camino">
          <b-form-input v-model="value.id" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>

        <b-form-row>
      <b-col>
        <b-form-group label="organismo_nombre">
          <b-form-input v-model="value.organismo_nombre" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="organismo_codigo">
          <b-form-input v-model="value.organismo_codigo" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="fecha_publicacion">
          <b-form-input v-model="value.fecha_publicacion" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>

        <b-form-row>
      <b-col>
        <b-form-group label="anyo">
          <b-form-input v-model="value.anyo" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="mes">
          <b-form-input v-model="value.mes" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="tipo_estamento">
          <b-form-input v-model="value.tipo_estamento" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>
        <b-form-row>
      <b-col>
        <b-form-group label="nombre">
          <b-form-input v-model="value.anyo" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="grado_eus">
          <b-form-input v-model="value.mes" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="tipo_calificacionp">
          <b-form-input v-model="value.tipo_estamento" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>
        <b-form-row>
      <b-col>
        <b-form-group label="tipo_cargo">
          <b-form-input v-model="value.tipo_cargo" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="region">
          <b-form-input v-model="value.region" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="asignaciones">
          <b-form-input v-model="value.asignaciones" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>
        <b-form-row>
      <b-col>
        <b-form-group label="diurnas">
          <b-form-input v-model="value.diurnas" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="nocturnas">
          <b-form-input v-model="value.nocturnas" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="festivas">
          <b-form-input v-model="value.festivas" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>
        <b-form-row>
      <b-col>
        <b-form-group label="fecha_ingreso">
          <b-form-input v-model="value.fecha_ingreso" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="fecha_termino">
          <b-form-input v-model="value.fecha_termino" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="observaciones">
          <b-form-input v-model="value.observaciones" disabled size="camino" />
        </b-form-group>
      </b-col>
    </b-form-row>
            <b-form-row>
      <b-col>
        <b-form-group label="enlace">
          <b-form-input v-model="value.enlace" disabled size="sm" />
        </b-form-group>
      </b-col>
            <b-col>
        <b-form-group label="viaticos">
          <b-form-input v-model="value.viaticos" disabled size="sm" />
        </b-form-group>
      </b-col>

    </b-form-row>
  </b-modal>
</template>

<script>
// @ is an alias to /src

//import axios from "axios";
//import NavBar from "@/components/NavBar.vue";
//import Autocompletar from "@/components/Autocompletar.vue";
export default {
  components: {},
  props: {
    value: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data: function () {
    return {
      apiurl: process.env.VUE_APP_API,
    };
  },
  computed: {},
  watch: {},
  filters: {},
  methods: {},
  created: function () {},
  mounted: function () {},
};
</script>
