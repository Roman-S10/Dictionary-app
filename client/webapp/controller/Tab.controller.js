sap.ui.define([
   "sap/ui/core/mvc/Controller"
 ], function (Controller) {
   "use strict";
   return Controller.extend("sap.ui.client.controller.Tab", {
      onAddTranslation : function () {
         const inputWord = this.getView().byId("input-word");
         const word = inputWord.getValue();
         const inputTranslation = this.getView().byId("input-translation");
         const translation = inputTranslation.getValue();
         const infoText = this.getView().byId("info-text");

         fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
               "word": word,
               "translation": translation
            })
         })
         .then(response => response.json())
         .then(json => infoText.setHtmlText(json.info));

         inputTranslation.setValue('');
         inputWord.setValue('');
      },
      onGetTranslation : function () {
         const word = this.getView().byId("input-word-for-translation").getValue();
         const translationText = this.getView().byId("translation-text");
         fetch(`http://localhost:3000/${word}`)
         .then(response => response.json())
         .then(json => translationText.setHtmlText(json.translation ? json.translation : json.error));
      }
   });
});