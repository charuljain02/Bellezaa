const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl p-4 shadow">

      <h2 className="text-xl font-bold">
        {product.name}
      </h2>

      <p>{product.brand}</p>

      <p>
        Skin Type:
        {product.skinType}
      </p>

      <p>
        Concern:
        {product.concern}
      </p>

      <p>
        Rating:
        {product.rating}
      </p>

    </div>
  );
};

export default ProductCard;