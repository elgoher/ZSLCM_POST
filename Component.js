sap.ui.define([















  "sap/ui/core/UIComponent",















  "sap/ui/Device",















  "com/usa/postgrados/model/models"















], function(UIComponent, Device, models) {















  "use strict";























  return UIComponent.extend("com.usa.postgrados.Component", {























    metadata: {















      manifest: "json",















      config: {















        serviceConfig: {















          name: "ZSLCM_POSTGRADOS_SRV",















          serviceUrl: "/sap/opu/odata/sap/ZSLCM_POSTGRADOS_SRV"















        }















      }















    },































    /**















     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.















     * @public















     * @override















     */















    init: function() {















      var oCore = sap.ui.getCore();















      oCore.attachInit(function() {























              sap.m.MessageToast.show("Cargando Inscripciones Postgrado", {















        duration: 4000















      });















      });















      UIComponent.prototype.init.apply(this, arguments);















































      this.setModel(models.createDeviceModel(), "device");































      var mConfig = this.getMetadata().getConfig();















      var sServiceUrl = mConfig.serviceConfig.serviceUrl;















      var bIsMocked = jQuery.sap.getUriParameters().get("responderOn") === "true";















      if (bIsMocked) {















        this._startMockServer(sServiceUrl);















      }







    //  se verifica si se trae alias para consultar erp backend   







         if(jQuery.sap.getUriParameters() !== null && jQuery.sap.getUriParameters() !== undefined){







            if(jQuery.sap.getUriParameters().get("odata") !== null && jQuery.sap.getUriParameters().get("odata") !== undefined){







                var sAlias = jQuery.sap.getUriParameters().get("odata").trim();







                sServiceUrl = sServiceUrl + ";o=" + sAlias + "/";







             }else{







                sServiceUrl = sServiceUrl + "/"; 







             }







            }else{







                sServiceUrl = sServiceUrl + "/"; 







            }







            console.log(sServiceUrl);









    //   sServiceUrl = "http://10.11.238.10:8000/sap/opu/odata/sap/ZSLCM_POSTGRADOS_SRV?sap-client=190";

      var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {















        json: true,















        // loadMetadataAsync: true,















        // user: "egonzalez",















        // password: "1qazxsw2",















        tokenHandling: false,















        headers: {"X-Requested-With" : "X", "Access-Control-Allow-Origin": "*"},















        withCredentials: false















      });







      oModel.setSizeLimit(500);















      oModel.attachMetadataFailed(function() {















        this.getEventBus().publish("Component", "MetadataFailed");















        alert("Error de conexion! Por favor comunicate con la universidad");















      }, this);















      this.setModel(oModel);















    },















    _startMockServer: function(sServiceUrl) {















      jQuery.sap.require("sap.ui.core.util.MockServer");















      var oMockServer = new sap.ui.core.util.MockServer({















        rootUri: sServiceUrl















      });































      var iDelay = +(jQuery.sap.getUriParameters().get("responderDelay") || 0);















      sap.ui.core.util.MockServer.config({















        autoRespondAfter: iDelay















      });































      oMockServer.simulate("model/metadata.xml", "model/");















      oMockServer.start();































      sap.m.MessageToast.show("Running in demo mode with mock data.", {















        duration: 4000















      });















    },















    getEventBus: function() {















      return sap.ui.getCore().getEventBus();















    }















  });































});