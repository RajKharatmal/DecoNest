import { supabase } from './supabaseClient';

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Design {
  id: string;
  user_id: string;
  feature_type: string;
  original_image_url: string;
  result_image_url: string;
  color_selection: string | null;
  created_at: string;
}

export const saveUser = async (email: string): Promise<User | null> => {
  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return existingUser as User;
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      console.error('Error saving user:', error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error('Error in saveUser:', error);
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Error getting user:', error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return null;
  }
};

export const saveDesign = async (
  userId: string,
  featureType: string,
  originalImageUrl: string,
  resultImageUrl: string,
  colorSelection: string | null
): Promise<Design | null> => {
  try {
    const { data, error } = await supabase
      .from('designs')
      .insert([
        {
          user_id: userId,
          feature_type: featureType,
          original_image_url: originalImageUrl,
          result_image_url: resultImageUrl,
          color_selection: colorSelection,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving design:', error);
      return null;
    }

    return data as Design;
  } catch (error) {
    console.error('Error in saveDesign:', error);
    return null;
  }
};

export const getUserDesigns = async (userId: string): Promise<Design[]> => {
  try {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting designs:', error);
      return [];
    }

    return data as Design[];
  } catch (error) {
    console.error('Error in getUserDesigns:', error);
    return [];
  }
};
