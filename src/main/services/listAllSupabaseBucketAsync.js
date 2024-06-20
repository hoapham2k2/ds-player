import supabase from '../supabase'

export const ListAllSupabaseBucketAsync = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets()

    if (error) {
      throw new Error(error.message)
    }
    console.log('Data after listing all buckets', data, error)
    return data
  } catch (error) {
    console.error('Error listing all buckets:', error)
  }
}

export default ListAllSupabaseBucketAsync
