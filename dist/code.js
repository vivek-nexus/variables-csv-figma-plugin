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
        const modesOnFigma = [];
        const modesIdsOnFigma = [];
        const variableNamesOnFigma = [];
        figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => __awaiter(void 0, void 0, void 0, function* () {
            // Identify imported collection and its modes on Figma
            let collection = undefined;
            for (const localCollection of localCollections) {
                if (localCollection.name === collectionName) {
                    collection = localCollection;
                    for (const mode of localCollection.modes) {
                        modesOnFigma.push(mode);
                        modesIdsOnFigma.push(mode.modeId);
                    }
                }
            }
            // HARD CHECK: Check if collection exists on Figma
            if (!collection) {
                figma.notify("First column header in the CSV does not match any collection on Figma", { error: true, timeout: 5000 });
                return;
            }
            // Compare modes on Figma with imported modes 
            for (const importedModeName of importedModeNames) {
                let importedModeId = "UndefinedModeId";
                for (const modeOnFigma of modesOnFigma) {
                    if (modeOnFigma.name === importedModeName) {
                        importedModeId = modeOnFigma.modeId;
                    }
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
                const missingModesSoftCheck = yield NotifyAndAwaitAction(`${missingModeIdsCount} mode${missingModeIdsCount === 1 ? `` : `s`} on Figma ${missingModeIdsCount === 1 ? `is` : `are`} missing in the CSV`);
                if (!missingModesSoftCheck) {
                    return;
                }
            }
            // Continue if user is okay with bypassing modes soft check
            // Sanitise and populate import variables object
            // Starting at 1 to skip the column header row in parsedCSV
            for (let i = 1; i < parsedCSV.length; i++) {
                // Collect variables for missing variables soft check and new variables soft check
                importedVariableNames.push(parsedCSV[i][0]);
                // Populate variables object
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
                // Collect variable names on Figma for missing variables soft check and new variables soft check
                for (const variable of variables) {
                    if (variable.variableCollectionId === collection.id) {
                        variableNamesOnFigma.push(variable.name);
                    }
                }
                const missingVariablesCount = CountMissingElements(importedVariableNames, variableNamesOnFigma);
                if (missingVariablesCount > 0) {
                    // Show notification and wait for action
                    const missingVariablesSoftCheck = yield NotifyAndAwaitAction(`${missingVariablesCount} variable${missingVariablesCount === 1 ? `` : `s`} on Figma ${missingVariablesCount === 1 ? `is` : `are`} missing in the CSV`);
                    if (!missingVariablesSoftCheck) {
                        return;
                    }
                }
                // Update existing variables if missing variables soft check is passed
                UpdateVariables(importedVariablesObject, collection, variables, modesIdsOnFigma, importedModeIds);
                // SOFT CHECK: Check if there are new variables in the CSV
                // Prompt if there are new variables in the CSV
                // User wants to continue: Create those new variables 
                // User wants to stop: Abort import
                const newVariableIndexes = GetNewVariableIndexes(importedVariableNames, variableNamesOnFigma);
                if (newVariableIndexes.length > 0) {
                    // Show notification and wait for action
                    const newVariablesSoftCheck = yield NotifyAndAwaitAction(`${newVariableIndexes.length} new variable${newVariableIndexes.length === 1 ? `` : `s`} found in the CSV. These variables will be created in the collection.`);
                    if (!newVariablesSoftCheck) {
                        return;
                    }
                    // Create new variables if new variables soft check is passed
                    CreateNewVariables(importedVariablesObject, collection, modesIdsOnFigma, importedModeIds, newVariableIndexes);
                }
            }));
        }));
    }
};
function UpdateVariables(importedVariablesObject, collection, variables, modesIdsOnFigma, importedModeIds) {
    figma.notify("Updating existing variable values, hold on...");
    // Begin updating variables
    for (const variable of variables) {
        if (variable.variableCollectionId === collection.id) {
            for (const importedVariable of importedVariablesObject) {
                // Update only those variables that are present in the CSV. Needed for cases where the user has bypassed missing variables soft check.
                if (importedVariable.name === variable.name) {
                    for (const modeId of modesIdsOnFigma) {
                        // Update only those modes that are present in the CSV. Needed for cases where the user has bypassed missing modes soft check.
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
    figma.notify(`Successfully updated existing variable values of ${collection.name} from the CSV`, { timeout: 2000 });
}
function CreateNewVariables(importedVariablesObject, collection, modesIdsOnFigma, importedModeIds, newVariableIndexes) {
    figma.notify("Creating new variables, hold on...");
    for (const index of newVariableIndexes) {
        const newVariableData = importedVariablesObject[index];
        // Create new variable and set values for modes
        try {
            const newVariable = figma.variables.createVariable(newVariableData.name, collection, "STRING");
            for (const modeId of modesIdsOnFigma) {
                // Update only those modes that are present in the CSV. Needed for cases where the user has bypassed missing modes soft check.
                if (importedModeIds.includes(modeId)) {
                    newVariable.setValueForMode(modeId, newVariableData.valuesByMode[modeId]);
                }
            }
        }
        catch (error) {
            console.error(error);
            figma.notify(`Could not create ${newVariableData.name}`, { error: true, timeout: 5000 });
            figma.notify(`Import aborted. Please check the variable and its values CSV.`, { error: true, timeout: 5000 });
            figma.notify(`${error}`, { error: true, timeout: 5000 });
            return;
        }
    }
    figma.notify(`Successfully created ${newVariableIndexes.length} new variable${newVariableIndexes.length === 1 ? `` : `s`} in the collection`, { timeout: 2000 });
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
function GetNewVariableIndexes(importedVariableNames, variableNamesOnFigma) {
    const newVariableIndexes = [];
    for (let i = 0; i < importedVariableNames.length; i++) {
        if (!variableNamesOnFigma.includes(importedVariableNames[i])) {
            newVariableIndexes.push(i);
        }
    }
    return newVariableIndexes;
}
function NotifyAndAwaitAction(message) {
    return new Promise((resolve) => {
        new Promise((resolve, reject) => {
            figma.notify(message, {
                error: false,
                timeout: Infinity,
                onDequeue: (reason) => {
                    if (reason === "action_button_click") {
                        resolve(true); // User clicked "Continue import"
                    }
                    else {
                        // User clicked the cross button or notification was dismissed otherwise
                        reject(reason);
                    }
                },
                button: {
                    text: "Continue import",
                    action: () => {
                        resolve(true); // User clicked "Continue import"
                    }
                }
            });
        })
            .then(() => { resolve(true); })
            .catch((error) => {
            // Catch any synchronous errors that occur during the figma.notify call itself
            console.error(error);
            figma.notify("Import aborted");
            resolve(false); // Indicate abortion due to internal error
        });
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cG9ydC1pbXBvcnQvLi9ub2RlX21vZHVsZXMvQHZhbmlsbGFlcy9jc3YvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0Ly4vc3JjL2NvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYXJzZSB0YWtlcyBhIHN0cmluZyBvZiBDU1YgZGF0YSBhbmQgY29udmVydHMgaXQgdG8gYSAyIGRpbWVuc2lvbmFsIGFycmF5XG4gKlxuICogb3B0aW9uc1xuICogLSB0eXBlZCAtIGluZmVyIHR5cGVzIFtmYWxzZV1cbiAqXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gY3N2IHRoZSBDU1Ygc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmV2aXZlcl0gYSBjdXN0b20gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtBcnJheX0gYSAyIGRpbWVuc2lvbmFsIGFycmF5IG9mIGBbZW50cmllc11bdmFsdWVzXWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlIChjc3YsIG9wdGlvbnMsIHJldml2ZXIgPSB2ID0+IHYpIHtcbiAgY29uc3QgY3R4ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICBjdHgub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgY3R4LnJldml2ZXIgPSByZXZpdmVyXG4gIGN0eC52YWx1ZSA9ICcnXG4gIGN0eC5lbnRyeSA9IFtdXG4gIGN0eC5vdXRwdXQgPSBbXVxuICBjdHguY29sID0gMVxuICBjdHgucm93ID0gMVxuXG4gIGNvbnN0IGxleGVyID0gL1wifCx8XFxyXFxufFxcbnxcXHJ8W15cIixcXHJcXG5dKy95XG4gIGNvbnN0IGlzTmV3bGluZSA9IC9eKFxcclxcbnxcXG58XFxyKSQvXG5cbiAgbGV0IG1hdGNoZXMgPSBbXVxuICBsZXQgbWF0Y2ggPSAnJ1xuICBsZXQgc3RhdGUgPSAwXG5cbiAgd2hpbGUgKChtYXRjaGVzID0gbGV4ZXIuZXhlYyhjc3YpKSAhPT0gbnVsbCkge1xuICAgIG1hdGNoID0gbWF0Y2hlc1swXVxuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgY2FzZSAwOiAvLyBzdGFydCBvZiBlbnRyeVxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY3R4LnZhbHVlICs9IG1hdGNoXG4gICAgICAgICAgICBzdGF0ZSA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjogLy8gdW4tZGVsaW1pdGVkIGlucHV0XG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICcsJzpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIGlzTmV3bGluZS50ZXN0KG1hdGNoKTpcbiAgICAgICAgICAgIHN0YXRlID0gMFxuICAgICAgICAgICAgdmFsdWVFbmQoY3R4KVxuICAgICAgICAgICAgZW50cnlFbmQoY3R4KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc3RhdGUgPSA0XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ1NWRXJyb3I6IElsbGVnYWwgc3RhdGUgW3Jvdzoke2N0eC5yb3d9LCBjb2w6JHtjdHguY29sfV1gKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6IC8vIGRlbGltaXRlZCBpbnB1dFxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSA0XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OiAvLyBlc2NhcGVkIG9yIGNsb3NpbmcgZGVsaW1pdGVyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgbWF0Y2ggPT09ICdcIic6XG4gICAgICAgICAgICBzdGF0ZSA9IDNcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnLCc6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBpc05ld2xpbmUudGVzdChtYXRjaCk6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGVudHJ5RW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBDU1ZFcnJvcjogSWxsZWdhbCBzdGF0ZSBbcm93OiR7Y3R4LnJvd30sIGNvbDoke2N0eC5jb2x9XWApXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBmbHVzaCB0aGUgbGFzdCB2YWx1ZVxuICBpZiAoY3R4LmVudHJ5Lmxlbmd0aCAhPT0gMCkge1xuICAgIHZhbHVlRW5kKGN0eClcbiAgICBlbnRyeUVuZChjdHgpXG4gIH1cblxuICByZXR1cm4gY3R4Lm91dHB1dFxufVxuXG4vKipcbiAqIFN0cmluZ2lmeSB0YWtlcyBhIDIgZGltZW5zaW9uYWwgYXJyYXkgb2YgYFtlbnRyaWVzXVt2YWx1ZXNdYCBhbmQgY29udmVydHMgdGhlbSB0byBDU1ZcbiAqXG4gKiBvcHRpb25zXG4gKiAtIGVvZiAtIGFkZCBhIHRyYWlsaW5nIG5ld2xpbmUgYXQgdGhlIGVuZCBvZiBmaWxlIFt0cnVlXVxuICpcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBpbnB1dCBhcnJheSB0byBzdHJpbmdpZnlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXBsYWNlcl0gYSBjdXN0b20gZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBDU1Ygc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKGFycmF5LCBvcHRpb25zID0ge30sIHJlcGxhY2VyID0gdiA9PiB2KSB7XG4gIGNvbnN0IGN0eCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgY3R4Lm9wdGlvbnMgPSBvcHRpb25zXG4gIGN0eC5vcHRpb25zLmVvZiA9IGN0eC5vcHRpb25zLmVvZiAhPT0gdW5kZWZpbmVkID8gY3R4Lm9wdGlvbnMuZW9mIDogdHJ1ZVxuICBjdHgucm93ID0gMVxuICBjdHguY29sID0gMVxuICBjdHgub3V0cHV0ID0gJydcblxuICBjb25zdCBuZWVkc0RlbGltaXRlcnMgPSAvXCJ8LHxcXHJcXG58XFxufFxcci9cblxuICBhcnJheS5mb3JFYWNoKChyb3csIHJJZHgpID0+IHtcbiAgICBsZXQgZW50cnkgPSAnJ1xuICAgIGN0eC5jb2wgPSAxXG4gICAgcm93LmZvckVhY2goKGNvbCwgY0lkeCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjb2wgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbCA9IGNvbC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpXG4gICAgICAgIGNvbCA9IG5lZWRzRGVsaW1pdGVycy50ZXN0KGNvbCkgPyBgXCIke2NvbH1cImAgOiBjb2xcbiAgICAgIH1cbiAgICAgIGVudHJ5ICs9IHJlcGxhY2VyKGNvbCwgY3R4LnJvdywgY3R4LmNvbClcbiAgICAgIGlmIChjSWR4ICE9PSByb3cubGVuZ3RoIC0gMSkge1xuICAgICAgICBlbnRyeSArPSAnLCdcbiAgICAgIH1cbiAgICAgIGN0eC5jb2wrK1xuICAgIH0pXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGN0eC5vcHRpb25zLmVvZjpcbiAgICAgIGNhc2UgIWN0eC5vcHRpb25zLmVvZiAmJiBySWR4ICE9PSBhcnJheS5sZW5ndGggLSAxOlxuICAgICAgICBjdHgub3V0cHV0ICs9IGAke2VudHJ5fVxcbmBcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGN0eC5vdXRwdXQgKz0gYCR7ZW50cnl9YFxuICAgICAgICBicmVha1xuICAgIH1cbiAgICBjdHgucm93KytcbiAgfSlcblxuICByZXR1cm4gY3R4Lm91dHB1dFxufVxuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIHZhbHVlRW5kIChjdHgpIHtcbiAgY29uc3QgdmFsdWUgPSBjdHgub3B0aW9ucy50eXBlZCA/IGluZmVyVHlwZShjdHgudmFsdWUpIDogY3R4LnZhbHVlXG4gIGN0eC5lbnRyeS5wdXNoKGN0eC5yZXZpdmVyKHZhbHVlLCBjdHgucm93LCBjdHguY29sKSlcbiAgY3R4LnZhbHVlID0gJydcbiAgY3R4LmNvbCsrXG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gZW50cnlFbmQgKGN0eCkge1xuICBjdHgub3V0cHV0LnB1c2goY3R4LmVudHJ5KVxuICBjdHguZW50cnkgPSBbXVxuICBjdHgucm93KytcbiAgY3R4LmNvbCA9IDFcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBpbmZlclR5cGUgKHZhbHVlKSB7XG4gIGNvbnN0IGlzTnVtYmVyID0gLy5cXC4vXG5cbiAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSB2YWx1ZSA9PT0gJ3RydWUnOlxuICAgIGNhc2UgdmFsdWUgPT09ICdmYWxzZSc6XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJ1xuICAgIGNhc2UgaXNOdW1iZXIudGVzdCh2YWx1ZSk6XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgICBjYXNlIGlzRmluaXRlKHZhbHVlKTpcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBwYXJzZSwgc3RyaW5naWZ5IH0gZnJvbSAnQHZhbmlsbGFlcy9jc3YnO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNDUwLCB3aWR0aDogNTAwIH0pO1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJnZXQtY29sbGVjdGlvbnNcIikge1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBsb2NhbENvbGxlY3Rpb24ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGxvY2FsQ29sbGVjdGlvbi5pZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZ2V0LWNvbGxlY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgYm9keTogY29sbGVjdGlvbnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKChtc2cudHlwZSA9PT0gXCJleHBvcnRcIikgJiYgbXNnLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IG1zZy5jb2xsZWN0aW9uO1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlSWRzID0gW107XG4gICAgICAgICAgICBjb25zdCBtb2RlTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIC8vIEV4dHJhY3QgY29sbGVjdGlvbiBpZCBhbmQgbW9kZUlkc1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbENvbGxlY3Rpb24uaWQgPT09IGNvbGxlY3Rpb24uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIGxvY2FsQ29sbGVjdGlvbi5tb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZUlkcy5wdXNoKG1vZGUubW9kZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVOYW1lcy5wdXNoKG1vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBQcmVwYXJlIGFuZCBleHBvcnQgdmFyaWFibGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IFtjb2xsZWN0aW9uLm5hbWUsIC4uLm1vZGVOYW1lc107XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb3J0VmFyaWFibGVzT2JqZWN0ID0gW107XG4gICAgICAgICAgICAgICAgZXhwb3J0VmFyaWFibGVzT2JqZWN0LnB1c2goaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB2YXJpYWJsZSBvZiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YXJpYWJsZVZhbHVlc0J5TW9kZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlSWQgb2YgbW9kZUlkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERldGVjdCBBbGlhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXS50eXBlID09PSBcIlZBUklBQkxFX0FMSUFTXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVWYWx1ZXNCeU1vZGUucHVzaChgRE8gTk9UIEVESVQgKExJTktFRCBUTyBBTk9USEVSIFZBUklBQkxFKWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVWYWx1ZXNCeU1vZGUucHVzaCh2YXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRWYXJpYWJsZXNPYmplY3QucHVzaChbdmFyaWFibGUubmFtZSwgLi4udmFyaWFibGVWYWx1ZXNCeU1vZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhleHBvcnRWYXJpYWJsZXNPYmplY3QpO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJleHBvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzdkRhdGE6IHN0cmluZ2lmeShleHBvcnRWYXJpYWJsZXNPYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKChtc2cudHlwZSA9PT0gXCJpbXBvcnRcIikgJiYgKG1zZy5pbXBvcnRlZENTVikpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkQ1NWID0gcGFyc2UobXNnLmltcG9ydGVkQ1NWKTtcbiAgICAgICAgLy8gSEFSRCBDSEVDSzogQ2hlY2sgaWYgdGhlIENTViBpcyBlbXB0eVxuICAgICAgICBpZiAocGFyc2VkQ1NWLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiVGhhdCdzIGEgYmxhbmsgQ1NWIGZpbGUhIE5vIHByYW5rcyBwbGVhc2UgLV8tXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSEFSRCBDSEVDSzogQ2hlY2sgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHZhcmlhYmxlIHJvdywgYXBhcnQgZnJvbSB0aGUgaGVhZGVyIHJvd1xuICAgICAgICBpZiAocGFyc2VkQ1NWLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJObyB2YXJpYWJsZXMgZm91bmQgaW4gdGhlIENTVlwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZENTVik7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBwYXJzZWRDU1ZbMF07XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gaGVhZGVyc1swXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRNb2RlTmFtZXMgPSBoZWFkZXJzLnNsaWNlKDEpO1xuICAgICAgICBjb25zdCBpbXBvcnRlZE1vZGVJZHMgPSBbXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QgPSBbXTtcbiAgICAgICAgY29uc3QgaW1wb3J0ZWRWYXJpYWJsZU5hbWVzID0gW107XG4gICAgICAgIGNvbnN0IG1vZGVzT25GaWdtYSA9IFtdO1xuICAgICAgICBjb25zdCBtb2Rlc0lkc09uRmlnbWEgPSBbXTtcbiAgICAgICAgY29uc3QgdmFyaWFibGVOYW1lc09uRmlnbWEgPSBbXTtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCkudGhlbigobG9jYWxDb2xsZWN0aW9ucykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyBJZGVudGlmeSBpbXBvcnRlZCBjb2xsZWN0aW9uIGFuZCBpdHMgbW9kZXMgb24gRmlnbWFcbiAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbENvbGxlY3Rpb24gb2YgbG9jYWxDb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbENvbGxlY3Rpb24ubmFtZSA9PT0gY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbiA9IGxvY2FsQ29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlIG9mIGxvY2FsQ29sbGVjdGlvbi5tb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZXNPbkZpZ21hLnB1c2gobW9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2Rlc0lkc09uRmlnbWEucHVzaChtb2RlLm1vZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIQVJEIENIRUNLOiBDaGVjayBpZiBjb2xsZWN0aW9uIGV4aXN0cyBvbiBGaWdtYVxuICAgICAgICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRmlyc3QgY29sdW1uIGhlYWRlciBpbiB0aGUgQ1NWIGRvZXMgbm90IG1hdGNoIGFueSBjb2xsZWN0aW9uIG9uIEZpZ21hXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ29tcGFyZSBtb2RlcyBvbiBGaWdtYSB3aXRoIGltcG9ydGVkIG1vZGVzIFxuICAgICAgICAgICAgZm9yIChjb25zdCBpbXBvcnRlZE1vZGVOYW1lIG9mIGltcG9ydGVkTW9kZU5hbWVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltcG9ydGVkTW9kZUlkID0gXCJVbmRlZmluZWRNb2RlSWRcIjtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVPbkZpZ21hIG9mIG1vZGVzT25GaWdtYSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZU9uRmlnbWEubmFtZSA9PT0gaW1wb3J0ZWRNb2RlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0ZWRNb2RlSWQgPSBtb2RlT25GaWdtYS5tb2RlSWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW1wb3J0ZWRNb2RlSWRzLnB1c2goaW1wb3J0ZWRNb2RlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU09GVCBDSEVDSzogQ2hlY2sgaWYgcmVxdWlyZWQgbW9kZXMgYXJlIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gUHJvbXB0IGlmIHNvbWUgbW9kZXMgYXJlIG1pc3NpbmcgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIGNvbnRpbnVlOiBVcGRhdGUgb25seSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50ICBcbiAgICAgICAgICAgIC8vIFVzZXIgd2FudHMgdG8gc3RvcDogQWJvcnQgaW1wb3J0XG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nTW9kZUlkc0NvdW50ID0gQ291bnRNaXNzaW5nRWxlbWVudHMoaW1wb3J0ZWRNb2RlSWRzLCBtb2Rlc0lkc09uRmlnbWEpO1xuICAgICAgICAgICAgaWYgKG1pc3NpbmdNb2RlSWRzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hvdyBub3RpZmljYXRpb24gYW5kIHdhaXQgZm9yIGFjdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdNb2Rlc1NvZnRDaGVjayA9IHlpZWxkIE5vdGlmeUFuZEF3YWl0QWN0aW9uKGAke21pc3NpbmdNb2RlSWRzQ291bnR9IG1vZGUke21pc3NpbmdNb2RlSWRzQ291bnQgPT09IDEgPyBgYCA6IGBzYH0gb24gRmlnbWEgJHttaXNzaW5nTW9kZUlkc0NvdW50ID09PSAxID8gYGlzYCA6IGBhcmVgfSBtaXNzaW5nIGluIHRoZSBDU1ZgKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1pc3NpbmdNb2Rlc1NvZnRDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ29udGludWUgaWYgdXNlciBpcyBva2F5IHdpdGggYnlwYXNzaW5nIG1vZGVzIHNvZnQgY2hlY2tcbiAgICAgICAgICAgIC8vIFNhbml0aXNlIGFuZCBwb3B1bGF0ZSBpbXBvcnQgdmFyaWFibGVzIG9iamVjdFxuICAgICAgICAgICAgLy8gU3RhcnRpbmcgYXQgMSB0byBza2lwIHRoZSBjb2x1bW4gaGVhZGVyIHJvdyBpbiBwYXJzZWRDU1ZcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcGFyc2VkQ1NWLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gQ29sbGVjdCB2YXJpYWJsZXMgZm9yIG1pc3NpbmcgdmFyaWFibGVzIHNvZnQgY2hlY2sgYW5kIG5ldyB2YXJpYWJsZXMgc29mdCBjaGVja1xuICAgICAgICAgICAgICAgIGltcG9ydGVkVmFyaWFibGVOYW1lcy5wdXNoKHBhcnNlZENTVltpXVswXSk7XG4gICAgICAgICAgICAgICAgLy8gUG9wdWxhdGUgdmFyaWFibGVzIG9iamVjdFxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlc0J5TW9kZSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW1wb3J0ZWRNb2RlSWRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc0J5TW9kZVtpbXBvcnRlZE1vZGVJZHNbal1dID0gcGFyc2VkQ1NWW2ldW2ogKyAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcnNlZENTVltpXVswXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzQnlNb2RlOiB2YWx1ZXNCeU1vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0KTtcbiAgICAgICAgICAgIC8vIFNPRlQgQ0hFQ0s6IENoZWNrIGlmIHJlcXVpcmVkIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlXG4gICAgICAgICAgICAvLyBQcm9tcHQgaWYgc29tZSB2YXJpYWJsZXMgYXJlIG1pc3NpbmcgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIGNvbnRpbnVlOiBVcGRhdGUgb25seSB2YXJpYWJsZXMgdGhhdCBhcmUgcHJlc2VudCAgXG4gICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIHN0b3A6IEFib3J0IGltcG9ydFxuICAgICAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoXCJTVFJJTkdcIikudGhlbigodmFyaWFibGVzKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAvLyBDb2xsZWN0IHZhcmlhYmxlIG5hbWVzIG9uIEZpZ21hIGZvciBtaXNzaW5nIHZhcmlhYmxlcyBzb2Z0IGNoZWNrIGFuZCBuZXcgdmFyaWFibGVzIHNvZnQgY2hlY2tcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlTmFtZXNPbkZpZ21hLnB1c2godmFyaWFibGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbWlzc2luZ1ZhcmlhYmxlc0NvdW50ID0gQ291bnRNaXNzaW5nRWxlbWVudHMoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLCB2YXJpYWJsZU5hbWVzT25GaWdtYSk7XG4gICAgICAgICAgICAgICAgaWYgKG1pc3NpbmdWYXJpYWJsZXNDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyBub3RpZmljYXRpb24gYW5kIHdhaXQgZm9yIGFjdGlvblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nVmFyaWFibGVzU29mdENoZWNrID0geWllbGQgTm90aWZ5QW5kQXdhaXRBY3Rpb24oYCR7bWlzc2luZ1ZhcmlhYmxlc0NvdW50fSB2YXJpYWJsZSR7bWlzc2luZ1ZhcmlhYmxlc0NvdW50ID09PSAxID8gYGAgOiBgc2B9IG9uIEZpZ21hICR7bWlzc2luZ1ZhcmlhYmxlc0NvdW50ID09PSAxID8gYGlzYCA6IGBhcmVgfSBtaXNzaW5nIGluIHRoZSBDU1ZgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtaXNzaW5nVmFyaWFibGVzU29mdENoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIHZhcmlhYmxlcyBpZiBtaXNzaW5nIHZhcmlhYmxlcyBzb2Z0IGNoZWNrIGlzIHBhc3NlZFxuICAgICAgICAgICAgICAgIFVwZGF0ZVZhcmlhYmxlcyhpbXBvcnRlZFZhcmlhYmxlc09iamVjdCwgY29sbGVjdGlvbiwgdmFyaWFibGVzLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcyk7XG4gICAgICAgICAgICAgICAgLy8gU09GVCBDSEVDSzogQ2hlY2sgaWYgdGhlcmUgYXJlIG5ldyB2YXJpYWJsZXMgaW4gdGhlIENTVlxuICAgICAgICAgICAgICAgIC8vIFByb21wdCBpZiB0aGVyZSBhcmUgbmV3IHZhcmlhYmxlcyBpbiB0aGUgQ1NWXG4gICAgICAgICAgICAgICAgLy8gVXNlciB3YW50cyB0byBjb250aW51ZTogQ3JlYXRlIHRob3NlIG5ldyB2YXJpYWJsZXMgXG4gICAgICAgICAgICAgICAgLy8gVXNlciB3YW50cyB0byBzdG9wOiBBYm9ydCBpbXBvcnRcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdWYXJpYWJsZUluZGV4ZXMgPSBHZXROZXdWYXJpYWJsZUluZGV4ZXMoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLCB2YXJpYWJsZU5hbWVzT25GaWdtYSk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhcmlhYmxlSW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgbm90aWZpY2F0aW9uIGFuZCB3YWl0IGZvciBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFyaWFibGVzU29mdENoZWNrID0geWllbGQgTm90aWZ5QW5kQXdhaXRBY3Rpb24oYCR7bmV3VmFyaWFibGVJbmRleGVzLmxlbmd0aH0gbmV3IHZhcmlhYmxlJHtuZXdWYXJpYWJsZUluZGV4ZXMubGVuZ3RoID09PSAxID8gYGAgOiBgc2B9IGZvdW5kIGluIHRoZSBDU1YuIFRoZXNlIHZhcmlhYmxlcyB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhlIGNvbGxlY3Rpb24uYCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbmV3VmFyaWFibGVzU29mdENoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyB2YXJpYWJsZXMgaWYgbmV3IHZhcmlhYmxlcyBzb2Z0IGNoZWNrIGlzIHBhc3NlZFxuICAgICAgICAgICAgICAgICAgICBDcmVhdGVOZXdWYXJpYWJsZXMoaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QsIGNvbGxlY3Rpb24sIG1vZGVzSWRzT25GaWdtYSwgaW1wb3J0ZWRNb2RlSWRzLCBuZXdWYXJpYWJsZUluZGV4ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn07XG5mdW5jdGlvbiBVcGRhdGVWYXJpYWJsZXMoaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QsIGNvbGxlY3Rpb24sIHZhcmlhYmxlcywgbW9kZXNJZHNPbkZpZ21hLCBpbXBvcnRlZE1vZGVJZHMpIHtcbiAgICBmaWdtYS5ub3RpZnkoXCJVcGRhdGluZyBleGlzdGluZyB2YXJpYWJsZSB2YWx1ZXMsIGhvbGQgb24uLi5cIik7XG4gICAgLy8gQmVnaW4gdXBkYXRpbmcgdmFyaWFibGVzXG4gICAgZm9yIChjb25zdCB2YXJpYWJsZSBvZiB2YXJpYWJsZXMpIHtcbiAgICAgICAgaWYgKHZhcmlhYmxlLnZhcmlhYmxlQ29sbGVjdGlvbklkID09PSBjb2xsZWN0aW9uLmlkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGltcG9ydGVkVmFyaWFibGUgb2YgaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSB0aG9zZSB2YXJpYWJsZXMgdGhhdCBhcmUgcHJlc2VudCBpbiB0aGUgQ1NWLiBOZWVkZWQgZm9yIGNhc2VzIHdoZXJlIHRoZSB1c2VyIGhhcyBieXBhc3NlZCBtaXNzaW5nIHZhcmlhYmxlcyBzb2Z0IGNoZWNrLlxuICAgICAgICAgICAgICAgIGlmIChpbXBvcnRlZFZhcmlhYmxlLm5hbWUgPT09IHZhcmlhYmxlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2RlSWQgb2YgbW9kZXNJZHNPbkZpZ21hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSB0aG9zZSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBDU1YuIE5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaGFzIGJ5cGFzc2VkIG1pc3NpbmcgbW9kZXMgc29mdCBjaGVjay5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRlZE1vZGVJZHMuaW5jbHVkZXMobW9kZUlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNraXAgaWYgdGhlIHZhbHVlIGlzIGFuIGFsaWFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkVmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF0gIT09IFwiRE8gTk9UIEVESVQgKExJTktFRCBUTyBBTk9USEVSIFZBUklBQkxFKVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZS5zZXRWYWx1ZUZvck1vZGUobW9kZUlkLCBpbXBvcnRlZFZhcmlhYmxlLnZhbHVlc0J5TW9kZVttb2RlSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KGBDb3VsZCBub3QgdXBkYXRlICR7dmFyaWFibGUubmFtZX1gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KGBJbXBvcnQgYWJvcnRlZC4gUGxlYXNlIGNoZWNrIHRoZSB2YXJpYWJsZSB2YWx1ZSBpbiB0aGUgQ1NWLmAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYCR7ZXJyb3J9YCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWdtYS5ub3RpZnkoYFN1Y2Nlc3NmdWxseSB1cGRhdGVkIGV4aXN0aW5nIHZhcmlhYmxlIHZhbHVlcyBvZiAke2NvbGxlY3Rpb24ubmFtZX0gZnJvbSB0aGUgQ1NWYCwgeyB0aW1lb3V0OiAyMDAwIH0pO1xufVxuZnVuY3Rpb24gQ3JlYXRlTmV3VmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcywgbmV3VmFyaWFibGVJbmRleGVzKSB7XG4gICAgZmlnbWEubm90aWZ5KFwiQ3JlYXRpbmcgbmV3IHZhcmlhYmxlcywgaG9sZCBvbi4uLlwiKTtcbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIG5ld1ZhcmlhYmxlSW5kZXhlcykge1xuICAgICAgICBjb25zdCBuZXdWYXJpYWJsZURhdGEgPSBpbXBvcnRlZFZhcmlhYmxlc09iamVjdFtpbmRleF07XG4gICAgICAgIC8vIENyZWF0ZSBuZXcgdmFyaWFibGUgYW5kIHNldCB2YWx1ZXMgZm9yIG1vZGVzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYXJpYWJsZSA9IGZpZ21hLnZhcmlhYmxlcy5jcmVhdGVWYXJpYWJsZShuZXdWYXJpYWJsZURhdGEubmFtZSwgY29sbGVjdGlvbiwgXCJTVFJJTkdcIik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSB0aG9zZSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBDU1YuIE5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaGFzIGJ5cGFzc2VkIG1pc3NpbmcgbW9kZXMgc29mdCBjaGVjay5cbiAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRNb2RlSWRzLmluY2x1ZGVzKG1vZGVJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFyaWFibGUuc2V0VmFsdWVGb3JNb2RlKG1vZGVJZCwgbmV3VmFyaWFibGVEYXRhLnZhbHVlc0J5TW9kZVttb2RlSWRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgQ291bGQgbm90IGNyZWF0ZSAke25ld1ZhcmlhYmxlRGF0YS5uYW1lfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoYEltcG9ydCBhYm9ydGVkLiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIGFuZCBpdHMgdmFsdWVzIENTVi5gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KGAke2Vycm9yfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlnbWEubm90aWZ5KGBTdWNjZXNzZnVsbHkgY3JlYXRlZCAke25ld1ZhcmlhYmxlSW5kZXhlcy5sZW5ndGh9IG5ldyB2YXJpYWJsZSR7bmV3VmFyaWFibGVJbmRleGVzLmxlbmd0aCA9PT0gMSA/IGBgIDogYHNgfSBpbiB0aGUgY29sbGVjdGlvbmAsIHsgdGltZW91dDogMjAwMCB9KTtcbn1cbmZ1bmN0aW9uIENvdW50TWlzc2luZ0VsZW1lbnRzKGFycmF5VG9DaGVjaywgcmVmZXJlbmNlQXJyYXkpIHtcbiAgICBsZXQgbWlzc2luZ0NvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcmVmZXJlbmNlQXJyYXkpIHtcbiAgICAgICAgaWYgKCFhcnJheVRvQ2hlY2suaW5jbHVkZXMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIG1pc3NpbmdDb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaXNzaW5nQ291bnQ7XG59XG5mdW5jdGlvbiBHZXROZXdWYXJpYWJsZUluZGV4ZXMoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLCB2YXJpYWJsZU5hbWVzT25GaWdtYSkge1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlSW5kZXhlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdmFyaWFibGVOYW1lc09uRmlnbWEuaW5jbHVkZXMoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzW2ldKSkge1xuICAgICAgICAgICAgbmV3VmFyaWFibGVJbmRleGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhcmlhYmxlSW5kZXhlcztcbn1cbmZ1bmN0aW9uIE5vdGlmeUFuZEF3YWl0QWN0aW9uKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KG1lc3NhZ2UsIHtcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZW91dDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgb25EZXF1ZXVlOiAocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiYWN0aW9uX2J1dHRvbl9jbGlja1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpOyAvLyBVc2VyIGNsaWNrZWQgXCJDb250aW51ZSBpbXBvcnRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlciBjbGlja2VkIHRoZSBjcm9zcyBidXR0b24gb3Igbm90aWZpY2F0aW9uIHdhcyBkaXNtaXNzZWQgb3RoZXJ3aXNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ29udGludWUgaW1wb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTsgLy8gVXNlciBjbGlja2VkIFwiQ29udGludWUgaW1wb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4geyByZXNvbHZlKHRydWUpOyB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy8gQ2F0Y2ggYW55IHN5bmNocm9ub3VzIGVycm9ycyB0aGF0IG9jY3VyIGR1cmluZyB0aGUgZmlnbWEubm90aWZ5IGNhbGwgaXRzZWxmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIkltcG9ydCBhYm9ydGVkXCIpO1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7IC8vIEluZGljYXRlIGFib3J0aW9uIGR1ZSB0byBpbnRlcm5hbCBlcnJvclxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==