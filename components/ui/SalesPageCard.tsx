import { Eye, Pencil, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SalesPage = {
  id: number;
  product_name: string;
  description: string;
  created_at: string;
};

type Props = {
  page: SalesPage;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function SalesPageCard({
  page,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="group rounded-2xl border border-border bg-card p-6 shadow-(--shadow-sm) transition-all hover:shadow-(--shadow-lg) hover:-translate-y-1">
      <h3 className="font-semibold text-foreground line-clamp-1">
        {page.product_name}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
        {page.description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {formatDate(page.created_at)}
      </div>

      <div className="mt-5 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onView(page.id)}
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Button>

        <Button size="sm" variant="outline" onClick={() => onEdit(page.id)}>
          <Pencil className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(page.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
