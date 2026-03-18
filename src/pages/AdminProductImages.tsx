import { useState } from "react";
import { products } from "@/data/products";
import { useProductImages, useUploadProductImage, useDeleteProductImage, useReorderProductImages } from "@/hooks/useProductImages";
import { Trash2, Upload, ImagePlus, ArrowLeft, Package, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import SortableImageGrid from "@/components/admin/SortableImageGrid";

const IMAGE_TABS = [
{ id: "gallery", label: "Imagens principais", icon: Image },
{ id: "pack", label: "Imagens de pacotes", icon: Package }] as
const;

const AdminProductImages = () => {
  const [selectedSlug, setSelectedSlug] = useState(products[0]?.slug || "");
  const [activeTab, setActiveTab] = useState<"gallery" | "pack">("gallery");
  const { data: images, isLoading } = useProductImages(selectedSlug, activeTab);
  const uploadMutation = useUploadProductImage();
  const deleteMutation = useDeleteProductImage();
  const reorderMutation = useReorderProductImages();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentCount = images?.length || 0;

    for (let i = 0; i < files.length; i++) {
      try {
        await uploadMutation.mutateAsync({
          file: files[i],
          productSlug: selectedSlug,
          sortOrder: currentCount + i,
          imageType: activeTab
        });
        toast.success(`Imagem "${files[i].name}" carregada com sucesso`);
      } catch {
        toast.error(`Erro ao carregar "${files[i].name}"`);
      }
    }
    e.target.value = "";
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      await deleteMutation.mutateAsync({ id, imageUrl, productSlug: selectedSlug });
      toast.success("Imagem eliminada");
    } catch {
      toast.error("Erro ao eliminar imagem");
    }
  };

  const selectedProduct = products.find((p) => p.slug === selectedSlug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Gestão de Imagens de Produtos
          </h1>
        </div>

        {/* Product selector */}
        <div className="mb-8">
          <label className="font-display text-sm font-semibold text-foreground mb-2 block">
            Selecione o produto:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {products.map((p) =>
            <button
              key={p.slug}
              onClick={() => setSelectedSlug(p.slug)}
              className={`border p-3 text-center transition-all duration-200 ${
              selectedSlug === p.slug ?
              "border-foreground bg-foreground text-background" :
              "border-border hover:border-muted-foreground"}`
              }>
              
                <img
                src={p.cardImage}
                alt={p.name}
                className="w-full aspect-square object-contain mb-2 bg-secondary-foreground" />
              
                <span className="font-body text-xs font-medium block truncate">{p.name}</span>
                <span className="font-body text-[10px] text-muted-foreground">{p.slug}</span>
              </button>
            )}
          </div>
        </div>

        {/* Selected product info */}
        {selectedProduct &&
        <div className="border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {selectedProduct.name}
                </h2>
                <p className="font-body text-sm text-muted-foreground">
                  Slug: {selectedSlug}
                </p>
              </div>
            </div>

            {/* Tabs for gallery vs pack */}
            <div className="flex gap-2 mb-6">
              {IMAGE_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-display text-sm font-bold tracking-wider uppercase transition-all duration-200 border ${
                  activeTab === tab.id ?
                  "border-foreground bg-foreground text-background" :
                  "border-border text-muted-foreground hover:border-muted-foreground"}`
                  }>
                  
                    <Icon size={16} />
                    {tab.label}
                  </button>);

            })}
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-muted-foreground">
                {images?.length || 0} imagens de {activeTab === "gallery" ? "galeria" : "pacotes"} carregadas
              </p>
              <label className="cursor-pointer bg-foreground text-background px-4 py-2 font-display text-sm font-bold tracking-wider uppercase hover:bg-foreground/90 transition-colors flex items-center gap-2">
                <ImagePlus size={16} />
                Adicionar imagens
                <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden" />
              
              </label>
            </div>

            {/* Images grid */}
            {isLoading ?
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(4)].map((_, i) =>
            <div key={i} className="aspect-square bg-muted animate-pulse" />
            )}
              </div> :
          images && images.length > 0 ?
          <>
                <SortableImageGrid
              images={images}
              productSlug={selectedSlug}
              onDelete={handleDelete}
              onReorder={(reordered) => {
                reorderMutation.mutate(
                  { images: reordered, productSlug: selectedSlug },
                  {
                    onSuccess: () => toast.success("Ordem atualizada"),
                    onError: () => toast.error("Erro ao reordenar")
                  }
                );
              }}
              isDeleting={deleteMutation.isPending} />
            
                {reorderMutation.isPending &&
            <p className="mt-2 font-body text-xs text-muted-foreground">A guardar ordem...</p>
            }
              </> :

          <div
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-foreground", "bg-muted"); }}
                onDragLeave={(e) => { e.currentTarget.classList.remove("border-foreground", "bg-muted"); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-foreground", "bg-muted");
                  const files = e.dataTransfer.files;
                  if (files.length) {
                    const fakeEvent = { target: { files, value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleUpload(fakeEvent);
                  }
                }}
                className="border-2 border-dashed border-border py-16 flex flex-col items-center justify-center text-center transition-colors"
              >
                <Upload size={40} className="text-muted-foreground mb-4" />
                <p className="font-body text-sm text-muted-foreground mb-2">
                  Nenhuma imagem de {activeTab === "gallery" ? "galeria" : "pacotes"} carregada para este produto
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Arraste imagens para aqui ou{" "}
                  <label className="cursor-pointer text-fincut-gold hover:underline font-medium">
                    clique para adicionar
                    <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
                  </label>
                </p>
              </div>
          }

            {uploadMutation.isPending &&
          <div className="mt-4 flex items-center gap-2 font-body text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-fincut-gold border-t-transparent rounded-full animate-spin" />
                A carregar imagem...
              </div>
          }
          </div>
        }
      </div>
    </div>);

};

export default AdminProductImages;