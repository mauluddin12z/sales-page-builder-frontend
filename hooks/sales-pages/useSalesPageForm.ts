"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { buildGenerated } from "@/lib/mock-data";
import {
  useCreateSalesPage,
  useUpdateSalesPage,
  useSalesPage,
} from "@/hooks/sales-pages";
import { mutate } from "swr";

type FormState = {
  productName: string;
  description: string;
  features: string[];
  audience: string;
  price: string;
  usp: string;
};

export const useSalesPageForm = (editId?: string) => {
  const router = useRouter();

  const { salesPage } = useSalesPage(editId ? Number(editId) : undefined);

  const { trigger: createSalesPage, isMutating: creating } =
    useCreateSalesPage();

  const { trigger: updateSalesPage, isMutating: updating } =
    useUpdateSalesPage();

  const isSubmitting = creating || updating;

  const [form, setForm] = useState<FormState>({
    productName: "",
    description: "",
    features: [],
    audience: "",
    price: "",
    usp: "",
  });

  const [featureInput, setFeatureInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // -----------------------
  // Load edit data
  // -----------------------
  useEffect(() => {
    if (!salesPage) return;

    setForm({
      productName: salesPage.product_name,
      description: salesPage.description,
      features: salesPage.features || [],
      audience: salesPage.target_audience,
      price: salesPage.price || "",
      usp: salesPage.usp || "",
    });
  }, [salesPage]);

  // -----------------------
  // Field update helper
  // -----------------------
  const updateField = (key: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // -----------------------
  // Features (WITH DUPLICATE WARNING)
  // -----------------------
  const addFeature = () => {
    const v = featureInput.trim();
    if (!v) return;

    if (form.features.includes(v)) {
      setErrors((prev) => ({
        ...prev,
        features: "Feature already exists",
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        features: "",
      }));
    }

    updateField("features", [...form.features, v]);
    setFeatureInput("");
  };

  const handleFeatureKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFeature();
    }
  };

  const removeFeature = (value: string) => {
    updateField(
      "features",
      form.features.filter((x) => x !== value),
    );
  };

  // -----------------------
  // Validation
  // -----------------------
  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.productName.trim()) {
      e.productName = "Product name is required";
    }

    if (form.description.trim().length < 20) {
      e.description = "Description should be at least 20 characters";
    }

    if (!form.audience.trim()) {
      e.audience = "Target audience is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // -----------------------
  // Submit (HARD BLOCK IF INVALID)
  // -----------------------
  const submit = async () => {
    const isValid = validate();

    if (!isValid || isSubmitting) {
      toast.error("Please fix form errors before submitting");
      return;
    }

    const toastId = toast.loading(
      editId ? "Updating sales page..." : "Generating sales page...",
    );

    try {
      const basePayload = {
        product_name: form.productName.trim(),
        description: form.description.trim(),
        features: form.features,
        target_audience: form.audience.trim(),
        price: form.price,
        usp: form.usp,
      };

      const generated = await buildGenerated(basePayload);

      if (editId) {
        await updateSalesPage({
          id: Number(editId),
          payload: {
            ...basePayload,
            generated_content: JSON.stringify(generated),
          },
        });

        toast.success("Sales page updated successfully", { id: toastId });
        router.push(`/preview/${editId}`);
        mutate(() => true, undefined, { revalidate: false });
        return;
      }

      const result = await createSalesPage({
        ...basePayload,
        generated_content: JSON.stringify(generated),
        template: "modern",
      });
      toast.success("Sales page created successfully", { id: toastId });
      router.push(`/preview/live-demo-${result?.data.id}`);
      mutate(() => true, undefined, { revalidate: false });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate sales page", { id: toastId });
    }
  };

  return {
    form,
    featureInput,
    setFeatureInput,
    errors,
    isSubmitting,
    updateField,
    addFeature,
    removeFeature,
    handleFeatureKey,
    submit,

    isEdit: !!editId,
  };
};
