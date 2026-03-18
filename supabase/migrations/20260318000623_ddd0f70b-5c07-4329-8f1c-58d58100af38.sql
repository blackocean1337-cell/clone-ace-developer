CREATE POLICY "Allow public uploads to product-images" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public deletes from product-images" ON storage.objects FOR DELETE TO public USING (bucket_id = 'product-images');

CREATE POLICY "Allow public reads from product-images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'product-images');