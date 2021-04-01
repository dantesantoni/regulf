<template>
  <b-modal
    ref="clientePopup"
    id="clientePopup"
    title="Cliente"
    size="lg"
    ok-title="Guardar"
    @ok="guardar"
    cancel-title="Cerrar"
  >
    <b-form-row>
      <b-col sm="3">
        <b-form-group label="Rut">
          <b-form-input
            type="text"
            v-model="cli.rut"
            maxlength="15"
            @blur="cargarCliente"
            :disabled="this.cli.rutno != 0"
            :formatter="rutFormatter"
            lazy-formatter
            size="sm"
          />
        </b-form-group>
        <!-- :disabled="this.cli.rutno != 0"  :formatter="rutFormatter" lazy-formatter -->
      </b-col>
      <b-col sm="1">
        <b-button
          @click="bajarRut"
          title="Actualiza datos desde el SII"
          class="boton-formulario"
          v-b-tooltip.hover
        >
          <font-awesome-icon icon="sync" />
        </b-button>
      </b-col>
      <b-col sm="8">
        <b-form-group label="Nombre">
          <b-form-input type="text" v-model="cli.nombre" maxlength="100" size="sm" />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="6">
        <b-form-group label="Dirección">
          <b-form-input type="text" v-model="cli.direccion" maxlength="80" size="sm" />
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Ciudad">
          <b-form-input type="text" v-model="cli.ciudad" maxlength="20" size="sm" />
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Comuna">
          <b-form-input type="text" v-model="cli.comuna" maxlength="20" size="sm" />
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col sm="6">
        <b-form-group label="Giro">
          <b-form-input type="text" v-model="cli.giro" maxlength="60" size="sm" />
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Teléfono">
          <b-form-input type="text" v-model="cli.telefono" maxlength="20" size="sm" />
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Email">
          <b-form-input type="text" v-model="cli.email" maxlength="80" size="sm" />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col sm="3">
        <b-form-group label="Sucursales">
          <b-select
            v-model="cli.idsucursaldefault"
            size="sm"
            :options="cli.sucursales"
            text-field="direccion"
            value-field="id"
          >
          </b-select>
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Contacto">
          <b-form-input type="text" v-model="cli.contacto" maxlength="60" size="sm" />
        </b-form-group>
      </b-col>
      <b-col sm="3">
        <b-form-group label="Lista de Precio">
          <b-select
            v-model="cli.idpreciolista"
            size="sm"
            :options="listasdeprecio"
            value-field="id"
            text-field="nombre"
          >
            <template #first>
              <b-form-select-option value="0"
                ><strong>General</strong></b-form-select-option
              >
            </template>
          </b-select>
        </b-form-group>
      </b-col>

      <b-col sm="3">
        <b-form-group label="Crédito">
          <b-check v-model="cli.credito" value="1" unchecked-value="0" size="lg" />
        </b-form-group>
      </b-col>
    </b-form-row>
    <!--b-button @click="test">test</b-button-->
  </b-modal>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
//import NavBar from "@/components/NavBar.vue";
//import Autocompletar from "@/components/Autocompletar.vue";
export default {
  components: {},
  props: {
    value: {
      type: Object,
      required: false,
      default: null,
    },
    searchRut: {
      type: String,
      required: false,
      default: "",
    },
  },
  data: function () {
    return {
      apiurl: process.env.VUE_APP_API,
      sucu: 0,
      cli: {},
      clienteVacio: {
        rutno: 0,
        rutdv: 0,
        rutx: 0,
        rut: "",
        nombre: "",
        direccion: "",
        ciudad: "",
        comuna: "",
        giro: "",
        giros: [],
        contacto: "",
        telefono: "",
        email: "",
        idpreciolista: "0",

        credito: "",
        sucursales: [],
      },
      listasdeprecio: [],
    };
  },
  computed: {},
  watch: {
    value: function (val) {
      console.log("watching rut!");
      if (val != null) {
        this.cli = Object.assign({}, val);
        // this.cli.rut = this.cli.rut == 0 ? this.searchRut : this.cli.rut;

        //esto es para ir actualizando sucursales
        var ss = this.cli.sucursales;
        if (ss && (ss == "0" || (Array.isArray(ss) && ss.length == 0))) {
          console.log("actualizando sucursales");
          this.cli.sucursales = [];
          this.checkSucursales(this.cli.rut);
        }
      } else {
        this.cli = Object.assign({}, this.clienteVacio);
        // this.cli.rut = this.searchRut;
      }
    },
    searchRut: function (val) {
      if (this.cli.rutno == 0) this.cli.rut = val;
    },
  },
  filters: {},
  methods: {
    rutFormatter(value) {
      //Formatea el rut y finalmente pregunta en la BD si es un rut valido y si existe
      var rutno = 0;
      var rutdv = "";

      if (value.length > 2) {
        var x = value.toUpperCase();
        var xx = "";
        for (var i = 0; i <= x.length; i++) {
          xx += " 1234567890K".indexOf(x.charAt(i)) > 0 ? x.charAt(i) : "";
          //console.log("caracter " + x.charAt(i));
          //console.log(x.charAt(i));
          //console.log(xx);
        }
        rutno = xx.substring(0, xx.length - 1);
        //console.log("xx " + xx);
        var nroformateado = rutno.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

        rutdv = xx.charAt(xx.length - 1);

        this.cli.rutno = rutno;
        this.cli.rutdv = rutdv;
        this.cli.rutx = rutno + "-" + rutdv;

        return nroformateado + "-" + rutdv;
      } else {
        return value;
      }
    },
    cargarListasDePrecio: function () {
      console.log("cargarListasDePrecio");
      var self = this;
      axios
        .post(this.apiurl + "apirouter.php", {
          entidad: "Precio",
          metodo: "listar",
        })
        .then(function (response) {
          console.log(response.data);
          self.listasdeprecio = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log("************************");
      console.log(this.listasdeprecio);
    },

    cargarCliente: function () {
      var self = this;
      axios
        .post(this.apiurl + "apirouter.php", {
          entidad: "Cliente",
          metodo: "validaYCarga",
          rutfull: this.cli.rut,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data) {
            if (response.data.error) {
              self.$bvModal.msgBoxOk(response.data.error);
              self.cli.rutno = 0;
            } else {
              self.cli = response.data;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    guardar: function () {
      console.log("guardar");
      var self = this;
      axios
        .post(this.apiurl + "apirouter.php", {
          entidad: "Cliente",
          metodo: "guardar",
          cliente: this.cli,
        })
        .then(function (response) {
          console.log(response.data);
          self.$emit("actualizado", self.cli);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    test: function () {
      console.log("test");
      console.log("rutno:" + this.rutno);
      console.log("Cliente");
      console.log(this.value);
      console.log("xxx");
    },
    guardarSucursales: function (rutno, sucursales) {
      axios
        .post(this.apiurl + "apirouter.php", {
          entidad: "ClienteSucursal",
          metodo: "guardarSet",
          rutno: rutno,
          set: sucursales,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log("error" + error);
        });
    },
    checkSucursales: function (rut) {
      console.log("checkSucursales");
      var self = this;
      axios
        .post(this.apiurl + "apirouter.php", {
          entidad: "ClienteSucursal",
          metodo: "getSucursales",
          rut: rut,
        })
        .then(function (response) {
          console.log(response);
          self.cli.sucursales = response.data;
          if (self.cli.idsucursaldefault == 0)
            self.cli.idsucursaldefault = self.cli.sucursales[0].id;
          self.$emit("sucursales", self.cli.sucursales);
        })
        .catch(function (error) {
          console.log("error" + error);
        });
    },
    bajarRut: function () {
      console.log("bajarRut");
      const h = this.$createElement;
      const messageVNode = h("div", { class: ["foobar"] }, [
        h("p", { class: ["text-center"] }, [" Esperando respuesta desde el S.I.I. ... "]),
        h("p", { class: ["text-center"] }, [h("b-spinner")]),
      ]);

      this.$bvModal.msgBoxOk([messageVNode], {
        id: "x69",
      });

      var self = this;
      if (this.cli.rut.length > 6) {
        axios
          .post(this.apiurl + "apirouter.php", {
            entidad: "SiiWorldBridge",
            metodo: "getTaxpayer",
            rut: this.cli.rut,
          })
          .then(function (response) {
            self.$bvModal.hide("x69");
            //self.infoSpinner = false;
            console.log(response.data);
            var cli = response.data;
            console.log("Valor rut: " + cli.rut);

            if ("undefined" == cli.rut) {
              self.infoMensaje = response.data.error;
            } else {
              //self.infoBajarRutOk = true;
              //self.infoMensaje = "";
              self.cli.rut = cli.rut;
              self.cli.nombre = cli.razonSocial;

              if (cli.actividades && cli.actividades.length > 0) {
                self.cli.giro = cli.actividades[0].giro;
              }
              if (cli.sucursales && cli.sucursales.length > 0) {
                var rutno = cli.rut.substr(0, cli.rut.length - 2);
                self.guardarSucursales(rutno, cli.sucursales);
                self.cli.ciudad = cli.sucursales[0].ciudad;
                self.cli.comuna = cli.sucursales[0].comuna;
                self.cli.telefono = cli.sucursales[0].telefono;
              }
              self.cli.direccion = cli.direccion;
              //self.cli.comuna = cli.comuna;
              self.cli.email = cli.email;
              //self.cli.telefono = cli.telefono;
            }
          })
          .catch(function (error) {
            // self.infoSpinner = false;
            // self.infoMensaje = error;
            console.log("error" + error);
          });
      } else {
        // self.infoSpinner = false;
        // self.infoMensaje = "por favor ingrese un rut válido";
      }
    },
  },
  created: function () {
    this.cli = Object.assign({}, this.clienteVacio);
    this.cargarListasDePrecio();
  },
  mounted: function () {
    // this.cargarListasDePrecio();
  },
};
</script>
