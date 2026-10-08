import { useUser } from "../../hooks/queries/useUser";
import { useMyProducts } from "../../hooks/queries/useMyProducts";
import ProductsTable from "../../components/products/productsTable";
import ProductsCardsTable from "../../components/products/productsCardsTable";
import { useDeleteProduct } from "../../hooks/mutations/useDeleteProduct";
import { useState } from "react";
import type { Product } from "../../services/productService";
import DeleteProductModal from "../../components/products/deleteProductModal";
import { getErrorMessage } from "../../utils/errorHandler";
import { useFlashMessage } from "../../contexts/flashMessageContext";

export default function Seller() {
  const { data: user } = useUser();
  const { data: products, isLoading, isError } = useMyProducts();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { mutate: deleteProduct, error } = useDeleteProduct();
  const { showFlash } = useFlashMessage();

  const handleOpenDeleteModal = (product: Product) => {
    setProductToDelete(product);
  };

  const handleDelete = () => {
    if (!productToDelete) {
      return;
    }
    
    setDeletingSlug(productToDelete.slug);
  
    deleteProduct(productToDelete.slug, {
      onSuccess: () => {
        setProductToDelete(null);
        showFlash("Articolo eliminato con successo.","success");
      },

      onError: (error) => {
        const message = getErrorMessage(error);
        showFlash(message, "error");
      },

      onSettled: () => {
        setDeletingSlug(null);
      },
    });
  };

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  if (isError) {
    return <p>Errore nel caricamento dei prodotti.</p>;
  }

  if (!products) {
    return null;
  }

  return (
    <section className="flex flex-col mx-auto">
      <div className="mx-auto my-15 text-center">
        <h1 className="text-5xl mb-5">Dashboard Venditore</h1>
        {user && (
          <p className="text-3xl">
            Benvenuto <span className="font-bold">{user.name}</span>
          </p>
        )}
      </div>

      <div className="hidden md:block md:w-3/4 mx-auto">
        <ProductsTable
          products={products}
          onDelete={handleOpenDeleteModal}
          deletingSlug={deletingSlug}
        />
      </div>

      <div className="md:hidden">
        <ProductsCardsTable
          products={products}
          onDelete={handleOpenDeleteModal}
          deletingSlug={deletingSlug}
        />
      </div>
      <DeleteProductModal
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
