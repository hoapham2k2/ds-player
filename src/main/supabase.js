import { createClient } from '@supabase/supabase-js'

let supabase = null

try {
  supabase = createClient(
    'https://jxwvadromebqlpcgmgrs.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4d3ZhZHJvbWVicWxwY2dtZ3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MTQ3ODQsImV4cCI6MjAzMjk5MDc4NH0.teE26B-Eyerin6Ojy4QzyXOs2iS0HZAoirhkJyPAb3I'
  )

  console.log('Connected to Supabase successfully!!!')
} catch (error) {
  console.error('Error connecting to Supabase', error)
}

export default supabase
