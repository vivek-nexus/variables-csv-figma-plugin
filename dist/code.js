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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

figma.showUI(__html__, { height: 450, width: 500 });
figma.ui.onmessage = (msg) => {
    if (msg.type === "get-collections") {
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
            const collections = [];
            for (const localCollection of localCollections) {
                collections.push({
                    name: localCollection.name,
                    id: localCollection.id
                });
            }
            figma.ui.postMessage({
                type: "get-collections",
                body: collections
            });
        });
    }
    if ((msg.type === "export") && msg.collection) {
        const collection = msg.collection;
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
            const modeIds = [];
            const modeNames = [];
            // Extract collection id and modeIds
            for (const localCollection of localCollections) {
                if (localCollection.id === collection.id) {
                    for (const mode of localCollection.modes) {
                        modeIds.push(mode.modeId);
                        modeNames.push(mode.name);
                    }
                }
            }
            figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
                // Prepare and export variable object
                const headers = [collection.name, ...modeNames];
                const exportVariablesObject = [];
                exportVariablesObject.push(headers);
                for (const variable of variables) {
                    if (variable.variableCollectionId === collection.id) {
                        const variableValuesByMode = [];
                        for (const modeId of modeIds) {
                            // Detect Alias
                            if (variable.valuesByMode[modeId].type === "VARIABLE_ALIAS") {
                                variableValuesByMode.push(`DO NOT EDIT (LINKED TO ANOTHER VARIABLE)`);
                            }
                            else {
                                variableValuesByMode.push(variable.valuesByMode[modeId].toString());
                            }
                        }
                        exportVariablesObject.push([variable.name, ...variableValuesByMode]);
                    }
                }
                console.log(exportVariablesObject);
                figma.ui.postMessage({
                    type: "export",
                    body: {
                        collection: collection,
                        csvData: (0,_vanillaes_csv__WEBPACK_IMPORTED_MODULE_0__.stringify)(exportVariablesObject)
                    }
                });
            });
        });
    }
    if ((msg.type === "import") && (msg.importedCSV)) {
        const parsedCSV = (0,_vanillaes_csv__WEBPACK_IMPORTED_MODULE_0__.parse)(msg.importedCSV);
        // HARD CHECK: Check if the CSV is empty
        if (parsedCSV.length === 0) {
            figma.notify("That's a blank CSV file! No pranks please -_-", { error: true, timeout: 5000 });
            return;
        }
        // HARD CHECK: Check if there is at least one variable row, apart from the header row
        if (parsedCSV.length <= 1) {
            figma.notify("No variables found in the CSV", { error: true, timeout: 5000 });
            return;
        }
        console.log(parsedCSV);
        const headers = parsedCSV[0];
        const collectionName = headers[0];
        const importedModeNames = headers.slice(1);
        const importedModeIds = [];
        const importedVariablesObject = [];
        const importedVariableNames = [];
        const variableNamesOnFigma = [];
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => __awaiter(void 0, void 0, void 0, function* () {
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
            // HARD CHECK: Check if collection exists on Figma
            if (collectionId === "") {
                figma.notify("First column header in the CSV does not match any collection on Figma", { error: true, timeout: 5000 });
                return;
            }
            // Map importedModes with modesOnFigma
            for (const importedModeName of importedModeNames) {
                let importedModeId = "UndefinedModeId";
                for (const modeOnFigma of modesOnFigma) {
                    if (modeOnFigma.name === importedModeName)
                        importedModeId = modeOnFigma.modeId;
                }
                importedModeIds.push(importedModeId);
            }
            // SOFT CHECK: Check if required modes are available
            // Prompt if some modes are missing 
            // User wants to continue: Update only modes that are present  
            // User wants to stop: Abort import
            const missingModeIdsCount = CountMissingElements(importedModeIds, modesIdsOnFigma);
            if (missingModeIdsCount > 0) {
                // Show notification and wait for action
                try {
                    yield new Promise((resolve, reject) => {
                        figma.notify(`${missingModeIdsCount} mode${missingModeIdsCount === 1 ? `` : `s`} on Figma ${missingModeIdsCount === 1 ? `is` : `are`} missing in the CSV`, {
                            error: false,
                            timeout: Infinity,
                            onDequeue: (reason) => {
                                if (reason === "action_button_click") {
                                    resolve();
                                }
                                else {
                                    reject(new Error("Notification dismissed without a confirmation to continue"));
                                }
                            },
                            button: {
                                text: "Continue import",
                                action: () => {
                                    resolve();
                                }
                            }
                        });
                    });
                }
                catch (error) {
                    // Abort import
                    console.log(error);
                    figma.notify("Import aborted");
                    return;
                }
            }
            // Continue if no issues found or if user is okay with bypassing modes soft check
            // Sanitise and populate import variables object
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
            // SOFT CHECK: Check if required variables are available
            // Prompt if some variables are missing 
            // User wants to continue: Update only variables that are present  
            // User wants to stop: Abort import
            figma.variables.getLocalVariablesAsync("STRING").then((variables) => __awaiter(void 0, void 0, void 0, function* () {
                for (const variable of variables) {
                    if (variable.variableCollectionId === collectionId) {
                        variableNamesOnFigma.push(variable.name);
                    }
                }
                const missingVariablesCount = CountMissingElements(importedVariableNames, variableNamesOnFigma);
                if (missingVariablesCount > 0) {
                    // Show notification and wait for action
                    try {
                        yield new Promise((resolve, reject) => {
                            figma.notify(`${missingVariablesCount} variable${missingVariablesCount === 1 ? `` : `s`} on Figma ${missingVariablesCount === 1 ? `is` : `are`} missing in the CSV`, {
                                error: false,
                                timeout: Infinity,
                                onDequeue: (reason) => {
                                    if (reason === "action_button_click") {
                                        resolve();
                                    }
                                    else {
                                        reject(new Error("Notification dismissed without a confirmation to continue"));
                                    }
                                },
                                button: {
                                    text: "Continue import",
                                    action: () => {
                                        resolve();
                                    }
                                }
                            });
                        });
                    }
                    catch (error) {
                        // Abort import
                        console.log(error);
                        figma.notify("Import aborted");
                        return;
                    }
                }
                // Update variables if all checks have passed
                UpdateVariables(importedVariablesObject, collectionName, collectionId, modesIdsOnFigma, importedModeIds);
            }));
        }));
    }
};
function UpdateVariables(importedVariablesObject, collectionName, collectionId, modesIdsOnFigma, importedModeIds) {
    figma.notify("Updating variable values, hold on...");
    figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        // Begin updating variables
        for (const variable of variables) {
            if (variable.variableCollectionId === collectionId) {
                for (const importedVariable of importedVariablesObject) {
                    if (importedVariable.name === variable.name) {
                        for (const modeId of modesIdsOnFigma) {
                            // Update only those modes that are present in the CSV. Needed for cases where the user has bypassed modes soft check.
                            if (importedModeIds.includes(modeId)) {
                                // Skip if the value is an alias
                                if (importedVariable.valuesByMode[modeId] !== "DO NOT EDIT (LINKED TO ANOTHER VARIABLE)") {
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
            }
        }
        figma.notify(`Successfully updated variable values of ${collectionName} from the CSV`);
    });
}
function CountMissingElements(arrayToCheck, referenceArray) {
    let missingCount = 0;
    for (const element of referenceArray) {
        if (!arrayToCheck.includes(element)) {
            missingCount++;
        }
    }
    return missingCount;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF3QyxXQUFXLDRDQUE0QztBQUM1SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxjQUFjLEtBQUssNEJBQTRCO0FBQ3hILHNIQUFzSCw0QkFBNEI7QUFDbEosd0RBQXdELE1BQU0sS0FBSyw0QkFBNEI7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGdCQUFnQjtBQUNoRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvLi9ub2RlX21vZHVsZXMvQHZhbmlsbGFlcy9jc3YvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0Ly4vc3JjL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYXJzZSB0YWtlcyBhIHN0cmluZyBvZiBDU1YgZGF0YSBhbmQgY29udmVydHMgaXQgdG8gYSAyIGRpbWVuc2lvbmFsIGFycmF5XG4gKlxuICogb3B0aW9uc1xuICogLSB0eXBlZCAtIGluZmVyIHR5cGVzIFtmYWxzZV1cbiAqXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gY3N2IHRoZSBDU1Ygc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmV2aXZlcl0gYSBjdXN0b20gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtBcnJheX0gYSAyIGRpbWVuc2lvbmFsIGFycmF5IG9mIGBbZW50cmllc11bdmFsdWVzXWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChjc3YsIG9wdGlvbnMsIHJldml2ZXIgPSB2ID0+IHYpIHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBjdHgub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgY3R4LnJldml2ZXIgPSByZXZpdmVyXG4gIGN0eC52YWx1ZSA9ICcnXG4gIGN0eC5lbnRyeSA9IFtdXG4gIGN0eC5vdXRwdXQgPSBbXVxuICBjdHguY29sID0gMVxuICBjdHgucm93ID0gMVxuXG4gIGNvbnN0IGxleGVyID0gL1wifCx8XFxyXFxufFxcbnxcXHJ8W15cIixcXHJcXG5dKy95XG4gIGNvbnN0IGlzTmV3bGluZSA9IC9eKFxcclxcbnxcXG58XFxyKSQvXG5cbiAgbGV0IG1hdGNoZXMgPSBbXVxuICBsZXQgbWF0Y2ggPSAnJ1xuICBsZXQgc3RhdGUgPSAwXG5cbiAgd2hpbGUgKChtYXRjaGVzID0gbGV4ZXIuZXhlYyhjc3YpKSAhPT0gbnVsbCkge1xuICAgIG1hdGNoID0gbWF0Y2hlc1swXVxuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSAwOiAvLyBzdGFydCBvZiBlbnRyeVxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBzdGF0ZSA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjogLy8gdW4tZGVsaW1pdGVkIGlucHV0XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc3RhdGUgPSA0XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ1NWRXJyb3I6IElsbGVnYWwgc3RhdGUgW3Jvdzoke2N0eC5yb3d9LCBjb2w6JHtjdHguY29sfV1gKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6IC8vIGRlbGltaXRlZCBpbnB1dFxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSA0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OiAvLyBlc2NhcGVkIG9yIGNsb3NpbmcgZGVsaW1pdGVyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnLCc6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBpc05ld2xpbmUudGVzdChtYXRjaCk6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGVudHJ5RW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBDU1ZFcnJvcjogSWxsZWdhbCBzdGF0ZSBbcm93OiR7Y3R4LnJvd30sIGNvbDoke2N0eC5jb2x9XWApXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBmbHVzaCB0aGUgbGFzdCB2YWx1ZVxuICBpZiAoY3R4LmVudHJ5Lmxlbmd0aCAhPT0gMCkge1xuICAgIHZhbHVlRW5kKGN0eClcbiAgICBlbnRyeUVuZChjdHgpXG4gIH1cblxuICByZXR1cm4gY3R4Lm91dHB1dFxufVxuXG4vKipcbiAqIFN0cmluZ2lmeSB0YWtlcyBhIDIgZGltZW5zaW9uYWwgYXJyYXkgb2YgYFtlbnRyaWVzXVt2YWx1ZXNdYCBhbmQgY29udmVydHMgdGhlbSB0byBDU1ZcbiAqXG4gKiBvcHRpb25zXG4gKiAtIGVvZiAtIGFkZCBhIHRyYWlsaW5nIG5ld2xpbmUgYXQgdGhlIGVuZCBvZiBmaWxlIFt0cnVlXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBpbnB1dCBhcnJheSB0byBzdHJpbmdpZnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXBsYWNlcl0gYSBjdXN0b20gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBDU1Ygc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKGFycmF5LCBvcHRpb25zID0ge30sIHJlcGxhY2VyID0gdiA9PiB2KSB7XG4gIGNvbnN0IGN0eCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgY3R4Lm9wdGlvbnMgPSBvcHRpb25zXG4gIGN0eC5vcHRpb25zLmVvZiA9IGN0eC5vcHRpb25zLmVvZiAhPT0gdW5kZWZpbmVkID8gY3R4Lm9wdGlvbnMuZW9mIDogdHJ1ZVxuICBjdHgucm93ID0gMVxuICBjdHguY29sID0gMVxuICBjdHgub3V0cHV0ID0gJydcblxuICBjb25zdCBuZWVkc0RlbGltaXRlcnMgPSAvXCJ8LHxcXHJcXG58XFxufFxcci9cblxuICBhcnJheS5mb3JFYWNoKChyb3csIHJJZHgpID0+IHtcbiAgICBsZXQgZW50cnkgPSAnJ1xuICAgIGN0eC5jb2wgPSAxXG4gICAgcm93LmZvckVhY2goKGNvbCwgY0lkeCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjb2wgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbCA9IGNvbC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpXG4gICAgICAgIGNvbCA9IG5lZWRzRGVsaW1pdGVycy50ZXN0KGNvbCkgPyBgXCIke2NvbH1cImAgOiBjb2xcbiAgICAgIH1cbiAgICAgIGVudHJ5ICs9IHJlcGxhY2VyKGNvbCwgY3R4LnJvdywgY3R4LmNvbClcbiAgICAgIGlmIChjSWR4ICE9PSByb3cubGVuZ3RoIC0gMSkge1xuICAgICAgICBlbnRyeSArPSAnLCdcbiAgICAgIH1cbiAgICAgIGN0eC5jb2wrK1xuICAgIH0pXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGN0eC5vcHRpb25zLmVvZjpcbiAgICAgIGNhc2UgIWN0eC5vcHRpb25zLmVvZiAmJiBySWR4ICE9PSBhcnJheS5sZW5ndGggLSAxOlxuICAgICAgICBjdHgub3V0cHV0ICs9IGAke2VudHJ5fVxcbmBcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGN0eC5vdXRwdXQgKz0gYCR7ZW50cnl9YFxuICAgICAgICBicmVha1xuICAgIH1cbiAgICBjdHgucm93KytcbiAgfSlcblxuICByZXR1cm4gY3R4Lm91dHB1dFxufVxuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIHZhbHVlRW5kIChjdHgpIHtcbiAgY29uc3QgdmFsdWUgPSBjdHgub3B0aW9ucy50eXBlZCA/IGluZmVyVHlwZShjdHgudmFsdWUpIDogY3R4LnZhbHVlXG4gIGN0eC5lbnRyeS5wdXNoKGN0eC5yZXZpdmVyKHZhbHVlLCBjdHgucm93LCBjdHguY29sKSlcbiAgY3R4LnZhbHVlID0gJydcbiAgY3R4LmNvbCsrXG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gZW50cnlFbmQgKGN0eCkge1xuICBjdHgub3V0cHV0LnB1c2goY3R4LmVudHJ5KVxuICBjdHguZW50cnkgPSBbXVxuICBjdHgucm93KytcbiAgY3R4LmNvbCA9IDFcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBpbmZlclR5cGUgKHZhbHVlKSB7XG4gIGNvbnN0IGlzTnVtYmVyID0gLy5cXC4vXG5cbiAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB2YWx1ZSA9PT0gJ3RydWUnOlxuICAgIGNhc2UgdmFsdWUgPT09ICdmYWxzZSc6XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJ1xuICAgIGNhc2UgaXNOdW1iZXIudGVzdCh2YWx1ZSk6XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgICBjYXNlIGlzRmluaXRlKHZhbHVlKTpcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBwYXJzZSwgc3RyaW5naWZ5IH0gZnJvbSAnQHZhbmlsbGFlcy9jc3YnO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNDUwLCB3aWR0aDogNTAwIH0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJnZXQtY29sbGVjdGlvbnNcIikge1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBsb2NhbENvbGxlY3Rpb24ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGxvY2FsQ29sbGVjdGlvbi5pZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZ2V0LWNvbGxlY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgYm9keTogY29sbGVjdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKChtc2cudHlwZSA9PT0gXCJleHBvcnRcIikgJiYgbXNnLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IG1zZy5jb2xsZWN0aW9uO1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlSWRzID0gW107XG4gICAgICAgICAgICBjb25zdCBtb2RlTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgY29sbGVjdGlvbiBpZCBhbmQgbW9kZUlkc1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbENvbGxlY3Rpb24uaWQgPT09IGNvbGxlY3Rpb24uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIGxvY2FsQ29sbGVjdGlvbi5tb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZUlkcy5wdXNoKG1vZGUubW9kZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVOYW1lcy5wdXNoKG1vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBQcmVwYXJlIGFuZCBleHBvcnQgdmFyaWFibGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IFtjb2xsZWN0aW9uLm5hbWUsIC4uLm1vZGVOYW1lc107XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb3J0VmFyaWFibGVzT2JqZWN0ID0gW107XG4gICAgICAgICAgICAgICAgZXhwb3J0VmFyaWFibGVzT2JqZWN0LnB1c2goaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB2YXJpYWJsZSBvZiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJpYWJsZVZhbHVlc0J5TW9kZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlSWQgb2YgbW9kZUlkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERldGVjdCBBbGlhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXS50eXBlID09PSBcIlZBUklBQkxFX0FMSUFTXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVWYWx1ZXNCeU1vZGUucHVzaChgRE8gTk9UIEVESVQgKExJTktFRCBUTyBBTk9USEVSIFZBUklBQkxFKWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVWYWx1ZXNCeU1vZGUucHVzaCh2YXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRWYXJpYWJsZXNPYmplY3QucHVzaChbdmFyaWFibGUubmFtZSwgLi4udmFyaWFibGVWYWx1ZXNCeU1vZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhleHBvcnRWYXJpYWJsZXNPYmplY3QpO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJleHBvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzdkRhdGE6IHN0cmluZ2lmeShleHBvcnRWYXJpYWJsZXNPYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKChtc2cudHlwZSA9PT0gXCJpbXBvcnRcIikgJiYgKG1zZy5pbXBvcnRlZENTVikpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkQ1NWID0gcGFyc2UobXNnLmltcG9ydGVkQ1NWKTtcbiAgICAgICAgLy8gSEFSRCBDSEVDSzogQ2hlY2sgaWYgdGhlIENTViBpcyBlbXB0eVxuICAgICAgICBpZiAocGFyc2VkQ1NWLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiVGhhdCdzIGEgYmxhbmsgQ1NWIGZpbGUhIE5vIHByYW5rcyBwbGVhc2UgLV8tXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSEFSRCBDSEVDSzogQ2hlY2sgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHZhcmlhYmxlIHJvdywgYXBhcnQgZnJvbSB0aGUgaGVhZGVyIHJvd1xuICAgICAgICBpZiAocGFyc2VkQ1NWLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJObyB2YXJpYWJsZXMgZm91bmQgaW4gdGhlIENTVlwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZENTVik7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBwYXJzZWRDU1ZbMF07XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gaGVhZGVyc1swXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRNb2RlTmFtZXMgPSBoZWFkZXJzLnNsaWNlKDEpO1xuICAgICAgICBjb25zdCBpbXBvcnRlZE1vZGVJZHMgPSBbXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QgPSBbXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRWYXJpYWJsZU5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlTmFtZXNPbkZpZ21hID0gW107XG4gICAgICAgIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpLnRoZW4oKGxvY2FsQ29sbGVjdGlvbnMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgbW9kZXNPbkZpZ21hID0gW107XG4gICAgICAgICAgICBjb25zdCBtb2Rlc0lkc09uRmlnbWEgPSBbXTtcbiAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSWQgPSBcIlwiO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbENvbGxlY3Rpb24ubmFtZSA9PT0gY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbklkID0gbG9jYWxDb2xsZWN0aW9uLmlkO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGUgb2YgbG9jYWxDb2xsZWN0aW9uLm1vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2Rlc09uRmlnbWEucHVzaChtb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVzSWRzT25GaWdtYS5wdXNoKG1vZGUubW9kZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhBUkQgQ0hFQ0s6IENoZWNrIGlmIGNvbGxlY3Rpb24gZXhpc3RzIG9uIEZpZ21hXG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbklkID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRmlyc3QgY29sdW1uIGhlYWRlciBpbiB0aGUgQ1NWIGRvZXMgbm90IG1hdGNoIGFueSBjb2xsZWN0aW9uIG9uIEZpZ21hXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFwIGltcG9ydGVkTW9kZXMgd2l0aCBtb2Rlc09uRmlnbWFcbiAgICAgICAgICAgIGZvciAoY29uc3QgaW1wb3J0ZWRNb2RlTmFtZSBvZiBpbXBvcnRlZE1vZGVOYW1lcykge1xuICAgICAgICAgICAgICAgIGxldCBpbXBvcnRlZE1vZGVJZCA9IFwiVW5kZWZpbmVkTW9kZUlkXCI7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlT25GaWdtYSBvZiBtb2Rlc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVPbkZpZ21hLm5hbWUgPT09IGltcG9ydGVkTW9kZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRlZE1vZGVJZCA9IG1vZGVPbkZpZ21hLm1vZGVJZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW1wb3J0ZWRNb2RlSWRzLnB1c2goaW1wb3J0ZWRNb2RlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU09GVCBDSEVDSzogQ2hlY2sgaWYgcmVxdWlyZWQgbW9kZXMgYXJlIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gUHJvbXB0IGlmIHNvbWUgbW9kZXMgYXJlIG1pc3NpbmcgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIGNvbnRpbnVlOiBVcGRhdGUgb25seSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50ICBcbiAgICAgICAgICAgIC8vIFVzZXIgd2FudHMgdG8gc3RvcDogQWJvcnQgaW1wb3J0XG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nTW9kZUlkc0NvdW50ID0gQ291bnRNaXNzaW5nRWxlbWVudHMoaW1wb3J0ZWRNb2RlSWRzLCBtb2Rlc0lkc09uRmlnbWEpO1xuICAgICAgICAgICAgaWYgKG1pc3NpbmdNb2RlSWRzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hvdyBub3RpZmljYXRpb24gYW5kIHdhaXQgZm9yIGFjdGlvblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgJHttaXNzaW5nTW9kZUlkc0NvdW50fSBtb2RlJHttaXNzaW5nTW9kZUlkc0NvdW50ID09PSAxID8gYGAgOiBgc2B9IG9uIEZpZ21hICR7bWlzc2luZ01vZGVJZHNDb3VudCA9PT0gMSA/IGBpc2AgOiBgYXJlYH0gbWlzc2luZyBpbiB0aGUgQ1NWYCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlcXVldWU6IChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJhY3Rpb25fYnV0dG9uX2NsaWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJOb3RpZmljYXRpb24gZGlzbWlzc2VkIHdpdGhvdXQgYSBjb25maXJtYXRpb24gdG8gY29udGludWVcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJDb250aW51ZSBpbXBvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBBYm9ydCBpbXBvcnRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJJbXBvcnQgYWJvcnRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENvbnRpbnVlIGlmIG5vIGlzc3VlcyBmb3VuZCBvciBpZiB1c2VyIGlzIG9rYXkgd2l0aCBieXBhc3NpbmcgbW9kZXMgc29mdCBjaGVja1xuICAgICAgICAgICAgLy8gU2FuaXRpc2UgYW5kIHBvcHVsYXRlIGltcG9ydCB2YXJpYWJsZXMgb2JqZWN0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBhcnNlZENTVi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGltcG9ydGVkVmFyaWFibGVOYW1lcy5wdXNoKHBhcnNlZENTVltpXVswXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzQnlNb2RlID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbXBvcnRlZE1vZGVJZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzQnlNb2RlW2ltcG9ydGVkTW9kZUlkc1tqXV0gPSBwYXJzZWRDU1ZbaV1baiArIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbXBvcnRlZFZhcmlhYmxlc09iamVjdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcGFyc2VkQ1NWW2ldWzBdLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNCeU1vZGU6IHZhbHVlc0J5TW9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QpO1xuICAgICAgICAgICAgLy8gU09GVCBDSEVDSzogQ2hlY2sgaWYgcmVxdWlyZWQgdmFyaWFibGVzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgICAgIC8vIFByb21wdCBpZiBzb21lIHZhcmlhYmxlcyBhcmUgbWlzc2luZyBcbiAgICAgICAgICAgIC8vIFVzZXIgd2FudHMgdG8gY29udGludWU6IFVwZGF0ZSBvbmx5IHZhcmlhYmxlcyB0aGF0IGFyZSBwcmVzZW50ICBcbiAgICAgICAgICAgIC8vIFVzZXIgd2FudHMgdG8gc3RvcDogQWJvcnQgaW1wb3J0XG4gICAgICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZU5hbWVzT25GaWdtYS5wdXNoKHZhcmlhYmxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdWYXJpYWJsZXNDb3VudCA9IENvdW50TWlzc2luZ0VsZW1lbnRzKGltcG9ydGVkVmFyaWFibGVOYW1lcywgdmFyaWFibGVOYW1lc09uRmlnbWEpO1xuICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nVmFyaWFibGVzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgbm90aWZpY2F0aW9uIGFuZCB3YWl0IGZvciBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYCR7bWlzc2luZ1ZhcmlhYmxlc0NvdW50fSB2YXJpYWJsZSR7bWlzc2luZ1ZhcmlhYmxlc0NvdW50ID09PSAxID8gYGAgOiBgc2B9IG9uIEZpZ21hICR7bWlzc2luZ1ZhcmlhYmxlc0NvdW50ID09PSAxID8gYGlzYCA6IGBhcmVgfSBtaXNzaW5nIGluIHRoZSBDU1ZgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVxdWV1ZTogKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJhY3Rpb25fYnV0dG9uX2NsaWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTm90aWZpY2F0aW9uIGRpc21pc3NlZCB3aXRob3V0IGEgY29uZmlybWF0aW9uIHRvIGNvbnRpbnVlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkNvbnRpbnVlIGltcG9ydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFib3J0IGltcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiSW1wb3J0IGFib3J0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHZhcmlhYmxlcyBpZiBhbGwgY2hlY2tzIGhhdmUgcGFzc2VkXG4gICAgICAgICAgICAgICAgVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvbklkLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcyk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59O1xuZnVuY3Rpb24gVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvbklkLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcykge1xuICAgIGZpZ21hLm5vdGlmeShcIlVwZGF0aW5nIHZhcmlhYmxlIHZhbHVlcywgaG9sZCBvbi4uLlwiKTtcbiAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgLy8gQmVnaW4gdXBkYXRpbmcgdmFyaWFibGVzXG4gICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1wb3J0ZWRWYXJpYWJsZSBvZiBpbXBvcnRlZFZhcmlhYmxlc09iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRWYXJpYWJsZS5uYW1lID09PSB2YXJpYWJsZS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSB0aG9zZSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBDU1YuIE5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaGFzIGJ5cGFzc2VkIG1vZGVzIHNvZnQgY2hlY2suXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkTW9kZUlkcy5pbmNsdWRlcyhtb2RlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNraXAgaWYgdGhlIHZhbHVlIGlzIGFuIGFsaWFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdICE9PSBcIkRPIE5PVCBFRElUIChMSU5LRUQgVE8gQU5PVEhFUiBWQVJJQUJMRSlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobW9kZUlkLCBpbXBvcnRlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgQ291bGQgbm90IHVwZGF0ZSAke3ZhcmlhYmxlLm5hbWV9YCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYEltcG9ydCBhYm9ydGVkLiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIHZhbHVlIGluIHRoZSBDU1YuYCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYCR7ZXJyb3J9YCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEubm90aWZ5KGBTdWNjZXNzZnVsbHkgdXBkYXRlZCB2YXJpYWJsZSB2YWx1ZXMgb2YgJHtjb2xsZWN0aW9uTmFtZX0gZnJvbSB0aGUgQ1NWYCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBDb3VudE1pc3NpbmdFbGVtZW50cyhhcnJheVRvQ2hlY2ssIHJlZmVyZW5jZUFycmF5KSB7XG4gICAgbGV0IG1pc3NpbmdDb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHJlZmVyZW5jZUFycmF5KSB7XG4gICAgICAgIGlmICghYXJyYXlUb0NoZWNrLmluY2x1ZGVzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBtaXNzaW5nQ291bnQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWlzc2luZ0NvdW50O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9