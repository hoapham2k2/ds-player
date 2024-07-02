import { GetApplicationConfigPath } from './getApplicationPath'
import fs from 'fs'
import path from 'path'

export default async function LoadConfigurationFile() {
  const configFileDirectory = GetApplicationConfigPath()
  const configFile = path.join(configFileDirectory, 'config.json')
  const defaultConfigPath = path.join(__dirname, '..', '..', 'config', 'default.json')

  try {
    if (!fs.existsSync(configFile)) {
      fs.copyFileSync(defaultConfigPath, configFile)
    }

    const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
    return config
  } catch (error) {
    throw new Error(`Error while loading configuration file: ${error.message}`)
  }
}
