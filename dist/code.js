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
        // HARD CHECK: Check if there is no other row, apart from the header row
        if (parsedCSV.length === 1) {
            figma.notify("No variables found in the CSV (first row is considered as the header)", { error: true, timeout: 5000 });
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
                const missingModesSoftCheck = yield NotifyAndAwaitAction(`${missingModeIdsCount} mode${missingModeIdsCount === 1 ? `` : `s`} on Figma ${missingModeIdsCount === 1 ? `is` : `are`} missing in the CSV`, "Continue anyway");
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
            // Collect the collection's variable names on Figma
            figma.variables.getLocalVariablesAsync("STRING").then((variables) => __awaiter(void 0, void 0, void 0, function* () {
                for (const variable of variables) {
                    if (variable.variableCollectionId === collection.id) {
                        variableNamesOnFigma.push(variable.name);
                    }
                }
                // Update only if there are existing variables in the collection
                if (variableNamesOnFigma.length > 0) {
                    // SOFT CHECK: Check if required variables are available
                    // Prompt if some variables are missing 
                    // User wants to continue: Update only variables that are present  
                    // User wants to stop: Abort import
                    const missingVariablesCount = CountMissingElements(importedVariableNames, variableNamesOnFigma);
                    if (missingVariablesCount > 0) {
                        const variablesToUpdateCount = variableNamesOnFigma.length - missingVariablesCount;
                        // Show notification and wait for action
                        const missingVariablesSoftCheck = yield NotifyAndAwaitAction(`Only ${variablesToUpdateCount} of ${variableNamesOnFigma.length} variable${variablesToUpdateCount === 1 ? `` : `s`} on Figma, will be updated from the CSV.`, "Continue");
                        if (!missingVariablesSoftCheck) {
                            return;
                        }
                    }
                    // Update existing variables if missing variables soft check is passed
                    UpdateVariables(importedVariablesObject, collection, variables, modesIdsOnFigma, importedModeIds);
                }
                // SOFT CHECK: Check if there are new variables in the CSV
                // Prompt if there are new variables in the CSV
                // User wants to continue: Create those new variables 
                // User wants to stop: Abort import
                const newVariableIndexes = GetNewVariableIndexes(importedVariableNames, variableNamesOnFigma);
                if (newVariableIndexes.length > 0) {
                    // Show notification and wait for action
                    const newVariablesSoftCheck = yield NotifyAndAwaitAction(`${newVariableIndexes.length} new variable${newVariableIndexes.length === 1 ? `` : `s`} found in the CSV. Create these on Figma?`, "Yes");
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
    figma.notify("Updating variable values, hold on...");
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
    figma.notify(`Updated variables of ${collection.name}`, { timeout: 2000 });
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
            figma.notify(`Could not create variable ${newVariableData.name}`, { error: true, timeout: 5000 });
            figma.notify(`Import aborted. Please check the variable name and its values in the CSV.`, { error: true, timeout: 5000 });
            figma.notify(`${error}`, { error: true, timeout: 5000 });
            return;
        }
    }
    figma.notify(`Created ${newVariableIndexes.length} new variable${newVariableIndexes.length === 1 ? `` : `s`} on Figma`, { timeout: 2000 });
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
function NotifyAndAwaitAction(message, buttonText) {
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
                    text: buttonText,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dmFyaWFibGVzLWNzdi1leHBvcnQtaW1wb3J0Ly4vbm9kZV9tb2R1bGVzL0B2YW5pbGxhZXMvY3N2L2luZGV4LmpzIiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92YXJpYWJsZXMtY3N2LWV4cG9ydC1pbXBvcnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZhcmlhYmxlcy1jc3YtZXhwb3J0LWltcG9ydC8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGFyc2UgdGFrZXMgYSBzdHJpbmcgb2YgQ1NWIGRhdGEgYW5kIGNvbnZlcnRzIGl0IHRvIGEgMiBkaW1lbnNpb25hbCBhcnJheVxuICpcbiAqIG9wdGlvbnNcbiAqIC0gdHlwZWQgLSBpbmZlciB0eXBlcyBbZmFsc2VdXG4gKlxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IGNzdiB0aGUgQ1NWIHN0cmluZyB0byBwYXJzZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jldml2ZXJdIGEgY3VzdG9tIGZ1bmN0aW9uIHRvIG1vZGlmeSB0aGUgdmFsdWVzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGEgMiBkaW1lbnNpb25hbCBhcnJheSBvZiBgW2VudHJpZXNdW3ZhbHVlc11gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZSAoY3N2LCBvcHRpb25zLCByZXZpdmVyID0gdiA9PiB2KSB7XG4gIGNvbnN0IGN0eCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgY3R4Lm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGN0eC5yZXZpdmVyID0gcmV2aXZlclxuICBjdHgudmFsdWUgPSAnJ1xuICBjdHguZW50cnkgPSBbXVxuICBjdHgub3V0cHV0ID0gW11cbiAgY3R4LmNvbCA9IDFcbiAgY3R4LnJvdyA9IDFcblxuICBjb25zdCBsZXhlciA9IC9cInwsfFxcclxcbnxcXG58XFxyfFteXCIsXFxyXFxuXSsveVxuICBjb25zdCBpc05ld2xpbmUgPSAvXihcXHJcXG58XFxufFxccikkL1xuXG4gIGxldCBtYXRjaGVzID0gW11cbiAgbGV0IG1hdGNoID0gJydcbiAgbGV0IHN0YXRlID0gMFxuXG4gIHdoaWxlICgobWF0Y2hlcyA9IGxleGVyLmV4ZWMoY3N2KSkgIT09IG51bGwpIHtcbiAgICBtYXRjaCA9IG1hdGNoZXNbMF1cblxuICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgIGNhc2UgMDogLy8gc3RhcnQgb2YgZW50cnlcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJ1wiJzpcbiAgICAgICAgICAgIHN0YXRlID0gM1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnLCc6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBpc05ld2xpbmUudGVzdChtYXRjaCk6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGVudHJ5RW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGN0eC52YWx1ZSArPSBtYXRjaFxuICAgICAgICAgICAgc3RhdGUgPSAyXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI6IC8vIHVuLWRlbGltaXRlZCBpbnB1dFxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnLCc6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBpc05ld2xpbmUudGVzdChtYXRjaCk6XG4gICAgICAgICAgICBzdGF0ZSA9IDBcbiAgICAgICAgICAgIHZhbHVlRW5kKGN0eClcbiAgICAgICAgICAgIGVudHJ5RW5kKGN0eClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHN0YXRlID0gNFxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENTVkVycm9yOiBJbGxlZ2FsIHN0YXRlIFtyb3c6JHtjdHgucm93fSwgY29sOiR7Y3R4LmNvbH1dYClcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOiAvLyBkZWxpbWl0ZWQgaW5wdXRcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJ1wiJzpcbiAgICAgICAgICAgIHN0YXRlID0gNFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc3RhdGUgPSAzXG4gICAgICAgICAgICBjdHgudmFsdWUgKz0gbWF0Y2hcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDogLy8gZXNjYXBlZCBvciBjbG9zaW5nIGRlbGltaXRlclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICBjYXNlIG1hdGNoID09PSAnXCInOlxuICAgICAgICAgICAgc3RhdGUgPSAzXG4gICAgICAgICAgICBjdHgudmFsdWUgKz0gbWF0Y2hcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBtYXRjaCA9PT0gJywnOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgaXNOZXdsaW5lLnRlc3QobWF0Y2gpOlxuICAgICAgICAgICAgc3RhdGUgPSAwXG4gICAgICAgICAgICB2YWx1ZUVuZChjdHgpXG4gICAgICAgICAgICBlbnRyeUVuZChjdHgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ1NWRXJyb3I6IElsbGVnYWwgc3RhdGUgW3Jvdzoke2N0eC5yb3d9LCBjb2w6JHtjdHguY29sfV1gKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLy8gZmx1c2ggdGhlIGxhc3QgdmFsdWVcbiAgaWYgKGN0eC5lbnRyeS5sZW5ndGggIT09IDApIHtcbiAgICB2YWx1ZUVuZChjdHgpXG4gICAgZW50cnlFbmQoY3R4KVxuICB9XG5cbiAgcmV0dXJuIGN0eC5vdXRwdXRcbn1cblxuLyoqXG4gKiBTdHJpbmdpZnkgdGFrZXMgYSAyIGRpbWVuc2lvbmFsIGFycmF5IG9mIGBbZW50cmllc11bdmFsdWVzXWAgYW5kIGNvbnZlcnRzIHRoZW0gdG8gQ1NWXG4gKlxuICogb3B0aW9uc1xuICogLSBlb2YgLSBhZGQgYSB0cmFpbGluZyBuZXdsaW5lIGF0IHRoZSBlbmQgb2YgZmlsZSBbdHJ1ZV1cbiAqXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgaW5wdXQgYXJyYXkgdG8gc3RyaW5naWZ5XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVwbGFjZXJdIGEgY3VzdG9tIGZ1bmN0aW9uIHRvIG1vZGlmeSB0aGUgdmFsdWVzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgQ1NWIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5IChhcnJheSwgb3B0aW9ucyA9IHt9LCByZXBsYWNlciA9IHYgPT4gdikge1xuICBjb25zdCBjdHggPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIGN0eC5vcHRpb25zID0gb3B0aW9uc1xuICBjdHgub3B0aW9ucy5lb2YgPSBjdHgub3B0aW9ucy5lb2YgIT09IHVuZGVmaW5lZCA/IGN0eC5vcHRpb25zLmVvZiA6IHRydWVcbiAgY3R4LnJvdyA9IDFcbiAgY3R4LmNvbCA9IDFcbiAgY3R4Lm91dHB1dCA9ICcnXG5cbiAgY29uc3QgbmVlZHNEZWxpbWl0ZXJzID0gL1wifCx8XFxyXFxufFxcbnxcXHIvXG5cbiAgYXJyYXkuZm9yRWFjaCgocm93LCBySWR4KSA9PiB7XG4gICAgbGV0IGVudHJ5ID0gJydcbiAgICBjdHguY29sID0gMVxuICAgIHJvdy5mb3JFYWNoKChjb2wsIGNJZHgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY29sID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2wgPSBjb2wucmVwbGFjZSgvXCIvZywgJ1wiXCInKVxuICAgICAgICBjb2wgPSBuZWVkc0RlbGltaXRlcnMudGVzdChjb2wpID8gYFwiJHtjb2x9XCJgIDogY29sXG4gICAgICB9XG4gICAgICBlbnRyeSArPSByZXBsYWNlcihjb2wsIGN0eC5yb3csIGN0eC5jb2wpXG4gICAgICBpZiAoY0lkeCAhPT0gcm93Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgZW50cnkgKz0gJywnXG4gICAgICB9XG4gICAgICBjdHguY29sKytcbiAgICB9KVxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBjdHgub3B0aW9ucy5lb2Y6XG4gICAgICBjYXNlICFjdHgub3B0aW9ucy5lb2YgJiYgcklkeCAhPT0gYXJyYXkubGVuZ3RoIC0gMTpcbiAgICAgICAgY3R4Lm91dHB1dCArPSBgJHtlbnRyeX1cXG5gXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjdHgub3V0cHV0ICs9IGAke2VudHJ5fWBcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgY3R4LnJvdysrXG4gIH0pXG5cbiAgcmV0dXJuIGN0eC5vdXRwdXRcbn1cblxuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiB2YWx1ZUVuZCAoY3R4KSB7XG4gIGNvbnN0IHZhbHVlID0gY3R4Lm9wdGlvbnMudHlwZWQgPyBpbmZlclR5cGUoY3R4LnZhbHVlKSA6IGN0eC52YWx1ZVxuICBjdHguZW50cnkucHVzaChjdHgucmV2aXZlcih2YWx1ZSwgY3R4LnJvdywgY3R4LmNvbCkpXG4gIGN0eC52YWx1ZSA9ICcnXG4gIGN0eC5jb2wrK1xufVxuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGVudHJ5RW5kIChjdHgpIHtcbiAgY3R4Lm91dHB1dC5wdXNoKGN0eC5lbnRyeSlcbiAgY3R4LmVudHJ5ID0gW11cbiAgY3R4LnJvdysrXG4gIGN0eC5jb2wgPSAxXG59XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gaW5mZXJUeXBlICh2YWx1ZSkge1xuICBjb25zdCBpc051bWJlciA9IC8uXFwuL1xuXG4gIHN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2UgdmFsdWUgPT09ICd0cnVlJzpcbiAgICBjYXNlIHZhbHVlID09PSAnZmFsc2UnOlxuICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZSdcbiAgICBjYXNlIGlzTnVtYmVyLnRlc3QodmFsdWUpOlxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG4gICAgY2FzZSBpc0Zpbml0ZSh2YWx1ZSk6XG4gICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUpXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2YWx1ZVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgcGFyc2UsIHN0cmluZ2lmeSB9IGZyb20gJ0B2YW5pbGxhZXMvY3N2JztcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDQ1MCwgd2lkdGg6IDUwMCB9KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZ2V0LWNvbGxlY3Rpb25zXCIpIHtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCkudGhlbigobG9jYWxDb2xsZWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbG9jYWxDb2xsZWN0aW9uIG9mIGxvY2FsQ29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbG9jYWxDb2xsZWN0aW9uLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBsb2NhbENvbGxlY3Rpb24uaWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImdldC1jb2xsZWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgIGJvZHk6IGNvbGxlY3Rpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICgobXNnLnR5cGUgPT09IFwiZXhwb3J0XCIpICYmIG1zZy5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBtc2cuY29sbGVjdGlvbjtcbiAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9uc0FzeW5jKCkudGhlbigobG9jYWxDb2xsZWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kZUlkcyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9kZU5hbWVzID0gW107XG4gICAgICAgICAgICAvLyBFeHRyYWN0IGNvbGxlY3Rpb24gaWQgYW5kIG1vZGVJZHNcbiAgICAgICAgICAgIGZvciAoY29uc3QgbG9jYWxDb2xsZWN0aW9uIG9mIGxvY2FsQ29sbGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxDb2xsZWN0aW9uLmlkID09PSBjb2xsZWN0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZSBvZiBsb2NhbENvbGxlY3Rpb24ubW9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVJZHMucHVzaChtb2RlLm1vZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlTmFtZXMucHVzaChtb2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVzQXN5bmMoXCJTVFJJTkdcIikudGhlbigodmFyaWFibGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUHJlcGFyZSBhbmQgZXhwb3J0IHZhcmlhYmxlIG9iamVjdFxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBbY29sbGVjdGlvbi5uYW1lLCAuLi5tb2RlTmFtZXNdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9ydFZhcmlhYmxlc09iamVjdCA9IFtdO1xuICAgICAgICAgICAgICAgIGV4cG9ydFZhcmlhYmxlc09iamVjdC5wdXNoKGhlYWRlcnMpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbi5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyaWFibGVWYWx1ZXNCeU1vZGUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZUlkIG9mIG1vZGVJZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXRlY3QgQWxpYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF0udHlwZSA9PT0gXCJWQVJJQUJMRV9BTElBU1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlVmFsdWVzQnlNb2RlLnB1c2goYERPIE5PVCBFRElUIChMSU5LRUQgVE8gQU5PVEhFUiBWQVJJQUJMRSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlVmFsdWVzQnlNb2RlLnB1c2godmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0VmFyaWFibGVzT2JqZWN0LnB1c2goW3ZhcmlhYmxlLm5hbWUsIC4uLnZhcmlhYmxlVmFsdWVzQnlNb2RlXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXhwb3J0VmFyaWFibGVzT2JqZWN0KTtcbiAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZXhwb3J0XCIsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ZEYXRhOiBzdHJpbmdpZnkoZXhwb3J0VmFyaWFibGVzT2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICgobXNnLnR5cGUgPT09IFwiaW1wb3J0XCIpICYmIChtc2cuaW1wb3J0ZWRDU1YpKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZENTViA9IHBhcnNlKG1zZy5pbXBvcnRlZENTVik7XG4gICAgICAgIC8vIEhBUkQgQ0hFQ0s6IENoZWNrIGlmIHRoZSBDU1YgaXMgZW1wdHlcbiAgICAgICAgaWYgKHBhcnNlZENTVi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIlRoYXQncyBhIGJsYW5rIENTViBmaWxlISBObyBwcmFua3MgcGxlYXNlIC1fLVwiLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhBUkQgQ0hFQ0s6IENoZWNrIGlmIHRoZXJlIGlzIG5vIG90aGVyIHJvdywgYXBhcnQgZnJvbSB0aGUgaGVhZGVyIHJvd1xuICAgICAgICBpZiAocGFyc2VkQ1NWLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiTm8gdmFyaWFibGVzIGZvdW5kIGluIHRoZSBDU1YgKGZpcnN0IHJvdyBpcyBjb25zaWRlcmVkIGFzIHRoZSBoZWFkZXIpXCIsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocGFyc2VkQ1NWKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHBhcnNlZENTVlswXTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBoZWFkZXJzWzBdO1xuICAgICAgICBjb25zdCBpbXBvcnRlZE1vZGVOYW1lcyA9IGhlYWRlcnMuc2xpY2UoMSk7XG4gICAgICAgIGNvbnN0IGltcG9ydGVkTW9kZUlkcyA9IFtdO1xuICAgICAgICBjb25zdCBpbXBvcnRlZFZhcmlhYmxlc09iamVjdCA9IFtdO1xuICAgICAgICBjb25zdCBpbXBvcnRlZFZhcmlhYmxlTmFtZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbW9kZXNPbkZpZ21hID0gW107XG4gICAgICAgIGNvbnN0IG1vZGVzSWRzT25GaWdtYSA9IFtdO1xuICAgICAgICBjb25zdCB2YXJpYWJsZU5hbWVzT25GaWdtYSA9IFtdO1xuICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zQXN5bmMoKS50aGVuKChsb2NhbENvbGxlY3Rpb25zKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIElkZW50aWZ5IGltcG9ydGVkIGNvbGxlY3Rpb24gYW5kIGl0cyBtb2RlcyBvbiBGaWdtYVxuICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxvY2FsQ29sbGVjdGlvbiBvZiBsb2NhbENvbGxlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsQ29sbGVjdGlvbi5uYW1lID09PSBjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gbG9jYWxDb2xsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGUgb2YgbG9jYWxDb2xsZWN0aW9uLm1vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2Rlc09uRmlnbWEucHVzaChtb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVzSWRzT25GaWdtYS5wdXNoKG1vZGUubW9kZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhBUkQgQ0hFQ0s6IENoZWNrIGlmIGNvbGxlY3Rpb24gZXhpc3RzIG9uIEZpZ21hXG4gICAgICAgICAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJGaXJzdCBjb2x1bW4gaGVhZGVyIGluIHRoZSBDU1YgZG9lcyBub3QgbWF0Y2ggYW55IGNvbGxlY3Rpb24gb24gRmlnbWFcIiwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDb21wYXJlIG1vZGVzIG9uIEZpZ21hIHdpdGggaW1wb3J0ZWQgbW9kZXMgXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGltcG9ydGVkTW9kZU5hbWUgb2YgaW1wb3J0ZWRNb2RlTmFtZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1wb3J0ZWRNb2RlSWQgPSBcIlVuZGVmaW5lZE1vZGVJZFwiO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbW9kZU9uRmlnbWEgb2YgbW9kZXNPbkZpZ21hKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlT25GaWdtYS5uYW1lID09PSBpbXBvcnRlZE1vZGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRlZE1vZGVJZCA9IG1vZGVPbkZpZ21hLm1vZGVJZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbXBvcnRlZE1vZGVJZHMucHVzaChpbXBvcnRlZE1vZGVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTT0ZUIENIRUNLOiBDaGVjayBpZiByZXF1aXJlZCBtb2RlcyBhcmUgYXZhaWxhYmxlXG4gICAgICAgICAgICAvLyBQcm9tcHQgaWYgc29tZSBtb2RlcyBhcmUgbWlzc2luZyBcbiAgICAgICAgICAgIC8vIFVzZXIgd2FudHMgdG8gY29udGludWU6IFVwZGF0ZSBvbmx5IG1vZGVzIHRoYXQgYXJlIHByZXNlbnQgIFxuICAgICAgICAgICAgLy8gVXNlciB3YW50cyB0byBzdG9wOiBBYm9ydCBpbXBvcnRcbiAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdNb2RlSWRzQ291bnQgPSBDb3VudE1pc3NpbmdFbGVtZW50cyhpbXBvcnRlZE1vZGVJZHMsIG1vZGVzSWRzT25GaWdtYSk7XG4gICAgICAgICAgICBpZiAobWlzc2luZ01vZGVJZHNDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IG5vdGlmaWNhdGlvbiBhbmQgd2FpdCBmb3IgYWN0aW9uXG4gICAgICAgICAgICAgICAgY29uc3QgbWlzc2luZ01vZGVzU29mdENoZWNrID0geWllbGQgTm90aWZ5QW5kQXdhaXRBY3Rpb24oYCR7bWlzc2luZ01vZGVJZHNDb3VudH0gbW9kZSR7bWlzc2luZ01vZGVJZHNDb3VudCA9PT0gMSA/IGBgIDogYHNgfSBvbiBGaWdtYSAke21pc3NpbmdNb2RlSWRzQ291bnQgPT09IDEgPyBgaXNgIDogYGFyZWB9IG1pc3NpbmcgaW4gdGhlIENTVmAsIFwiQ29udGludWUgYW55d2F5XCIpO1xuICAgICAgICAgICAgICAgIGlmICghbWlzc2luZ01vZGVzU29mdENoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDb250aW51ZSBpZiB1c2VyIGlzIG9rYXkgd2l0aCBieXBhc3NpbmcgbW9kZXMgc29mdCBjaGVja1xuICAgICAgICAgICAgLy8gU2FuaXRpc2UgYW5kIHBvcHVsYXRlIGltcG9ydCB2YXJpYWJsZXMgb2JqZWN0XG4gICAgICAgICAgICAvLyBTdGFydGluZyBhdCAxIHRvIHNraXAgdGhlIGNvbHVtbiBoZWFkZXIgcm93IGluIHBhcnNlZENTVlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXJzZWRDU1YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBDb2xsZWN0IHZhcmlhYmxlcyBmb3IgbWlzc2luZyB2YXJpYWJsZXMgc29mdCBjaGVjayBhbmQgbmV3IHZhcmlhYmxlcyBzb2Z0IGNoZWNrXG4gICAgICAgICAgICAgICAgaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLnB1c2gocGFyc2VkQ1NWW2ldWzBdKTtcbiAgICAgICAgICAgICAgICAvLyBQb3B1bGF0ZSB2YXJpYWJsZXMgb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzQnlNb2RlID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbXBvcnRlZE1vZGVJZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzQnlNb2RlW2ltcG9ydGVkTW9kZUlkc1tqXV0gPSBwYXJzZWRDU1ZbaV1baiArIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbXBvcnRlZFZhcmlhYmxlc09iamVjdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcGFyc2VkQ1NWW2ldWzBdLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNCeU1vZGU6IHZhbHVlc0J5TW9kZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW1wb3J0ZWRWYXJpYWJsZXNPYmplY3QpO1xuICAgICAgICAgICAgLy8gQ29sbGVjdCB0aGUgY29sbGVjdGlvbidzIHZhcmlhYmxlIG5hbWVzIG9uIEZpZ21hXG4gICAgICAgICAgICBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZXNBc3luYyhcIlNUUklOR1wiKS50aGVuKCh2YXJpYWJsZXMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFibGUgb2YgdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZS52YXJpYWJsZUNvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbi5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVOYW1lc09uRmlnbWEucHVzaCh2YXJpYWJsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSBpZiB0aGVyZSBhcmUgZXhpc3RpbmcgdmFyaWFibGVzIGluIHRoZSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlTmFtZXNPbkZpZ21hLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU09GVCBDSEVDSzogQ2hlY2sgaWYgcmVxdWlyZWQgdmFyaWFibGVzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvbXB0IGlmIHNvbWUgdmFyaWFibGVzIGFyZSBtaXNzaW5nIFxuICAgICAgICAgICAgICAgICAgICAvLyBVc2VyIHdhbnRzIHRvIGNvbnRpbnVlOiBVcGRhdGUgb25seSB2YXJpYWJsZXMgdGhhdCBhcmUgcHJlc2VudCAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZXIgd2FudHMgdG8gc3RvcDogQWJvcnQgaW1wb3J0XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdWYXJpYWJsZXNDb3VudCA9IENvdW50TWlzc2luZ0VsZW1lbnRzKGltcG9ydGVkVmFyaWFibGVOYW1lcywgdmFyaWFibGVOYW1lc09uRmlnbWEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWlzc2luZ1ZhcmlhYmxlc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyaWFibGVzVG9VcGRhdGVDb3VudCA9IHZhcmlhYmxlTmFtZXNPbkZpZ21hLmxlbmd0aCAtIG1pc3NpbmdWYXJpYWJsZXNDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNob3cgbm90aWZpY2F0aW9uIGFuZCB3YWl0IGZvciBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdWYXJpYWJsZXNTb2Z0Q2hlY2sgPSB5aWVsZCBOb3RpZnlBbmRBd2FpdEFjdGlvbihgT25seSAke3ZhcmlhYmxlc1RvVXBkYXRlQ291bnR9IG9mICR7dmFyaWFibGVOYW1lc09uRmlnbWEubGVuZ3RofSB2YXJpYWJsZSR7dmFyaWFibGVzVG9VcGRhdGVDb3VudCA9PT0gMSA/IGBgIDogYHNgfSBvbiBGaWdtYSwgd2lsbCBiZSB1cGRhdGVkIGZyb20gdGhlIENTVi5gLCBcIkNvbnRpbnVlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtaXNzaW5nVmFyaWFibGVzU29mdENoZWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyB2YXJpYWJsZXMgaWYgbWlzc2luZyB2YXJpYWJsZXMgc29mdCBjaGVjayBpcyBwYXNzZWRcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlVmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uLCB2YXJpYWJsZXMsIG1vZGVzSWRzT25GaWdtYSwgaW1wb3J0ZWRNb2RlSWRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU09GVCBDSEVDSzogQ2hlY2sgaWYgdGhlcmUgYXJlIG5ldyB2YXJpYWJsZXMgaW4gdGhlIENTVlxuICAgICAgICAgICAgICAgIC8vIFByb21wdCBpZiB0aGVyZSBhcmUgbmV3IHZhcmlhYmxlcyBpbiB0aGUgQ1NWXG4gICAgICAgICAgICAgICAgLy8gVXNlciB3YW50cyB0byBjb250aW51ZTogQ3JlYXRlIHRob3NlIG5ldyB2YXJpYWJsZXMgXG4gICAgICAgICAgICAgICAgLy8gVXNlciB3YW50cyB0byBzdG9wOiBBYm9ydCBpbXBvcnRcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdWYXJpYWJsZUluZGV4ZXMgPSBHZXROZXdWYXJpYWJsZUluZGV4ZXMoaW1wb3J0ZWRWYXJpYWJsZU5hbWVzLCB2YXJpYWJsZU5hbWVzT25GaWdtYSk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhcmlhYmxlSW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgbm90aWZpY2F0aW9uIGFuZCB3YWl0IGZvciBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmFyaWFibGVzU29mdENoZWNrID0geWllbGQgTm90aWZ5QW5kQXdhaXRBY3Rpb24oYCR7bmV3VmFyaWFibGVJbmRleGVzLmxlbmd0aH0gbmV3IHZhcmlhYmxlJHtuZXdWYXJpYWJsZUluZGV4ZXMubGVuZ3RoID09PSAxID8gYGAgOiBgc2B9IGZvdW5kIGluIHRoZSBDU1YuIENyZWF0ZSB0aGVzZSBvbiBGaWdtYT9gLCBcIlllc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdWYXJpYWJsZXNTb2Z0Q2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHZhcmlhYmxlcyBpZiBuZXcgdmFyaWFibGVzIHNvZnQgY2hlY2sgaXMgcGFzc2VkXG4gICAgICAgICAgICAgICAgICAgIENyZWF0ZU5ld1ZhcmlhYmxlcyhpbXBvcnRlZFZhcmlhYmxlc09iamVjdCwgY29sbGVjdGlvbiwgbW9kZXNJZHNPbkZpZ21hLCBpbXBvcnRlZE1vZGVJZHMsIG5ld1ZhcmlhYmxlSW5kZXhlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgfVxufTtcbmZ1bmN0aW9uIFVwZGF0ZVZhcmlhYmxlcyhpbXBvcnRlZFZhcmlhYmxlc09iamVjdCwgY29sbGVjdGlvbiwgdmFyaWFibGVzLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcykge1xuICAgIGZpZ21hLm5vdGlmeShcIlVwZGF0aW5nIHZhcmlhYmxlIHZhbHVlcywgaG9sZCBvbi4uLlwiKTtcbiAgICAvLyBCZWdpbiB1cGRhdGluZyB2YXJpYWJsZXNcbiAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgICBpZiAodmFyaWFibGUudmFyaWFibGVDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb24uaWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaW1wb3J0ZWRWYXJpYWJsZSBvZiBpbXBvcnRlZFZhcmlhYmxlc09iamVjdCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBvbmx5IHRob3NlIHZhcmlhYmxlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBDU1YuIE5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaGFzIGJ5cGFzc2VkIG1pc3NpbmcgdmFyaWFibGVzIHNvZnQgY2hlY2suXG4gICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkVmFyaWFibGUubmFtZSA9PT0gdmFyaWFibGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBvbmx5IHRob3NlIG1vZGVzIHRoYXQgYXJlIHByZXNlbnQgaW4gdGhlIENTVi4gTmVlZGVkIGZvciBjYXNlcyB3aGVyZSB0aGUgdXNlciBoYXMgYnlwYXNzZWQgbWlzc2luZyBtb2RlcyBzb2Z0IGNoZWNrLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydGVkTW9kZUlkcy5pbmNsdWRlcyhtb2RlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBpZiB0aGUgdmFsdWUgaXMgYW4gYWxpYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRWYXJpYWJsZS52YWx1ZXNCeU1vZGVbbW9kZUlkXSAhPT0gXCJETyBOT1QgRURJVCAoTElOS0VEIFRPIEFOT1RIRVIgVkFSSUFCTEUpXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlLnNldFZhbHVlRm9yTW9kZShtb2RlSWQsIGltcG9ydGVkVmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGVJZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYENvdWxkIG5vdCB1cGRhdGUgJHt2YXJpYWJsZS5uYW1lfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoYEltcG9ydCBhYm9ydGVkLiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIHZhbHVlIGluIHRoZSBDU1YuYCwgeyBlcnJvcjogdHJ1ZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgJHtlcnJvcn1gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpZ21hLm5vdGlmeShgVXBkYXRlZCB2YXJpYWJsZXMgb2YgJHtjb2xsZWN0aW9uLm5hbWV9YCwgeyB0aW1lb3V0OiAyMDAwIH0pO1xufVxuZnVuY3Rpb24gQ3JlYXRlTmV3VmFyaWFibGVzKGltcG9ydGVkVmFyaWFibGVzT2JqZWN0LCBjb2xsZWN0aW9uLCBtb2Rlc0lkc09uRmlnbWEsIGltcG9ydGVkTW9kZUlkcywgbmV3VmFyaWFibGVJbmRleGVzKSB7XG4gICAgZmlnbWEubm90aWZ5KFwiQ3JlYXRpbmcgbmV3IHZhcmlhYmxlcywgaG9sZCBvbi4uLlwiKTtcbiAgICBmb3IgKGNvbnN0IGluZGV4IG9mIG5ld1ZhcmlhYmxlSW5kZXhlcykge1xuICAgICAgICBjb25zdCBuZXdWYXJpYWJsZURhdGEgPSBpbXBvcnRlZFZhcmlhYmxlc09iamVjdFtpbmRleF07XG4gICAgICAgIC8vIENyZWF0ZSBuZXcgdmFyaWFibGUgYW5kIHNldCB2YWx1ZXMgZm9yIG1vZGVzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYXJpYWJsZSA9IGZpZ21hLnZhcmlhYmxlcy5jcmVhdGVWYXJpYWJsZShuZXdWYXJpYWJsZURhdGEubmFtZSwgY29sbGVjdGlvbiwgXCJTVFJJTkdcIik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vZGVJZCBvZiBtb2Rlc0lkc09uRmlnbWEpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb25seSB0aG9zZSBtb2RlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBDU1YuIE5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaGFzIGJ5cGFzc2VkIG1pc3NpbmcgbW9kZXMgc29mdCBjaGVjay5cbiAgICAgICAgICAgICAgICBpZiAoaW1wb3J0ZWRNb2RlSWRzLmluY2x1ZGVzKG1vZGVJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFyaWFibGUuc2V0VmFsdWVGb3JNb2RlKG1vZGVJZCwgbmV3VmFyaWFibGVEYXRhLnZhbHVlc0J5TW9kZVttb2RlSWRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShgQ291bGQgbm90IGNyZWF0ZSB2YXJpYWJsZSAke25ld1ZhcmlhYmxlRGF0YS5uYW1lfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoYEltcG9ydCBhYm9ydGVkLiBQbGVhc2UgY2hlY2sgdGhlIHZhcmlhYmxlIG5hbWUgYW5kIGl0cyB2YWx1ZXMgaW4gdGhlIENTVi5gLCB7IGVycm9yOiB0cnVlLCB0aW1lb3V0OiA1MDAwIH0pO1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KGAke2Vycm9yfWAsIHsgZXJyb3I6IHRydWUsIHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlnbWEubm90aWZ5KGBDcmVhdGVkICR7bmV3VmFyaWFibGVJbmRleGVzLmxlbmd0aH0gbmV3IHZhcmlhYmxlJHtuZXdWYXJpYWJsZUluZGV4ZXMubGVuZ3RoID09PSAxID8gYGAgOiBgc2B9IG9uIEZpZ21hYCwgeyB0aW1lb3V0OiAyMDAwIH0pO1xufVxuZnVuY3Rpb24gQ291bnRNaXNzaW5nRWxlbWVudHMoYXJyYXlUb0NoZWNrLCByZWZlcmVuY2VBcnJheSkge1xuICAgIGxldCBtaXNzaW5nQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiByZWZlcmVuY2VBcnJheSkge1xuICAgICAgICBpZiAoIWFycmF5VG9DaGVjay5pbmNsdWRlcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgbWlzc2luZ0NvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1pc3NpbmdDb3VudDtcbn1cbmZ1bmN0aW9uIEdldE5ld1ZhcmlhYmxlSW5kZXhlcyhpbXBvcnRlZFZhcmlhYmxlTmFtZXMsIHZhcmlhYmxlTmFtZXNPbkZpZ21hKSB7XG4gICAgY29uc3QgbmV3VmFyaWFibGVJbmRleGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbXBvcnRlZFZhcmlhYmxlTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF2YXJpYWJsZU5hbWVzT25GaWdtYS5pbmNsdWRlcyhpbXBvcnRlZFZhcmlhYmxlTmFtZXNbaV0pKSB7XG4gICAgICAgICAgICBuZXdWYXJpYWJsZUluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3VmFyaWFibGVJbmRleGVzO1xufVxuZnVuY3Rpb24gTm90aWZ5QW5kQXdhaXRBY3Rpb24obWVzc2FnZSwgYnV0dG9uVGV4dCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkobWVzc2FnZSwge1xuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICBvbkRlcXVldWU6IChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJhY3Rpb25fYnV0dG9uX2NsaWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7IC8vIFVzZXIgY2xpY2tlZCBcIkNvbnRpbnVlIGltcG9ydFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2VyIGNsaWNrZWQgdGhlIGNyb3NzIGJ1dHRvbiBvciBub3RpZmljYXRpb24gd2FzIGRpc21pc3NlZCBvdGhlcndpc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogYnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpOyAvLyBVc2VyIGNsaWNrZWQgXCJDb250aW51ZSBpbXBvcnRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7IHJlc29sdmUodHJ1ZSk7IH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAvLyBDYXRjaCBhbnkgc3luY2hyb25vdXMgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBmaWdtYS5ub3RpZnkgY2FsbCBpdHNlbGZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiSW1wb3J0IGFib3J0ZWRcIik7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTsgLy8gSW5kaWNhdGUgYWJvcnRpb24gZHVlIHRvIGludGVybmFsIGVycm9yXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9