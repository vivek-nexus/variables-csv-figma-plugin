type VariablesSchema = {
  name: string
  valuesByMode: {
    [modeId: string]: any
  }
}

figma.showUI(__html__, { height: 600, width: 700 })

figma.ui.onmessage = (msg: { type: string, collection: string, importedCSV: VariablesSchema[] }) => {
  if (msg.type === "get-collections") {
    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      const collections = []
      for (const collection of localCollections) {
        collections.push(collection.name)
      }
      figma.ui.postMessage({
        type: "get-collections",
        body: collections
      })
    })
  }

  if (msg.type === "export") {
    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      let collectionId = ""

      // store collection id
      for (const collection of localCollections) {
        if (collection.name === msg.collection) {
          collectionId = collection.id
        }
      }

      // populate and respond with the variables of the requested collection
      figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        const exportVariablesObject: VariablesSchema[] = []

        for (const variable of variables) {
          if (variable.variableCollectionId === collectionId) {
            exportVariablesObject.push({
              name: variable.name,
              valuesByMode: variable.valuesByMode
            })
          }
        }

        figma.ui.postMessage({
          type: "export",
          body: {
            collection: msg.collection,
            csvData: ExportToCSV(exportVariablesObject, msg.collection)
          }
        })
      })
    })
  }

  if (msg.type === "import") {
    const importedVariablesObject: VariablesSchema[] = msg.importedCSV
    const importedVariableNames: string[] = []
    for (const item of importedVariablesObject)
      importedVariableNames.push(item.name)
    const modesIdsOnFigma: string[] = []

    // check if CSV is empty 001
    if (importedVariableNames.length === 0) {
      figma.notify("No variables found in the CSV", { error: true, timeout: 5000 })
      return
    }

    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      let collectionId = ""
      for (const collection of localCollections) {
        if (collection.name === msg.collection) {
          collectionId = collection.id
          for (const mode of collection.modes)
            modesIdsOnFigma.push(mode.modeId)
        }
      }
      // check if collection exists on Figma 002
      if (collectionId === "") {
        figma.notify("Variable collection in the CSV does not match any collection on this Figma file", { error: true, timeout: 5000 })
        return
      }
      // check if modes match with Figma 003
      const importedModeIds = Object.keys(importedVariablesObject[0]?.valuesByMode)
      if (JSON.stringify(importedModeIds) !== JSON.stringify(modesIdsOnFigma)) {
        figma.notify("Columns in the CSV do not match the modes in the corresponding collection on this Figma file", { error: true, timeout: 5000 })
        return
      }


      figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        const variableNamesOnFigma: string[] = []
        // check if any Figma variables are missing in the CSV
        for (const variable of variables) {
          if (variable.variableCollectionId === collectionId) {
            variableNamesOnFigma.push(variable.name)
            if (importedVariableNames.indexOf(variable.name) === -1) {
              figma.notify("One or more variables in the corresponding collection on this Figma file, are missing in the CSV", { error: true, timeout: 5000 })
              return
            }
          }
        }
        // check if variable counts in the collection match with that on Figma 004
        if (variableNamesOnFigma.length !== importedVariableNames.length) {
          figma.notify("Variable count in the CSV does not match the count in the corresponding collection on this Figma file", { error: true, timeout: 5000 })
          return
        }

        // update variables if no issues found
        UpdateVariables(importedVariablesObject, msg.collection, collectionId, modesIdsOnFigma)

      })
    })
  }

  // figma.closePlugin();
}

function ExportToCSV(data: VariablesSchema[], collection: string): string {
  // Create headers
  const headers = [collection, ...Object.keys(data[0].valuesByMode)];

  // Create rows
  const rows = data.map((item) => {
    const values = [item.name]
    Object.keys(item.valuesByMode).forEach((key) => {
      let value = item.valuesByMode[key]
      // check if value contains "", escape with "" ""
      if (typeof value === 'string' && value.includes('"')) {
        value = value.replace(/"/g, '""');
      }
      // Check if value contains commas, and if so, encapsulate it within double quotes
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`
      }
      values.push(value)
    })
    return values.join(',')
  })

  // Combine headers and rows
  const csv = [headers.join(','), ...rows].join('\n')

  return csv
}

function UpdateVariables(importedVariablesObject: VariablesSchema[], collection: string, collectionId: string, modesIdsOnFigma: string[]) {
  figma.notify("Updating variable values...")
  figma.variables.getLocalVariablesAsync().then((variables) => {
    // begin updating variables
    for (const variable of variables) {
      if (variable.variableCollectionId === collectionId) {
        for (const importedVariable of importedVariablesObject) {
          if (importedVariable.name === variable.name) {
            for (const modeId of modesIdsOnFigma) {
              variable.setValueForMode(modeId, importedVariable.valuesByMode[modeId])
            }
          }
        }
      }
    }
    figma.notify(`Successfully updated variable values of ${collection} from CSV`)
  })
}
