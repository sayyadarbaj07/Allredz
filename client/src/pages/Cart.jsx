import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  // Static data (baad me RTK Query se dynamic karenge)
  const cartItems = [
    {
      id: 1,
      name: "Biryani Masala",
      price: 120,
      quantity: 2,
      image: "/images/biryani-masala.jpg", // 👈 Must be inside public/images/
    },
    {
      id: 2,
      name: "Garam Masala",
      price: 80,
      quantity: 1,
      image: "/images/garam-masala.jpg", // 👈 Must be inside public/images/
    },
  ];

  // Total price calculate
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                    <div>
                      <h2 className="font-medium text-gray-800">{item.name}</h2>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                      <div className="flex items-center mt-2">
                        <button className="px-3 py-1 border rounded-l hover:bg-gray-100">
                          -
                        </button>
                        <span className="px-4 border-t border-b">
                          {item.quantity}
                        </span>
                        <button className="px-3 py-1 border rounded-r hover:bg-gray-100">
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-700">
                      ₹{item.price * item.quantity}
                    </p>
                    <button className="text-red-500 hover:text-red-600">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">
                Total: ₹{total}
              </p>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
