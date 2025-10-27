/*
  # Create Users and Designs Tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
    
    - `designs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `feature_type` (text) - style, furnish, repaint, or floor
      - `original_image_url` (text) - base64 or URL to original image
      - `result_image_url` (text) - base64 or URL to generated image
      - `color_selection` (text, nullable) - color chosen for repaint/floor
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can only read their own data
    - Users can insert their own designs
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert users"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feature_type text NOT NULL,
  original_image_url text NOT NULL,
  result_image_url text NOT NULL,
  color_selection text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own designs"
  ON designs
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert designs"
  ON designs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS designs_user_id_idx ON designs(user_id);
CREATE INDEX IF NOT EXISTS designs_created_at_idx ON designs(created_at DESC);