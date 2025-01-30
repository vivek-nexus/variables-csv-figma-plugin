import { parse, stringify } from '@vanillaes/csv'

type ImportedVariablesSchema = {
  name: string
  valuesByMode: {
    [modeId: string]: string
  }
}

type Collection = {
  name: string,
  id: string
}

type String2dArray = string[][]

figma.showUI(__html__, { height: 600, width: 600 })

figma.ui.onmessage = (msg: { type: string, collection?: Collection, importedCSV: string }) => {
  if (msg.type === "get-collections") {
    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      const collections: Collection[] = []
      for (const localCollection of localCollections) {
        collections.push({
          name: localCollection.name,
          id: localCollection.id
        })
      }
      figma.ui.postMessage({
        type: "get-collections",
        body: collections
      })
    })
  }

  if ((msg.type === "export") && msg.collection) {
    const collection = msg.collection
    figma.variables.getLocalVariableCollectionsAsync().then((localCollections) => {
      const modeIds: string[] = []
      const modeNames: string[] = []

      // Extract collection id and modeIds
      for (const localCollection of localCollections) {
        if (localCollection.id === collection.id) {
          for (const mode of localCollection.modes) {
            modeIds.push(mode.modeId)
            modeNames.push(mode.name)
          }
        }
      }

      figma.variables.getLocalVariablesAsync("STRING").then((variables) => {
        // Prepare and export variable object
        const headers = [collection.name, ...modeNames]
        const exportVariablesObject: String2dArray = []
        exportVariablesObject.push(headers)

        for (const variable of variables) {
          if (variable.variableCollectionId === collection.id) {
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
            collection: collection,
            csvData: stringify(exportVariablesObject)
          }
        })
      })
    })
  }

  if (msg.type === "import") {
    const parsedCSV: String2dArray = parse(msg.importedCSV)

    // HARD CHECK: Check if the CSV is empty
    if (parsedCSV.length === 0) {
      figma.notify("That's a blank CSV file! No pranks please -_-", { error: true, timeout: 5000 })
      return
    }

    // HARD CHECK: Check if there is at least one variable row, apart from the header row
    if (parsedCSV.length <= 1) {
      figma.notify("No variables found in the CSV", { error: true, timeout: 5000 })
      return
    }

    console.log(parsedCSV)
    const headers = parsedCSV[0]
    const collectionName = headers[0]
    const importedModeNames: string[] = headers.slice(1)
    const importedModeIds: string[] = []
    const importedVariablesObject: ImportedVariablesSchema[] = []
    const importedVariableNames: string[] = []
    const variableNamesOnFigma: string[] = []


    figma.variables.getLocalVariableCollectionsAsync().then(async (localCollections) => {
      const modesOnFigma: { modeId: string; name: string }[] = []
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

      // HARD CHECK: Check if collection exists on Figma
      if (collectionId === "") {
        figma.notify("First column header in the CSV does not match any collection on Figma", { error: true, timeout: 5000 })
        return
      }

      // Map importedModes with modesOnFigma
      for (const importedModeName of importedModeNames) {
        let importedModeId = "UndefinedModeId"
        for (const modeOnFigma of modesOnFigma) {
          if (modeOnFigma.name === importedModeName)
            importedModeId = modeOnFigma.modeId
        }
        importedModeIds.push(importedModeId)
      }

      // SOFT CHECK: Check if required modes are available
      // Prompt if some modes are missing 
      // User wants to continue: Update only modes that are present  
      // User wants to stop: Abort import
      const missingModeIdsCount = CountMissingElements(importedModeIds, modesIdsOnFigma)
      if (missingModeIdsCount > 0) {
        // Show notification and wait for action
        try {
          await new Promise<void>((resolve, reject) => {
            figma.notify(`${missingModeIdsCount} modes on Figma are missing in the CSV`, {
              error: false,
              timeout: Infinity,
              onDequeue: (reason) => {
                if (reason === "action_button_click") {
                  resolve()
                } else {
                  reject(new Error("Notification dismissed without a confirmation to continue"))
                }
              },
              button: {
                text: "Continue import",
                action: () => {
                  resolve()
                }
              }
            })
          })
        }
        catch (error) {
          // Abort import
          console.log(error)
          figma.notify("Import aborted")
          return
        }
      }
      // Continue if no issues found or if user is okay with bypassing modes soft check

      // Sanitise and populate import variables object
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

      // SOFT CHECK: Check if required variables are available
      // Prompt if some variables are missing 
      // User wants to continue: Update only variables that are present  
      // User wants to stop: Abort import
      figma.variables.getLocalVariablesAsync("STRING").then(async (variables) => {
        for (const variable of variables) {
          if (variable.variableCollectionId === collectionId) {
            variableNamesOnFigma.push(variable.name)
          }
        }

        const missingVariablesCount = CountMissingElements(importedVariableNames, variableNamesOnFigma)

        if (missingVariablesCount > 0) {
          // Show notification and wait for action
          try {
            await new Promise<void>((resolve, reject) => {
              figma.notify(`${missingVariablesCount} variables on Figma are missing in the CSV`, {
                error: false,
                timeout: Infinity,
                onDequeue: (reason) => {
                  if (reason === "action_button_click") {
                    resolve()
                  } else {
                    reject(new Error("Notification dismissed without a confirmation to continue"))
                  }
                },
                button: {
                  text: "Continue import",
                  action: () => {
                    resolve()
                  }
                }
              })
            })
          }
          catch (error) {
            // Abort import
            console.log(error)
            figma.notify("Import aborted")
            return
          }
        }

        // Update variables if all checks have passed
        UpdateVariables(importedVariablesObject, collectionName, collectionId, modesIdsOnFigma, importedModeIds)
      })
    })
  }
}



function UpdateVariables(importedVariablesObject: ImportedVariablesSchema[], collectionName: string, collectionId: string, modesIdsOnFigma: string[], importedModeIds: string[]) {
  figma.notify("Updating variable values, hold on...")
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
                  variable.setValueForMode(modeId, importedVariable.valuesByMode[modeId])
                }
                catch (error) {
                  console.error(error)
                  figma.notify(`Could not update ${variable.name}`, { error: true, timeout: 5000 })
                  figma.notify(`Import aborted. Please check the variable value in the CSV.`, { error: true, timeout: 5000 })
                  figma.notify(`${error}`, { error: true, timeout: 5000 })
                  return
                }
              }
            }
          }
        }
      }
    }
    figma.notify(`Successfully updated variable values of ${collectionName} from the CSV`)
  })
}

function CountMissingElements(arrayToCheck: string[], referenceArray: string[]) {
  let missingCount = 0

  for (const element of referenceArray) {
    if (!arrayToCheck.includes(element)) {
      missingCount++
    }
  }

  return missingCount
}
