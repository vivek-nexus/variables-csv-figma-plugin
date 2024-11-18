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
            // Extract collection id and modeIds
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
                // Prepare and export variable object
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
                        figma.notify(`${missingModeIdsCount} modes on Figma are missing in the CSV`, {
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
            // User wants to continue: Update only variables that are present (need to modify update function)  
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
                            figma.notify(`${missingVariablesCount} variables on Figma are missing in the CSV`, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsY0FBYyxLQUFLLDRCQUE0QjtBQUNwSCxrSEFBa0gsNEJBQTRCO0FBQzlJLG9EQUFvRCxNQUFNLEtBQUssNEJBQTRCO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsZ0JBQWdCO0FBQ2hGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC8uL25vZGVfbW9kdWxlcy9AdmFuaWxsYWVzL2Nzdi9pbmRleC5qcyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhcnNlIHRha2VzIGEgc3RyaW5nIG9mIENTViBkYXRhIGFuZCBjb252ZXJ0cyBpdCB0byBhIDIgZGltZW5zaW9uYWwgYXJyYXlcbiAqXG4gKiBvcHRpb25zXG4gKiAtIHR5cGVkIC0gaW5mZXIgdHlwZXMgW2ZhbHNlXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3YgdGhlIENTViBzdHJpbmcgdG8gcGFyc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXZpdmVyXSBhIGN1c3RvbSBmdW5jdGlvbiB0byBtb2RpZnkgdGhlIHZhbHVlc1xuICogQHJldHVybnMge0FycmF5fSBhIDIgZGltZW5zaW9uYWwgYXJyYXkgb2YgYFtlbnRyaWVzXVt2YWx1ZXNdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UgKGNzdiwgb3B0aW9ucywgcmV2aXZlciA9IHYgPT4gdikge1xuICBjb25zdCBjdHggPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIGN0eC5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBjdHgucmV2aXZlciA9IHJldml2ZXJcbiAgY3R4LnZhbHVlID0gJydcbiAgY3R4LmVudHJ5ID0gW11cbiAgY3R4Lm91dHB1dCA9IFtdXG4gIGN0eC5jb2wgPSAxXG4gIGN0eC5yb3cgPSAxXG5cbiAgY29uc3QgbGV4ZXIgPSAvXCJ8LHxcXHJcXG58XFxufFxccnxbXlwiLFxcclxcbl0rL3lcbiAgY29uc3QgaXNOZXdsaW5lID0gL14oXFxyXFxufFxcbnxcXHIpJC9cblxuICBsZXQgbWF0Y2hlcyA9IFtdXG4gIGxldCBtYXRjaCA9ICcnXG4gIGxldCBzdGF0ZSA9IDBcblxuICB3aGlsZSAoKG1hdGNoZXMgPSBsZXhlci5leGVjKGNzdikpICE9PSBudWxsKSB7XG4gICAgbWF0Y2ggPSBtYXRjaGVzWzBdXG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICBjYXNlIDA6IC8vIHN0YXJ0IG9mIGVudHJ5XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJywnOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgaXNOZXdsaW5lLnRlc3QobWF0Y2gpOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBlbnRyeUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjdHgudmFsdWUgKz0gbWF0Y2hcbiAgICAgICAgICAgIHN0YXRlID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOiAvLyB1bi1kZWxpbWl0ZWQgaW5wdXRcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJywnOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgaXNOZXdsaW5lLnRlc3QobWF0Y2gpOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBlbnRyeUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdGF0ZSA9IDRcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBDU1ZFcnJvcjogSWxsZWdhbCBzdGF0ZSBbcm93OiR7Y3R4LnJvd30sIGNvbDoke2N0eC5jb2x9XWApXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzogLy8gZGVsaW1pdGVkIGlucHV0XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDRcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHN0YXRlID0gM1xuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDQ6IC8vIGVzY2FwZWQgb3IgY2xvc2luZyBkZWxpbWl0ZXJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJ1wiJzpcbiAgICAgICAgICAgIHN0YXRlID0gM1xuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENTVkVycm9yOiBJbGxlZ2FsIHN0YXRlIFtyb3c6JHtjdHgucm93fSwgY29sOiR7Y3R4LmNvbH1dYClcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIGZsdXNoIHRoZSBsYXN0IHZhbHVlXG4gIGlmIChjdHguZW50cnkubGVuZ3RoICE9PSAwKSB7XG4gICAgdmFsdWVFbmQoY3R4KVxuICAgIGVudHJ5RW5kKGN0eClcbiAgfVxuXG4gIHJldHVybiBjdHgub3V0cHV0XG59XG5cbi8qKlxuICogU3RyaW5naWZ5IHRha2VzIGEgMiBkaW1lbnNpb25hbCBhcnJheSBvZiBgW2VudHJpZXNdW3ZhbHVlc11gIGFuZCBjb252ZXJ0cyB0aGVtIHRvIENTVlxuICpcbiAqIG9wdGlvbnNcbiAqIC0gZW9mIC0gYWRkIGEgdHJhaWxpbmcgbmV3bGluZSBhdCB0aGUgZW5kIG9mIGZpbGUgW3RydWVdXG4gKlxuICogQHN0YXRpY1xuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgdGhlIGlucHV0IGFycmF5IHRvIHN0cmluZ2lmeVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlcGxhY2VyXSBhIGN1c3RvbSBmdW5jdGlvbiB0byBtb2RpZnkgdGhlIHZhbHVlc1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIENTViBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeSAoYXJyYXksIG9wdGlvbnMgPSB7fSwgcmVwbGFjZXIgPSB2ID0+IHYpIHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBjdHgub3B0aW9ucyA9IG9wdGlvbnNcbiAgY3R4Lm9wdGlvbnMuZW9mID0gY3R4Lm9wdGlvbnMuZW9mICE9PSB1bmRlZmluZWQgPyBjdHgub3B0aW9ucy5lb2YgOiB0cnVlXG4gIGN0eC5yb3cgPSAxXG4gIGN0eC5jb2wgPSAxXG4gIGN0eC5vdXRwdXQgPSAnJ1xuXG4gIGNvbnN0IG5lZWRzRGVsaW1pdGVycyA9IC9cInwsfFxcclxcbnxcXG58XFxyL1xuXG4gIGFycmF5LmZvckVhY2goKHJvdywgcklkeCkgPT4ge1xuICAgIGxldCBlbnRyeSA9ICcnXG4gICAgY3R4LmNvbCA9IDFcbiAgICByb3cuZm9yRWFjaCgoY29sLCBjSWR4KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNvbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29sID0gY29sLnJlcGxhY2UoL1wiL2csICdcIlwiJylcbiAgICAgICAgY29sID0gbmVlZHNEZWxpbWl0ZXJzLnRlc3QoY29sKSA/IGBcIiR7Y29sfVwiYCA6IGNvbFxuICAgICAgfVxuICAgICAgZW50cnkgKz0gcmVwbGFjZXIoY29sLCBjdHgucm93LCBjdHguY29sKVxuICAgICAgaWYgKGNJZHggIT09IHJvdy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGVudHJ5ICs9ICcsJ1xuICAgICAgfVxuICAgICAgY3R4LmNvbCsrXG4gICAgfSlcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgY3R4Lm9wdGlvbnMuZW9mOlxuICAgICAgY2FzZSAhY3R4Lm9wdGlvbnMuZW9mICYmIHJJZHggIT09IGFycmF5Lmxlbmd0aCAtIDE6XG4gICAgICAgIGN0eC5vdXRwdXQgKz0gYCR7ZW50cnl9XFxuYFxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY3R4Lm91dHB1dCArPSBgJHtlbnRyeX1gXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIGN0eC5yb3crK1xuICB9KVxuXG4gIHJldHVybiBjdHgub3V0cHV0XG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gdmFsdWVFbmQgKGN0eCkge1xuICBjb25zdCB2YWx1ZSA9IGN0eC5vcHRpb25zLnR5cGVkID8gaW5mZXJUeXBlKGN0eC52YWx1ZSkgOiBjdHgudmFsdWVcbiAgY3R4LmVudHJ5LnB1c2goY3R4LnJldml2ZXIodmFsdWUsIGN0eC5yb3csIGN0eC5jb2wpKVxuICBjdHgudmFsdWUgPSAnJ1xuICBjdHguY29sKytcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBlbnRyeUVuZCAoY3R4KSB7XG4gIGN0eC5vdXRwdXQucHVzaChjdHguZW50cnkpXG4gIGN0eC5lbnRyeSA9IFtdXG4gIGN0eC5yb3crK1xuICBjdHguY29sID0gMVxufVxuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGluZmVyVHlwZSAodmFsdWUpIHtcbiAgY29uc3QgaXNOdW1iZXIgPSAvLlxcLi9cblxuICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIHZhbHVlID09PSAndHJ1ZSc6XG4gICAgY2FzZSB2YWx1ZSA9PT0gJ2ZhbHNlJzpcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnXG4gICAgY2FzZSBpc051bWJlci50ZXN0KHZhbHVlKTpcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxuICAgIGNhc2UgaXNGaW5pdGUodmFsdWUpOlxuICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWVcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IHBhcnNlLCBzdHJpbmdpZnkgfSBmcm9tICdAdmFuaWxsYWVzL2Nzdic7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA2MDAsIHdpZHRoOiA2MDAgfSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgaWYgKG1zZy50eXBlID09PSBcImdldC1jb2xsZWN0aW9uc1wiKSB7XG4gICAgICAgIGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpLnRoZW4oKGxvY2FsQ29sbGVjdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25zLnB1c2goY29sbGVjdGlvbi5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImdldC1jb2xsZWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgIGJvZHk6IGNvbGxlY3Rpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICgobXNnLnR5cGUgPT09IFwiZXhwb3J0XCIpICYmIG1zZy5jb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IG1zZy5jb2xsZWN0aW9uTmFtZTtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCkudGhlbigobG9jYWxDb2xsZWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb25JZCA9IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBtb2RlSWRzID0gW107XG4gICAgICAgICAgICBjb25zdCBtb2RlTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgY29sbGVjdGlvbiBpZCBhbmQgbW9kZUlkc1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2xsZWN0aW9uIG9mIGxvY2FsQ29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbi5uYW1lID09PSBjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uSWQgPSBjb2xsZWN0aW9uLmlkO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGUgb2YgY29sbGVjdGlvbi5tb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZUlkcy5wdXNoKG1vZGUubW9kZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVOYW1lcy5wdXNoKG1vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBQcmVwYXJlIGFuZCBleHBvcnQgdmFyaWFibGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IFtjb2xsZWN0aW9uTmFtZSwgLi4ubW9kZU5hbWVzXTtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBvcnRWYXJpYWJsZXNPYmplY3QgPSBbXTtcbiAgICAgICAgICAgICAgICBleHBvcnRWYXJpYWJsZXNPYmplY3QucHVzaChoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyaWFibGVWYWx1ZXNCeU1vZGUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZUlkIG9mIG1vZGVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVZhbHVlc0J5TW9kZS5wdXNoKHZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0VmFyaWFibGVzT2JqZWN0LnB1c2goW3ZhcmlhYmxlLm5hbWUsIC4uLnZhcmlhYmxlVmFsdWVzQnlNb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXhwb3J0VmFyaWFibGVzT2JqZWN0KTtcbiAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZXhwb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzdkRhdGE6IHN0cmluZ2lmeShleHBvcnRWYXJpYWJsZXNPYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcImltcG9ydFwiKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZENTViA9IHBhcnNlKG1zZy5pbXBvcnRlZENTVik7XG4gICAgICAgIC8vIEhBUkQgQ0hFQ0s6IENoZWNrIGlmIHRoZSBDU1YgaXMgZW1wdHlcbiAgICAgICAgaWYgKHBhcnNlZENTVi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIlRoYXQncyBhIGJsYW5rIENTViBmaWxlISBObyBwcmFua3MgcGxlYXNlIC1fLVwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhBUkQgQ0hFQ0s6IENoZWNrIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSB2YXJpYWJsZSByb3csIGFwYXJ0IGZyb20gdGhlIGhlYWRlciByb3dcbiAgICAgICAgaWYgKHBhcnNlZENTVi5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiTm8gdmFyaWFibGVzIGZvdW5kIGluIHRoZSBDU1ZcIiwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhwYXJzZWRDU1YpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gcGFyc2VkQ1NWWzBdO1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IGhlYWRlcnNbMF07XG4gICAgICAgIGNvbnN0IGltcG9ydGVkTW9kZU5hbWVzID0gaGVhZGVycy5zbGljZSgxKTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRNb2RlSWRzID0gW107XG4gICAgICAgIGNvbnN0IGltcG9ydGVkVmFyaWFibGVzT2JqZWN0ID0gW107XG4gICAgICAgIGNvbnN0IGltcG9ydGVkVmFyaWFibGVOYW1lcyA9IFtdO1xuICAgICAgICBjb25zdCB2YXJpYWJsZU5hbWVzT25GaWdtYSA9IFtdO1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVzT25GaWdtYSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9kZXNJZHNPbkZpZ21hID0gW107XG4gICAgICAgICAgICBsZXQgY29sbGVjdGlvbklkID0gXCJcIjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbG9jYWxDb2xsZWN0aW9uIG9mIGxvY2FsQ29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxDb2xsZWN0aW9uLm5hbWUgPT09IGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25JZCA9IGxvY2FsQ29sbGVjdGlvbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIGxvY2FsQ29sbGVjdGlvbi5tb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZXNPbkZpZ21hLnB1c2gobW9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2Rlc0lkc09uRmlnbWEucHVzaChtb2RlLm1vZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIQVJEIENIRUNLOiBDaGVjayBpZiBjb2xsZWN0aW9uIGV4aXN0cyBvbiBGaWdtYVxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25JZCA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIkZpcnN0IGNvbHVtbiBoZWFkZXIgaW4gdGhlIENTViBkb2VzIG5vdCBtYXRjaCBhbnkgY29sbGVjdGlvbiBvbiBGaWdtYVwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1hcCBpbXBvcnRlZE1vZGVzIHdpdGggbW9kZXNPbkZpZ21hXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGltcG9ydGVkTW9kZU5hbWUgb2YgaW1wb3J0ZWRNb2RlTmFtZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1wb3J0ZWRNb2RlSWQgPSBcIlVuZGVmaW5lZE1vZGVJZFwiO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZU9uRmlnbWEgb2YgbW9kZXNPbkZpZ21hKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlT25GaWdtYS5uYW1lID09PSBpbXBvcnRlZE1vZGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0ZWRNb2RlSWQgPSBtb2RlT25GaWdtYS5tb2RlSWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltcG9ydGVkTW9kZUlkcy5wdXNoKGltcG9ydGVkTW9kZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNPRlQgQ0hFQ0s6IENoZWNrIGlmIHJlcXVpcmVkIG1vZGVzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgICAgIC8vIFByb21wdCBpZiBzb21lIG1vZGVzIGFyZSBtaXNzaW5nIFxuICAgICAgICAgICAgLy8gVXNlciB3YW50cyB0byBjb250aW51ZTogVXBkYXRlIG9ubHkgbW9kZXMgdGhhdCBhcmUgcHJlc2VudCAgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIHN0b3A6IEFib3J0IGltcG9ydFxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ01vZGVJZHNDb3VudCA9IENvdW50TWlzc2luZ0VsZW1lbnRzKGltcG9ydGVkTW9kZUlkcywgbW9kZXNJZHNPbkZpZ21hKTtcbiAgICAgICAgICAgIGlmIChtaXNzaW5nTW9kZUlkc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIFNob3cgbm90aWZpY2F0aW9uIGFuZCB3YWl0IGZvciBhY3Rpb25cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYCR7bWlzc2luZ01vZGVJZHNDb3VudH0gbW9kZXMgb24gRmlnbWEgYXJlIG1pc3NpbmcgaW4gdGhlIENTVmAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZXF1ZXVlOiAocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiYWN0aW9uX2J1dHRvbl9jbGlja1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTm90aWZpY2F0aW9uIGRpc21pc3NlZCB3aXRob3V0IGEgY29uZmlybWF0aW9uIHRvIGNvbnRpbnVlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ29udGludWUgaW1wb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWJvcnQgaW1wb3J0XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiSW1wb3J0IGFib3J0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDb250aW51ZSBpZiBubyBpc3N1ZXMgZm91bmQgb3IgaWYgdXNlciBpcyBva2F5IHdpdGggYnlwYXNzaW5nIG1vZGVzIHNvZnQgY2hlY2tcbiAgICAgICAgICAgIC8vIFNhbml0aXNlIGFuZCBwb3B1bGF0ZSBpbXBvcnQgdmFyaWFibGVzIG9iamVjdFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXJzZWRDU1YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbXBvcnRlZFZhcmlhYmxlTmFtZXMucHVzaChwYXJzZWRDU1ZbaV1bMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlc0J5TW9kZSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW1wb3J0ZWRNb2RlSWRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc0J5TW9kZVtpbXBvcnRlZE1vZGVJZHNbal1dID0gcGFyc2VkQ1NWW2ldW2ogKyAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnNlZENTVltpXVswXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzQnlNb2RlOiB2YWx1ZXNCeU1vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0KTtcbiAgICAgICAgICAgIC8vIFNPRlQgQ0hFQ0s6IENoZWNrIGlmIHJlcXVpcmVkIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlXG4gICAgICAgICAgICAvLyBQcm9tcHQgaWYgc29tZSB2YXJpYWJsZXMgYXJlIG1pc3NpbmcgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIGNvbnRpbnVlOiBVcGRhdGUgb25seSB2YXJpYWJsZXMgdGhhdCBhcmUgcHJlc2VudCAobmVlZCB0byBtb2RpZnkgdXBkYXRlIGZ1bmN0aW9uKSAgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIHN0b3A6IEFib3J0IGltcG9ydFxuICAgICAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoXCJTVFJJTkdcIikudGhlbigodmFyaWFibGVzKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVOYW1lc09uRmlnbWEucHVzaCh2YXJpYWJsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nVmFyaWFibGVzQ291bnQgPSBDb3VudE1pc3NpbmdFbGVtZW50cyhpbXBvcnRlZFZhcmlhYmxlTmFtZXMsIHZhcmlhYmxlTmFtZXNPbkZpZ21hKTtcbiAgICAgICAgICAgICAgICBpZiAobWlzc2luZ1ZhcmlhYmxlc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG93IG5vdGlmaWNhdGlvbiBhbmQgd2FpdCBmb3IgYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KGAke21pc3NpbmdWYXJpYWJsZXNDb3VudH0gdmFyaWFibGVzIG9uIEZpZ21hIGFyZSBtaXNzaW5nIGluIHRoZSBDU1ZgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVxdWV1ZTogKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJhY3Rpb25fYnV0dG9uX2NsaWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiTm90aWZpY2F0aW9uIGRpc21pc3NlZCB3aXRob3V0IGEgY29uZmlybWF0aW9uIHRvIGNvbnRpbnVlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkNvbnRpbnVlIGltcG9ydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFib3J0IGltcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiSW1wb3J0IGFib3J0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHZhcmlhYmxlcyBpZiBhbGwgY2hlY2tzIGhhdmUgcGFzc2VkXG4gICAgICAgICAgICAgICAgVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvbklkLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcyk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59O1xuZnVuY3Rpb24gVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uTmFtZSwgY29sbGVjdGlvbklkLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcykge1xuICAgIGZpZ21hLm5vdGlmeShcIlVwZGF0aW5nIHZhcmlhYmxlIHZhbHVlcywgaG9sZCBvbi4uLlwiKTtcbiAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgLy8gQmVnaW4gdXBkYXRpbmcgdmFyaWFibGVzXG4gICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb25JZCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1wb3J0ZWRWYXJpYWJsZSBvZiBpbXBvcnRlZFZhcmlhYmxlc09iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRWYXJpYWJsZS5uYW1lID09PSB2YXJpYWJsZS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSB0aG9zZSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBDU1YuIE5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaGFzIGJ5cGFzc2VkIG1vZGVzIHNvZnQgY2hlY2suXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkTW9kZUlkcy5pbmNsdWRlcyhtb2RlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobW9kZUlkLCBpbXBvcnRlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KGBDb3VsZCBub3QgdXBkYXRlICR7dmFyaWFibGUubmFtZX1gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KGBJbXBvcnQgYWJvcnRlZC4gUGxlYXNlIGNoZWNrIHRoZSB2YXJpYWJsZSB2YWx1ZSBpbiB0aGUgQ1NWLmAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYCR7ZXJyb3J9YCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5ub3RpZnkoYFN1Y2Nlc3NmdWxseSB1cGRhdGVkIHZhcmlhYmxlIHZhbHVlcyBvZiAke2NvbGxlY3Rpb25OYW1lfSBmcm9tIHRoZSBDU1ZgKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIENvdW50TWlzc2luZ0VsZW1lbnRzKGFycmF5VG9DaGVjaywgcmVmZXJlbmNlQXJyYXkpIHtcbiAgICBsZXQgbWlzc2luZ0NvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcmVmZXJlbmNlQXJyYXkpIHtcbiAgICAgICAgaWYgKCFhcnJheVRvQ2hlY2suaW5jbHVkZXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIG1pc3NpbmdDb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaXNzaW5nQ291bnQ7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=