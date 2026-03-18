import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import type { ProductImage } from "@/hooks/useProductImages";

interface SortableImageItemProps {
  image: ProductImage;
  onDelete: (id: string, imageUrl: string) => void;
  isDeleting: boolean;
}

const SortableImageItem = ({ image, onDelete, isDeleting }: SortableImageItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group border border-border overflow-hidden">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 right-1 z-10 bg-foreground/70 text-background p-1 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={14} />
      </div>
      <img
        src={image.image_url}
        alt={`Produto ${image.product_slug}`}
        className="w-full aspect-square object-cover"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
        <button
          onClick={() => onDelete(image.id, image.image_url)}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 bg-destructive text-destructive-foreground p-2 rounded-full transition-opacity"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <span className="absolute bottom-1 left-1 bg-foreground/80 text-background text-[10px] px-1.5 py-0.5 font-body">
        #{image.sort_order}
      </span>
    </div>
  );
};

interface SortableImageGridProps {
  images: ProductImage[];
  productSlug: string;
  onDelete: (id: string, imageUrl: string) => void;
  onReorder: (reordered: { id: string; sort_order: number }[]) => void;
  isDeleting: boolean;
}

const SortableImageGrid = ({ images, productSlug, onDelete, onReorder, isDeleting }: SortableImageGridProps) => {
  const [items, setItems] = useState(images);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Sync with external data
  if (images.length !== items.length || images.some((img, i) => img.id !== items[i]?.id)) {
    setItems(images);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    onReorder(reordered.map((img, idx) => ({ id: img.id, sort_order: idx })));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((img) => (
            <SortableImageItem key={img.id} image={img} onDelete={onDelete} isDeleting={isDeleting} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableImageGrid;
