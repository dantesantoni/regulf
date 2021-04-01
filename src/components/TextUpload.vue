<template>
  <b-modal
    ref="textUpload"
    id="textUpload"
    title="Subir cartola manual"
    size="lg"
  >
    <b-form-row>
      <b-col>
        <b-form-group label="Texto">
          <code>
            <b-form-textarea
              v-model="texto"
              rows="5"
              placeholder="Pegue el texto aqui"
              max-rows="10"
              class="text-nowrap"
              style="font-size: 1.2em"
          /></code>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col
        ><code>
          <b-badge pill v-for="(x, index) in salarios" :key="index" class="m-1">{{
            x.enlace
          }}</b-badge></code
        >
      </b-col>
    </b-form-row>
    <template #modal-footer="{ cancel }">
      <b-button variant="primary" size="sm" class="btn btn-primary" @click="procesar">
        Procesar
      </b-button>
      <b-button
        variant="primary"
        size="sm"
        class="btn btn-primary"
        @click="guardar"
        :disabled="!puedeGuardar"
      >
        Guardar
      </b-button>
      <b-button variant="primary" size="sm" class="btn btn-secondary" @click="cancel">
        Cancelar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
//import NavBar from "@/components/NavBar.vue";
//import Autocompletar from "@/components/Autocompletar.vue";

export default {
  components: {},
  props: {},
  data: function () {
    return {
      apiurl: process.env.VUE_APP_API,
      //texto: "",
      texto: `p_6_3399;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Profesional;RIQUELME GAETE JAIME;8;INGENIERO CIVIL QU�MICO;SECRETARIO T�CNICO DEL CONSEJO REGIONAL;Regi�n de Valpara�so;-33;Pesos;2081328.0;1647968.0;No tiene;No tiene;No tiene;01/10/1996;Indefinido;Sin observaciones;No; 0.0
p_6_3400;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Directivo;RODR�GUEZ SAAVEDRA LUIS;4;LICENCIADO EN HISTORIA;JEFE DE DIVISI�N DESARROLLO SOCIAL Y HUMANO;Regi�n de Valpara�so;-1;Pesos;2976401.0;2438447.0;No tiene;No tiene;No tiene;12/03/2018;Indefinido;Sin observaciones;No; 0.0
p_6_3401;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Profesional;ROJAS BRITO OMAR;7;INGENIERO COMERCIAL;SECRETARIO T�CNICO DEL CONSEJO REGIONAL;Regi�n de Valpara�so;-33;Pesos;2283394.0;1801590.0;No tiene;No tiene;No tiene;01/08/2002;Indefinido;Sin observaciones;No; 0.0
p_6_3402;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Directivo;ROSAS GALLARDO INES;6;GE�GRAFA;JEFA DE DEPARTAMENTO DE CONTROL DE GESTI�N;Regi�n de Valpara�so;-33;Pesos;2563503.0;2062845.0;No tiene;No tiene;No tiene;06/08/2003;Indefinido;Sin observaciones;No; 0.0
p_6_3403;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Administrativo;SOTO GONZALEZ MABEL ALEJANDRA;14;ASISTENTE ADMINISTRATIVO MENCI�N CONTABILIDAD;SECRETARIA EN EL DEPARTAMENTO DE FINANZAS;Regi�n de Valpara�so;-1;Pesos;646537.0;527251.0;No tiene;No tiene;No tiene;01/01/2020;31/12/2020;SUPLENTE EXTERNO NO PERCIBE D.L. 3.501;No; 0.0
p_6_3404;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Profesional;TORRICO LAZCANO PATRICIA;6;ADMINISTRADORA TUR�STICOCULTURAL;PROFESIONAL DIVISI�N DE FOMENTO E INDUSTRIA;Regi�n de Valpara�so;-1;Pesos;2400921.0;1909715.0;No tiene;No tiene;No tiene;01/01/2019;Indefinido;Sin observaciones;No; 0.0
p_6_3405;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Profesional;VALENZUELA PEPE HECTOR;4;ABOGADO;ABOGADO EN FISCAL�A;Regi�n de Valpara�so;-33;Pesos;2783945.0;2262097.0;No tiene;No tiene;No tiene;05/05/2003;Indefinido;Sin observaciones;No; 0.0
p_6_3406;planta;/2020/Enero;Gobierno Regional de Valpara�so  ( GORE Valpara�so);AB080;08/05/2020;2020;Enero;Administrativo;VALENZUELA VALDEBENITO JULIA;14;SECRETARIA;DELEGADA PROVINCIAL EN PETORCA;Regi�n de Valpara�so;-1;Pesos;692559.0;566029.0;$122,468 31.00hrs;No tiene;No tiene;01/01/1996;Indefinido;EN COMISI�N DE SERVICIO (GOBERNACI�N PROVINCIAL DE LOS ANDES);No; 0.0

      `,
      salarios: [],
      salario: {
        id: "p_6_3399",
        tipo_contrato: "planta",
        camino: "/2020/Enero",
        organismo_nombre: "Gobierno Regional de Valpara�so  ( GORE Valpara�so)",
        organismo_codigo: "AB080",
        fecha_publicacion: "08/05/2020",
        anyo: "2020",
        mes: "Enero",
        tipo_estamento: "Profesional",
        nombre: "RIQUELME GAETE JAIME",
        grado_eus: "8",
        tipo_calificacionp: "INGENIERO CIVIL QU�MICO",
        tipo_cargo: "SECRETARIO T�CNICO DEL CONSEJO REGIONAL",
        region: "Regi�n de Valpara�so",
        asignaciones: "-33",
        tipo_unidad_monetaria: "Pesos",
        remuneracionbruta: "2081328.0",
        remuliquida_mensual: "1647968.0",
        diurnas: "No tiene",
        nocturnas: "No tiene",
        festivas: "No tiene",
        fecha_ingreso: "01/10/1996",
        fecha_termino: "Indefinido",
        observaciones: "Sin observaciones",
        enlace: "No",
        viaticos: " 0.0",
      },

      puedeGuardar: false,
    };
  },
  computed: {},
  watch: {},
  filters: {
    filterPeso: function (num) {
      return (num * 1)
        .toFixed(0)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
  methods: {
    guardar: function () {
      console.log("guardar");
      this.puedeGuardar = false;
      var self = this;
      axios
        .post(this.apiurl + "apirouter.php", {
          entidad: "Salario",
          metodo: "guardarSet",
          set: this.salarios,
        })
        .then(function (response) {
          console.log(response.data);
          self.$emit("actualizado", {});
          self.$bvModal.hide("textUpload");
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    procesar: function () {
      console.log("procesar");
      this.puedeGuardar = false;
      var rows = this.texto.split("\n");
      console.log(rows);
      if (rows.length > 1) {
        this.salarios = [];
        for (let i = 0; i < rows.length; i++) {
          this.procesarRow(rows[i]);
        }
      } else {
        this.$bvModal.msgBoxOk("el texto ingresado no es procesable");
      }
this.puedeGuardar = this.salarios.length>0 ? true:false;
      console.log(this.salarios);
    },
    procesarRow: function (row) {
      console.log("procesarRow");
      if (row.length > 100) {
        let data = row.split(";");
        let s = Object.assign({}, this.salario);
        s.id = data[0];
        s.tipo_contrato = data[1];
        s.camino = data[2];
        s.organismo_nombre = data[3];
        s.organismo_codigo = data[4];
        s.fecha_publicacion = data[5];
        s.anyo = data[6];
        s.mes = data[7];
        s.tipo_estamento = data[8];
        s.nombre = data[9];
        s.grado_eus = data[10];
        s.tipo_calificacionp = data[11];
        s.tipo_cargo = data[12];
        s.region = data[13];
        s.asignaciones = data[14];
        s.tipo_unidad_monetaria = data[15];
        s.remuneracionbruta = data[16];
        s.remuliquida_mensual = data[17];
        s.diurnas = data[18];
        s.nocturnas = data[19];
        s.festivas = data[20];
        s.fecha_ingreso = data[21];
        s.fecha_termino = data[22];
        s.observaciones = data[23];
        s.enlace = data[24];
        s.viaticos = data[25];
        this.salarios.push(s);
      }
    },
  },
  created: function () {},
  mounted: function () {},
};
</script>
