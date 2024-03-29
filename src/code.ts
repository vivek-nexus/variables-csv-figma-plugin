import { parse, stringify } from '@vanillaes/csv'

type VariablesSchema = {
  name: string
  valuesByMode: {
    [modeId: string]: any
  }
}

figma.showUI(__html__, { height: 580, width: 600 })

figma.ui.onmessage = (msg: { type: string, collection: string, importedCSV: string }) => {
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
      figma.variables.getLocalVariablesAsync().then((variables) => {
        const exportVariablesObject: VariablesSchema[] = []

        for (const variable of variables) {
          if (variable.resolvedType === "COLOR")
            continue
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
    const parsedCSV: any[][] = parse(msg.importedCSV, { typed: true })
    // check if the CSV is empty 001
    if (parsedCSV.length === 0) {
      figma.notify("That's a blank CSV file! No pranks please -_-", { error: true, timeout: 5000 })
      return
    }
    console.log(parsedCSV)
    const headers = parsedCSV[0]
    const collection = headers[0]
    const importedModeIds: string[] = headers.slice(1)
    const importedVariablesObject: VariablesSchema[] = []
    const importedVariableNames: string[] = []

    // sanitise and populate import variables
    for (let i = 1; i < parsedCSV.length; i++) {
      importedVariableNames.push(parsedCSV[i][0])

      const valuesByMode: { [modeId: string]: any } = {}
      for (let j = 0; j < importedModeIds.length; j++) {
        valuesByMode[importedModeIds[j]] = parsedCSV[i][j + 1]
      }
      importedVariablesObject.push({
        name: parsedCSV[i][0],
        valuesByMode: valuesByMode
      })
    }

    console.log(importedVariablesObject)


    const modesIdsOnFigma: string[] = []

    // check if CSV is empty 002
    if (importedVariableNames.length === 0) {
      figma.notify("No variables found in the CSV", { error: true, timeout: 5000 })
      return
    }

    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      let collectionId = ""
      for (const localCollection of localCollections) {
        if (localCollection.name === collection) {
          collectionId = localCollection.id
          for (const mode of localCollection.modes)
            modesIdsOnFigma.push(mode.modeId)
        }
      }
      // check if collection exists on Figma 003
      if (collectionId === "") {
        figma.notify("Variable collection in the CSV does not match any collection", { error: true, timeout: 5000 })
        return
      }
      // check if required modes are available 004
      if (!CheckSubset(importedModeIds, modesIdsOnFigma)) {
        figma.notify("One or more columns in the CSV do not match or are missing", { error: true, timeout: 5000 })
        return
      }


      figma.variables.getLocalVariablesAsync().then((variables) => {
        const variableNamesOnFigma: string[] = []
        // check if any Figma variables are missing in the CSV 005
        for (const variable of variables) {
          if (variable.resolvedType === "COLOR")
            continue
          if (variable.variableCollectionId === collectionId) {
            variableNamesOnFigma.push(variable.name)
            if (importedVariableNames.indexOf(variable.name) === -1) {
              figma.notify("One or more variables in the corresponding collection, are missing in the CSV", { error: true, timeout: 5000 })
              return
            }
          }
        }

        // update variables if no issues found
        UpdateVariables(importedVariablesObject, collection, collectionId, modesIdsOnFigma)

      })
    })
  }

  // figma.closePlugin();
}

function ExportToCSV(exportVariablesObject: VariablesSchema[], collection: string): string {
  // Create headers
  const headers = [collection, ...Object.keys(exportVariablesObject[0].valuesByMode)];
  const rows = []

  // Create rows
  for (const item of exportVariablesObject) {
    const row = []
    row.push(item.name)
    for (const modeId in item.valuesByMode)
      row.push(item.valuesByMode[modeId])
    rows.push(row)
  }

  const csv = [headers, ...rows]
  console.log(stringify(csv))

  return (stringify(csv))
}

function UpdateVariables(importedVariablesObject: VariablesSchema[], collection: string, collectionId: string, modesIdsOnFigma: string[]) {
  figma.notify("Updating variable values...")
  figma.variables.getLocalVariablesAsync().then((variables) => {
    // begin updating variables
    for (const variable of variables) {
      if (variable.resolvedType === "COLOR")
        continue
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

function CheckSubset(parentArray: string[], subsetArray: string[]) {
  return subsetArray.every((el) => {
    return parentArray.includes(el)
  })
}
