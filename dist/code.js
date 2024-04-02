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
                for (const modeOnFigma of modesOnFigma) {
                    if (modeOnFigma.name === importedModeName)
                        importedModeIds.push(modeOnFigma.modeId);
                    else
                        importedModeIds.push("UndefinedModeId");
                }
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
                                figma.notify(`Could not update ${variable.name}`, { error: true, timeout: 5000 });
                                figma.notify(`Import aborted. Please check the variable value in the CSV.`, { error: true, timeout: 5000 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTRFLDRCQUE0QjtBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBd0csNEJBQTRCO0FBQ3BJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBLGdDQUFnQyw0QkFBNEI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSw0QkFBNEI7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RkFBNkYsNEJBQTRCO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9IQUFvSCw0QkFBNEI7QUFDaEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsY0FBYyxLQUFLLDRCQUE0QjtBQUNoSCw4R0FBOEcsNEJBQTRCO0FBQzFJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGdCQUFnQjtBQUNoRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvLi9ub2RlX21vZHVsZXMvQHZhbmlsbGFlcy9jc3YvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0Ly4vc3JjL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYXJzZSB0YWtlcyBhIHN0cmluZyBvZiBDU1YgZGF0YSBhbmQgY29udmVydHMgaXQgdG8gYSAyIGRpbWVuc2lvbmFsIGFycmF5XG4gKlxuICogb3B0aW9uc1xuICogLSB0eXBlZCAtIGluZmVyIHR5cGVzIFtmYWxzZV1cbiAqXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gY3N2IHRoZSBDU1Ygc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmV2aXZlcl0gYSBjdXN0b20gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtBcnJheX0gYSAyIGRpbWVuc2lvbmFsIGFycmF5IG9mIGBbZW50cmllc11bdmFsdWVzXWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChjc3YsIG9wdGlvbnMsIHJldml2ZXIgPSB2ID0+IHYpIHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBjdHgub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgY3R4LnJldml2ZXIgPSByZXZpdmVyXG4gIGN0eC52YWx1ZSA9ICcnXG4gIGN0eC5lbnRyeSA9IFtdXG4gIGN0eC5vdXRwdXQgPSBbXVxuICBjdHguY29sID0gMVxuICBjdHgucm93ID0gMVxuXG4gIGNvbnN0IGxleGVyID0gL1wifCx8XFxyXFxufFxcbnxcXHJ8W15cIixcXHJcXG5dKy95XG4gIGNvbnN0IGlzTmV3bGluZSA9IC9eKFxcclxcbnxcXG58XFxyKSQvXG5cbiAgbGV0IG1hdGNoZXMgPSBbXVxuICBsZXQgbWF0Y2ggPSAnJ1xuICBsZXQgc3RhdGUgPSAwXG5cbiAgd2hpbGUgKChtYXRjaGVzID0gbGV4ZXIuZXhlYyhjc3YpKSAhPT0gbnVsbCkge1xuICAgIG1hdGNoID0gbWF0Y2hlc1swXVxuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSAwOiAvLyBzdGFydCBvZiBlbnRyeVxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBzdGF0ZSA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjogLy8gdW4tZGVsaW1pdGVkIGlucHV0XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc3RhdGUgPSA0XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ1NWRXJyb3I6IElsbGVnYWwgc3RhdGUgW3Jvdzoke2N0eC5yb3d9LCBjb2w6JHtjdHguY29sfV1gKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6IC8vIGRlbGltaXRlZCBpbnB1dFxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSA0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OiAvLyBlc2NhcGVkIG9yIGNsb3NpbmcgZGVsaW1pdGVyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnLCc6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBpc05ld2xpbmUudGVzdChtYXRjaCk6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGVudHJ5RW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBDU1ZFcnJvcjogSWxsZWdhbCBzdGF0ZSBbcm93OiR7Y3R4LnJvd30sIGNvbDoke2N0eC5jb2x9XWApXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBmbHVzaCB0aGUgbGFzdCB2YWx1ZVxuICBpZiAoY3R4LmVudHJ5Lmxlbmd0aCAhPT0gMCkge1xuICAgIHZhbHVlRW5kKGN0eClcbiAgICBlbnRyeUVuZChjdHgpXG4gIH1cblxuICByZXR1cm4gY3R4Lm91dHB1dFxufVxuXG4vKipcbiAqIFN0cmluZ2lmeSB0YWtlcyBhIDIgZGltZW5zaW9uYWwgYXJyYXkgb2YgYFtlbnRyaWVzXVt2YWx1ZXNdYCBhbmQgY29udmVydHMgdGhlbSB0byBDU1ZcbiAqXG4gKiBvcHRpb25zXG4gKiAtIGVvZiAtIGFkZCBhIHRyYWlsaW5nIG5ld2xpbmUgYXQgdGhlIGVuZCBvZiBmaWxlIFt0cnVlXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBpbnB1dCBhcnJheSB0byBzdHJpbmdpZnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXBsYWNlcl0gYSBjdXN0b20gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBDU1Ygc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKGFycmF5LCBvcHRpb25zID0ge30sIHJlcGxhY2VyID0gdiA9PiB2KSB7XG4gIGNvbnN0IGN0eCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgY3R4Lm9wdGlvbnMgPSBvcHRpb25zXG4gIGN0eC5vcHRpb25zLmVvZiA9IGN0eC5vcHRpb25zLmVvZiAhPT0gdW5kZWZpbmVkID8gY3R4Lm9wdGlvbnMuZW9mIDogdHJ1ZVxuICBjdHgucm93ID0gMVxuICBjdHguY29sID0gMVxuICBjdHgub3V0cHV0ID0gJydcblxuICBjb25zdCBuZWVkc0RlbGltaXRlcnMgPSAvXCJ8LHxcXHJcXG58XFxufFxcci9cblxuICBhcnJheS5mb3JFYWNoKChyb3csIHJJZHgpID0+IHtcbiAgICBsZXQgZW50cnkgPSAnJ1xuICAgIGN0eC5jb2wgPSAxXG4gICAgcm93LmZvckVhY2goKGNvbCwgY0lkeCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjb2wgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbCA9IGNvbC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpXG4gICAgICAgIGNvbCA9IG5lZWRzRGVsaW1pdGVycy50ZXN0KGNvbCkgPyBgXCIke2NvbH1cImAgOiBjb2xcbiAgICAgIH1cbiAgICAgIGVudHJ5ICs9IHJlcGxhY2VyKGNvbCwgY3R4LnJvdywgY3R4LmNvbClcbiAgICAgIGlmIChjSWR4ICE9PSByb3cubGVuZ3RoIC0gMSkge1xuICAgICAgICBlbnRyeSArPSAnLCdcbiAgICAgIH1cbiAgICAgIGN0eC5jb2wrK1xuICAgIH0pXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGN0eC5vcHRpb25zLmVvZjpcbiAgICAgIGNhc2UgIWN0eC5vcHRpb25zLmVvZiAmJiBySWR4ICE9PSBhcnJheS5sZW5ndGggLSAxOlxuICAgICAgICBjdHgub3V0cHV0ICs9IGAke2VudHJ5fVxcbmBcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGN0eC5vdXRwdXQgKz0gYCR7ZW50cnl9YFxuICAgICAgICBicmVha1xuICAgIH1cbiAgICBjdHgucm93KytcbiAgfSlcblxuICByZXR1cm4gY3R4Lm91dHB1dFxufVxuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIHZhbHVlRW5kIChjdHgpIHtcbiAgY29uc3QgdmFsdWUgPSBjdHgub3B0aW9ucy50eXBlZCA/IGluZmVyVHlwZShjdHgudmFsdWUpIDogY3R4LnZhbHVlXG4gIGN0eC5lbnRyeS5wdXNoKGN0eC5yZXZpdmVyKHZhbHVlLCBjdHgucm93LCBjdHguY29sKSlcbiAgY3R4LnZhbHVlID0gJydcbiAgY3R4LmNvbCsrXG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gZW50cnlFbmQgKGN0eCkge1xuICBjdHgub3V0cHV0LnB1c2goY3R4LmVudHJ5KVxuICBjdHguZW50cnkgPSBbXVxuICBjdHgucm93KytcbiAgY3R4LmNvbCA9IDFcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBpbmZlclR5cGUgKHZhbHVlKSB7XG4gIGNvbnN0IGlzTnVtYmVyID0gLy5cXC4vXG5cbiAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB2YWx1ZSA9PT0gJ3RydWUnOlxuICAgIGNhc2UgdmFsdWUgPT09ICdmYWxzZSc6XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJ1xuICAgIGNhc2UgaXNOdW1iZXIudGVzdCh2YWx1ZSk6XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgICBjYXNlIGlzRmluaXRlKHZhbHVlKTpcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcGFyc2UsIHN0cmluZ2lmeSB9IGZyb20gJ0B2YW5pbGxhZXMvY3N2JztcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDYwMCwgd2lkdGg6IDYwMCB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZ2V0LWNvbGxlY3Rpb25zXCIpIHtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCkudGhlbigobG9jYWxDb2xsZWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sbGVjdGlvbiBvZiBsb2NhbENvbGxlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbnMucHVzaChjb2xsZWN0aW9uLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZ2V0LWNvbGxlY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgYm9keTogY29sbGVjdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKChtc2cudHlwZSA9PT0gXCJleHBvcnRcIikgJiYgbXNnLmNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gbXNnLmNvbGxlY3Rpb25OYW1lO1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbklkID0gXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVJZHMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVOYW1lcyA9IFtdO1xuICAgICAgICAgICAgLy8gZXh0cmFjdCBjb2xsZWN0aW9uIGlkIGFuZCBtb2RlSWRzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLm5hbWUgPT09IGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb24uaWQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZSBvZiBjb2xsZWN0aW9uLm1vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlSWRzLnB1c2gobW9kZS5tb2RlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZU5hbWVzLnB1c2gobW9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlc0FzeW5jKFwiU1RSSU5HXCIpLnRoZW4oKHZhcmlhYmxlcykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgYW5kIGV4cG9ydCB2YXJpYWJsZSBvYmplY3RcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gW2NvbGxlY3Rpb25OYW1lLCAuLi5tb2RlTmFtZXNdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9ydFZhcmlhYmxlc09iamVjdCA9IFtdO1xuICAgICAgICAgICAgICAgIGV4cG9ydFZhcmlhYmxlc09iamVjdC5wdXNoKGhlYWRlcnMpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJpYWJsZVZhbHVlc0J5TW9kZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlSWQgb2YgbW9kZUlkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlVmFsdWVzQnlNb2RlLnB1c2godmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRWYXJpYWJsZXNPYmplY3QucHVzaChbdmFyaWFibGUubmFtZSwgLi4udmFyaWFibGVWYWx1ZXNCeU1vZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhleHBvcnRWYXJpYWJsZXNPYmplY3QpO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJleHBvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb25OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3N2RGF0YTogc3RyaW5naWZ5KGV4cG9ydFZhcmlhYmxlc09iamVjdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwiaW1wb3J0XCIpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkQ1NWID0gcGFyc2UobXNnLmltcG9ydGVkQ1NWKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIENTViBpcyBlbXB0eSAwMDFcbiAgICAgICAgaWYgKHBhcnNlZENTVi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIlRoYXQncyBhIGJsYW5rIENTViBmaWxlISBObyBwcmFua3MgcGxlYXNlIC1fLVwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZENTVik7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBwYXJzZWRDU1ZbMF07XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gaGVhZGVyc1swXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRNb2RlTmFtZXMgPSBoZWFkZXJzLnNsaWNlKDEpO1xuICAgICAgICBjb25zdCBpbXBvcnRlZE1vZGVJZHMgPSBbXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QgPSBbXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRWYXJpYWJsZU5hbWVzID0gW107XG4gICAgICAgIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpLnRoZW4oKGxvY2FsQ29sbGVjdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVzT25GaWdtYSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9kZXNJZHNPbkZpZ21hID0gW107XG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbklkID0gXCJcIjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbG9jYWxDb2xsZWN0aW9uIG9mIGxvY2FsQ29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxDb2xsZWN0aW9uLm5hbWUgPT09IGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25JZCA9IGxvY2FsQ29sbGVjdGlvbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIGxvY2FsQ29sbGVjdGlvbi5tb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZXNPbkZpZ21hLnB1c2gobW9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2Rlc0lkc09uRmlnbWEucHVzaChtb2RlLm1vZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBjb2xsZWN0aW9uIGV4aXN0cyBvbiBGaWdtYSAwMDJcbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uSWQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJGaXJzdCBjb2x1bW4gaGVhZGVyIGluIHRoZSBDU1YgZG9lcyBub3QgbWF0Y2ggYW55IGNvbGxlY3Rpb24gb24gRmlnbWFcIiwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBtYXAgaW1wb3J0ZWRNb2RlcyB3aXRoIG1vZGVzT25GaWdtYVxuICAgICAgICAgICAgZm9yIChjb25zdCBpbXBvcnRlZE1vZGVOYW1lIG9mIGltcG9ydGVkTW9kZU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlT25GaWdtYSBvZiBtb2Rlc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVPbkZpZ21hLm5hbWUgPT09IGltcG9ydGVkTW9kZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRlZE1vZGVJZHMucHVzaChtb2RlT25GaWdtYS5tb2RlSWQpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRlZE1vZGVJZHMucHVzaChcIlVuZGVmaW5lZE1vZGVJZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzYW5pdGlzZSBhbmQgcG9wdWxhdGUgaW1wb3J0IHZhcmlhYmxlc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXJzZWRDU1YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbXBvcnRlZFZhcmlhYmxlTmFtZXMucHVzaChwYXJzZWRDU1ZbaV1bMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlc0J5TW9kZSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW1wb3J0ZWRNb2RlSWRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc0J5TW9kZVtpbXBvcnRlZE1vZGVJZHNbal1dID0gcGFyc2VkQ1NWW2ldW2ogKyAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnNlZENTVltpXVswXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzQnlNb2RlOiB2YWx1ZXNCeU1vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0KTtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgdmFyaWFibGVzIDAwM1xuICAgICAgICAgICAgaWYgKGltcG9ydGVkVmFyaWFibGVOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJObyB2YXJpYWJsZXMgZm91bmQgaW4gdGhlIENTVlwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHJlcXVpcmVkIG1vZGVzIGFyZSBhdmFpbGFibGUgMDA0IGFuZCAwMDRfbW9yZV9jb2x1bW5zIChzaG91bGQgcGFzcylcbiAgICAgICAgICAgIGlmICghQ2hlY2tTdWJzZXQoaW1wb3J0ZWRNb2RlSWRzLCBtb2Rlc0lkc09uRmlnbWEpKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiT25lIG9yIG1vcmUgY29sdW1ucyBpbiB0aGUgQ1NWIGRvIG5vdCBtYXRjaCBvciBhcmUgbWlzc2luZ1wiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlc0FzeW5jKFwiU1RSSU5HXCIpLnRoZW4oKHZhcmlhYmxlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlTmFtZXNPbkZpZ21hID0gW107XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgYW55IEZpZ21hIHZhcmlhYmxlcyBhcmUgbWlzc2luZyBpbiB0aGUgQ1NWIDAwNVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZU5hbWVzT25GaWdtYS5wdXNoKHZhcmlhYmxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkVmFyaWFibGVOYW1lcy5pbmRleE9mKHZhcmlhYmxlLm5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIk9uZSBvciBtb3JlIHZhcmlhYmxlcyBpbiB0aGUgRmlnbWEgY29sbGVjdGlvbiwgYXJlIG1pc3NpbmcgaW4gdGhlIENTVlwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdmFyaWFibGVzIGlmIG5vIGlzc3VlcyBmb3VuZFxuICAgICAgICAgICAgICAgIFVwZGF0ZVZhcmlhYmxlcyhpbXBvcnRlZFZhcmlhYmxlc09iamVjdCwgY29sbGVjdGlvbk5hbWUsIGNvbGxlY3Rpb25JZCwgbW9kZXNJZHNPbkZpZ21hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuZnVuY3Rpb24gVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvbklkLCBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICBmaWdtYS5ub3RpZnkoXCJVcGRhdGluZyB2YXJpYWJsZSB2YWx1ZXMsIGhvbGQgb24uLi5cIik7XG4gICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoXCJTVFJJTkdcIikudGhlbigodmFyaWFibGVzKSA9PiB7XG4gICAgICAgIC8vIGJlZ2luIHVwZGF0aW5nIHZhcmlhYmxlc1xuICAgICAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgaWYgKHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltcG9ydGVkVmFyaWFibGUgb2YgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkVmFyaWFibGUubmFtZSA9PT0gdmFyaWFibGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlSWQgb2YgbW9kZXNJZHNPbkZpZ21hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGUuc2V0VmFsdWVGb3JNb2RlKG1vZGVJZCwgaW1wb3J0ZWRWYXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYENvdWxkIG5vdCB1cGRhdGUgJHt2YXJpYWJsZS5uYW1lfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgSW1wb3J0IGFib3J0ZWQuIFBsZWFzZSBjaGVjayB0aGUgdmFyaWFibGUgdmFsdWUgaW4gdGhlIENTVi5gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpZ21hLm5vdGlmeShgU3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgdmFyaWFibGUgdmFsdWVzIG9mICR7Y29sbGVjdGlvbk5hbWV9IGZyb20gdGhlIENTVmApO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gQ2hlY2tTdWJzZXQocGFyZW50QXJyYXksIHN1YnNldEFycmF5KSB7XG4gICAgcmV0dXJuIHN1YnNldEFycmF5LmV2ZXJ5KChlbCkgPT4ge1xuICAgICAgICByZXR1cm4gcGFyZW50QXJyYXkuaW5jbHVkZXMoZWwpO1xuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9