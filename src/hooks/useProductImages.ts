import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductImage {
  id: string;
  product_slug: string;
  image_url: string;
  image_type: string;
  sort_order: number;
  created_at: string;
}

export const useProductImages = (productSlug: string, imageType: string = "gallery") => {
  return useQuery({
    queryKey: ["product-images", productSlug, imageType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_slug", productSlug)
        .eq("image_type", imageType)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProductImage[];
    },
    enabled: !!productSlug,
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, productSlug, sortOrder, imageType = "gallery" }: { file: File; productSlug: string; sortOrder: number; imageType?: string }) => {
      const ext = file.name.split(".").pop();
      const fileName = `${productSlug}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from("product_images")
        .insert({ product_slug: productSlug, image_url: urlData.publicUrl, sort_order: sortOrder });
      if (insertError) throw insertError;

      return urlData.publicUrl;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product-images", variables.productSlug] });
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imageUrl, productSlug }: { id: string; imageUrl: string; productSlug: string }) => {
      // Delete from storage
      const path = imageUrl.split("/product-images/").pop();
      if (path) {
        await supabase.storage.from("product-images").remove([path]);
      }

      const { error } = await supabase.from("product_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product-images", variables.productSlug] });
    },
  });
};
