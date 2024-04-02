import { parse, stringify } from '@vanillaes/csv'

type ImportedVariablesSchema = {
  name: string
  valuesByMode: {
    [modeId: string]: any
  }
}

type VariablesCommonBufferSchema = string[][]

figma.showUI(__html__, { height: 600, width: 600 })

figma.ui.onmessage = (msg: { type: string, collectionName?: string, importedCSV: string }) => {
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

  if ((msg.type === "export") && msg.collectionName) {
    const collectionName = msg.collectionName
    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      let collectionId = ""
      const modeIds: string[] = []
      const modeNames: string[] = []

      // extract collection id and modeIds
      for (const collection of localCollections) {
        if (collection.name === collectionName) {
          collectionId = collection.id
          for (const mode of collection.modes) {
            modeIds.push(mode.modeId)
            modeNames.push(mode.name)
          }
        }
      }

      figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        // prepare and export variable object
        const headers = [collectionName, ...modeNames]
        const exportVariablesObject: VariablesCommonBufferSchema = []
        exportVariablesObject.push(headers)

        for (const variable of variables) {
          if (variable.variableCollectionId === collectionId) {
            const variableValuesByMode: string[] = []
            for (const modeId of modeIds) {
              variableValuesByMode.push(variable.valuesByMode[modeId].toString())
            }
            exportVariablesObject.push([variable.name, ...variableValuesByMode])
          }
        }

        console.log(exportVariablesObject)

        figma.ui.postMessage({
          type: "export",
          body: {
            collectionName: collectionName,
            csvData: stringify(exportVariablesObject)
          }
        })
      })
    })
  }

  if (msg.type === "import") {
    const parsedCSV: VariablesCommonBufferSchema = parse(msg.importedCSV)
    // check if the CSV is empty 001
    if (parsedCSV.length === 0) {
      figma.notify("That's a blank CSV file! No pranks please -_-", { error: true, timeout: 5000 })
      return
    }
    console.log(parsedCSV)
    const headers = parsedCSV[0]
    const collectionName = headers[0]
    const importedModeNames: string[] = headers.slice(1)
    const importedModeIds: string[] = []
    const importedVariablesObject: ImportedVariablesSchema[] = []
    const importedVariableNames: string[] = []


    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      const modesOnFigma: { modeId: string; name: string; }[] = []
      const modesIdsOnFigma: string[] = []

      let collectionId = ""
      for (const localCollection of localCollections) {
        if (localCollection.name === collectionName) {
          collectionId = localCollection.id
          for (const mode of localCollection.modes) {
            modesOnFigma.push(mode)
            modesIdsOnFigma.push(mode.modeId)
          }
        }
      }

      // check if collection exists on Figma 002
      if (collectionId === "") {
        figma.notify("First column header in the CSV does not match any collection on Figma", { error: true, timeout: 5000 })
        return
      }

      // map importedModes with modesOnFigma
      for (const importedModeName of importedModeNames) {
        for (const modeOnFigma of modesOnFigma) {
          if (modeOnFigma.name === importedModeName)
            importedModeIds.push(modeOnFigma.modeId)
          else
            importedModeIds.push("UndefinedModeId")
        }
      }

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

      // check if there are any variables 003
      if (importedVariableNames.length === 0) {
        figma.notify("No variables found in the CSV", { error: true, timeout: 5000 })
        return
      }

      // check if required modes are available 004 and 004_more_columns (should pass)
      if (!CheckSubset(importedModeIds, modesIdsOnFigma)) {
        figma.notify("One or more columns in the CSV do not match or are missing", { error: true, timeout: 5000 })
        return
      }

      figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        const variableNamesOnFigma: string[] = []
        // check if any Figma variables are missing in the CSV 005
        for (const variable of variables) {

          if (variable.variableCollectionId === collectionId) {
            variableNamesOnFigma.push(variable.name)
            if (importedVariableNames.indexOf(variable.name) === -1) {
              figma.notify("One or more variables in the Figma collection, are missing in the CSV", { error: true, timeout: 5000 })
              return
            }
          }
        }

        // update variables if no issues found
        UpdateVariables(importedVariablesObject, collectionName, collectionId, modesIdsOnFigma)
      })
    })
  }
}



function UpdateVariables(importedVariablesObject: ImportedVariablesSchema[], collectionName: string, collectionId: string, modesIdsOnFigma: string[]) {
  figma.notify("Updating variable values, hold on...")
  figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
    // begin updating variables
    for (const variable of variables) {
      if (variable.variableCollectionId === collectionId) {
        for (const importedVariable of importedVariablesObject) {
          if (importedVariable.name === variable.name) {
            for (const modeId of modesIdsOnFigma) {
              try {
                variable.setValueForMode(modeId, importedVariable.valuesByMode[modeId])
              } catch (error) {
                figma.notify(`Could not update ${variable.name}`, { error: true, timeout: 5000 })
                figma.notify(`Import aborted. Please check the variable value in the CSV.`, { error: true, timeout: 5000 })
                return
              }
            }
          }
        }
      }
    }
    figma.notify(`Successfully updated variable values of ${collectionName} from the CSV`)
  })
}

function CheckSubset(parentArray: string[], subsetArray: string[]) {
  return subsetArray.every((el) => {
    return parentArray.includes(el)
  })
}
