DROP POLICY IF EXISTS "Authenticated users can delete product images" ON public.product_images;
DROP POLICY IF EXISTS "Authenticated users can insert product images" ON public.product_images;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON public.product_images;

CREATE POLICY "Public can insert product images"
ON public.product_images
FOR INSERT
TO public
WITH CHECK (
  product_slug <> ''
  AND image_url <> ''
  AND image_type IN ('gallery', 'pack')
  AND sort_order >= 0
);

CREATE POLICY "Public can update product images"
ON public.product_images
FOR UPDATE
TO public
USING (
  product_slug <> ''
  AND image_url <> ''
  AND image_type IN ('gallery', 'pack')
  AND sort_order >= 0
)
WITH CHECK (
  product_slug <> ''
  AND image_url <> ''
  AND image_type IN ('gallery', 'pack')
  AND sort_order >= 0
);

CREATE POLICY "Public can delete product images"
ON public.product_images
FOR DELETE
TO public
USING (
  product_slug <> ''
  AND image_url <> ''
  AND image_type IN ('gallery', 'pack')
  AND sort_order >= 0
);