define([
  'require',
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  '../Module'
], function (_require, declare, array, lang, Module) {
  return declare('ContentModule', [Module], {
    _expansionsSetter: function (expansions) {
      // summary:
      //      Setter for expansions attribute
      try {
        console.debug('Set expansions for route >>', expansions);
        this._expansions = [];
        var _self = this;
        array.forEach(expansions, function (expansionPackage) {
          _self._processExpansionPackage(expansionPackage);
        });
      } catch (e) {
        console.error(this.declaredClass, arguments, e);
        throw e;
      }
    },
    _processExpansionPackage: function (expansionPackage) {
      // summary:
      //      Trying to extract all required
      //      data from expansionPackage and then
      //      build expansion and push it
      //      to the collection.
      // tags:
      //      private
      try {
        if (!expansionPackage.module) {
          throw new SyntaxError('Syntax error in expansion packages, ' +
                                'key module must be present');
        }
        var _self = this;
        require([expansionPackage.module], function (expansion) {
          if (!expansion || !expansion.prototype ||
              !expansion.prototype
                        .isInstanceOf(_require('./_ExpansionMixin'))) {
            throw new TypeError('One of expansions has incorrect type ' +
                                'inside _processExpansionPackage');
          }
          _self._expansions.push(expansion);
        });
      } catch (e) {
        console.error(this.declaredClass, arguments, e);
        throw e;
      }
    },
    getInstance: function () {
      // summary:
      //      Get module instance which will
      //      be displayed for route
      try {
        var instance = this.inherited(arguments);
        if (instance.isInstanceOf(_require('./_ExpandedMixin')) &&
            this._expansions) {
          console.debug('Expandable Instance >>>', instance,
                        ' expansions >>>', this._expansions);
          instance.set('expansions', this._expansions);
        }
        return instance;
      } catch (e) {
        console.error(this.declaredClass, arguments, e);
        throw e;
      }
    }
  });
});
