sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui.client",
		settings : {
			id : "client"
		},
		async: true
	}).placeAt("content");
});