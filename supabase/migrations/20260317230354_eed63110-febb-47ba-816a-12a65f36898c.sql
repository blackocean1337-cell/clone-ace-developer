-- Create product_images table
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Product images are publicly viewable"
  ON public.product_images FOR SELECT USING (true);

-- Authenticated users can manage images
CREATE POLICY "Authenticated users can insert product images"
  ON public.product_images FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update product images"
  ON public.product_images FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete product images"
  ON public.product_images FOR DELETE TO authenticated USING (true);

-- Index for fast lookups
CREATE INDEX idx_product_images_slug ON public.product_images (product_slug, sort_order);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policies
CREATE POLICY "Product images are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');