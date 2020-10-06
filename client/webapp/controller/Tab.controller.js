sap.ui.define([
   "sap/ui/core/mvc/Controller"
 ], function (Controller) {
   "use strict";
   return Controller.extend("sap.ui.client.controller.Tab", {
      onAddTranslation : function () {
         const word = this.getView().byId("input-word").getValue();
         const translation = this.getView().byId("input-translation").getValue();
         fetch('/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
               "word":word,
               "translation": translation
            })
          });
      },
      onGetTranslation : function () {
         const word = this.getView().byId("input-word-for-translation").getValue();
         fetch(`/${word}`)
         .then(response => response.json())
         .then(json => console.log(json))
      }
   });
});