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

figma.showUI(__html__, { height: 450, width: 500 })

figma.ui.onmessage = (msg: { type: string, collection?: Collection, importedCSV?: string }) => {
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
              // Detect Alias
              if ((variable.valuesByMode[modeId] as VariableAlias).type === "VARIABLE_ALIAS") {
                variableValuesByMode.push(`DO NOT EDIT (LINKED TO ANOTHER VARIABLE)`)
              }
              else {
                variableValuesByMode.push(variable.valuesByMode[modeId].toString())
              }
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

  if ((msg.type === "import") && (msg.importedCSV)) {
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

    const modesOnFigma: { modeId: string; name: string }[] = []
    const modesIdsOnFigma: string[] = []
    const variableNamesOnFigma: string[] = []

    figma.variables.getLocalVariableCollectionsAsync().then(async (localCollections) => {


      // Identify imported collection and its modes on Figma
      let collection: VariableCollection | undefined = undefined

      for (const localCollection of localCollections) {
        if (localCollection.name === collectionName) {
          collection = localCollection
          for (const mode of localCollection.modes) {
            modesOnFigma.push(mode)
            modesIdsOnFigma.push(mode.modeId)
          }
        }
      }

      // HARD CHECK: Check if collection exists on Figma
      if (!collection) {
        figma.notify("First column header in the CSV does not match any collection on Figma", { error: true, timeout: 5000 })
        return
      }

      // Compare modes on Figma with imported modes 
      for (const importedModeName of importedModeNames) {
        let importedModeId = "UndefinedModeId"
        for (const modeOnFigma of modesOnFigma) {
          if (modeOnFigma.name === importedModeName) {
            importedModeId = modeOnFigma.modeId
          }
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
        const missingModesSoftCheck = await NotifyAndAwaitAction(`${missingModeIdsCount} mode${missingModeIdsCount === 1 ? `` : `s`} on Figma ${missingModeIdsCount === 1 ? `is` : `are`} missing in the CSV`)

        if (!missingModesSoftCheck) {
          return
        }
      }

      // Continue if user is okay with bypassing modes soft check
      // Sanitise and populate import variables object
      // Starting at 1 to skip the column header row in parsedCSV
      for (let i = 1; i < parsedCSV.length; i++) {
        // Collect variables for missing variables soft check and new variables soft check
        importedVariableNames.push(parsedCSV[i][0])

        // Populate variables object
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
        // Collect variable names on Figma for missing variables soft check and new variables soft check
        for (const variable of variables) {
          if (variable.variableCollectionId === collection.id) {
            variableNamesOnFigma.push(variable.name)
          }
        }

        const missingVariablesCount = CountMissingElements(importedVariableNames, variableNamesOnFigma)

        if (missingVariablesCount > 0) {
          // Show notification and wait for action
          const missingVariablesSoftCheck = await NotifyAndAwaitAction(`${missingVariablesCount} variable${missingVariablesCount === 1 ? `` : `s`} on Figma ${missingVariablesCount === 1 ? `is` : `are`} missing in the CSV`)

          if (!missingVariablesSoftCheck) {
            return
          }
        }

        // Update existing variables if missing variables soft check is passed
        UpdateVariables(importedVariablesObject, collection, variables, modesIdsOnFigma, importedModeIds)


        // SOFT CHECK: Check if there are new variables in the CSV
        // Prompt if there are new variables in the CSV
        // User wants to continue: Create those new variables 
        // User wants to stop: Abort import
        const newVariableIndexes = GetNewVariableIndexes(importedVariableNames, variableNamesOnFigma)

        if (newVariableIndexes.length > 0) {
          // Show notification and wait for action
          const newVariablesSoftCheck = await NotifyAndAwaitAction(`${newVariableIndexes.length} new variable${newVariableIndexes.length === 1 ? `` : `s`} found in the CSV. These variables will be created in the collection.`)

          if (!newVariablesSoftCheck) {
            return
          }

          // Create new variables if new variables soft check is passed
          CreateNewVariables(importedVariablesObject, collection, modesIdsOnFigma, importedModeIds, newVariableIndexes)
        }
      })
    })
  }
}



function UpdateVariables(importedVariablesObject: ImportedVariablesSchema[], collection: VariableCollection, variables: Variable[], modesIdsOnFigma: string[], importedModeIds: string[]) {
  figma.notify("Updating existing variable values, hold on...")
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
  }
  figma.notify(`Successfully updated existing variable values of ${collection.name} from the CSV`, { timeout: 2000 })
}


function CreateNewVariables(importedVariablesObject: ImportedVariablesSchema[], collection: VariableCollection, modesIdsOnFigma: string[], importedModeIds: string[], newVariableIndexes: number[]) {
  figma.notify("Creating new variables, hold on...")

  for (const index of newVariableIndexes) {
    const newVariableData = importedVariablesObject[index]

    // Create new variable and set values for modes
    try {
      const newVariable = figma.variables.createVariable(newVariableData.name, collection, "STRING")

      for (const modeId of modesIdsOnFigma) {
        // Update only those modes that are present in the CSV. Needed for cases where the user has bypassed missing modes soft check.
        if (importedModeIds.includes(modeId)) {
          newVariable.setValueForMode(modeId, newVariableData.valuesByMode[modeId])
        }
      }
    }
    catch (error) {
      console.error(error)
      figma.notify(`Could not create ${newVariableData.name}`, { error: true, timeout: 5000 })
      figma.notify(`Import aborted. Please check the variable and its values CSV.`, { error: true, timeout: 5000 })
      figma.notify(`${error}`, { error: true, timeout: 5000 })
      return
    }
  }
  figma.notify(`Successfully created ${newVariableIndexes.length} new variable${newVariableIndexes.length === 1 ? `` : `s`} in the collection`, { timeout: 2000 })
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


function GetNewVariableIndexes(importedVariableNames: string[], variableNamesOnFigma: string[]) {
  const newVariableIndexes: number[] = []

  for (let i = 0; i < importedVariableNames.length; i++) {
    if (!variableNamesOnFigma.includes(importedVariableNames[i])) {
      newVariableIndexes.push(i)
    }
  }

  return newVariableIndexes
}


function NotifyAndAwaitAction(message: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    new Promise<boolean>((resolve, reject) => {
      figma.notify(message, {
        error: false,
        timeout: Infinity,
        onDequeue: (reason) => {
          if (reason === "action_button_click") {
            resolve(true) // User clicked "Continue import"
          } else {
            // User clicked the cross button or notification was dismissed otherwise
            reject(reason)
          }
        },
        button: {
          text: "Continue import",
          action: () => {
            resolve(true) // User clicked "Continue import"
          }
        }
      })
    })
      .then(() => { resolve(true) })
      .catch((error) => {
        // Catch any synchronous errors that occur during the figma.notify call itself
        console.error(error)
        figma.notify("Import aborted")
        resolve(false) // Indicate abortion due to internal error
      })
  })
}
