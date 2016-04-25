jQuery.sap.require("sap.ui.commons.RichTooltip");

jQuery.sap.require("sap.ui.commons.TextView");

jQuery.sap.require("sap.ui.commons.TextViewDesign");

jQuery.sap.require("sap.ui.commons.Image");

jQuery.sap.require("sap.ui.ux3.OverlayContainer");

jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");

sap.ui.define([

	"sap/ui/core/mvc/Controller"

], function(Controller) {

	"use strict";

	return Controller.extend("com.usa.postgrados.controller.main", {

		showDialog: function(oText) {

			sap.m.MessageToast.show(oText, {

				duration: 6000

			});

		},

		//ayudas de busqueda

		helpRequestCargo: function(evt) {

			var oView = this.getView();

			var oModel = oView.getModel();

			var oICargo = oView.byId("oICargo");

			var oTextSearch = oICargo.getValue();

			var sPath = "/CargoSet?$filter=startswith(Ltext, '" + oTextSearch + "')";

			if (!this._oCargoDialog) {

				this._oCargoDialog = sap.ui.xmlfragment("com.usa.postgrados.view.Cargo", this);

			}

			var oColModel = new sap.ui.model.json.JSONModel();

			oColModel.setData({

				cols: [

					{

						label: "Codigo",

						template: "Taete",

						width: "20%"

					},

					{

						label: "Titulo",

						template: "Ltext",

						demandPopin: true

					}

				]

			});

			sap.ui.getCore().byId("oTSDCargo").setModel(oColModel, "columns");

			sap.ui.getCore().byId("oTSDCargo").setModel(oModel);

			var oTable = sap.ui.getCore().byId("oTSDCargo");

			if (sap.ui.getCore().byId("oTSDCargo").bindItems) {

				oTable.bindAggregation("items", sPath, function(sId, oContext) {

					var aCols = oTable.getModel("columns").getData().cols;

					return new sap.m.ColumnListItem({

						cells: aCols.map(function(column) {

							var colname = column.template;

							return new sap.m.Label({

								text: "{" + colname + "}"

							}).addStyleClass("word-wrap");

						})

					});

				});

			}

			// toggle compact style

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oCargoDialog);

			this._oCargoDialog.open(oTextSearch);

			// 			this.aKeys = ["Taete", "Ltext"];

			// 			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({

			// 				basicSearchText: oTextSearch,

			// 				title: "Cargo",

			// 				supportMultiselect: false,

			// 				supportRanges: false,

			// 				supportRangesOnly: false,

			// 				key: this.aKeys[1],

			// 				descriptionKey: this.aKeys[0],

			// 				stretch: sap.ui.Device.system.phone,

			// 				ok: function(oControlEvent) {

			// 					var token = oControlEvent.getParameter("tokens");

			// 					var oCargo = token[0].mAggregations.customData[0].mProperties.value;

			// 					if (oCargo) {

			// 						oICargo.data("Taete", oCargo.Taete, true);

			// 						oICargo.setValue(oCargo.Ltext);

			// 					}

			// 					oValueHelpDialog.close();

			// 				},

			// 				cancel: function(oControlEvent) {

			// 					// 	sap.m.MessageToast.show("Cancel pressed!");

			// 					oValueHelpDialog.close();

			// 				},

			// 				afterClose: function() {

			// 					oValueHelpDialog.destroy();

			// 				}

			// 			});

			// 			var oColModel = new sap.ui.model.json.JSONModel();

			// 			oColModel.setData({

			// 				cols: [

			// 					{

			// 						label: "Codigo",

			// 						template: "Taete"

			// 				// 		width: "20%"

			// 					},

			// 					{

			// 						label: "Titulo",

			// 						template: "Ltext",

			// 						demandPopin: true

			// 					}

			//                     ]

			// 			});

			// 			var helpURL = "/CargoSet?$filter=startswith(Ltext, '" + oTextSearch + "')";

			// 			oValueHelpDialog.getTable().setModel(oColModel, "columns");

			// 			oValueHelpDialog.getTable().setModel(oHelpModel);

			// 			if (oValueHelpDialog.getTable().bindRows) {

			// 				oValueHelpDialog.getTable().bindRows(helpURL);

			// 			}

			// 			if (oValueHelpDialog.getTable().bindItems) {

			// 				var oTable = oValueHelpDialog.getTable();

			// 				oTable.bindAggregation("items", helpURL, function(sId, oContext) {

			// 					var aCols = oTable.getModel("columns").getData().cols;

			// 					return new sap.m.ColumnListItem({

			// 						cells: aCols.map(function(column) {

			// 							var colname = column.template;

			// 							return new sap.m.Label({

			// 								text: "{" + colname + "}"

			// 							}).addStyleClass("word-wrap");

			// 						})

			// 					});

			// 				});

			// 				// }

			// 			} else {

			// 				sap.m.MessageToast.show("Ingrese algo");

			// 			}

			// 			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({

			// 				advancedMode: true,

			// 				filterBarExpanded: false,

			// 				showGoOnFB: sap.ui.Device.system.phone,

			// 				filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({

			// 					groupTitle: "Cargo",

			// 					groupName: "CGN1",

			// 					name: "Cg1",

			// 					label: "Cargo",

			// 					control: new sap.m.Input()

			// 				})],

			// 				search: function() {

			// 					var oIBasicSearch = sap.ui.getCore().getControl(oFilterBar.getBasicSearch());

			// 					var oText = arguments[0].mParameters.selectionSet[0].getValue();

			// 					if (oText === "") {

			// 						oText = oIBasicSearch.getValue();

			// 					}

			// 					// 	if (oText !== "") {

			// 					helpURL = "/CargoSet?$filter=startswith(Ltext, '" + oText + "')";

			// 					var oTable2 = oValueHelpDialog.getTable();

			// 					if (oTable2.bindRows) {

			// 						oTable2.unbindRows();

			// 						oTable2.bindRows(helpURL);

			// 					}

			// 					if (oTable2.bindItems) {

			// 						oTable2.bindAggregation("items", helpURL, function(sId, oContext) {

			// 							var aCols = oTable2.getModel("columns").getData().cols;

			// 							return new sap.m.ColumnListItem({

			// 								cells: aCols.map(function(column) {

			// 									var colname = column.template;

			// 									return new sap.m.Label({

			// 										text: "{" + colname + "}"

			// 									}).addStyleClass("word-wrap");

			// 								})

			// 							});

			// 						});

			// 					}

			// 					// 	}

			// 					sap.m.MessageToast.show("Search pressed '" + oText + "''");

			// 				}

			// 			});

			// 			if (oFilterBar.setBasicSearch) {

			// 				oFilterBar.setBasicSearch(new sap.m.SearchField({

			// 					showSearchButton: sap.ui.Device.system.phone,

			// 					placeholder: "Search",

			// 					search: function(event) {

			// 						oValueHelpDialog.getFilterBar().search();

			// 					}

			// 				}));

			// 			}

			// 			oValueHelpDialog.setFilterBar(oFilterBar);

			// 			if (oICargo.$().closest(".sapUiSizeCompact").length > 0) { // check if the Token field runs in Compact mode  

			// 				oValueHelpDialog.addStyleClass("sapUiSizeCompact");

			// 			} else {

			// 				oValueHelpDialog.addStyleClass("sapUiSizeCozy");

			// 			}

			// 			oValueHelpDialog.open();

			// 			oValueHelpDialog.update();

		},

		handleCargoSearch: function(evt) {

			var sValue = evt.getParameter("value");

			var sPath = "/CargoSet?$filter=startswith(Ltext, '" + sValue + "')";

			var oTable = sap.ui.getCore().byId("oTSDCargo");

			oTable.unbindItems();

			if (sap.ui.getCore().byId("oTSDCargo").bindItems) {

				oTable.bindAggregation("items", sPath, function(sId, oContext) {

					var aCols = oTable.getModel("columns").getData().cols;

					return new sap.m.ColumnListItem({

						cells: aCols.map(function(column) {

							var colname = column.template;

							return new sap.m.Label({

								text: "{" + colname + "}"

							}).addStyleClass("word-wrap");

						})

					});

				});

			}

		},

		handleCargoConfirm: function(evt) {

			var oView = this.getView();

			var oICargo = oView.byId("oICargo");

			var oSelectedItem = evt.getParameter("selectedItem");

			var datos = oSelectedItem.mAggregations.cells;

			if (datos) {

				oICargo.data("Taete", datos[0].mProperties.text, true);

				oICargo.setValue(datos[1].mProperties.text);

				oICargo.setValueState(sap.ui.core.ValueState.None);

				this.datosDatosLaborales();

			}

		},

		handleCargoClose: function(evt) {

			var oTable = sap.ui.getCore().byId("oTSDCargo");

			oTable.unbindItems();

		},

		helpRequestTitulo: function(evt) {

			var oView = this.getView();

			var oModel = oView.getModel();

			var oITitulo = oView.byId("oITitulo");

			var oTextSearch = oITitulo.getValue();

			var sPath = "/Titulo_AcademicoSet?$filter=startswith(Stext, '" + oTextSearch + "')";

			if (!this._oTituloDialog) {

				this._oTituloDialog = sap.ui.xmlfragment("com.usa.postgrados.view.Titulo", this);

			}

			var oColModel = new sap.ui.model.json.JSONModel();

			oColModel.setData({

				cols: [

					{

						label: "Codigo",

						template: "Objid",

						width: "20%"

					},

					{

						label: "Titulo",

						template: "Stext",

						demandPopin: true

					}

				]

			});

			sap.ui.getCore().byId("oTSDTitulo").setModel(oColModel, "columns");

			sap.ui.getCore().byId("oTSDTitulo").setModel(oModel);

			var oTable = sap.ui.getCore().byId("oTSDTitulo");

			if (sap.ui.getCore().byId("oTSDTitulo").bindItems) {

				oTable.bindAggregation("items", sPath, function(sId, oContext) {

					var aCols = oTable.getModel("columns").getData().cols;

					return new sap.m.ColumnListItem({

						cells: aCols.map(function(column) {

							var colname = column.template;

							return new sap.m.Label({

								text: "{" + colname + "}"

							}).addStyleClass("word-wrap");

						})

					});

				});

			}

			// toggle compact style

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oTituloDialog);

			this._oTituloDialog.open(oTextSearch);

			// 			this.aKeys = ["Objid", "Stext"];

			// 			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({

			// 				basicSearchText: oTextSearch,

			// 				title: "Titulo Universitario",

			// 				supportMultiselect: false,

			// 				supportRanges: false,

			// 				supportRangesOnly: false,

			// 				key: this.aKeys[1],

			// 				descriptionKey: this.aKeys[0],

			// 				stretch: sap.ui.Device.system.phone,

			// 				ok: function(oControlEvent) {

			// 					var token = oControlEvent.getParameter("tokens");

			// 					var oTitulo = token[0].mAggregations.customData[0].mProperties.value;

			// 					if (oTitulo) {

			// 						oITitulo.data("Objid", oTitulo.Objid, true);

			// 						oITitulo.setValue(oTitulo.Stext);

			// 					}

			// 					oValueHelpDialog.close();

			// 				},

			// 				cancel: function(oControlEvent) {

			// 					// 	sap.m.MessageToast.show("Cancel pressed!");

			// 					oValueHelpDialog.close();

			// 				},

			// 				afterClose: function() {

			// 					oValueHelpDialog.destroy();

			// 				}

			// 			});

			// 			var oColModel = new sap.ui.model.json.JSONModel();

			// 			oColModel.setData({

			// 				cols: [

			// 					{

			// 						label: "Codigo",

			// 						template: "Objid"

			// 				// 		width: "20%"

			// 					},

			// 					{

			// 						label: "Titulo",

			// 						template: "Stext",

			// 						demandPopin: true

			// 					}

			//                     ]

			// 			});

			// 			// 			if (oTextSearch !== "") {

			// 			var helpURL = "/Titulo_AcademicoSet?$filter=startswith(Stext, '" + oTextSearch + "')";

			// 			oValueHelpDialog.getTable().setModel(oColModel, "columns");

			// 			oValueHelpDialog.getTable().setModel(oHelpModel);

			// 			if (oValueHelpDialog.getTable().bindRows) {

			// 				oValueHelpDialog.getTable().bindRows(helpURL);

			// 			}

			// 			if (oValueHelpDialog.getTable().bindItems) {

			// 				var oTable = oValueHelpDialog.getTable();

			// 				oTable.bindAggregation("items", helpURL, function(sId, oContext) {

			// 					var aCols = oTable.getModel("columns").getData().cols;

			// 					return new sap.m.ColumnListItem({

			// 						cells: aCols.map(function(column) {

			// 							var colname = column.template;

			// 							return new sap.m.Label({

			// 								text: "{" + colname + "}"

			// 							}).addStyleClass("word-wrap");

			// 						})

			// 					});

			// 				});

			// 				// }

			// 			} else {

			// 				sap.m.MessageToast.show("Ingrese algo");

			// 			}

			// 			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({

			// 				advancedMode: true,

			// 				filterBarExpanded: false,

			// 				showGoOnFB: sap.ui.Device.system.phone,

			// 				filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({

			// 					groupTitle: "Universidad",

			// 					groupName: "UGN1",

			// 					name: "Un1",

			// 					label: "Titulo Universitario",

			// 					control: new sap.m.Input()

			// 				})],

			// 				search: function() {

			// 					var oIBasicSearch = sap.ui.getCore().getControl(oFilterBar.getBasicSearch());

			// 					var oText = arguments[0].mParameters.selectionSet[0].getValue();

			// 					if (oText === "") {

			// 						oText = oIBasicSearch.getValue();

			// 					}

			// 					// 	if (oText !== "") {

			// 					helpURL = "/Titulo_AcademicoSet?$filter=startswith(Stext, '" + oText + "')";

			// 					var oTable2 = oValueHelpDialog.getTable();

			// 					if (oTable2.bindRows) {

			// 						oTable2.unbindRows();

			// 						oTable2.bindRows(helpURL);

			// 					}

			// 					if (oTable2.bindItems) {

			// 						oTable2.bindAggregation("items", helpURL, function(sId, oContext) {

			// 							var aCols = oTable2.getModel("columns").getData().cols;

			// 							return new sap.m.ColumnListItem({

			// 								cells: aCols.map(function(column) {

			// 									var colname = column.template;

			// 									return new sap.m.Label({

			// 										text: "{" + colname + "}"

			// 									}).addStyleClass("word-wrap");

			// 								})

			// 							});

			// 						});

			// 					}

			// 					// 	}

			// 					sap.m.MessageToast.show("Search pressed '" + oText + "''");

			// 				}

			// 			});

			// 			if (oFilterBar.setBasicSearch) {

			// 				oFilterBar.setBasicSearch(new sap.m.SearchField({

			// 					showSearchButton: sap.ui.Device.system.phone,

			// 					placeholder: "Search",

			// 					search: function(event) {

			// 						oValueHelpDialog.getFilterBar().search();

			// 					}

			// 				}));

			// 			}

			// 			oValueHelpDialog.setFilterBar(oFilterBar);

			// 			if (oITitulo.$().closest(".sapUiSizeCompact").length > 0) { // check if the Token field runs in Compact mode  

			// 				oValueHelpDialog.addStyleClass("sapUiSizeCompact");

			// 			} else {

			// 				oValueHelpDialog.addStyleClass("sapUiSizeCozy");

			// 			}

			// 			oValueHelpDialog.open();

			// 			oValueHelpDialog.update();

		},

		handleTituloSearch: function(evt) {

			var sValue = evt.getParameter("value");

			var sPath = "/Titulo_AcademicoSet?$filter=startswith(Stext, '" + sValue + "')";

			var oTable = sap.ui.getCore().byId("oTSDTitulo");

			oTable.unbindItems();

			if (sap.ui.getCore().byId("oTSDTitulo").bindItems) {

				oTable.bindAggregation("items", sPath, function(sId, oContext) {

					var aCols = oTable.getModel("columns").getData().cols;

					return new sap.m.ColumnListItem({

						cells: aCols.map(function(column) {

							var colname = column.template;

							return new sap.m.Label({

								text: "{" + colname + "}"

							}).addStyleClass("word-wrap");

						})

					});

				});

			}

		},

		handleTituloConfirm: function(evt) {

			var oView = this.getView();

			var oITitulo = oView.byId("oITitulo");

			var oSelectedItem = evt.getParameter("selectedItem");

			var datos = oSelectedItem.mAggregations.cells;

			if (datos) {

				oITitulo.data("Objid", datos[0].mProperties.text, true);

				oITitulo.setValue(datos[1].mProperties.text);

				oITitulo.setValueState(sap.ui.core.ValueState.None);

			}

		},

		handleTituloClose: function(evt) {

			var oTable = sap.ui.getCore().byId("oTSDTitulo");

			oTable.unbindItems();

		},

		helpRequestUniversidad: function(evt) {

			var oView = this.getView();

			var oIUniversidad = oView.byId("oIUniversidad");

			var sTextSearch = oIUniversidad.getValue();

			var oModel = oView.getModel();

			var sPath = "/UniversidadSet?$filter=startswith(Stext, '" + sTextSearch + "')";

			if (!this._oUniversidadDialog) {

				this._oUniversidadDialog = sap.ui.xmlfragment("com.usa.postgrados.view.Universidad", this);

			}

			var oColModel = new sap.ui.model.json.JSONModel();

			oColModel.setData({

				cols: [

					{

						label: "Universidad",

						template: "Stext",

						width: "40%"

					},

					{

						label: "Codigo",

						template: "Objid",

						demandPopin: true

					},

					{

						label: "Pais",

						template: "Landx50",

						width: "20%",

						demandPopin: true

					},

					{

						label: "Dpto",

						template: "Bezei",

						demandPopin: true

					},

					{

						label: "Ciudad",

						template: "Ort01",

						demandPopin: true

					}

				]

			});

			sap.ui.getCore().byId("oTSDUniversidad").setModel(oColModel, "columns");

			sap.ui.getCore().byId("oTSDUniversidad").setModel(oModel);

			var oTable = sap.ui.getCore().byId("oTSDUniversidad");

			if (sap.ui.getCore().byId("oTSDUniversidad").bindItems) {

				oTable.bindAggregation("items", sPath, function(sId, oContext) {

					var aCols = oTable.getModel("columns").getData().cols;

					return new sap.m.ColumnListItem({

						cells: aCols.map(function(column) {

							var colname = column.template;

							return new sap.m.Label({

								text: "{" + colname + "}"

							}).addStyleClass("word-wrap");

						})

					});

				});

			}

			// toggle compact style

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oUniversidadDialog);

			this._oUniversidadDialog.open(sTextSearch);

			// 			this.aKeys = ["Objid", "Stext"];

			// 			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({

			// 				basicSearchText: oTextSearch,

			// 				title: "Universidad",

			// 				supportMultiselect: false,

			// 				supportRanges: false,

			// 				supportRangesOnly: false,

			// 				key: this.aKeys[1],

			// 				descriptionKey: this.aKeys[0],

			// 				stretch: sap.ui.Device.system.phone,

			// 				ok: function(oControlEvent) {

			// 					var token = oControlEvent.getParameter("tokens");

			// 					var oUniversidad = token[0].mAggregations.customData[0].mProperties.value;

			// 					if (oUniversidad) {

			// 						oIUniversidad.data("Objid", oUniversidad.Objid, true);

			// 						oIUniversidad.data("Landx50", oUniversidad.Landx50, true);

			// 						oIUniversidad.setValue(oUniversidad.Stext);

			// 						oIDptoUniversidad.setValue(oUniversidad.Bezei);

			// 						oICiudadUniversidad.setValue(oUniversidad.Ort01);

			// 					}

			// 					oValueHelpDialog.close();

			// 				},

			// 				cancel: function(oControlEvent) {

			// 					// 	sap.m.MessageToast.show("Cancel pressed!");

			// 					oValueHelpDialog.close();

			// 				},

			// 				afterClose: function() {

			// 					oValueHelpDialog.destroy();

			// 				}

			// 			});

			// 			var oColModel = new sap.ui.model.json.JSONModel();

			// 			oColModel.setData({

			// 				cols: [

			// 					{

			// 						label: "Universidad",

			// 						template: "Stext"

			// 					},

			// 					{

			// 						label: "Pais",

			// 						template: "Landx50",

			// 						demandPopin: true

			// 					},

			// 					{

			// 						label: "Dpto",

			// 						template: "Bezei",

			// 						demandPopin: true

			// 					},

			// 					{

			// 						label: "Ciudad",

			// 						template: "Ort01",

			// 						demandPopin: true

			// 					}

			//                     ]

			// 			});

			// 			// 			if (oTextSearch !== "") {

			// 			var helpURL = "/UniversidadSet?$filter=startswith(Stext, '" + oTextSearch + "')";

			// 			oValueHelpDialog.getTable().setModel(oColModel, "columns");

			// 			oValueHelpDialog.getTable().setModel(oHelpModel);

			// 			if (oValueHelpDialog.getTable().bindRows) {

			// 				oValueHelpDialog.getTable().bindRows(helpURL);

			// 			}

			// 			if (oValueHelpDialog.getTable().bindItems) {

			// 				var oTable = oValueHelpDialog.getTable();

			// 				oTable.bindAggregation("items", helpURL, function(sId, oContext) {

			// 					var aCols = oTable.getModel("columns").getData().cols;

			// 					return new sap.m.ColumnListItem({

			// 						cells: aCols.map(function(column) {

			// 							var colname = column.template;

			// 							return new sap.m.Label({

			// 								text: "{" + colname + "}"

			// 							}).addStyleClass("word-wrap");

			// 						})

			// 					});

			// 				});

			// 				// }

			// 			} else {

			// 				sap.m.MessageToast.show("Ingrese algo");

			// 			}

			// 			var oFilterBar = new sap.ui.comp.filterbar.FilterBar({

			// 				advancedMode: true,

			// 				filterBarExpanded: false,

			// 				showGoOnFB: sap.ui.Device.system.phone,

			// 				filterGroupItems: [new sap.ui.comp.filterbar.FilterGroupItem({

			// 					groupTitle: "Universidad",

			// 					groupName: "UGN1",

			// 					name: "Un1",

			// 					label: "Universidad",

			// 					control: new sap.m.Input()

			// 				})],

			// 				search: function() {

			// 					var oIBasicSearch = sap.ui.getCore().getControl(oFilterBar.getBasicSearch());

			// 					var oText = arguments[0].mParameters.selectionSet[0].getValue();

			// 					if (oText === "") {

			// 						oText = oIBasicSearch.getValue();

			// 					}

			// 					if (oText !== "") {

			// 						helpURL = "/UniversidadSet?$filter=startswith(Stext, '" + oText + "')";

			// 						var oTable2 = oValueHelpDialog.getTable();

			// 						if (oTable2.bindRows) {

			// 							oTable2.unbindRows();

			// 							oTable2.bindRows(helpURL);

			// 						}

			// 						if (oTable2.bindItems) {

			// 							oTable2.bindAggregation("items", helpURL, function(sId, oContext) {

			// 								var aCols = oTable2.getModel("columns").getData().cols;

			// 								return new sap.m.ColumnListItem({

			// 									cells: aCols.map(function(column) {

			// 										var colname = column.template;

			// 										return new sap.m.Label({

			// 											text: "{" + colname + "}"

			// 										}).addStyleClass("word-wrap");

			// 									})

			// 								});

			// 							});

			// 						}

			// 					}

			// 					sap.m.MessageToast.show("Search pressed '" + oText + "''");

			// 				}

			// 			});

			// 			if (oFilterBar.setBasicSearch) {

			// 				oFilterBar.setBasicSearch(new sap.m.SearchField({

			// 					showSearchButton: sap.ui.Device.system.phone,

			// 					placeholder: "Search",

			// 					search: function(event) {

			// 						oValueHelpDialog.getFilterBar().search();

			// 					}

			// 				}));

			// 			}

			// 			oValueHelpDialog.setFilterBar(oFilterBar);

			// 			if (oIUniversidad.$().closest(".sapUiSizeCompact").length > 0) { // check if the Token field runs in Compact mode  

			// 				oValueHelpDialog.addStyleClass("sapUiSizeCompact");

			// 			} else {

			// 				oValueHelpDialog.addStyleClass("sapUiSizeCozy");

			// 			}

			// 			oValueHelpDialog.open();

			// 			oValueHelpDialog.update();

		},

		handleUniversidadSearch: function(evt) {

			var sValue = evt.getParameter("value");

			var sPath = "/UniversidadSet?$filter=startswith(Stext, '" + sValue + "')";

			var oTable = sap.ui.getCore().byId("oTSDUniversidad");

			oTable.unbindItems();

			if (sap.ui.getCore().byId("oTSDUniversidad").bindItems) {

				oTable.bindAggregation("items", sPath, function(sId, oContext) {

					var aCols = oTable.getModel("columns").getData().cols;

					return new sap.m.ColumnListItem({

						cells: aCols.map(function(column) {

							var colname = column.template;

							return new sap.m.Label({

								text: "{" + colname + "}"

							}).addStyleClass("word-wrap");

						})

					});

				});

			}

		},

		handleUniversidadConfirm: function(evt) {

			var oView = this.getView();

			var oIUniversidad = oView.byId("oIUniversidad");

			var oIDptoUniversidad = oView.byId("oIDptoUniversidad");

			var oICiudadUniversidad = oView.byId("oICiudadUniversidad");

			var oSelectedItem = evt.getParameter("selectedItem");

			var datos = oSelectedItem.mAggregations.cells;

			if (datos) {

				oIUniversidad.data("Objid", datos[1].mProperties.text, true);

				oIUniversidad.data("Landx50", datos[2].mProperties.text, true);

				oIUniversidad.setValue(datos[0].mProperties.text);

				oIDptoUniversidad.setValue(datos[3].mProperties.text);

				oICiudadUniversidad.setValue(datos[4].mProperties.text);

				oIUniversidad.setValueState(sap.ui.core.ValueState.None);

			}

		},

		handleUniversidadClose: function(evt) {

			var oTable = sap.ui.getCore().byId("oTSDUniversidad");

			oTable.unbindItems();

		},

		//guardar datos

		updateEstudiante: function() {

			var aUpdateEstudiante = false;

			var oView = this.getView();

			var oEstudiante = {};

			// if(oView.byId("oINumId").data("OnlyBp")){
			oEstudiante.OnlyBp = oView.byId("oINumId").data("OnlyBp");
			// }

			oEstudiante.IdNumber = oView.byId("oINumId").getValue();

			oEstudiante.Type = oView.byId("oSTipId").getSelectedItem().getKey();

			oEstudiante.Nombres = oView.byId("oIPrimerNom").getValue();

			oEstudiante.Nombres = oEstudiante.Nombres.toUpperCase();

			oEstudiante.Apellidos = oView.byId("oIprimerAp").getValue();

			oEstudiante.Apellidos = oEstudiante.Apellidos.toUpperCase();

			oEstudiante.Nombres2 = oView.byId("oISegundoNom").getValue();

			oEstudiante.Nombres2 = oEstudiante.Nombres2.toUpperCase();

			oEstudiante.Apellidos2 = oView.byId("oISegundoAp").getValue();

			oEstudiante.Apellidos2 = oEstudiante.Apellidos2.toUpperCase();

			oEstudiante.DirRes = oView.byId("oIDirGen").getValue();

			oEstudiante.DirRes = oEstudiante.DirRes.substring(0, 60);

			// 			oEstudiante.DirRes = oView.byId("oSDir1").getSelectedItem().getKey() + " " +

			// 				oView.byId("oSDir2").getValue() +

			// 				oView.byId("oSDir3").getSelectedItem().getText() + " " +

			// 				oView.byId("oIDir4").getValue() +

			// 				oView.byId("oSDir5").getSelectedItem().getText() + " " +

			// 				oView.byId("oIDir6").getValue() + " " +

			// 				oView.byId("oIDir7").getValue();

			oEstudiante.PaisRes = oView.byId("oCBPaisRes").getSelectedItem().getKey();

			oEstudiante.DptoRes = oView.byId("oSDptoRes").getSelectedItem().getKey();

			oEstudiante.TxtCiudadRes = oView.byId("oICiudadRes").getValue();

			oEstudiante.Email = oView.byId("oIEmail").getValue();

			oEstudiante.Sexo = oView.byId("oSGenero").getSelectedItem().getKey();

			var oDPFechaNac = oView.byId("oDPFechaNac");

			var dia = oDPFechaNac.data("diaNac");

			var year = oDPFechaNac.data("yearNac");

			var mes = oDPFechaNac.data("mesNac");

			if (dia !== "" && mes !== "" && year !== "") {

				var nMes = parseInt(mes) + 1;

				oEstudiante.FechaNac = new Date(nMes + "/" + dia + "/" + year);

			} else {

				var aFechaNac = oDPFechaNac.getValue().split("/");

				oEstudiante.FechaNac = new Date(aFechaNac[1] + "/" + aFechaNac[0] + "/" + aFechaNac[2]);

			}

			oEstudiante.IndicativoAlterno = oView.byId("oICelularInd").getValue();

			oEstudiante.Celular_p1 = oView.byId("oICelular1").getValue() + oView.byId("oICelular2").getValue();

			oEstudiante.IndicativoRes = oView.byId("oITelInd").getValue();

			oEstudiante.TelefonoRes = oView.byId("oITelRes").getValue();

			oEstudiante.Gblnd = oView.byId("oCBPaisNac").getSelectedItem().getKey();

			oEstudiante.Gbdep = oView.byId("oCBDptoNac").getSelectedItem().getKey();

			oEstudiante.Gbort = oView.byId("oICiudadNac").getValue();

			oEstudiante.EthnicGrp = oView.byId("oSEtnia_cual").getSelectedItem().getKey();

			oEstudiante.TpSede = oView.byId("oCBSede").getSelectedItem().getKey();

			var sangre = (oView.byId("oSTipSangre").getSelectedItem().getText()).split(" ");

			oEstudiante.ZzSangre = sangre[0];

			oEstudiante.ZzRh = sangre[1];

			oEstudiante.ZzDiscapacitado = oView.byId("oSDiscapacidad").getSelectedItem().getKey();

			oEstudiante.ZzGpEtnico = oView.byId("oSEtnia").getSelectedItem().getKey();

			oEstudiante.ZzVictima = oView.byId("oSConflicto").getSelectedItem().getKey();

			var oSDiscapacidad_cual = oView.byId("oSDiscapacidad_cual").getSelectedItem().getKey();

			if (oSDiscapacidad_cual === "00") {

				oEstudiante.Chtyp = "";

			} else {

				oEstudiante.Chtyp = oView.byId("oSDiscapacidad_cual").getSelectedItem().getKey();

			}

			var oModel = oView.getModel();

			console.log(oEstudiante);

			console.log(this.aSaveEstudiante);

			if (this.aSaveEstudiante === false) {

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);

				this._oLoadDialog.open();

				jQuery.sap.delayedCall(100, this, function() {

					oModel.setHeaders({

						"X-Requested-With": "X"

					});

					oModel.update("EstudianteSet(IdNumber='" + oEstudiante.IdNumber + "',Type='" + oEstudiante.Type + "')", oEstudiante, null,

						function(oData, oResponse) {

							aUpdateEstudiante = true;

							sap.m.MessageToast.show("Datos guardados correctamente!");

							console.log(oResponse);

						},

						function(oData, oResponse) {

							aUpdateEstudiante = false;

							sap.m.MessageToast.show("Ha ocurrido un error de comunicacion con el servidor, por favor actualiza la pagina");

						});

					this.aSaveEstudiante = aUpdateEstudiante;

					if (aUpdateEstudiante) {

						this.enableEstudiante(false, true, "no-editable");

						oView.byId("oINumId").setEditable(false);

						oView.byId("oSTipId").setBusy(true);

						oView.byId("oSTipId").addStyleClass("no-editable");

					}

					this._oLoadDialog.close();

				});

			}

		},

		saveEstudiante: function() {

			var aSaveEstudiante = false;

			var oView = this.getView();

			var oEstudiante = {};

			oEstudiante.IdNumber = oView.byId("oINumId").getValue();

			oEstudiante.Type = oView.byId("oSTipId").getSelectedItem().getKey();

			oEstudiante.Nombres = oView.byId("oIPrimerNom").getValue();

			oEstudiante.Nombres = oEstudiante.Nombres.toUpperCase();

			oEstudiante.Apellidos = oView.byId("oIprimerAp").getValue();

			oEstudiante.Apellidos = oEstudiante.Apellidos.toUpperCase();

			oEstudiante.Nombres2 = oView.byId("oISegundoNom").getValue();

			oEstudiante.Nombres2 = oEstudiante.Nombres2.toUpperCase();

			oEstudiante.Apellidos2 = oView.byId("oISegundoAp").getValue();

			oEstudiante.Apellidos2 = oEstudiante.Apellidos2.toUpperCase();

			oEstudiante.DirRes = oView.byId("oIDirGen").getValue();

			oEstudiante.DirRes = oEstudiante.DirRes.substring(0, 60);

			// 			oEstudiante.DirRes = oView.byId("oSDir1").getSelectedItem().getKey() + " " +

			// 				oView.byId("oSDir2").getValue() +

			// 				oView.byId("oSDir3").getSelectedItem().getText() + " " +

			// 				oView.byId("oIDir4").getValue() +

			// 				oView.byId("oSDir5").getSelectedItem().getText() + " " +

			// 				oView.byId("oIDir6").getValue() + " " +

			// 				oView.byId("oIDir7").getValue();

			oEstudiante.PaisRes = oView.byId("oCBPaisRes").getSelectedItem().getKey();

			oEstudiante.DptoRes = oView.byId("oSDptoRes").getSelectedItem().getKey();

			oEstudiante.TxtCiudadRes = oView.byId("oICiudadRes").getValue();

			oEstudiante.Email = oView.byId("oIEmail").getValue();

			oEstudiante.Sexo = oView.byId("oSGenero").getSelectedItem().getKey();

			var oDPFechaNac = oView.byId("oDPFechaNac");

			var dia = oDPFechaNac.data("diaNac");

			var year = oDPFechaNac.data("yearNac");

			var mes = oDPFechaNac.data("mesNac");

			if (dia !== "" && mes !== "" && year !== "") {

				mes = mes + 1;

				oEstudiante.FechaNac = new Date(mes + "/" + dia + "/" + year);

			} else {

				var aFechaNac = oDPFechaNac.getValue().split("/");

				oEstudiante.FechaNac = new Date(aFechaNac[1] + "/" + aFechaNac[0] + "/" + aFechaNac[2]);

			}

			oEstudiante.IndicativoAlterno = oView.byId("oICelularInd").getValue();

			oEstudiante.Celular_p1 = oView.byId("oICelular1").getValue() + oView.byId("oICelular2").getValue();

			oEstudiante.IndicativoRes = oView.byId("oITelInd").getValue();

			oEstudiante.TelefonoRes = oView.byId("oITelRes").getValue();

			oEstudiante.Gblnd = oView.byId("oCBPaisNac").getSelectedItem().getKey();

			oEstudiante.Gbdep = oView.byId("oCBDptoNac").getSelectedItem().getKey();

			oEstudiante.Gbort = oView.byId("oICiudadNac").getValue();

			oEstudiante.TpSede = oView.byId("oCBSede").getSelectedItem().getKey();

			oEstudiante.EthnicGrp = oView.byId("oSEtnia_cual").getSelectedItem().getKey();

			var sangre = (oView.byId("oSTipSangre").getSelectedItem().getText()).split(" ");

			oEstudiante.ZzSangre = sangre[0];

			oEstudiante.ZzRh = sangre[1];

			oEstudiante.ZzDiscapacitado = oView.byId("oSDiscapacidad").getSelectedItem().getKey();

			oEstudiante.ZzGpEtnico = oView.byId("oSEtnia").getSelectedItem().getKey();

			oEstudiante.ZzVictima = oView.byId("oSConflicto").getSelectedItem().getKey();

			var oSDiscapacidad_cual = oView.byId("oSDiscapacidad_cual").getSelectedItem().getKey();

			if (oSDiscapacidad_cual === "00") {

				oEstudiante.Chtyp = "";

			} else {

				oEstudiante.Chtyp = oView.byId("oSDiscapacidad_cual").getSelectedItem().getKey();

			}

			var oModel = oView.getModel();

			console.log(oEstudiante);

			console.log(this.aSaveEstudiante);

			if (this.aSaveEstudiante === false) {

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);

				this._oLoadDialog.open();

				jQuery.sap.delayedCall(100, this, function() {

					oModel.setHeaders({

						"X-Requested-With": "X"

					});

					oModel.create("EstudianteSet", oEstudiante, null, function(oData, oResponse) {

							aSaveEstudiante = true;

							sap.m.MessageToast.show("Datos guardados correctamente!");

							console.log(oData);

							oView.byId("oINumId").data("BP", oData.Bpartner, true);

						},

						function(oData, oResponse) {

							aSaveEstudiante = false;

							sap.m.MessageToast.show("Ha ocurrido un error de comunicacion con el servidor, por favor actualiza la pagina");

						}, true);

					this.aSaveEstudiante = aSaveEstudiante;

					if (aSaveEstudiante) {

						this.enableEstudiante(false, true, "no-editable");

						oView.byId("oINumId").setEditable(false);

						oView.byId("oSTipId").setBusy(true);

						oView.byId("oSTipId").addStyleClass("no-editable");

					}

					this._oLoadDialog.close();

				});

			}

		},

		saveEstudios: function() {

			var oView = this.getView();

			var oCBSede = oView.byId("oCBSede");

			var aSaveEstudio = false;

			var oEstudio = {};

			oEstudio.ItId = oView.byId("oINumId").getValue();

			var dia = oView.byId("oSDiaFechaGrado").getSelectedItem().getText();

			var mes = oView.byId("oSMesFechaGrado").getSelectedItem().getKey();

			var year = oView.byId("oSYearFechaGrado").getSelectedItem().getText();

			oEstudio.EfBegda = new Date("01/01/1985");

			oEstudio.EfEndda = new Date(mes + "/" + dia + "/" + year);

			oEstudio.Trstatus = "COMP";

			oEstudio.Isseo = oView.byId("oIUniversidad").data("Objid");

			// 			oEstudio.Stext = oView.byId("oIUniversidad").getValue();

			// oEstudio.Stext = oEstudio.Stext.trim();

			oEstudio.Pais = oView.byId("oIUniversidad").data("Landx50");

			oEstudio.Ciudad = oView.byId("oICiudadUniversidad").getValue();

			oEstudio.Degreeid = oView.byId("oITitulo").data("Objid");

			var oModel = oCBSede.getModel();

			console.log(oEstudio);

			console.log(this.aSaveEstudio);

			if (this.aSaveEstudio === false) {

				var idIconTabBar = oView.byId("idIconTabBar");

				if (oEstudio.Isseo === "" || oEstudio.Isseo === null) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);

					this.showDialog(

						"Debes Utilizar la ayuda de busqueda del campo Universidad este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Universidad'"

					);

					oView.byId("oIUniversidad").setValueState(sap.ui.core.ValueState.Warning);

				} else if (oEstudio.Degreeid === "" || oEstudio.Degreeid === null) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);

					this.showDialog(

						"Debes Utilizar la ayuda de busqueda del campo Titulo este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Titulo'"

					);

					oView.byId("oITitulo").setValueState(sap.ui.core.ValueState.Warning);

				} else {

					jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);

					this._oLoadDialog.open();

					jQuery.sap.delayedCall(100, this, function() {

						oModel.setHeaders({

							"X-Requested-With": "X"

						});

						oModel.create("EstudiosSet", oEstudio, null, function(oData, oResponse) {

								aSaveEstudio = true;

								sap.m.MessageToast.show("Datos guardados correctamente!");

								oView.byId("oIUniversidad").setEditable(false);

								oView.byId("oITitulo").setEditable(false);

								oView.byId("oSDiaFechaGrado").setBusy(true);

								oView.byId("oSMesFechaGrado").setBusy(true);

								oView.byId("oSYearFechaGrado").setBusy(true);

								oView.byId("oSDiaFechaGrado").addStyleClass("no-editable");

								oView.byId("oSMesFechaGrado").addStyleClass("no-editable");

								oView.byId("oSYearFechaGrado").addStyleClass("no-editable");

							},

							function(oData, oResponse) {

								aSaveEstudio = false;

								sap.m.MessageToast.show("Error");

							});

						this.aSaveEstudio = aSaveEstudio;

						this._oLoadDialog.close();

					});

				}

			}

		},

		saveExperiencia: function() {

			var oView = this.getView();

			var oCBSede = oView.byId("oCBSede");

			var aSaveExperiencia = false;

			var oExperiencia = {};

			oExperiencia.IdNumber = oView.byId("oINumId").getValue();

			var exp = oView.byId("oIExpLab").getValue();

			oExperiencia.Actual = oView.byId("oSTrabajo").getSelectedItem().getText();

			oExperiencia.Endda = new Date();

			var year = oExperiencia.Endda.getFullYear() - oView.byId("oIExpLab").getValue();

			var mes = oExperiencia.Endda.getMonth() + 1;

			var dia = oExperiencia.Endda.getDate();

			oExperiencia.Begda = new Date(mes + "/" + dia + "/" + year);

			oExperiencia.Arbgb = oView.byId("oIEmpresa").getValue();

			oExperiencia.Taete = oView.byId("oICargo").data("Taete");

			oExperiencia.TxCountry = "Colom%";

			oExperiencia.Taetebschr = oView.byId("oIEmailEmp").getValue();

			oExperiencia.ZzTelNumber = oView.byId("oITel").getValue();

			var oModel = oCBSede.getModel();

			console.log(oExperiencia);

			console.log(this.aSaveExperiencia);

			if (this.aSaveExperiencia === false) {

				if (oExperiencia.Taete === "" || oExperiencia.Taete === null) {

					var idIconTabBar = oView.byId("idIconTabBar");

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosLaborales", 3);

					this.showDialog(

						"Debes Utilizar la ayuda de busqueda del campo Cargo este es el icono ubicado a la izquierda del campo, o utilizar el boton 'Buscar Cargo'"

					);

					oView.byId("oICargo").setValueState(sap.ui.core.ValueState.Warning);

				} else {

					jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);

					this._oLoadDialog.open();

					jQuery.sap.delayedCall(100, this, function() {

						oModel.setHeaders({

							"X-Requested-With": "X"

						});

						oModel.create("ExperienciaSet", oExperiencia, null, function(oData, oResponse) {

								aSaveExperiencia = true;

								sap.m.MessageToast.show("Datos guardados correctamente!");

							},

							function(oData, oResponse) {

								aSaveExperiencia = false;

								sap.m.MessageToast.show("Error");

							});

						this.aSaveExperiencia = aSaveExperiencia;

						this._oLoadDialog.close();

					});

				}

			}

		},

		saveReferencia: function() {

			var oView = this.getView();

			var oINumRef = oView.byId("oINumRef");

			var aSaveReferencia = false;

			var oReferencia = {};

			oReferencia.Id = oView.byId("oINumRef").getValue();

			oReferencia.Estid = oView.byId("oINumId").getValue();

			oReferencia.FullName = oView.byId("oINonRef").getValue();

			oReferencia.FullName = oReferencia.FullName.toUpperCase();

			oReferencia.TelNumber = oView.byId("oITelRef").getValue();

			oReferencia.CelNumber = oView.byId("oICelRef").getValue();

			oReferencia.SmtpAddr = oView.byId("oIEmailRef").getValue();

			oReferencia.Country = oView.byId("oCBPaisRes").getSelectedItem().getKey();

			oReferencia.Region = oView.byId("oSDptoRes").getSelectedItem().getKey();

			oReferencia.TxCity = oView.byId("oICiudadRes").getValue();

			oReferencia.Street = oView.byId("oIDirGen").getValue();

			oReferencia.Street = oReferencia.Street.substring(0, 60);

			// 			oReferencia.Street = oView.byId("oSDir1").getSelectedItem().getKey() + " " +

			// 				oView.byId("oSDir2").getValue() +

			// 				oView.byId("oSDir3").getSelectedItem().getText() + " " +

			// 				oView.byId("oIDir4").getValue() +

			// 				oView.byId("oSDir5").getSelectedItem().getText() + " " +

			// 				oView.byId("oIDir6").getValue() + " " +

			// 				oView.byId("oIDir7").getValue();

			var IdentificationCategory = oINumRef.data("IdentificationCategory");

			if (IdentificationCategory === "" || IdentificationCategory === null) {

				oReferencia.IdentificationCategory = "FS0010";

			} else {

				oReferencia.IdentificationCategory = IdentificationCategory;

			}

			oReferencia.RelationshipType = "01";

			oReferencia.ZzConocio = oView.byId("oCBMedUni").getSelectedItem().getKey();

			oReferencia.ZzDecidio = oView.byId("oCBRazUni").getSelectedItem().getKey();

			var oModel = oView.getModel();

			console.log(oReferencia);

			console.log(this.aSaveReferencia);

			if (this.aSaveReferencia === false) {

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);

				this._oLoadDialog.open();

				jQuery.sap.delayedCall(100, this, function() {

					oModel.setHeaders({

						"X-Requested-With": "X"

					});

					oModel.create("ReferenciaSet", oReferencia, null, function(oData, oResponse) {

							aSaveReferencia = true;

							console.log(oData);

							console.log(oResponse);

							// 		this.showDialog("Datos guardados correctamente!");

						},

						function(oData, oResponse) {

							aSaveReferencia = false;

							console.log(oData);

							console.log(oResponse);

						});

					this.aSaveReferencia = aSaveReferencia;

					this._oLoadDialog.close();

				});

			}

		},

		saveEncuesta: function() {

			var oView = this.getView();

			var aEncuesta = false;

			var oEncuesta = {};

			oEncuesta.Id = oView.byId("oINumId").getValue();

			oEncuesta.ZzConocio = oView.byId("oCBMedUni").getSelectedItem().getKey();

			oEncuesta.ZzDecidio = oView.byId("oCBRazUni").getSelectedItem().getKey();

			var oModel = oView.getModel();

			console.log(oEncuesta);

			console.log(this.aEncuesta);

			if (this.aEncuesta === false) {

				var busyDialog = oView.byId("BusyDialog");

				busyDialog.open();

				oModel.setHeaders({

					"X-Requested-With": "X"

				});

				oModel.create("EncuestaSet", oEncuesta, null, function(oData, oResponse) {

						aEncuesta = true;

						console.log(oData);

						console.log(oResponse);

						// 		this.showDialog("Datos guardados correctamente!");

					},

					function(oData, oResponse) {

						aEncuesta = false;

						console.log(oData);

						console.log(oResponse);

						// 		this.showDialog("Error");

					});

				this.aEncuesta = aEncuesta;

				busyDialog.close();

			}

		},

		//habilitar campos

		enableEstudiante: function(oEdit, oBusy, oClass) {

			var oView = this.getView();

			var oInput, oSelect;

			$.each(this.aInputEstItems, function(value, index, array) {

				oInput = oView.byId(index.Id);

				oInput.setEditable(oEdit);

				if (oInput.getValue() === "") {

					oInput.setEditable(true);

				}

			});

			$.each(this.aSelectEstItems, function(value, index, array) {

				oSelect = oView.byId(index.Id);

				oSelect.setBusy(oBusy);

				if (oBusy) {

					oSelect.addStyleClass("no-editable");

				} else {

					oSelect.removeStyleClass("no-editable");

					oSelect.setBusy(false);

				}

				if (index.Id !== "oSDiscapacidad_cual") {

					if (index.Id !== "oSEtnia_cual") {

						if (oSelect.getSelectedItem() !== null) {

							if (oSelect.getSelectedItem().getText() === "") {

								oSelect.setBusy(false);

								oSelect.removeStyleClass("no-editable");

							}

						}

					}

				}

			});

		},

		enableRef: function(oEdit) {

			var oView = this.getView();

			var oInput;

			$.each(this.aInputRefItems, function(value, index, array) {

				oInput = oView.byId(index.Id);

				oInput.setEditable(oEdit);

				if (oInput.getValue() === "") {

					oInput.setEditable(true);

				}

			});

		},

		enableDiscapacidad: function(evt) {

			var oView = this.getView();

			var oSDiscapacidad = oView.byId("oSDiscapacidad");

			var oSDiscapacidad_cual = oView.byId("oSDiscapacidad_cual");

			var item = oSDiscapacidad.getSelectedItem().getKey();

			if (item === "S") {

				oSDiscapacidad_cual.setBusy(false);

				oSDiscapacidad_cual.removeStyleClass("no-editable");

			} else {

				oSDiscapacidad_cual.setBusy(true);

				oSDiscapacidad_cual.addStyleClass("no-editable");

			}

			this.datosDatosPersonales();

		},

		enableEtnia: function(evt) {

			var oView = this.getView();

			var oSEtnia = oView.byId("oSEtnia");

			var oSEtnia_cual = oView.byId("oSEtnia_cual");

			var item = oSEtnia.getSelectedItem().getKey();

			if (item === "S") {

				oSEtnia_cual.setBusy(false);

				oSEtnia_cual.removeStyleClass("no-editable");

			} else {

				oSEtnia_cual.setBusy(true);

				oSEtnia_cual.addStyleClass("no-editable");

			}

			this.datosDatosPersonales();

		},

		//buscar datos

		getReferencia: function(oModel, sEntityPath) {

			var oView = this.getView();

			var oITFDatosReferencias = oView.byId("oITFDatosReferencias");

			var oINumRef = oView.byId("oINumRef");

			var oData;

			var busyDialog = oView.byId("BusyDialog");

			oModel.attachRequestSent(function() {

				busyDialog.open();

			});

			oModel.attachRequestCompleted(function() {

				busyDialog.close();

			});

			busyDialog.open();

			oITFDatosReferencias.unbindElement();

			oITFDatosReferencias.bindElement(sEntityPath);

			//verificar si los datos estan en el navegador

			if (!oITFDatosReferencias.getModel().getData(sEntityPath)) {

				// verficar que el estudiante especificado fue encontrado.

				oITFDatosReferencias.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {

					oData = oITFDatosReferencias.getModel().getData(sEntityPath);

					if (!oData) {

						this.showDialog("Documento no encontrado...\n" + "Ingrese sus datos manualmente");

						this.enableRef(true);

						this.fireDetailNotFound();

						oINumRef.data("IdentificationCategory", "", true);

						busyDialog.close();

					} else {

						this.enableRef(false);

						this.fireDetailChanged(sEntityPath);

						busyDialog.close();

						oINumRef.data("IdentificationCategory", oData.IdentificationCategory, true);

					}

				}, this));

			} else {

				this.enableRef(false);

				this.fireDetailChanged(sEntityPath);

				busyDialog.close();

				oINumRef.data("IdentificationCategory", oData.IdentificationCategory, true);

			}

		},

		//buscar datos aspirantes dentro de los estudiantes

		getEstudiante: function(oModel, sEntityPath) {

			var that = this;

			var oView = this.getView();

			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");

			var oITFDatosAcademicos = oView.byId("oITFDatosAcademicos");

			var oITFDatosReferencias = oView.byId("oITFDatosReferencias");

			var oIUniversidad = oView.byId("oIUniversidad");

			var oITitulo = oView.byId("oITitulo");

			var oSDiaFechaGrado = oView.byId("oSDiaFechaGrado");

			var oSMesFechaGrado = oView.byId("oSMesFechaGrado");

			var oSYearFechaGrado = oView.byId("oSYearFechaGrado");

			//         var oINonRef = oView.byId("oINonRef"); 

			// 		var oITelRef = oView.byId("oITelRef"); 

			// 	    var oICelRef = oView.byId("oICelRef"); 

			// 		var oIEmailRef = oView.byId("oIEmailRef"); 

			var oDPFechaNac = oView.byId("oDPFechaNac");

			var busyDialog = oView.byId("BusyDialog");

			var oData;

			oDPFechaNac.data("diaNac", "", true);

			oDPFechaNac.data("yearNac", "", true);

			oDPFechaNac.data("mesNac", "", true);

			oModel.attachRequestSent(function() {

				busyDialog.open();

			});

			oModel.attachRequestCompleted(function() {

				busyDialog.close();

			});

			busyDialog.open();

			oITFDatosPersonales.unbindElement();

			oITFDatosPersonales.bindElement(sEntityPath);

			//verificar si los datos estan en el navegador

			if (!oITFDatosPersonales.getModel().getData(sEntityPath)) {

				// verficar que el estudiante especificado fue encontrado.

				oITFDatosPersonales.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {

					oData = oITFDatosPersonales.getModel().getData(sEntityPath);

					if (!oData) {

						oView.byId("oINumId").data("EstudianteAntiguo", "", true);
						oView.byId("oINumId").data("OnlyBp", "", true);

						oDPFechaNac.data("diaNac", "", true);

						oDPFechaNac.data("yearNac", "", true);

						oDPFechaNac.data("mesNac", "", true);

						this.showDialog("Documento no encontrado...\n" + "Ingrese sus datos manualmente");

						this.enableEstudiante(true, false, "no-editable");

						oITFDatosAcademicos.unbindElement();

						oITFDatosReferencias.unbindElement();

						oIUniversidad.setEditable(true);

						oITitulo.setEditable(true);

						oSDiaFechaGrado.setBusy(false);

						oSDiaFechaGrado.removeStyleClass("no-editable");

						oSMesFechaGrado.setBusy(false);

						oSMesFechaGrado.removeStyleClass("no-editable");

						oSYearFechaGrado.setBusy(false);

						oSYearFechaGrado.removeStyleClass("no-editable");

						oSDiaFechaGrado.setSelectedKey("oIdia_0");

						oSMesFechaGrado.setSelectedKey("0");

						oSYearFechaGrado.setSelectedKey("0");

						this.getDptoUnblock();

						this.fireDetailNotFound();

						busyDialog.close();

					} else {

						oView.byId("oINumId").data("EstudianteAntiguo", "X", true);

						oView.byId("oINumId").data("BP", oData.Bpartner, true);
						oView.byId("oINumId").data("OnlyBp", oData.OnlyBp, true);

						if (oData.FechaNac !== null) {

							oDPFechaNac.data("diaNac", oData.FechaNac.getDate().toString(), true);

							oDPFechaNac.data("yearNac", oData.FechaNac.getFullYear().toString(), true);

							oDPFechaNac.data("mesNac", oData.FechaNac.getMonth().toString(), true);

						}

						this.getDptoBlock(oData);

						if (oData.IdentificationNumber !== "") {

							var sReferenciaPath = "/ReferenciaSet('" + oData.IdentificationNumber + "')";

							var oINumRef = oView.byId("oINumRef");

							oITFDatosReferencias.unbindElement();

							oITFDatosReferencias.bindElement(sReferenciaPath);

							oView.getModel().read(sReferenciaPath, null, null, false, function(oDataRef, oResponse) {

								oINumRef.setValue(oDataRef.Id);

								oINumRef.data("IdentificationCategory", oDataRef.IdentificationCategory, true);

								oINumRef.setEditable(false);

								that.aSaveReferencia = true;

								that.enableRef(true);

								//if(oINonRef.getValue !== ""){

								//   oINonRef.setEditable(false);    

								//}

								//if(oITelRef.getValue !== ""){

								//   oITelRef.setEditable(false);    

								//}

								//   if(oICelRef.getValue !== ""){

								//   oICelRef.setEditable(false);    

								//}

								//if(oIEmailRef .getValue !== ""){

								//   oIEmailRef .setEditable(false);    

								//}

							});

						}

						var sEstudioPath = "/EstudiosSet('" + oData.IdNumber + "')";

						//   this.aSaveEstudio = true;

						oView.getModel().read(sEstudioPath, null, null, false, function(oDataEst, oResponse) {

							if (oDataEst.Stext !== "") {

								oITFDatosAcademicos.unbindElement();

								oITFDatosAcademicos.bindElement(sEstudioPath);

								that.aSaveEstudio = true;

								oIUniversidad.setEditable(false);

								oITitulo.setEditable(false);

								var oFechaGrado = new Date(oDataEst.EfEndda);

								var dia = oFechaGrado.getDate() + 1;

								var mes = oFechaGrado.getMonth() + 1;

								var year = oFechaGrado.getFullYear();

								oSDiaFechaGrado.setSelectedKey("oIdia_" + dia.toString());

								oSMesFechaGrado.setSelectedKey(mes.toString());

								oSYearFechaGrado.setSelectedKey(year.toString());

								oSDiaFechaGrado.setBusy(true);

								oSDiaFechaGrado.addStyleClass("no-editable");

								oSMesFechaGrado.setBusy(true);

								oSMesFechaGrado.addStyleClass("no-editable");

								oSYearFechaGrado.setBusy(true);

								oSYearFechaGrado.addStyleClass("no-editable");

							} else {

								oITFDatosAcademicos.unbindElement();

								oIUniversidad.setEditable(true);

								oITitulo.setEditable(true);

								oSDiaFechaGrado.setBusy(false);

								oSDiaFechaGrado.removeStyleClass("no-editable");

								oSMesFechaGrado.setBusy(false);

								oSMesFechaGrado.removeStyleClass("no-editable");

								oSYearFechaGrado.setBusy(false);

								oSYearFechaGrado.removeStyleClass("no-editable");

								oSDiaFechaGrado.setSelectedKey("oIdia_0");

								oSMesFechaGrado.setSelectedKey("0");

								oSYearFechaGrado.setSelectedKey("oLIYear_0");

							}

						});

						this.enableEstudiante(false, true, "no-editable");

						this.fireDetailChanged(sEntityPath);

						busyDialog.close();

						this.showDialog("Revisa tus datos y completa los que falten, una ves termines puedes ir a la pestaña de Datos Academicos");

					}

				}, this));

			} else {

				oView.byId("oINumId").data("EstudianteAntiguo", "X", true);

				// oDPFechaNac.data("diaNac", oData.FechaNac.getDate().toString(), true);

				// oDPFechaNac.data("yearNac", oData.FechaNac.getFullYear().toString(), true);

				// oDPFechaNac.data("mesNac", oData.FechaNac.getMonth().toString(), true);

				this.getDptoBlock(oITFDatosPersonales.getModel().getData(sEntityPath));

				this.enableEstudiante(false, true, "no-editable");

				this.fireDetailChanged(sEntityPath);

				busyDialog.close();

				this.showDialog("Revisa tus datos y completa los que falten, una ves termines puedes ir a la pestaña de Datos Academicos");

			}

		},

		getSelectDir1: function(evt) {

			var oView = this.getView();

			var oModel = oView.getModel();

			var oIDirGen = oView.byId("oIDirGen");

			var sKey = evt.getSource().mProperties.selectedKey;

			var sEntityPath = "/DireccionSet('" + sKey + "')";

			oModel.read(sEntityPath, null, null, true, function(oData, repsonse) {

				oIDirGen.data("Dir1", oData.Texto, true);

			});

		},

		getSelectDir2: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir2", evt.getSource()._lastValue.toString(), true);

		},

		getSelectDir3: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir3", evt.getSource().mProperties.selectedKey, true);

		},

		getSelectDir4: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir4", evt.getSource()._lastValue.toString(), true);

		},

		getSelectDir5: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir5", evt.getSource().mProperties.selectedKey, true);

		},

		getSelectDir6: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir6", evt.getSource()._lastValue.toString(), true);

		},

		getSelectDir7: function(evt) {

			var oView = this.getView();

			var oModel = oView.getModel();

			var oIDirGen = oView.byId("oIDirGen");

			var sKey = evt.getSource().mProperties.selectedKey;

			var sEntityPath = "/DireccionSet('" + sKey + "')";

			oModel.read(sEntityPath, null, null, true, function(oData, repsonse) {

				oIDirGen.data("Dir7", oData.Texto, true);

			});

		},

		getSelectDir8: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir8", evt.getSource()._lastValue.toString(), true);

		},

		getSelectDir9: function(evt) {

			var oView = this.getView();

			var oModel = oView.getModel();

			var oIDirGen = oView.byId("oIDirGen");

			var sKey = evt.getSource().mProperties.selectedKey;

			var sEntityPath = "/DireccionSet('" + sKey + "')";

			oModel.read(sEntityPath, null, null, true, function(oData, repsonse) {

				oIDirGen.data("Dir9", oData.Texto, true);

			});

		},

		getSelectDir10: function(evt) {

			var oView = this.getView();

			var oIDirGen = oView.byId("oIDirGen");

			oIDirGen.data("Dir10", evt.getSource()._lastValue.toString(), true);

		},

		//evento botones

		onPress: function(evt) {

			var oBtnBuscar, oModel, sEntityPath, oView, oIDirGen;

			// 	sap.m.MessageToast.show(evt.getSource().getId() + "pressed!");

			switch (evt.getSource().getId()) {

				case "__xmlview0--oBtnDir":

					oView = this.getView();

					oModel = oView.getModel();

					if (!this._oDireccionDialog) {

						this._oDireccionDialog = sap.ui.xmlfragment("com.usa.postgrados.view.Direccion", this);

					}

					if (oView.byId("oIDirGen").getValue() === "") {
						// if (oView.byId("oINumId").data("EstudianteAntiguo") === "") {
						this._oDireccionDialog.setModel(oModel);
						oView.addDependent(this._oDireccionDialog);
						oIDirGen = oView.byId("oIDirGen");
						if (!oIDirGen.data("Dir1")) {
							oIDirGen.data("Dir1", "", true);
						}
						if (!oIDirGen.data("Dir2")) {
							oIDirGen.data("Dir2", "", true);
						}
						if (!oIDirGen.data("Dir3")) {
							oIDirGen.data("Dir3", "", true);
						}
						if (!oIDirGen.data("Dir4")) {
							oIDirGen.data("Dir4", "", true);
						}
						if (!oIDirGen.data("Dir5")) {
							oIDirGen.data("Dir5", "", true);
						}
						if (!oIDirGen.data("Dir6")) {
							oIDirGen.data("Dir6", "", true);
						}
						if (!oIDirGen.data("Dir7")) {
							oIDirGen.data("Dir7", "", true);
						}
						if (!oIDirGen.data("Dir8")) {
							oIDirGen.data("Dir8", "", true);
						}
						if (!oIDirGen.data("Dir9")) {
							oIDirGen.data("Dir9", "", true);
						}
						if (!oIDirGen.data("Dir10")) {
							oIDirGen.data("Dir10", "", true);
						}
						// toggle compact style
						jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDireccionDialog);
						this._oDireccionDialog.open();
					}
					break;

				case "oBtnTomarDir":

					oView = this.getView();

					oIDirGen = oView.byId("oIDirGen");

					oIDirGen.setValue(oIDirGen.data("Dir1") + " " + oIDirGen.data("Dir2") + oIDirGen.data("Dir3")

						+ " " + oIDirGen.data("Dir4") + oIDirGen.data("Dir5") + " " + oIDirGen.data("Dir6")

						+ " " + oIDirGen.data("Dir7") + " " + oIDirGen.data("Dir8") + " " + oIDirGen.data("Dir9")

						+ " " + oIDirGen.data("Dir10"));

					this._oDireccionDialog.close();

					break;

				case "oBtnCancelarDir":

					this._oDireccionDialog.close();

					break;

				case "__xmlview0--OBtnBuscarRef":

					var oINumRef = this.getView().byId("oINumRef");

					var NumRef = oINumRef.getValue();

					if (NumRef === "") {

						oINumRef.setValueState(sap.ui.core.ValueState.Warning);

					} else {

						oINumRef.setValueState(sap.ui.core.ValueState.None);

						oBtnBuscar = sap.ui.getCore().getControl(evt.getSource().getId());

						oModel = oBtnBuscar.getModel();

						sEntityPath = "/ReferenciaSet('" + NumRef + "')";

						this.getReferencia(oModel, sEntityPath);

					}

					break;

				case "__xmlview0--oBtnPagar":

					var oTNumFactura = this.getView().byId("oTNumFactura");

					if (oTNumFactura.getText() !== "") {

						var sBp = this.getView().byId("oINumId").data("BP");

						var sUrl;

						//  se verifica si se trae alias para consultar erp backend   

						if (jQuery.sap.getUriParameters() !== null && jQuery.sap.getUriParameters() !== undefined) {

							if (jQuery.sap.getUriParameters().get("odata") !== null && jQuery.sap.getUriParameters().get("odata") !== undefined) {

								var sAlias = jQuery.sap.getUriParameters().get("odata").trim();

								if (sAlias === "UED_190") {

									sUrl = "http://10.11.238.10:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=190&sap-language=ES&BPARTNER=" +

									sBp + "&TP_PAGO=ADMISION#";

								} else {

									sUrl =

									"http://prd.epp.usergioarboleda.edu.co:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=300&sap-language=ES&BPARTNER=" +

									sBp + "&TP_PAGO=ADMISION#";

								}

							} else {

								sUrl =

								"http://prd.epp.usergioarboleda.edu.co:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=300&sap-language=ES&BPARTNER=" +

								sBp + "&TP_PAGO=ADMISION#";

							}

						} else {

							sUrl =

							"http://prd.epp.usergioarboleda.edu.co:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=300&sap-language=ES&BPARTNER=" +

							sBp + "&TP_PAGO=ADMISION#";

						}

						if (window.location.replace) {

							window.location.replace(sUrl);

						} else {

							this.window.location.replace(sUrl);

						}

					}

					break;

				case "__xmlview0--OBtnBuscarEst":

					var oINumId = this.getView().byId("oINumId");

					var oSTipId = this.getView().byId("oSTipId");

					var item = oSTipId.getSelectedItem();

					var itemKey = oSTipId.getSelectedItem().getKey();

					var NumId = oINumId.getValue();

					var TipId = item.getText();

					oINumId.setValueState(sap.ui.core.ValueState.None);

					oSTipId.removeStyleClass("warning");

					if (NumId === "") {

						oINumId.setValueState(sap.ui.core.ValueState.Warning);

					}

					if (TipId === "") {

						oSTipId.addStyleClass("warning");

					}

					if (NumId !== "" && TipId !== "") {

						oBtnBuscar = sap.ui.getCore().getControl(evt.getSource().getId());

						oModel = oBtnBuscar.getModel();

						sEntityPath = "/EstudianteSet(IdNumber='" + NumId + "',Type='" + itemKey + "')";

						this.getEstudiante(oModel, sEntityPath);

					}

					break;

				case "__xmlview0--OBtnBuscarUni":

					if (this.aSaveEstudio === false) {

						this.helpRequestUniversidad();

					}

					break;

				case "__xmlview0--OBtnBuscarCargo":

					if (this.aSaveExperiencia === false) {

						this.helpRequestCargo();

					}

					break;

				case "__xmlview0--OBtnBuscarTitulo":

					if (this.aSaveEstudio === false) {

						this.helpRequestTitulo();

					}

					break;

				case "oBtnAceptar":

					var oOverlayContainer = sap.ui.getCore().byId("oOverlayContainer");

					oOverlayContainer.close();

					break;

				case "oBtnCancelar":

					if (window.location.replace) {

						window.location.replace("http://www.usergioarboleda.edu.co");

					} else {

						this.window.location.replace("http://www.usergioarboleda.edu.co");

					}

					// 	if (window.close) {

					// 		window.close();

					// 	} else {

					// 		this.window.close();

					// 	}

					break;

				case "__xmlview0--oBtnSalir":

					var dialog = new sap.m.Dialog({

						title: "Confirmación",

						type: "Message",

						content: new sap.m.Text({

							text: "Se perderan los datos no guardados...\n" +

							"¿Desea Salir?"

						}),

						beginButton: new sap.m.Button({

							text: "Salir",

							press: function() {

								dialog.close();

								if (window.location.replace) {

									window.location.replace("http://www.usergioarboleda.edu.co");

								} else {

									this.window.location.replace("http://www.usergioarboleda.edu.co");

								}

								// if (window.close) {

								// 	window.close();

								// } else {

								// 	this.window.close();

								// }

							}

						}),

						endButton: new sap.m.Button({

							text: "Cancelar",

							press: function() {

								dialog.close();

							}

						}),

						afterClose: function() {

							dialog.destroy();

						}

					});

					dialog.open();

					break;

			}

		},

		//validaciones pestañas

		datosSelPrograma: function() {

			var oView = this.getView();

			var oCBSede = oView.byId("oCBSede");

			var oISede = oCBSede.getSelectedItem().getText();

			var oCBTipoPrograma = oView.byId("oCBTipoPrograma");

			var oITipoPrograma = oCBTipoPrograma.getSelectedItem().getText();

			var oCBNomPrograma = oView.byId("oCBNomPrograma");

			var oINomPrograma = oCBNomPrograma.getSelectedItem().getText();

			if (oISede !== null && oITipoPrograma !== null && oINomPrograma !== null) {

				if (oISede !== "" && oITipoPrograma !== "" && oINomPrograma !== "") {

					this.showDialog("Has completado los campos de esta pestaña! puedes seguir a la pestaña de datos personales");

				}

			}

		},

		validarSelPrograma: function(oView) {

			var oCBSede = oView.byId("oCBSede");

			var oISede = oCBSede.getSelectedItem().getText();

			var oCBTipoPrograma = oView.byId("oCBTipoPrograma");

			var oITipoPrograma = oCBTipoPrograma.getSelectedItem();

			var oCBNomPrograma = oView.byId("oCBNomPrograma");

			var oINomPrograma = oCBNomPrograma.getSelectedItem();

			if (oISede === null || oITipoPrograma === null || oINomPrograma === null ||

				oISede === "" || oITipoPrograma === "" || oINomPrograma === "") {

				return false;

			} else {

				return true;

			}

		},

		datosDatosPersonales: function() {

			var oView = this.getView();

			var oNumId = oView.byId("oINumId").getValue();

			var oTipId = oView.byId("oSTipId").getSelectedItem().getText();

			var oPrimerNom = oView.byId("oIPrimerNom").getValue();

			var oPrimerAp = oView.byId("oIprimerAp").getValue();

			// 			var oSegundoAp = oView.byId("oISegundoAp").getValue();

			var oIDirGen = oView.byId("oIDirGen").getValue();

			// 			var oDir1 = oView.byId("oSDir1").getSelectedItem().getText();

			// 			var oDir2 = oView.byId("oSDir2").getValue();

			// 			var oDir4 = oView.byId("oIDir4").getValue();

			// 			var oDir6 = oView.byId("oIDir6").getValue();

			var oPaisRes = oView.byId("oCBPaisRes").getSelectedItem().getText();

			var oDptoRes = oView.byId("oSDptoRes").getSelectedItem().getText();

			var oCiudadRes = oView.byId("oICiudadRes").getValue();

			var oEmail = oView.byId("oIEmail").getValue();

			var oGenero = oView.byId("oSGenero").getSelectedItem().getText();

			// 			var oFechaNac = new Date(oView.byId("oDPFechaNac").getValue());

			var oFechaNac = oView.byId("oDPFechaNac").getValue();

			var oTelInd = this.getView().byId("oITelInd").getValue();

			var oIndicativoAlterno = oView.byId("oICelularInd").getValue();

			var oCelular1 = oView.byId("oICelular1").getValue();

			var oCelular2 = oView.byId("oICelular2").getValue();

			var oTelRes = oView.byId("oITelRes").getValue();

			var oPaisNac = oView.byId("oCBPaisNac").getSelectedItem().getText();

			var oDptoNac = oView.byId("oCBDptoNac").getSelectedItem().getText();

			var oCiudadNac = oView.byId("oICiudadNac").getValue();

			var oTipSangre = oView.byId("oSTipSangre").getSelectedItem().getText();

			var oDiscapacidad = oView.byId("oSDiscapacidad").getSelectedItem().getText();

			var oEtnia = oView.byId("oSEtnia").getSelectedItem().getText();

			var oConflicto = oView.byId("oSConflicto").getSelectedItem().getText();

			if (oNumId !== "" && oTipId !== "" && oPrimerNom !== "" &&

				oPrimerAp !== ""

				// && oSegundoAp !== ""

				&& oIDirGen !== "" &&

				// oDir1 !== "" &&

				// oDir2 !== "" && oDir4 !== "" && oDir6 !== "" &&

				oPaisRes !== "" && oDptoRes !== "" && oCiudadRes !== "" &&

				oEmail !== "" && oGenero !== "" &&

				(oFechaNac !== null || oFechaNac !== "") &&

				// oFechaNac !== "" &&

				oIndicativoAlterno !== "" && oTelInd !== "" &&

				oCelular1 !== "" && oCelular2 !== "" && oTelRes !== "" &&

				oPaisNac !== "" && oDptoNac !== "" && oCiudadNac !== "" &&

				oTipSangre !== "" && oDiscapacidad !== "" && oEtnia !== "" &&

				oConflicto !== "" && oView.byId("oIEmail").getValueState() === sap.ui.core.ValueState.None) {

				this.showDialog("Has completado los campos de esta pestaña! puedes seguir a la pestaña de Datos Academicos");

			}

		},

		validarDatosPersonales: function(oView) {

			var oNumId = oView.byId("oINumId").getValue();

			var oTipId = oView.byId("oSTipId").getSelectedItem().getText();

			var oPrimerNom = oView.byId("oIPrimerNom").getValue();

			var oPrimerAp = oView.byId("oIprimerAp").getValue();

			// 			var oSegundoAp = oView.byId("oISegundoAp").getValue();

			var oIDirGen = oView.byId("oIDirGen").getValue();

			// 			var oDir1 = oView.byId("oSDir1").getSelectedItem().getText();

			// 			var oDir2 = oView.byId("oSDir2").getValue();

			// 			var oDir4 = oView.byId("oIDir4").getValue();

			// 			var oDir6 = oView.byId("oIDir6").getValue();

			var oPaisRes = oView.byId("oCBPaisRes").getSelectedItem().getText();

			var oDptoRes = oView.byId("oSDptoRes").getSelectedItem().getText();

			var oCiudadRes = oView.byId("oICiudadRes").getValue();

			var oEmail = oView.byId("oIEmail").getValue();

			var oGenero = oView.byId("oSGenero").getSelectedItem().getText();

			// 			var oFechaNac = new Date(oView.byId("oDPFechaNac").getValue());

			var oFechaNac = oView.byId("oDPFechaNac").getValue();

			var oTelInd = this.getView().byId("oITelInd").getValue();

			var oIndicativoAlterno = oView.byId("oICelularInd").getValue();

			var oCelular1 = oView.byId("oICelular1").getValue();

			var oCelular2 = oView.byId("oICelular2").getValue();

			var oTelRes = oView.byId("oITelRes").getValue();

			var oPaisNac = oView.byId("oCBPaisNac").getSelectedItem().getText();

			var oDptoNac = oView.byId("oCBDptoNac").getSelectedItem().getText();

			var oCiudadNac = oView.byId("oICiudadNac").getValue();

			var oTipSangre = oView.byId("oSTipSangre").getSelectedItem().getText();

			var oDiscapacidad = oView.byId("oSDiscapacidad").getSelectedItem().getText();

			var oEtnia = oView.byId("oSEtnia").getSelectedItem().getText();

			var oConflicto = oView.byId("oSConflicto").getSelectedItem().getText();

			if (oNumId === "" || oTipId === "" || oPrimerNom === "" ||

				oView.byId("oIPrimerNom").getValueState() === sap.ui.core.ValueState.Error ||

				oView.byId("oIprimerAp").getValueState() === sap.ui.core.ValueState.Error ||

				// oView.byId("oISegundoAp").getValueState() === sap.ui.core.ValueState.Error ||

				oPrimerAp === "" ||

				// oSegundoAp === "" || 

				oIDirGen === "" ||

				// oDir1 === "" ||

				// oDir2 === "" || oDir4 === "" || oDir6 === "" ||

				oPaisRes === "" || oDptoRes === "" || oCiudadRes === "" ||

				oEmail === "" || oGenero === "" || oFechaNac === null || oFechaNac === "" ||

				oIndicativoAlterno === "" || oTelInd === "" ||

				oCelular1 === "" || oCelular2 === "" || oTelRes === "" ||

				oPaisNac === "" || oDptoNac === "" || oCiudadNac === "" ||

				oTipSangre === "" || oDiscapacidad === "" || oEtnia === "" ||

				oConflicto === "" || oView.byId("oIEmail").getValueState() === sap.ui.core.ValueState.Error) {

				return false;

			} else {

				return true;

			}

		},

		datosEduPregrado: function(evt) {

			var oView = this.getView();

			var oUniversidad = oView.byId("oIUniversidad").getValue();

			var oDptoUniversidad = oView.byId("oIDptoUniversidad").getValue();

			var oCiudadUniversidad = oView.byId("oICiudadUniversidad").getValue();

			var oTitulo = oView.byId("oITitulo").getValue();

			var oDegreeid = oView.byId("oITitulo").data("Objid");

			var oDiaFechaGrado = oView.byId("oSDiaFechaGrado").getSelectedItem().getText();

			var oMesFechaGrado = oView.byId("oSMesFechaGrado").getSelectedItem().getText();

			var oYearFechaGrado = oView.byId("oSYearFechaGrado").getSelectedItem().getText();

			var oIsseo = oView.byId("oIUniversidad").data("Objid");

			if (oUniversidad !== "" && oDptoUniversidad !== "" && oCiudadUniversidad !== "" &&

				oTitulo !== "" && oDiaFechaGrado !== "" && oMesFechaGrado !== "" &&

				oYearFechaGrado !== "" && oDegreeid !== null && oIsseo !== null) {

				this.showDialog("Has completado los campos de esta pestaña! puedes seguir a la pestaña de datos laborales");

			} else if (evt.getSource().getId() === "__xmlview0--oITitulo") {

				if (oDegreeid === null) {

					this.showDialog(

						"Debes Utilizar la ayuda de busqueda del campo Titulo este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Titulo'"

					);

					oView.byId("oITitulo").setValueState(sap.ui.core.ValueState.Warning);

				}

			} else if (evt.getSource().getId() === "__xmlview0--oIUniversidad") {

				if (oIsseo === null) {

					this.showDialog(

						"Debes Utilizar la ayuda de busqueda del campo Titulo este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Universidad'"

					);

					oView.byId("oIUniversidad").setValueState(sap.ui.core.ValueState.Warning);

				}

			}

		},

		validarEduPregrado: function(oView) {

			var oUniversidad = oView.byId("oIUniversidad").getValue();

			var oDptoUniversidad = oView.byId("oIDptoUniversidad").getValue();

			var oCiudadUniversidad = oView.byId("oICiudadUniversidad").getValue();

			var oTitulo = oView.byId("oITitulo").getValue();

			var oDegreeid = oView.byId("oITitulo").data("Objid");

			var oDiaFechaGrado = oView.byId("oSDiaFechaGrado").getSelectedItem().getText();

			var oMesFechaGrado = oView.byId("oSMesFechaGrado").getSelectedItem().getText();

			var oYearFechaGrado = oView.byId("oSYearFechaGrado").getSelectedItem().getText();

			if (oUniversidad === "" || oDptoUniversidad === "" || oCiudadUniversidad === "" ||

				oTitulo === "" || oDiaFechaGrado === "" || oMesFechaGrado === "" ||

				// oDegreeid === "" ||  oDegreeid === null ||

				oYearFechaGrado === "") {

				return false;

			} else {

				return true;

			}

		},

		datosDatosLaborales: function(evt) {

			var oView = this.getView();

			var oTrabajo = oView.byId("oSTrabajo").getSelectedItem().getText();

			var oEmpresa = oView.byId("oIEmpresa").getValue();

			var oCargo = oView.byId("oICargo").getValue();

			var sTaete = oView.byId("oICargo").data("Taete");

			var oTel = oView.byId("oITel").getValue();

			var oExpLab = oView.byId("oIExpLab").getValue();

			var oEmailEmp = oView.byId("oIEmailEmp").getValue();

			if (oTrabajo !== "" && oEmpresa !== "" && oCargo !== "" &&

				oTel !== "" && oExpLab !== "" && oEmailEmp !== "" &&

				sTaete !== null &&

				oView.byId("oIEmailEmp").getValueState() === sap.ui.core.ValueState.None) {

				this.showDialog("Has completado los campos de esta pestaña! puedes seguir a la pestaña de datos referencias");

			} else if (evt.getSource().getId() === "__xmlview0--oICargo") {

				if (sTaete === null) {

					this.showDialog(

						"Debes Utilizar la ayuda de busqueda del campo Cargo este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Cargo'"

					);

					oView.byId("oICargo").setValueState(sap.ui.core.ValueState.Warning);

				}

			}

		},

		validarDatosLaborales: function(oView) {

			var oTrabajo = oView.byId("oSTrabajo").getSelectedItem().getText();

			var oEmpresa = oView.byId("oIEmpresa").getValue();

			var oCargo = oView.byId("oICargo").getValue();

			var sTaete = oView.byId("oICargo").data("Taete");

			var oTel = oView.byId("oITel").getValue();

			var oExpLab = oView.byId("oIExpLab").getValue();

			var oEmailEmp = oView.byId("oIEmailEmp").getValue();

			if (oTrabajo === "" || oEmpresa === "" || oCargo === "" ||

				oTel === "" || oExpLab === "" || oEmailEmp === "" ||

				// sTaete !== "" || sTaete !== null ||

				oView.byId("oIEmailEmp").getValueState() === sap.ui.core.ValueState.Error) {

				return false;

			} else {

				return true;

			}

		},

		datosDatosReferencias: function() {

			var oView = this.getView();

			var oNumRef = oView.byId("oINumRef").getValue();

			var oNonRef = oView.byId("oINonRef").getValue();

			var oTelRef = oView.byId("oITelRef").getValue();

			var oCelRef = oView.byId("oICelRef").getValue();

			var oEmailRef = oView.byId("oIEmailRef").getValue();

			var oMedUni = oView.byId("oCBMedUni").getSelectedItem().getText();

			var oRazUni = oView.byId("oCBRazUni").getSelectedItem().getText();

			if (oNumRef !== "" && oNonRef !== "" && oTelRef !== "" &&

				oCelRef !== "" && oEmailRef !== "" && oMedUni !== "" &&

				oRazUni !== "") {

				this.showDialog("Has completado los campos de esta pestaña! puedes seguir a la pestaña Resumen");

			}

		},

		validarDatosReferencias: function(oView) {

			var oNumRef = oView.byId("oINumRef").getValue();

			var oNonRef = oView.byId("oINonRef").getValue();

			var oTelRef = oView.byId("oITelRef").getValue();

			var oCelRef = oView.byId("oICelRef").getValue();

			var oEmailRef = oView.byId("oIEmailRef").getValue();

			var oMedUni = oView.byId("oCBMedUni").getSelectedItem().getText();

			var oRazUni = oView.byId("oCBRazUni").getSelectedItem().getText();

			if (oNumRef === "" || oNonRef === "" || oTelRef === "" ||

				oCelRef === "" || oEmailRef === "" || oMedUni === null ||

				oRazUni === null || oMedUni === "" || oRazUni === "") {

				return false;

			} else {

				return true;

			}

		},

		// ir a pestaña

		goToTab: function(idIconTabBar, tab, tabPos) {

			this.showDialog("complete los datos de esta pestaña");

			idIconTabBar.fireSelect({

				item: idIconTabBar.getItems()[tabPos],

				key: tab

			});

			idIconTabBar.setSelectedKey(tab);

		},

		// evento para validar pestañas

		handleIconTabBarSelect: function(evt) {

			var oView = this.getView();

			var that = this;

			var idIconTabBar = oView.byId("idIconTabBar");

			var key = evt.getParameters().key;

			console.log(key);

			// instantiate dialog

			if (!this._oLoadDialog) {

				this._oLoadDialog = sap.ui.xmlfragment("com.usa.postgrados.view.Load", this);

				this.getView().addDependent(this._oLoadDialog);

			}

			if (key === "__xmlview0--oITFDatosPersonales") {

				if (this.validarSelPrograma(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosInscripcion", 0);

				}

			}

			if (key === "__xmlview0--oITFDatosAcademicos") {

				if (this.validarSelPrograma(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosInscripcion", 0);

				} else if (this.validarDatosPersonales(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosPersonales", 1);

				} else {

					console.log(oView.byId("oINumId").data("EstudianteAntiguo"));

					if (oView.byId("oINumId").data("EstudianteAntiguo") === "X") {

						this.updateEstudiante();

					} else {

						this.saveEstudiante();

					}

				}

			}

			if (key === "__xmlview0--oITFDatosLaborales") {

				if (this.validarSelPrograma(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosInscripcion", 0);

				} else if (this.validarDatosPersonales(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosPersonales", 1);

				} else if (this.validarEduPregrado(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);

				} else {

					this.saveEstudios();

				}

			}

			if (key === "__xmlview0--oITFDatosReferencias") {

				if (this.validarSelPrograma(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosInscripcion", 0);

				} else if (this.validarDatosPersonales(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosPersonales", 1);

				} else if (this.validarEduPregrado(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);

				} else if (this.validarDatosLaborales(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosLaborales", 3);

				} else {

					this.saveExperiencia();

					// 	var oINonRef = oView.byId("oINonRef"); 

					//         		var oITelRef = oView.byId("oITelRef"); 

					//         	    var oICelRef = oView.byId("oICelRef"); 

					//         		var oIEmailRef = oView.byId("oIEmailRef"); 

					// 	if(oINonRef.getValue !== ""){

					// 	                oINonRef.setEditable(false);    

					// 	             }

					// 	             if(oITelRef.getValue !== ""){

					// 	                oITelRef.setEditable(false);    

					// 	             }

					//                  if(oICelRef.getValue !== ""){

					// 	                oICelRef.setEditable(false);    

					// 	             }

					// 	             if(oIEmailRef .getValue !== ""){

					// 	                oIEmailRef .setEditable(false);    

					// 	             }

				}

			}

			if (key === "__xmlview0--oITFPagar") {

				if (this.validarSelPrograma(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosInscripcion", 0);

				} else if (this.validarDatosPersonales(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosPersonales", 1);

				} else if (this.validarEduPregrado(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);

				} else if (this.validarDatosLaborales(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosLaborales", 3);

				} else if (this.validarDatosReferencias(oView) === false) {

					this.goToTab(idIconTabBar, "__xmlview0--oITFDatosReferencias", 4);

				} else {

					this.saveReferencia();

					this.saveEncuesta();

					var aConfirm;

					var oDLoad = this._oLoadDialog;

					if (oView.byId("oTNumId").data("liquidar") === "" || oView.byId("oTNumId").data("liquidar") === null) {

						var dialog = new sap.m.Dialog({

							title: "Confirmación",

							type: "Message",

							content: new sap.m.Text({

								text: "A continuacíon se creara una factura a tu nombre, Admisión y entrevista, Ten en cuenta que: \n" +

								"\n" +

								"1. La Universidad se reserva el derecho de suspender o postergar el curso. Igualmente a hacer modificaciones al plan de estudios, horarios, a la nómina de docente y al valor de la especialización.\n\n" +

								"2. Para los programas en que se haya establecido la semana internacional, es de carácter obligatoria (ver oferta académica).\n\n" +

								"3. El pago de los costos de la inscripción, no confiere derechos académicos, estos sólo se otorgarán a partir de la matricula correspondiente.\n\n" +

								"4. La devolución del valor de la matrícula, se sujeta a lo que contemplan los reglamentos académicos de la Universidad.\n\n" +

								"5. El Valor de la inscripción no está sujeto a reembolso.\n\n" +

								"¿Deseas continuar?"

							}),

							beginButton: new sap.m.Button({

								text: "Continuar",

								press: function() {

									dialog.close();

									aConfirm = true;

								}

							}),

							endButton: new sap.m.Button({

								text: "Cancelar",

								press: function() {

									dialog.close();

									aConfirm = false;

								}

							}),

							afterClose: function() {

								dialog.destroy();

								if (aConfirm === false) {

									idIconTabBar.fireSelect({

										item: idIconTabBar.getItems()[4],

										key: "__xmlview0--oITFDatosReferencias"

									});

									idIconTabBar.setSelectedKey("__xmlview0--oITFDatosReferencias");

								} else {

									var oCBSede = oView.byId("oCBSede");

									var oAdmision = {};

									oAdmision.Id = oView.byId("oINumId").getValue();

									oAdmision.Programa = oView.byId("oCBNomPrograma").getSelectedItem().getKey();

									oAdmision.Sede = oCBSede.getSelectedItem().getKey();

									oAdmision.SedeTxt = oCBSede.getSelectedItem().getText();

									console.log(oAdmision);

									var oModel = oCBSede.getModel();

									jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, oDLoad);

									oDLoad.open();

									jQuery.sap.delayedCall(100, this, function() {

										oModel.setHeaders({

											"X-Requested-With": "X"

										});

										oModel.create("AdmisionSet", oAdmision, null, function(oData, oResponse) {

												// sap.ui.commons.MessageBox.alert("Datos guardados correctamente!");

												console.log(oData);

												console.log(oResponse);

												// 	oITFPagar.setModel(oData);

												var oBtnPagar = oView.byId("oBtnPagar");

												oView.byId("oTNumId").data("liquidar", "X", true);

												oView.byId("oTNumId").setText(oAdmision.Id);

												oView.byId("oTSede").setText(oAdmision.SedeTxt);

												oView.byId("oTPrograma").setText(oView.byId("oCBNomPrograma").getSelectedItem().getText());

												oView.byId("oTNumFactura").setText(oData.Factura);

												oData.ValorFactura = oData.ValorFactura.replace(".", "");

												oView.byId("oTValorFactura").setText(oData.ValorFactura + " " + oData.MonedaFactura);

												if (oData.FechaFactura !== null) {

													oData.FechaFactura.setDate(oData.FechaFactura.getDate() + 1);

													var year = oData.FechaFactura.getFullYear();

													var mes = oData.FechaFactura.getMonth() + 1;

													var dia = oData.FechaFactura.getDate();

													oView.byId("oTFechaFactura").setText(dia + "." + mes + "." + year);

												}

												// 			if(oAdmision.TpResult === "E"){

												if (oAdmision.Factura === "") {

													oData.Mensaje = oData.Mensaje + "/nPor favor comunicate con la universidad";

													oView.byId("oTMensaje").setText(oData.Mensaje);

												} else {

													oView.byId("oTMensaje").setText(oData.Mensaje);

												}

											},

											function(oData, oResponse) {

												// sap.ui.commons.MessageBox.alert("Error");

												oView.byId("oTNumId").data("liquidar", "", true);

												console.log(oData);

												console.log(oResponse);

											});

										oDLoad.close();

									});

								}

							}

						});

						dialog.open();

					}

				}

			}

		},

		//evento checkbox

		onAcceptCond: function(evt) {

			var oCB = sap.ui.getCore().byId(evt.getSource().getId());

			var oBtnAceptar = sap.ui.getCore().byId("oBtnAceptar");

			if (oCB.getSelected()) {

				// 			if (oCB.getChecked()) {

				oBtnAceptar.setEnabled(true);

			} else {

				oBtnAceptar.setEnabled(false);

			}

		},

		setFecha: function(idDia) {

			var oItemSelectTemplate = new sap.ui.core.Item({

				key: "{dkey}",

				text: "{dtext}"

			});

			var mySelectMenu = this.byId(idDia);

			mySelectMenu.setModel(sap.ui.getCore().getModel("dias_model"));

			mySelectMenu.bindAggregation("items", "/mRoot", oItemSelectTemplate);

		},

		setMeses: function(idMes) {

			var oItemSelectTemplate = new sap.ui.core.Item({

				key: "{dkey}",

				text: "{dtext}"

			});

			var mySelectMenu = this.byId(idMes);

			mySelectMenu.setModel(sap.ui.getCore().getModel("meses_model"));

			mySelectMenu.bindAggregation("items", "/mRoot", oItemSelectTemplate);

		},

		validarNombreApellido: function(evt) {

			var text = this.getView().byId(evt.getSource().getId()).getValue();

			if (text !== "") {

				// var stringregex = /^[A-Za-z]+$/;

				var stringregex = /^([A-Za-zÑñáéíóúÁÉÍÓÚ ]+)$/;

				if (!text.match(stringregex)) {

					sap.m.MessageToast.show(text + " es un texto no valido!");

					this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.Error);

				} else {

					this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);

				}

				if (evt.getSource().getId() !== "oISegundoNom") {

					this.datosDatosPersonales();

				}

			} else {

				if (this.getView().byId(evt.getSource().getId()).getValueState() === sap.ui.core.ValueState.Error) {

					this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);

				}

			}

		},

		validarEmail: function(evt) {

			var email = this.getView().byId(evt.getSource().getId()).getValue();

			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

			if (!mailregex.test(email)) {

				sap.m.MessageToast.show(email + " es un correo no valido!");

				this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.Error);

			} else {

				this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);

				var oEmail = evt.getSource().getId();

				if (oEmail === "__xmlview0--oIEmail") {

					this.datosDatosPersonales();

				}

				if (oEmail === "__xmlview0--oIEmailEmp") {

					this.datosDatosLaborales();

				}

				if (oEmail === "__xmlview0--oIEmailRef") {

					this.datosDatosReferencias();

				}

			}

		},

		//inicializacion de postgrados

		onInit: function() {

			this.aUpdateEstudiante = false;

			this.aSaveEstudiante = false;

			this.aSaveEstudio = false;

			this.aSaveExperiencia = false;

			this.aSaveReferencia = false;

			this.aEncuesta = false;

			this.aInputRefItems = [

				{

					Id: "oINonRef"

				},

				{

					Id: "oITelRef"

				},

				{

					Id: "oICelRef"

				},

				{

					Id: "oIEmailRef"

				}

			];

			this.aInputEstItems = [

				{

					Id: "oIPrimerNom"

				},

				{

					Id: "oISegundoNom"

				},

				{

					Id: "oIprimerAp"

				},

				{

					Id: "oISegundoAp"

				},

				{

					Id: "oDPFechaNac"

				},

				{

					Id: "oIEmail"

				},

				{

					Id: "oICiudadNac"

				},

				{

					Id: "oICiudadRes"

				},

				{

					Id: "oITelRes"

				},

				{

					Id: "oITelInd"

				},

				{

					Id: "oICelularInd"

				},

				{

					Id: "oICelular1"

				},

				{

					Id: "oICelular2"

				}

				// {

				// 	Id: "oSDir2"

				// },

				// {

				// 	Id: "oIDir4"

				// },

				// {

				// 	Id: "oIDir7"

				// },

				// {

				// 	Id: "oIDir6"

				// }

			];

			this.aSelectEstItems = [

				{

					Id: "oSTipSangre"

				},

				{

					Id: "oSGenero"

				},

				// {

				// 	Id: "oSDir1"

				// },

				// {

				// 	Id: "oSDir3"

				// },

				// {

				// 	Id: "oSDir5"

				// },

				{

					Id: "oSDiscapacidad"

				},

				{

					Id: "oSDiscapacidad_cual"

				},

				{

					Id: "oSEtnia"

				},

				{

					Id: "oSEtnia_cual"

				},

				{

					Id: "oSConflicto"

				},

				// {

				// 	Id: "oCBDptoNac"

				// },

				{

					Id: "oCBPaisRes"

				},

				// {

				// 	Id: "oSDptoRes"

				// },

				{

					Id: "oCBPaisNac"

				}

			];

			sap.ui.getCore().attachValidationError(function(oEvent) {

				oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.Error);

			});

			sap.ui.getCore().attachValidationSuccess(function(oEvent) {

				oEvent.getParameter("element").setValueState(sap.ui.core.ValueState.None);

			});

			var oDP = this.getView().byId("oDPFechaNac");

			var mDiasModel = new sap.ui.model.json.JSONModel("model/dias.json");

			var mMesesModel = new sap.ui.model.json.JSONModel("model/meses.json");

			sap.ui.getCore().setModel(mDiasModel, "dias_model");

			sap.ui.getCore().setModel(mMesesModel, "meses_model");

			this.setFecha("oSDiaFechaGrado");

			this.setMeses("oSMesFechaGrado");

			oDP.setValue("");

			var oITitulo = this.getView().byId("oITitulo");

			var oToolTipTitulo = new sap.ui.commons.RichTooltip({

				text: "Usa palabras claves de tu Titulo \nPor ejemplo: 'Abogado', 'Sistemas'... \nLuego has clic en el icono de este campo para buscar el Titulo o en el boton Buscar Titulo",

				title: "Ayuda Rapida"

			});

			oITitulo.setTooltip(oToolTipTitulo);

			var oICargo = this.getView().byId("oICargo");

			var oToolTipCargo = new sap.ui.commons.RichTooltip({

				text: "Usa palabras claves de tu Cargo \nPor ejemplo: 'Abogado', 'Sistemas'... \nLuego has clic en el icono de este campo para buscar el Cargo o en el boton Buscar Cargo",

				title: "Ayuda Rapida"

			});

			oICargo.setTooltip(oToolTipCargo);

			var oIUniversidad = this.getView().byId("oIUniversidad");

			var oToolTip = new sap.ui.commons.RichTooltip({

				text: "Usa palabras claves de tu universidad \nPor ejemplo: 'Sergio', 'Piloto', 'Nacional'... \nLuego has clic en el icono de este campo para buscar la Universidad o en el boton Buscar Universidad",

				title: "Ayuda Rapida"

			});

			oIUniversidad.setTooltip(oToolTip);

			var oITelInd = this.getView().byId("oITelInd");

			var oToolTip_TelInd = new sap.ui.commons.RichTooltip({

				text: "Digita el Indicativo de tu telefono fijo \nPor ejemplo: 031, 035...",

				title: "Ayuda Rapida"

			});

			oITelInd.setTooltip(oToolTip_TelInd);

			var oICelularInd = this.getView().byId("oICelularInd");

			var oToolTip_celInd = new sap.ui.commons.RichTooltip({

				text: "Digita el Indicativo de tu Pais \nPor ejemplo: 057, 051...",

				title: "Ayuda Rapida"

			});

			oICelularInd.setTooltip(oToolTip_celInd);

			var oICelular1 = this.getView().byId("oICelular1");

			var oToolTip_cel1 = new sap.ui.commons.RichTooltip({

				text: "Digita los 3 primeros numeros de tu número de celular",

				title: "Ayuda Rapida"

			});

			oICelular1.setTooltip(oToolTip_cel1);

			var oICelular2 = this.getView().byId("oICelular2");

			var oToolTip_cel2 = new sap.ui.commons.RichTooltip({

				text: "Digita el resto de tu número de celular",

				title: "Ayuda Rapida"

			});

			oICelular2.setTooltip(oToolTip_cel2);

			var path = $.sap.getModulePath("", "/image/logo2.jpg");

			path.replace("resources/", "");

			var oImgUsaLogo = this.getView().byId("oImgUsaLogo");

			oImgUsaLogo.setSrc(path);

			var sPathLogoTitle = $.sap.getModulePath("", "/image/logo3.jpg");

			var oImgTitleLogo = new sap.m.Image({

				// src :"image/logo3.jpg"

				src: sPathLogoTitle

			});

			oImgTitleLogo.addStyleClass("responsive-img");

			var oPanelBienvenida = new sap.m.Panel({

				width: "97%",

				expandable: true,

				expanded: true,

				backgroundDesign: sap.m.BackgroundDesign.Solid

			});

			oPanelBienvenida.addStyleClass("centrar");

			var oTABienvenida = new sap.ui.commons.TextView({

				text: "Bienvenido al servicio de Inscripciones Postgrados",

				textAlign: sap.ui.core.TextAlign.Center,

				width: "100%",

				design: sap.ui.commons.TextViewDesign.H3

			});

			var oTATexto = new sap.ui.commons.TextView({

				text: "La Universidad Sergio Arboleda le da la bienvenida al servicio de Inscripciones Postgrados, si tiene alguna duda o inconveniente se puede comunicar a los siguientes teléfonos:",

				textAlign: sap.ui.core.TextAlign.Center,

				width: "100%"

			});

			var oTATextoTel = new sap.ui.commons.TextView({

				text: "Bogotá: (1)3258181 - (1)3257500 \nBarranquilla: (5)3689417 – (5)3688199\nSanta Marta: (5)4346444\nLÍNEA GRATUITA: 01-8000 110414",

				textAlign: sap.ui.core.TextAlign.Center,

				width: "100%"

			});

			//se crea ventana emergente

			var oOverlayContainer = new sap.ui.ux3.OverlayContainer({

				id: "oOverlayContainer",

				openButtonVisible: false,

				closeButtonVisible: false

			});

			//boton aceptar condiciones

			var oBtnAceptar = new sap.m.Button({

				id: "oBtnAceptar",

				text: "Aceptar",

				enabled: false,

				type: sap.m.ButtonType.Accept,

				press: this.onPress

			});

			//boton cancelar condiciones

			var oBtnCancelar = new sap.m.Button({

				id: "oBtnCancelar",

				text: "Cancelar",

				type: sap.m.ButtonType.Reject,

				press: this.onPress

			});

			//layout para botones

			var oLayoutBotones = new sap.ui.layout.HorizontalLayout({

				content: [oBtnAceptar, oBtnCancelar]

			});

			var oLayoutBotonesCenter = new sap.m.VBox({

				items: [oLayoutBotones]

			});

			oLayoutBotonesCenter.setAlignItems("Center");

			oLayoutBotonesCenter.setJustifyContent("Center");

			//se crea layout tipo grilla con una columna

			var oMatrix = new sap.ui.commons.layout.MatrixLayout({

				columns: 1

			});

			//panel para movil

			var oTBGen = new sap.m.Toolbar({

				content: [new sap.m.Text({

					text: "Autorizaciones Institucionales",

					wrapping: true

				})]

			});

			var oPanelGen = new sap.m.Panel({

				width: "97%",

				expandable: false,

				expanded: true,

				backgroundDesign: sap.m.BackgroundDesign.Solid,

				headerToolbar: oTBGen

			});

			//panel de Autorizaciones de comunicaciones institucionales

			var oTBAutIns = new sap.m.Toolbar({

				content: [new sap.m.Text({

					text: "Autorizaciones de comunicaciones institucionales",

					wrapping: true

				})]

			});

			var oPanelAutIns = new sap.m.Panel({

				width: "97%",

				expandable: true,

				expanded: true,

				backgroundDesign: sap.m.BackgroundDesign.Solid,

				headerToolbar: oTBAutIns

			});

			//panel de Habeas data

			var oTBHabeasData = new sap.m.Toolbar({

				content: [new sap.m.Text({

					text: "Habeas data",

					wrapping: true

				})]

			});

			var oPanelHabeasData = new sap.m.Panel({

				width: "97%",

				expandable: true,

				expanded: true,

				backgroundDesign: sap.m.BackgroundDesign.Solid,

				headerToolbar: oTBHabeasData

			});

			//panel Autorización para el tratamiento de datos personales sensibles

			var oTBAutDatPer = new sap.m.Toolbar({

				content: [new sap.m.Text({

					text: "Autorización para el tratamiento de datos personales sensibles",

					wrapping: true

				})]

			});

			var oPanelAutDatPer = new sap.m.Panel({

				width: "97%",

				expandable: true,

				expanded: true,

				backgroundDesign: sap.m.BackgroundDesign.Solid,

				headerToolbar: oTBAutDatPer

			});

			// texto de panel de Autorizaciones de comunicaciones institucionales

			oPanelAutIns.addStyleClass("centrar");

			var oTextAreaAutIns = new sap.m.TextArea({

				cols: 200,

				rows: 2,

				wrapping: sap.ui.core.Wrapping.Soft

			});

			oTextAreaAutIns.setEditable(false);

			oTextAreaAutIns.setValue(

				"En cumplimiento de instrucciones del Ministerio de Educación Nacional y a través del presente documento, la Universidad Sergio Arboleda se encuentra recaudando la siguiente información catalogada como Datos Sensibles por la"

				+

				"legislación colombiana, tales como auto reconocimiento de persona con discapacidad, tipo de discapacidad, integrante o pertenencia a algún grupo de minoría étnica, afrodescendiente, raizal y/o palenquera y/o auto reconocimiento"

				+ "como persona víctima del conflicto armado colombiano. \n\n"

				+

				"La finalidad de la recolección de la información anteriormente referenciada, tiene por objeto de apoyar y realizar el seguimiento a aquellos estudiantes que se hayan auto reconocidos como personas con discapacidad o pertenecientes"

				+

				"a algunos de los señalados grupos, para salvaguardar el interés vital del Titular, como consecuencia del Proyecto Universidad Sergio Arboleda para la Inclusión (USAPI) y con base en Ley 1581 de 2012 (Estatutaria para la protección de"

				+

				"datos personales) y su Decreto Reglamentario 1377 de 2013 , así como lo establecido por la Política de Tratamiento de la Información de la Universidad Sergio Arboleda, que puede consultarse a través del siguiente link:"

				+ "http://www.usergioarboleda.edu.co/secretaria-general/politica-de-tratamiento-de-la-informacion.pdf. \n\n"

				+

				"Por tal razón, y en virtud de lo estipulado por el Artículo 5° de la Ley 1582 de 2012, le damos a conocer que, Usted como Titular de los datos a suministrar, le asiste el derecho de autorizar o NO a autorizar su la recolección y "

				+ "tratamiento de la información de que trata esta comunicación, situación que será respetada por la Universidad Sergio Arboleda."

			);

			oPanelAutIns.addContent(oTextAreaAutIns);

			// texto de panel de Habeas Data

			oPanelHabeasData.addStyleClass("centrar");

			var oTextAreaHabeasData = new sap.m.TextArea({

				cols: 200,

				rows: 2,

				//	height : 100,

				wrapping: sap.ui.core.Wrapping.Soft

			});

			oTextAreaHabeasData.addStyleClass("letra-pequena");

			oTextAreaHabeasData.setEditable(false);

			oTextAreaHabeasData.setValue(

				"Autorizo a la UNIVERSIDAD SERGIO ARBOLEDA para que todas las comunicaciones que se generen de carácter académico, disciplinario y/o administrativo sean notificadas a través del correo electrónico institucional y/o a través de los medios"

				+

				"electrónicos que dispone la Universidad, lo anterior en concordancia de la ley 527 de 1999 y las normas que las sustituyan, adicionen o modifiquen."

			);

			oPanelHabeasData.addContent(oTextAreaHabeasData);

			// texto de panel de Autorización para el tratamiento de datos personales sensibles

			oPanelAutDatPer.addStyleClass("centrar");

			var oTextAreaAutDatPer = new sap.m.TextArea({

				cols: 200,

				rows: 3,

				wrapping: sap.ui.core.Wrapping.Soft

			});

			//oTextAreaAutDatPer.addStyleClass("letra-pequeña");

			oTextAreaAutDatPer.setEditable(false);

			oTextAreaAutDatPer.setValue(

				"En cumplimiento de lo establecido en el artículo 10 del Decreto 1377 de 2013, el cual reglamenta la Ley 1581 de 2012 (Estatutaria para la protección de datos personales), la Universidad Sergio Arboleda se permite informar que con"

				+

				"anterioridad al 27 de junio de 2013 ha recolectado y procesado datos personales con el objeto de desarrollar las funciones propias de la Universidad en su condición de institución de educación superior, de forma directa o a través"

				+ "de terceros."

			);

			oPanelAutDatPer.addContent(oTextAreaAutDatPer);

			var oTextAreaGen = new sap.m.TextArea({

				cols: 200,

				rows: 9,

				wrapping: sap.ui.core.Wrapping.Soft

			});

			oTextAreaGen.setEditable(false);

			oTextAreaGen.setValue(

				"En cumplimiento de instrucciones del Ministerio de Educación Nacional y a través del presente documento, la Universidad Sergio Arboleda se encuentra recaudando la siguiente información catalogada como Datos Sensibles por la"

				+

				"legislación colombiana, tales como auto reconocimiento de persona con discapacidad, tipo de discapacidad, integrante o pertenencia a algún grupo de minoría étnica, afrodescendiente, raizal y/o palenquera y/o auto reconocimiento"

				+ "como persona víctima del conflicto armado colombiano. \n\n"

				+

				"La finalidad de la recolección de la información anteriormente referenciada, tiene por objeto de apoyar y realizar el seguimiento a aquellos estudiantes que se hayan auto reconocidos como personas con discapacidad o pertenecientes"

				+

				"a algunos de los señalados grupos, para salvaguardar el interés vital del Titular, como consecuencia del Proyecto Universidad Sergio Arboleda para la Inclusión (USAPI) y con base en Ley 1581 de 2012 (Estatutaria para la protección de"

				+

				"datos personales) y su Decreto Reglamentario 1377 de 2013 , así como lo establecido por la Política de Tratamiento de la Información de la Universidad Sergio Arboleda, que puede consultarse a través del siguiente link:"

				+ "http://www.usergioarboleda.edu.co/secretaria-general/politica-de-tratamiento-de-la-informacion.pdf. \n\n"

				+

				"Por tal razón, y en virtud de lo estipulado por el Artículo 5° de la Ley 1582 de 2012, le damos a conocer que, Usted como Titular de los datos a suministrar, le asiste el derecho de autorizar o NO a autorizar su la recolección y "

				+ "tratamiento de la información de que trata esta comunicación, situación que será respetada por la Universidad Sergio Arboleda."

				+ ""

				+

				"Autorizo a la UNIVERSIDAD SERGIO ARBOLEDA para que todas las comunicaciones que se generen de carácter académico, disciplinario y/o administrativo sean notificadas a través del correo electrónico institucional y/o a través de los medios"

				+

				"electrónicos que dispone la Universidad, lo anterior en concordancia de la ley 527 de 1999 y las normas que las sustituyan, adicionen o modifiquen."

				+ ""

				+

				"En cumplimiento de lo establecido en el artículo 10 del Decreto 1377 de 2013, el cual reglamenta la Ley 1581 de 2012 (Estatutaria para la protección de datos personales), la Universidad Sergio Arboleda se permite informar que con"

				+

				"anterioridad al 27 de junio de 2013 ha recolectado y procesado datos personales con el objeto de desarrollar las funciones propias de la Universidad en su condición de institución de educación superior, de forma directa o a través"

				+ "de terceros."

			);

			oPanelGen.addContent(oTextAreaGen);

			//se agrega checkbox a la layout

			var oCB = new sap.m.CheckBox({

				id: "oCB",

				text: "Acepto autorizaciones de privacidad",

				selected: false,

				select: this.onAcceptCond

			});

			//estilo a checkbox

			oCB.addStyleClass("margen-izq-2-5");

			//estilo a botones

			oBtnCancelar.addStyleClass("margen-izq-2-5");

			//se agregan paneles al layout

			// 			oMatrix.createRow(oPanelAutIns);

			// 			oMatrix.createRow(oPanelHabeasData);

			// 			oMatrix.createRow(oPanelAutDatPer);

			// 			oMatrix.createRow(oCB);

			// 			oMatrix.createRow(oLayoutBotonesCenter);

			var oBtnBienvenida = new sap.m.Button({

				id: "oBtnBienvenida",

				text: "Continuar",

				type: sap.m.ButtonType.Accept,

				press: function() {

					var height;

					var width;

					if ($(window).height) {

						height = $(window).height();

					} else {

						height = $(this.window).height();

					}

					if ($(window).width) {

						width = $(window).width();

					} else {

						width = $(this.window).width();

					}

					if (height <= 700 && width <= 900) {

						oMatrix.removeAllRows();

						oMatrix.createRow(oPanelGen);

						oMatrix.createRow(oCB);

						oMatrix.createRow(oLayoutBotonesCenter);

					} else {

						oMatrix.removeAllRows();

						oMatrix.createRow(oPanelAutIns);

						oMatrix.createRow(oPanelHabeasData);

						oMatrix.createRow(oPanelAutDatPer);

						oMatrix.createRow(oCB);

						oMatrix.createRow(oLayoutBotonesCenter);

					}

				}

			});

			//layout para botones

			var oLayoutBtnBienvenida = new sap.ui.layout.HorizontalLayout({

				content: [oBtnBienvenida]

			});

			var oLayoutBtnCntBienvenida = new sap.m.VBox({

				items: [oLayoutBtnBienvenida]

			});

			oLayoutBtnCntBienvenida.setAlignItems("Center");

			oLayoutBtnCntBienvenida.setJustifyContent("Center");

			oPanelBienvenida.addContent(oTABienvenida);

			oMatrix.createRow(oImgTitleLogo);

			oMatrix.createRow(oTABienvenida);

			oMatrix.createRow(oTATexto);

			oMatrix.createRow(oTATextoTel);

			oMatrix.createRow(oLayoutBtnCntBienvenida);

			//se agrega grilla a la ventana emergente

			oOverlayContainer.addContent(oMatrix);

			oOverlayContainer.placeAt("content");

			if (!oOverlayContainer.isOpen()) {

				var height;

				var width;

				if ($(window).height) {

					height = $(window).height();

				} else {

					height = $(this.window).height();

				}

				if ($(window).width) {

					width = $(window).width();

				} else {

					width = $(this.window).width();

				}

				if (height <= 700 && width <= 900) {

					// oPanelAutDatPer.setExpanded(false);

					// oPanelHabeasData.setExpanded(false);

					oImgTitleLogo.removeStyleClass("responsive-img");

					oImgTitleLogo.addStyleClass("responsive-img-movil");

				}

				oOverlayContainer.open();

			}

		},

		//validacion fechas

		onChangeDate: function(evt) {

			var oDP = sap.ui.getCore().byId(evt.getSource().getId());

			//var sValue = evt.getParameter("value");

			var bValid = evt.getParameter("valid");

			if (bValid) {

				oDP.setValueState(sap.ui.core.ValueState.None);

			} else {

				oDP.setValueState(sap.ui.core.ValueState.Error);

			}

		},

		onChangeTipoId: function() {

			var oSTipId = this.getView().byId("oSTipId");

			var oINumId = this.getView().byId("oINumId");

			oINumId.setValueState(sap.ui.core.ValueState.None);

			oSTipId.removeStyleClass("warning");

			if (oINumId.getValue() !== "" && oSTipId.getSelectedItem().getText() !== "") {

				this.getView().byId("OBtnBuscarEst").firePress();

			}

		},

		getDptoUnblock: function() {

			var oView = this.getView();

			var oCBDptoNac = oView.byId("oCBDptoNac");

			var oSDptoRes = oView.byId("oSDptoRes");

			oCBDptoNac.setBusy(false);

			oCBDptoNac.removeStyleClass("no-editable");

			oSDptoRes.setBusy(false);

			oSDptoRes.removeStyleClass("no-editable");

		},

		getDptoBlock: function(oData) {

			var oView = this.getView();

			var oCBDptoNac = oView.byId("oCBDptoNac");

			var oCBPaisNac = oView.byId("oCBPaisNac");

			var oModel = oView.getModel();

			var oItemTemplate = new sap.ui.core.ListItem();

			oItemTemplate.bindProperty("text", "Bezei");

			oItemTemplate.bindProperty("key", "Bland");

			var item = oCBPaisNac.getSelectedItem();

			var oContext = item.getBindingContext();

			var sPath = oContext.getPath() + "/PaisToRegion";

			oCBDptoNac.setModel(oModel);

			oCBDptoNac.setValue("");

			oCBDptoNac.unbindItems();

			oCBDptoNac.bindItems(sPath, oItemTemplate);

			if (oData.Gbdep !== "") {

				oCBDptoNac.setBusy(true);

				oCBDptoNac.addStyleClass("no-editable");

			} else {

				oCBDptoNac.setBusy(false);

				oCBDptoNac.removeStyleClass("no-editable");

			}

			var oCBPaisRes = oView.byId("oCBPaisRes");

			var oSDptoRes = oView.byId("oSDptoRes");

			item = oCBPaisRes.getSelectedItem();

			oContext = item.getBindingContext();

			sPath = oContext.getPath() + "/PaisToRegion";

			oSDptoRes.setModel(oModel);

			oSDptoRes.setValue("");

			oSDptoRes.unbindItems();

			oSDptoRes.bindItems(sPath, oItemTemplate);

			if (oData.DptoRes !== "") {

				oSDptoRes.setBusy(true);

				oSDptoRes.addStyleClass("no-editable");

			} else {

				oSDptoRes.setBusy(false);

				oSDptoRes.removeStyleClass("no-editable");

			}

		},

		getDpto: function() {

			var oView = this.getView();

			var oCBDptoNac = oView.byId("oCBDptoNac");

			var oCBPaisNac = oView.byId("oCBPaisNac");

			var oModel = oView.getModel();

			var oItemTemplate = new sap.ui.core.ListItem();

			oItemTemplate.bindProperty("text", "Bezei");

			oItemTemplate.bindProperty("key", "Bland");

			var item = oCBPaisNac.getSelectedItem();

			var oContext = item.getBindingContext();

			var sPath = oContext.getPath() + "/PaisToRegion";

			oCBDptoNac.setModel(oModel);

			oCBDptoNac.setValue("");

			oCBDptoNac.unbindItems();

			oCBDptoNac.bindItems(sPath, oItemTemplate);

			var oCBPaisRes = oView.byId("oCBPaisRes");

			var oSDptoRes = oView.byId("oSDptoRes");

			item = oCBPaisRes.getSelectedItem();

			oContext = item.getBindingContext();

			sPath = oContext.getPath() + "/PaisToRegion";

			oSDptoRes.setModel(oModel);

			oSDptoRes.setValue("");

			oSDptoRes.unbindItems();

			oSDptoRes.bindItems(sPath, oItemTemplate);

		},

		onChangePais: function(evt) {

			var oCBDpto;

			var oView = this.getView();

			var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();

			if (evt.getSource().getId() === "__xmlview0--oCBPaisNac") {

				oCBDpto = this.getView().byId("oCBDptoNac");

			} else {

				oCBDpto = this.getView().byId("oSDptoRes");

			}

			var oModel = oView.getModel();

			var oContext = item.getBindingContext();

			var sPath = oContext.getPath() + "/PaisToRegion";

			var oItemTemplate = new sap.ui.core.ListItem();

			oCBDpto.setModel(oModel);

			oItemTemplate.bindProperty("text", "Bezei");

			oItemTemplate.bindProperty("key", "Bland");

			oCBDpto.setValue("");

			oCBDpto.unbindItems();

			oCBDpto.bindItems(sPath, oItemTemplate);

		},

		//cuando se selecciona un valor de combo box sede

		OnSelectionChangeSede: function(evt) {

			// 			sap.m.MessageToast.show(evt.getSource().getId() + "pressed!");

			var busyDialog = this.getView().byId("BusyDialog");

			var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();

			var oCBTipoPrograma = this.getView().byId("oCBTipoPrograma");

			var oCBNomPrograma = this.getView().byId("oCBNomPrograma");

			var oModel = item.getModel();

			var oContext = item.getBindingContext();

			var sPath = oContext.getPath() + "/SedeToTiposPost";

			var oItemTemplate1 = new sap.ui.core.ListItem();

			oCBTipoPrograma.setModel(oModel);

			oItemTemplate1.bindProperty("text", "StextTipoPost");

			oItemTemplate1.bindProperty("key", "Objid");

			oCBTipoPrograma.setValue("");

			oCBNomPrograma.setValue("");

			oCBTipoPrograma.unbindItems();

			oCBNomPrograma.unbindItems();

			oCBTipoPrograma.bindItems(sPath, oItemTemplate1);

			busyDialog.open();

			if (window.setTimeout) {

				window.setTimeout(function() {

					busyDialog.close();

				}, 500);

				window.setTimeout(function() {

					if (!oCBTipoPrograma.getModel().getData(sPath)) {

						var oItemLength = oCBTipoPrograma.getItems().length;

						if (oItemLength === 0) {

							var text = "En este momento la Sede " + item.getText() +

								" no tiene postgrados agendados, por favor comunicate con la universidad";

							sap.m.MessageToast.show(text);

						}

					}

				}, 700);

			} else {

				this.window.setTimeout(function() {

					busyDialog.close();

				}, 500);

				this.window.setTimeout(function() {

					if (!oCBTipoPrograma.getModel().getData(sPath)) {

						var oItemLength = oCBTipoPrograma.getItems().length;

						if (oItemLength === 0) {

							var text = "En este momento la Sede " + item.getText() +

								" no tiene postgrados agendados, por favor comunicate con la universidad";

							sap.m.MessageToast.show(text);

						}

					}

				}, 700);

			}

			// 			busyDialog.close();

		},

		//cuando se selecciona un valor de combo box tipo de programa

		OnSelectionChangeTipoProg: function(evt) {

			var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();

			var oCBNomPrograma = this.getView().byId("oCBNomPrograma");

			var oModel = item.getModel();

			var oContext = item.getBindingContext();

			var sPath = oContext.getPath() + "/TipoPostgradoToPrograma";

			var oItemTemplate1 = new sap.ui.core.ListItem();

			oCBNomPrograma.setModel(oModel);

			oItemTemplate1.bindProperty("text", "StextPrograma");

			oItemTemplate1.bindProperty("key", "ScObjid");

			oCBNomPrograma.setValue("");

			oCBNomPrograma.unbindItems();

			oCBNomPrograma.bindItems(sPath, oItemTemplate1);

		},

		fireDetailChanged: function(sEntityPath) {

			this.getEventBus().publish("Detail", "Changed", {

				sEntityPath: sEntityPath

			});

		},

		fireDetailNotFound: function() {

			this.getEventBus().publish("Detail", "NotFound");

		},

		getEventBus: function() {

			return sap.ui.getCore().getEventBus();

		}

	});

});