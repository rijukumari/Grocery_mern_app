import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16 px-4 sm:px-6 md:px-10 mr-9">
      <p className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6">
        Best Sellers
      </p>

      {/* gap-x = horizontal spacing, gap-y = vertical spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5 gap-x-48">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <div key={index} className="p-2">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
