/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@vanillaes/csv/index.js":
/*!**********************************************!*\
  !*** ./node_modules/@vanillaes/csv/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   stringify: () => (/* binding */ stringify)
/* harmony export */ });
/**
 * Parse takes a string of CSV data and converts it to a 2 dimensional array
 *
 * options
 * - typed - infer types [false]
 *
 * @static
 * @param {string} csv the CSV string to parse
 * @param {Object} [options] an object containing the options
 * @param {Function} [reviver] a custom function to modify the values
 * @returns {Array} a 2 dimensional array of `[entries][values]`
 */
function parse (csv, options, reviver = v => v) {
  const ctx = Object.create(null)
  ctx.options = options || {}
  ctx.reviver = reviver
  ctx.value = ''
  ctx.entry = []
  ctx.output = []
  ctx.col = 1
  ctx.row = 1

  const lexer = /"|,|\r\n|\n|\r|[^",\r\n]+/y
  const isNewline = /^(\r\n|\n|\r)$/

  let matches = []
  let match = ''
  let state = 0

  while ((matches = lexer.exec(csv)) !== null) {
    match = matches[0]

    switch (state) {
      case 0: // start of entry
        switch (true) {
          case match === '"':
            state = 3
            break
          case match === ',':
            state = 0
            valueEnd(ctx)
            break
          case isNewline.test(match):
            state = 0
            valueEnd(ctx)
            entryEnd(ctx)
            break
          default:
            ctx.value += match
            state = 2
            break
        }
        break
      case 2: // un-delimited input
        switch (true) {
          case match === ',':
            state = 0
            valueEnd(ctx)
            break
          case isNewline.test(match):
            state = 0
            valueEnd(ctx)
            entryEnd(ctx)
            break
          default:
            state = 4
            throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`)
        }
        break
      case 3: // delimited input
        switch (true) {
          case match === '"':
            state = 4
            break
          default:
            state = 3
            ctx.value += match
            break
        }
        break
      case 4: // escaped or closing delimiter
        switch (true) {
          case match === '"':
            state = 3
            ctx.value += match
            break
          case match === ',':
            state = 0
            valueEnd(ctx)
            break
          case isNewline.test(match):
            state = 0
            valueEnd(ctx)
            entryEnd(ctx)
            break
          default:
            throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`)
        }
        break
    }
  }

  // flush the last value
  if (ctx.entry.length !== 0) {
    valueEnd(ctx)
    entryEnd(ctx)
  }

  return ctx.output
}

/**
 * Stringify takes a 2 dimensional array of `[entries][values]` and converts them to CSV
 *
 * options
 * - eof - add a trailing newline at the end of file [true]
 *
 * @static
 * @param {Array} array the input array to stringify
 * @param {Object} [options] an object containing the options
 * @param {Function} [replacer] a custom function to modify the values
 * @returns {string} the CSV string
 */
function stringify (array, options = {}, replacer = v => v) {
  const ctx = Object.create(null)
  ctx.options = options
  ctx.options.eof = ctx.options.eof !== undefined ? ctx.options.eof : true
  ctx.row = 1
  ctx.col = 1
  ctx.output = ''

  const needsDelimiters = /"|,|\r\n|\n|\r/

  array.forEach((row, rIdx) => {
    let entry = ''
    ctx.col = 1
    row.forEach((col, cIdx) => {
      if (typeof col === 'string') {
        col = col.replace(/"/g, '""')
        col = needsDelimiters.test(col) ? `"${col}"` : col
      }
      entry += replacer(col, ctx.row, ctx.col)
      if (cIdx !== row.length - 1) {
        entry += ','
      }
      ctx.col++
    })
    switch (true) {
      case ctx.options.eof:
      case !ctx.options.eof && rIdx !== array.length - 1:
        ctx.output += `${entry}\n`
        break
      default:
        ctx.output += `${entry}`
        break
    }
    ctx.row++
  })

  return ctx.output
}

/** @private */
function valueEnd (ctx) {
  const value = ctx.options.typed ? inferType(ctx.value) : ctx.value
  ctx.entry.push(ctx.reviver(value, ctx.row, ctx.col))
  ctx.value = ''
  ctx.col++
}

/** @private */
function entryEnd (ctx) {
  ctx.output.push(ctx.entry)
  ctx.entry = []
  ctx.row++
  ctx.col = 1
}

/** @private */
function inferType (value) {
  const isNumber = /.\./

  switch (true) {
    case value === 'true':
    case value === 'false':
      return value === 'true'
    case isNumber.test(value):
      return parseFloat(value)
    case isFinite(value):
      return parseInt(value)
    default:
      return value
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vanillaes_csv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vanillaes/csv */ "./node_modules/@vanillaes/csv/index.js");

figma.showUI(__html__, { height: 600, width: 600 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "get-collections") {
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
            const collections = [];
            for (const collection of localCollections) {
                collections.push(collection.name);
            }
            figma.ui.postMessage({
                type: "get-collections",
                body: collections
            });
        });
    }
    if ((msg.type === "export") && msg.collectionName) {
        const collectionName = msg.collectionName;
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
            let collectionId = "";
            const modeIds = [];
            const modeNames = [];
            // extract collection id and modeIds
            for (const collection of localCollections) {
                if (collection.name === collectionName) {
                    collectionId = collection.id;
                    for (const mode of collection.modes) {
                        modeIds.push(mode.modeId);
                        modeNames.push(mode.name);
                    }
                }
            }
            figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
                // prepare and export variable object
                const headers = [collectionName, ...modeNames];
                const exportVariablesObject = [];
                exportVariablesObject.push(headers);
                for (const variable of variables) {
                    if (variable.variableCollectionId === collectionId) {
                        const variableValuesByMode = [];
                        for (const modeId of modeIds) {
                            variableValuesByMode.push(variable.valuesByMode[modeId].toString());
                        }
                        exportVariablesObject.push([variable.name, ...variableValuesByMode]);
                    }
                }
                console.log(exportVariablesObject);
                figma.ui.postMessage({
                    type: "export",
                    body: {
                        collectionName: collectionName,
                        csvData: (0,_vanillaes_csv__WEBPACK_IMPORTED_MODULE_0__.stringify)(exportVariablesObject)
                    }
                });
            });
        });
    }
    if (msg.type === "import") {
        const parsedCSV = (0,_vanillaes_csv__WEBPACK_IMPORTED_MODULE_0__.parse)(msg.importedCSV);
        // check if the CSV is empty 001
        if (parsedCSV.length === 0) {
            figma.notify("That's a blank CSV file! No pranks please -_-", { error: true, timeout: 5000 });
            return;
        }
        console.log(parsedCSV);
        const headers = parsedCSV[0];
        const collectionName = headers[0];
        const importedModeNames = headers.slice(1);
        const importedModeIds = [];
        const importedVariablesObject = [];
        const importedVariableNames = [];
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
            const modesOnFigma = [];
            const modesIdsOnFigma = [];
            let collectionId = "";
            for (const localCollection of localCollections) {
                if (localCollection.name === collectionName) {
                    collectionId = localCollection.id;
                    for (const mode of localCollection.modes) {
                        modesOnFigma.push(mode);
                        modesIdsOnFigma.push(mode.modeId);
                    }
                }
            }
            // check if collection exists on Figma 002
            if (collectionId === "") {
                figma.notify("First column header in the CSV does not match any collection on Figma", { error: true, timeout: 5000 });
                return;
            }
            // map importedModes with modesOnFigma
            for (const importedModeName of importedModeNames) {
                let importedModeId = "UndefinedModeId";
                for (const modeOnFigma of modesOnFigma) {
                    if (modeOnFigma.name === importedModeName)
                        importedModeId = modeOnFigma.modeId;
                }
                importedModeIds.push(importedModeId);
            }
            // sanitise and populate import variables
            for (let i = 1; i < parsedCSV.length; i++) {
                importedVariableNames.push(parsedCSV[i][0]);
                const valuesByMode = {};
                for (let j = 0; j < importedModeIds.length; j++) {
                    valuesByMode[importedModeIds[j]] = parsedCSV[i][j + 1];
                }
                importedVariablesObject.push({
                    name: parsedCSV[i][0],
                    valuesByMode: valuesByMode
                });
            }
            console.log(importedVariablesObject);
            // check if there are any variables 003
            if (importedVariableNames.length === 0) {
                figma.notify("No variables found in the CSV", { error: true, timeout: 5000 });
                return;
            }
            // check if required modes are available 004 and 004_more_columns (should pass)
            if (!CheckSubset(importedModeIds, modesIdsOnFigma)) {
                figma.notify("One or more columns in the CSV do not match or are missing", { error: true, timeout: 5000 });
                return;
            }
            figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
                const variableNamesOnFigma = [];
                // check if any Figma variables are missing in the CSV 005
                for (const variable of variables) {
                    if (variable.variableCollectionId === collectionId) {
                        variableNamesOnFigma.push(variable.name);
                        if (importedVariableNames.indexOf(variable.name) === -1) {
                            figma.notify("One or more variables in the Figma collection, are missing in the CSV", { error: true, timeout: 5000 });
                            return;
                        }
                    }
                }
                // update variables if no issues found
                UpdateVariables(importedVariablesObject, collectionName, collectionId, modesIdsOnFigma);
            });
        });
    }
};
function UpdateVariables(importedVariablesObject, collectionName, collectionId, modesIdsOnFigma) {
    figma.notify("Updating variable values, hold on...");
    figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        // begin updating variables
        for (const variable of variables) {
            if (variable.variableCollectionId === collectionId) {
                for (const importedVariable of importedVariablesObject) {
                    if (importedVariable.name === variable.name) {
                        for (const modeId of modesIdsOnFigma) {
                            try {
                                variable.setValueForMode(modeId, importedVariable.valuesByMode[modeId]);
                            }
                            catch (error) {
                                console.error(error);
                                figma.notify(`Could not update ${variable.name}`, { error: true, timeout: 5000 });
                                figma.notify(`Import aborted. Please check the variable value in the CSV.`, { error: true, timeout: 5000 });
                                figma.notify(`${error}`, { error: true, timeout: 5000 });
                                return;
                            }
                        }
                    }
                }
            }
        }
        figma.notify(`Successfully updated variable values of ${collectionName} from the CSV`);
    });
}
function CheckSubset(parentArray, subsetArray) {
    return subsetArray.every((el) => {
        return parentArray.includes(el);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTRFLDRCQUE0QjtBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBd0csNEJBQTRCO0FBQ3BJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBLGdDQUFnQyw0QkFBNEI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSw0QkFBNEI7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkYsNEJBQTRCO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9IQUFvSCw0QkFBNEI7QUFDaEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxjQUFjLEtBQUssNEJBQTRCO0FBQ2hILDhHQUE4Ryw0QkFBNEI7QUFDMUksZ0RBQWdELE1BQU0sS0FBSyw0QkFBNEI7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsZ0JBQWdCO0FBQ2hGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC8uL25vZGVfbW9kdWxlcy9AdmFuaWxsYWVzL2Nzdi9pbmRleC5qcyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhcnNlIHRha2VzIGEgc3RyaW5nIG9mIENTViBkYXRhIGFuZCBjb252ZXJ0cyBpdCB0byBhIDIgZGltZW5zaW9uYWwgYXJyYXlcbiAqXG4gKiBvcHRpb25zXG4gKiAtIHR5cGVkIC0gaW5mZXIgdHlwZXMgW2ZhbHNlXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3YgdGhlIENTViBzdHJpbmcgdG8gcGFyc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXZpdmVyXSBhIGN1c3RvbSBmdW5jdGlvbiB0byBtb2RpZnkgdGhlIHZhbHVlc1xuICogQHJldHVybnMge0FycmF5fSBhIDIgZGltZW5zaW9uYWwgYXJyYXkgb2YgYFtlbnRyaWVzXVt2YWx1ZXNdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UgKGNzdiwgb3B0aW9ucywgcmV2aXZlciA9IHYgPT4gdikge1xuICBjb25zdCBjdHggPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIGN0eC5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBjdHgucmV2aXZlciA9IHJldml2ZXJcbiAgY3R4LnZhbHVlID0gJydcbiAgY3R4LmVudHJ5ID0gW11cbiAgY3R4Lm91dHB1dCA9IFtdXG4gIGN0eC5jb2wgPSAxXG4gIGN0eC5yb3cgPSAxXG5cbiAgY29uc3QgbGV4ZXIgPSAvXCJ8LHxcXHJcXG58XFxufFxccnxbXlwiLFxcclxcbl0rL3lcbiAgY29uc3QgaXNOZXdsaW5lID0gL14oXFxyXFxufFxcbnxcXHIpJC9cblxuICBsZXQgbWF0Y2hlcyA9IFtdXG4gIGxldCBtYXRjaCA9ICcnXG4gIGxldCBzdGF0ZSA9IDBcblxuICB3aGlsZSAoKG1hdGNoZXMgPSBsZXhlci5leGVjKGNzdikpICE9PSBudWxsKSB7XG4gICAgbWF0Y2ggPSBtYXRjaGVzWzBdXG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICBjYXNlIDA6IC8vIHN0YXJ0IG9mIGVudHJ5XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJywnOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgaXNOZXdsaW5lLnRlc3QobWF0Y2gpOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBlbnRyeUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjdHgudmFsdWUgKz0gbWF0Y2hcbiAgICAgICAgICAgIHN0YXRlID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOiAvLyB1bi1kZWxpbWl0ZWQgaW5wdXRcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJywnOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgaXNOZXdsaW5lLnRlc3QobWF0Y2gpOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBlbnRyeUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdGF0ZSA9IDRcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBDU1ZFcnJvcjogSWxsZWdhbCBzdGF0ZSBbcm93OiR7Y3R4LnJvd30sIGNvbDoke2N0eC5jb2x9XWApXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzogLy8gZGVsaW1pdGVkIGlucHV0XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDRcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHN0YXRlID0gM1xuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6IC8vIGVzY2FwZWQgb3IgY2xvc2luZyBkZWxpbWl0ZXJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJ1wiJzpcbiAgICAgICAgICAgIHN0YXRlID0gM1xuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENTVkVycm9yOiBJbGxlZ2FsIHN0YXRlIFtyb3c6JHtjdHgucm93fSwgY29sOiR7Y3R4LmNvbH1dYClcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIGZsdXNoIHRoZSBsYXN0IHZhbHVlXG4gIGlmIChjdHguZW50cnkubGVuZ3RoICE9PSAwKSB7XG4gICAgdmFsdWVFbmQoY3R4KVxuICAgIGVudHJ5RW5kKGN0eClcbiAgfVxuXG4gIHJldHVybiBjdHgub3V0cHV0XG59XG5cbi8qKlxuICogU3RyaW5naWZ5IHRha2VzIGEgMiBkaW1lbnNpb25hbCBhcnJheSBvZiBgW2VudHJpZXNdW3ZhbHVlc11gIGFuZCBjb252ZXJ0cyB0aGVtIHRvIENTVlxuICpcbiAqIG9wdGlvbnNcbiAqIC0gZW9mIC0gYWRkIGEgdHJhaWxpbmcgbmV3bGluZSBhdCB0aGUgZW5kIG9mIGZpbGUgW3RydWVdXG4gKlxuICogQHN0YXRpY1xuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgdGhlIGlucHV0IGFycmF5IHRvIHN0cmluZ2lmeVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlcGxhY2VyXSBhIGN1c3RvbSBmdW5jdGlvbiB0byBtb2RpZnkgdGhlIHZhbHVlc1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIENTViBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSAoYXJyYXksIG9wdGlvbnMgPSB7fSwgcmVwbGFjZXIgPSB2ID0+IHYpIHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBjdHgub3B0aW9ucyA9IG9wdGlvbnNcbiAgY3R4Lm9wdGlvbnMuZW9mID0gY3R4Lm9wdGlvbnMuZW9mICE9PSB1bmRlZmluZWQgPyBjdHgub3B0aW9ucy5lb2YgOiB0cnVlXG4gIGN0eC5yb3cgPSAxXG4gIGN0eC5jb2wgPSAxXG4gIGN0eC5vdXRwdXQgPSAnJ1xuXG4gIGNvbnN0IG5lZWRzRGVsaW1pdGVycyA9IC9cInwsfFxcclxcbnxcXG58XFxyL1xuXG4gIGFycmF5LmZvckVhY2goKHJvdywgcklkeCkgPT4ge1xuICAgIGxldCBlbnRyeSA9ICcnXG4gICAgY3R4LmNvbCA9IDFcbiAgICByb3cuZm9yRWFjaCgoY29sLCBjSWR4KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNvbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29sID0gY29sLnJlcGxhY2UoL1wiL2csICdcIlwiJylcbiAgICAgICAgY29sID0gbmVlZHNEZWxpbWl0ZXJzLnRlc3QoY29sKSA/IGBcIiR7Y29sfVwiYCA6IGNvbFxuICAgICAgfVxuICAgICAgZW50cnkgKz0gcmVwbGFjZXIoY29sLCBjdHgucm93LCBjdHguY29sKVxuICAgICAgaWYgKGNJZHggIT09IHJvdy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGVudHJ5ICs9ICcsJ1xuICAgICAgfVxuICAgICAgY3R4LmNvbCsrXG4gICAgfSlcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgY3R4Lm9wdGlvbnMuZW9mOlxuICAgICAgY2FzZSAhY3R4Lm9wdGlvbnMuZW9mICYmIHJJZHggIT09IGFycmF5Lmxlbmd0aCAtIDE6XG4gICAgICAgIGN0eC5vdXRwdXQgKz0gYCR7ZW50cnl9XFxuYFxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY3R4Lm91dHB1dCArPSBgJHtlbnRyeX1gXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIGN0eC5yb3crK1xuICB9KVxuXG4gIHJldHVybiBjdHgub3V0cHV0XG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gdmFsdWVFbmQgKGN0eCkge1xuICBjb25zdCB2YWx1ZSA9IGN0eC5vcHRpb25zLnR5cGVkID8gaW5mZXJUeXBlKGN0eC52YWx1ZSkgOiBjdHgudmFsdWVcbiAgY3R4LmVudHJ5LnB1c2goY3R4LnJldml2ZXIodmFsdWUsIGN0eC5yb3csIGN0eC5jb2wpKVxuICBjdHgudmFsdWUgPSAnJ1xuICBjdHguY29sKytcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBlbnRyeUVuZCAoY3R4KSB7XG4gIGN0eC5vdXRwdXQucHVzaChjdHguZW50cnkpXG4gIGN0eC5lbnRyeSA9IFtdXG4gIGN0eC5yb3crK1xuICBjdHguY29sID0gMVxufVxuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGluZmVyVHlwZSAodmFsdWUpIHtcbiAgY29uc3QgaXNOdW1iZXIgPSAvLlxcLi9cblxuICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHZhbHVlID09PSAndHJ1ZSc6XG4gICAgY2FzZSB2YWx1ZSA9PT0gJ2ZhbHNlJzpcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnXG4gICAgY2FzZSBpc051bWJlci50ZXN0KHZhbHVlKTpcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxuICAgIGNhc2UgaXNGaW5pdGUodmFsdWUpOlxuICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWVcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBwYXJzZSwgc3RyaW5naWZ5IH0gZnJvbSAnQHZhbmlsbGFlcy9jc3YnO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNjAwLCB3aWR0aDogNjAwIH0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJnZXQtY29sbGVjdGlvbnNcIikge1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2xsZWN0aW9uIG9mIGxvY2FsQ29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9ucy5wdXNoKGNvbGxlY3Rpb24ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJnZXQtY29sbGVjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBib2R5OiBjb2xsZWN0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoKG1zZy50eXBlID09PSBcImV4cG9ydFwiKSAmJiBtc2cuY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBtc2cuY29sbGVjdGlvbk5hbWU7XG4gICAgICAgIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpLnRoZW4oKGxvY2FsQ29sbGVjdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSWQgPSBcIlwiO1xuICAgICAgICAgICAgY29uc3QgbW9kZUlkcyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9kZU5hbWVzID0gW107XG4gICAgICAgICAgICAvLyBleHRyYWN0IGNvbGxlY3Rpb24gaWQgYW5kIG1vZGVJZHNcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sbGVjdGlvbiBvZiBsb2NhbENvbGxlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24ubmFtZSA9PT0gY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbklkID0gY29sbGVjdGlvbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIGNvbGxlY3Rpb24ubW9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVJZHMucHVzaChtb2RlLm1vZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlTmFtZXMucHVzaChtb2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoXCJTVFJJTkdcIikudGhlbigodmFyaWFibGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBhbmQgZXhwb3J0IHZhcmlhYmxlIG9iamVjdFxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBbY29sbGVjdGlvbk5hbWUsIC4uLm1vZGVOYW1lc107XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb3J0VmFyaWFibGVzT2JqZWN0ID0gW107XG4gICAgICAgICAgICAgICAgZXhwb3J0VmFyaWFibGVzT2JqZWN0LnB1c2goaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB2YXJpYWJsZSBvZiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlVmFsdWVzQnlNb2RlID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2RlSWRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVWYWx1ZXNCeU1vZGUucHVzaCh2YXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydFZhcmlhYmxlc09iamVjdC5wdXNoKFt2YXJpYWJsZS5uYW1lLCAuLi52YXJpYWJsZVZhbHVlc0J5TW9kZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4cG9ydFZhcmlhYmxlc09iamVjdCk7XG4gICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImV4cG9ydFwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ZEYXRhOiBzdHJpbmdpZnkoZXhwb3J0VmFyaWFibGVzT2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJpbXBvcnRcIikge1xuICAgICAgICBjb25zdCBwYXJzZWRDU1YgPSBwYXJzZShtc2cuaW1wb3J0ZWRDU1YpO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgQ1NWIGlzIGVtcHR5IDAwMVxuICAgICAgICBpZiAocGFyc2VkQ1NWLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiVGhhdCdzIGEgYmxhbmsgQ1NWIGZpbGUhIE5vIHByYW5rcyBwbGVhc2UgLV8tXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocGFyc2VkQ1NWKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHBhcnNlZENTVlswXTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBoZWFkZXJzWzBdO1xuICAgICAgICBjb25zdCBpbXBvcnRlZE1vZGVOYW1lcyA9IGhlYWRlcnMuc2xpY2UoMSk7XG4gICAgICAgIGNvbnN0IGltcG9ydGVkTW9kZUlkcyA9IFtdO1xuICAgICAgICBjb25zdCBpbXBvcnRlZFZhcmlhYmxlc09iamVjdCA9IFtdO1xuICAgICAgICBjb25zdCBpbXBvcnRlZFZhcmlhYmxlTmFtZXMgPSBbXTtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCkudGhlbigobG9jYWxDb2xsZWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kZXNPbkZpZ21hID0gW107XG4gICAgICAgICAgICBjb25zdCBtb2Rlc0lkc09uRmlnbWEgPSBbXTtcbiAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSWQgPSBcIlwiO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbENvbGxlY3Rpb24ubmFtZSA9PT0gY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbklkID0gbG9jYWxDb2xsZWN0aW9uLmlkO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGUgb2YgbG9jYWxDb2xsZWN0aW9uLm1vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2Rlc09uRmlnbWEucHVzaChtb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVzSWRzT25GaWdtYS5wdXNoKG1vZGUubW9kZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGNvbGxlY3Rpb24gZXhpc3RzIG9uIEZpZ21hIDAwMlxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25JZCA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIkZpcnN0IGNvbHVtbiBoZWFkZXIgaW4gdGhlIENTViBkb2VzIG5vdCBtYXRjaCBhbnkgY29sbGVjdGlvbiBvbiBGaWdtYVwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1hcCBpbXBvcnRlZE1vZGVzIHdpdGggbW9kZXNPbkZpZ21hXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGltcG9ydGVkTW9kZU5hbWUgb2YgaW1wb3J0ZWRNb2RlTmFtZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1wb3J0ZWRNb2RlSWQgPSBcIlVuZGVmaW5lZE1vZGVJZFwiO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZU9uRmlnbWEgb2YgbW9kZXNPbkZpZ21hKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlT25GaWdtYS5uYW1lID09PSBpbXBvcnRlZE1vZGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0ZWRNb2RlSWQgPSBtb2RlT25GaWdtYS5tb2RlSWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltcG9ydGVkTW9kZUlkcy5wdXNoKGltcG9ydGVkTW9kZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNhbml0aXNlIGFuZCBwb3B1bGF0ZSBpbXBvcnQgdmFyaWFibGVzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBhcnNlZENTVi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGltcG9ydGVkVmFyaWFibGVOYW1lcy5wdXNoKHBhcnNlZENTVltpXVswXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzQnlNb2RlID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbXBvcnRlZE1vZGVJZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzQnlNb2RlW2ltcG9ydGVkTW9kZUlkc1tqXV0gPSBwYXJzZWRDU1ZbaV1baiArIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbXBvcnRlZFZhcmlhYmxlc09iamVjdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcGFyc2VkQ1NWW2ldWzBdLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNCeU1vZGU6IHZhbHVlc0J5TW9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QpO1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSB2YXJpYWJsZXMgMDAzXG4gICAgICAgICAgICBpZiAoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIk5vIHZhcmlhYmxlcyBmb3VuZCBpbiB0aGUgQ1NWXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgcmVxdWlyZWQgbW9kZXMgYXJlIGF2YWlsYWJsZSAwMDQgYW5kIDAwNF9tb3JlX2NvbHVtbnMgKHNob3VsZCBwYXNzKVxuICAgICAgICAgICAgaWYgKCFDaGVja1N1YnNldChpbXBvcnRlZE1vZGVJZHMsIG1vZGVzSWRzT25GaWdtYSkpIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJPbmUgb3IgbW9yZSBjb2x1bW5zIGluIHRoZSBDU1YgZG8gbm90IG1hdGNoIG9yIGFyZSBtaXNzaW5nXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoXCJTVFJJTkdcIikudGhlbigodmFyaWFibGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFyaWFibGVOYW1lc09uRmlnbWEgPSBbXTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBhbnkgRmlnbWEgdmFyaWFibGVzIGFyZSBtaXNzaW5nIGluIHRoZSBDU1YgMDA1XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB2YXJpYWJsZSBvZiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZXNPbkZpZ21hLnB1c2godmFyaWFibGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLmluZGV4T2YodmFyaWFibGUubmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiT25lIG9yIG1vcmUgdmFyaWFibGVzIGluIHRoZSBGaWdtYSBjb2xsZWN0aW9uLCBhcmUgbWlzc2luZyBpbiB0aGUgQ1NWXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB2YXJpYWJsZXMgaWYgbm8gaXNzdWVzIGZvdW5kXG4gICAgICAgICAgICAgICAgVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvbklkLCBtb2Rlc0lkc09uRmlnbWEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5mdW5jdGlvbiBVcGRhdGVWYXJpYWJsZXMoaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QsIGNvbGxlY3Rpb25OYW1lLCBjb2xsZWN0aW9uSWQsIG1vZGVzSWRzT25GaWdtYSkge1xuICAgIGZpZ21hLm5vdGlmeShcIlVwZGF0aW5nIHZhcmlhYmxlIHZhbHVlcywgaG9sZCBvbi4uLlwiKTtcbiAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgLy8gYmVnaW4gdXBkYXRpbmcgdmFyaWFibGVzXG4gICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1wb3J0ZWRWYXJpYWJsZSBvZiBpbXBvcnRlZFZhcmlhYmxlc09iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRWYXJpYWJsZS5uYW1lID09PSB2YXJpYWJsZS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobW9kZUlkLCBpbXBvcnRlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYENvdWxkIG5vdCB1cGRhdGUgJHt2YXJpYWJsZS5uYW1lfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgSW1wb3J0IGFib3J0ZWQuIFBsZWFzZSBjaGVjayB0aGUgdmFyaWFibGUgdmFsdWUgaW4gdGhlIENTVi5gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYCR7ZXJyb3J9YCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5ub3RpZnkoYFN1Y2Nlc3NmdWxseSB1cGRhdGVkIHZhcmlhYmxlIHZhbHVlcyBvZiAke2NvbGxlY3Rpb25OYW1lfSBmcm9tIHRoZSBDU1ZgKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIENoZWNrU3Vic2V0KHBhcmVudEFycmF5LCBzdWJzZXRBcnJheSkge1xuICAgIHJldHVybiBzdWJzZXRBcnJheS5ldmVyeSgoZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcmVudEFycmF5LmluY2x1ZGVzKGVsKTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==