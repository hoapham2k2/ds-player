import supabase from '../supabase'
import GetDeviceID from '../utils/getDeviceID'

export const GetContentItemsByDeviceAsync = async () => {
  let { data, error } = await supabase.rpc('get_content_items', {
    deviceid: GetDeviceID()
  })
  if (error) console.error(error)
  else if (data) {
    console.log('Data after get content items', data)
    // reduce the items which have the same id
    let uniqueItems = data.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])

    return uniqueItems
  }
}

export default GetContentItemsByDeviceAsync
