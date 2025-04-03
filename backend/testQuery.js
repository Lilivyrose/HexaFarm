const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://iwdncscvuwkhyakjpzrw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZG5jc2N2dXdraHlha2pwenJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMjg2NzAsImV4cCI6MjA1NzcwNDY3MH0.HAKziAqal8RMI22ScRqCdlP1KTTZTvjv1_koVloMaiU';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchCrops() {
    const userId = 'ea554c30-ad43-432d-a07f-84a2b8a58a39';
    console.log("Fetching crops for user_id:", userId);

    const { data, error } = await supabase
        .from('my_crops')
        .select('*')
        .eq('user_id', userId);

    console.log("Query result:", data);
    console.log("Query error:", error);
}

fetchCrops();